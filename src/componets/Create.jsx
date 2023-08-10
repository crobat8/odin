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
import MultipleChoice from './MultipleChoiceInput';
import FillInBlank from './FillInBlankInput';
import LongAnswer from './LongAnswerInput';

const Create = () =>{ 
  const{currentUser} = useContext(AuthContext);
  const[loading2,setLoading2] = useState(true)
  const[form,setForm]= useState(1)

  function HandleForm(){
    if(form === 1){
      return (
        <MultipleChoice uid={currentUser.uid}/>
      )
    }else if(form === 2){
      return (
        <FillInBlank uid={currentUser.uid}/>
      )
    }else if(form === 3){
      return (
        <LongAnswer uid={currentUser.uid}/>
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
        create is loading
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
    </div>
  )
}

export default Create;