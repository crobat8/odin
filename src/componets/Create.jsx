import React,{
  useState,
  useRef,
  useContext
} from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'

import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'

import {  
  db  
} from "../firebase";

import { 
  doc, 
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

import { 
  AuthContext
} from "../context/AuthContext";

import Geocode from "react-geocode";
//default location aka paris
var center = {lat: 48.8584, lng: 2.2945}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    center.lat=position.coords.latitude;
    center.lng=position.coords.longitude
  });
} else {
  console.log("Not Available");
}

const Create = () =>{ 
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBvBeQOPrT0k1EFYDd7niC-aBbTEUj7uK0',
      libraries: ['places']
  })
  const [screen,setScreen] =useState(window.innerWidth/4)
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [partyLocation,setPartyLocation] = useState(center);
  const{currentUser} = useContext(AuthContext);
  const[deleteChats,setDeleteChats] = useState([]);
  const[loading2,setLoading2] = useState(true)
  Geocode.setApiKey("AIzaSyBvBeQOPrT0k1EFYDd7niC-aBbTEUj7uK0");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  function handleLocation(){
    console.log(destiantionRef.current.value);
    Geocode.fromAddress(destiantionRef.current.value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        center.lat = lat;
        center.lng = lng;
        setPartyLocation(center)
      },
      (error) => {
        console.error(error);
      }
    );
  }


  const handleSubmit = async (e) => {
    
    const EventType = e.target[1].value;
    const Title = e.target[2].value;
    const Description = e.target[3].value;
    const Wanted = e.target[4].value;
    const Location = partyLocation;
    const Address = destiantionRef.current.value
    const id = currentUser.uid;
    const EventPhoto = currentUser.photoURL
    const Host = currentUser.displayName
    try{
      setDoc(doc(db, "Event", currentUser.uid), {
        comingList:{
          [currentUser.uid]:currentUser.uid
        },
        id,
        EventType,
        Title,
        Description,
        Wanted,
        Lattitude:center.lat,
        Longitude:center.lng,
        Location,
        Address,
        EventPhoto,
        Host
        
      });
      e.preventDefault();

      deleteChats.map((e)=>{

        var num = e.date
        var str = num.toString()
        var sentAdded = str+e.sentBy
        deleteDoc(doc(db,"Chats",sentAdded))
      });

      
      alert("event was succesfully created")
      
    }catch(err){
      console.log(err)
    }

  }

  function getChats(){
    const meRef = query(collection(db,"Chats")
                  ,where("id","==",currentUser.uid))
    onSnapshot(meRef,(snapshot)=>{
      setDeleteChats(snapshot.docs.map(doc=>doc.data()))
      setLoading2(false)
    })
  }

  
  if (!isLoaded||loading2) {

    getChats();
    return <h1>
        map is loading
    </h1>
  }
  return (
    <div className='create'>
      <Flex
        flexDirection='column'
        alignItems='center'
        h='700px'
        w='100vw'
      >
        <Box mt={20} left={screen} top={100} h='600px' w='80%'>
        
          <GoogleMap
            center={partyLocation}
            zoom={10}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            <MarkerF 
              icon={
                StyleSheet
              }
              position={partyLocation}    
            >
                    
            </MarkerF>  
          </GoogleMap>
        </Box>
      </Flex>
      <form className="Form" onSubmit={handleSubmit}>
        <label for="goingTo"  >Where is the party:</label>
        <Autocomplete onPlaceChanged={handleLocation}>
          <Input
            id="goingTo"
            className='goingTo'
            type='text'
            placeholder='where is the hangout at'
            ref={destiantionRef}
            width='250px'
            required
          />
        </Autocomplete>
        <label for="Event" >
          Event Type:
          <select required id='EventType' name="EventType">
            <option value="Sports">Sports</option>
            <option value="House Party">House Party</option>
            <option value="Yard Games">Yard Games</option>
            <option value="Hit The Town">Hit The Town</option>
            <option value="Video Games">Video Games</option>
            <option value="Board Games">Board Games</option>
          </select>
        </label>
        <label for="Title" >Title:</label>
        <input required id="Title" name="Title"/>
        <label for="Description" >Description:</label>
        <textarea rows="5" width="100%" id="Description" name="Description" placeholder="Enter text"/>
        <label for="attendingWanted" >
          How many people do you want to have come:
        </label>
        <input className='attendingWanted' id='attendingWanted' type='number' min={1}></input>
        <button>Log</button>
      </form>
    </div>
  )
}

export default Create;