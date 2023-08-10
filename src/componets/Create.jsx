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
import MultipleChoice from './MultipleChoice';
import FillInBlank from './FillInBlank';
import LongAnswer from './LongAnswer';

const Create = () =>{ 
  const{currentUser} = useContext(AuthContext);
  const[loading2,setLoading2] = useState(true)
  const[form,setForm]= useState(1)
  // const handleSubmit = async (e) => {
    
  //   const EventType = e.target[1].value;
  //   const Title = e.target[2].value;
  //   const Description = e.target[3].value;
  //   const Wanted = e.target[4].value;
  //   const id = currentUser.uid;
  //   const EventPhoto = currentUser.photoURL
  //   const Host = currentUser.displayName
  //   try{
  //     setDoc(doc(db, "Event", currentUser.uid), {
  //       comingList:{
  //         [currentUser.uid]:currentUser.uid
  //       },
  //       id,
  //       EventType,
  //       Title,
  //       Description,
  //       Wanted,
  //       Lattitude:center.lat,
  //       Longitude:center.lng,
  //       EventPhoto,
  //       Host
        
  //     });
  //     e.preventDefault();
  //     alert("event was succesfully created")
      
  //   }catch(err){
  //     console.log(err)
  //   }

  // }
  function HandleForm(){
    if(form === 1){
      return (
        <MultipleChoice/>
      )
    }else if(form === 2){
      return (
        <FillInBlank/>
      )
    }else if(form === 3){
      return (
        <LongAnswer/>
      )
    }else{
      return (
        <div style={{"min-height": "1000px","textAlign":"center"}}>
          <h1 style={{"backgroundColor":"#00b2be",
                      "textAlign":"center",
                      "padding":"20px",
                      "borderRadius":"20px"}}>
            select a page to go to
          </h1>
        </div>
      )
    }
  }
  
  if (loading2) {
    setLoading2(false)

    return <h1>
        map is loading
    </h1>
  }
  return (
    <div className='create'>
      <div className='left'>
        <button onClick={()=>setForm(1)}>
          multiple Choice
        </button>
        <button onClick={()=>setForm(2)}>
          fill in the blank
        </button>
        <button onClick={()=>setForm(3)}>
          long answer
        </button>
      </div>
      <div className='right'>
        <HandleForm/>
      </div>
      {/* <form className="Form" onSubmit={handleSubmit}>
        <label for="goingTo"  >Where is the party:</label>
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
      </form> */}
    </div>
  )
}

export default Create;