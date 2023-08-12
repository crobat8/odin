import React, { useState } from "react";
import FadeIn from 'react-fade-in';

import { 
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillQuestionCircle
} from 'react-icons/ai';

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
  db  
} from "../firebase";


const FillInBlankInput=(props)=>{
  let question = { color: "white", height:"20px",width:"20px"};
  let correct = { color: "green", height:"20px",width:"20px"};
  const [wrongs,setWrongs] = useState(3);

  const handleChangeWrong = (x) =>{
    if((wrongs+x)==0){

    }else if((wrongs+x)==6){

    }else{
      setWrongs(wrongs+x);
    }
    
  }

  const handleSubmit = async (e) => {
    console.log(e);
    const text1 = e.target[0].value;
    const answer = e.target[1].value;
    const text2 = e.target[2].value;
    const type = "fillInBlank"
    e.preventDefault();
    const date = new Date().getTime();
    try{
      setDoc(doc(db, "questions", props.uid+"-"+date), {
        createdBy:props.uid,
        date,
        type,
        text1,
        text2,
        answer,
      });
      
      alert("question was succesfully created")
      
    }catch(err){
      console.log(err)
    }

  }
  
  return(
    <div className="formWrapper">
      <h3>
        Fill in the blank
      </h3>
      <form onSubmit={handleSubmit}>
        <FadeIn className="fade">
        <div className="fullIn">
          <div className="Subleft">
            <AiFillQuestionCircle style={question}/>
          </div>
          <div className="Subright">
            <label for='question'>Start of Text</label>
            <input required type="text" placeholder="The state of" />
          </div>
        </div>

        <div className="fullIn">
          <div className="Subleft">
            <AiFillCheckCircle style={correct}/>
          </div>
          <div className="Subright">
            <label for='correct'>Blank Space Answer</label>
            <input required type="text" placeholder="Washington" />
          </div>
        </div>

        <div className="fullIn">
          <div className="Subleft">
            <AiFillQuestionCircle style={question}/>
          </div>
          <div className="Subright">
            <label for='question'>End of Text</label>
            <input required type="text" placeholder="contains the space needle" />
          </div>
        </div>

        <button className="logButton">submit question</button>
        </FadeIn>
      </form>
    </div>
    
  )
}
export default FillInBlankInput;