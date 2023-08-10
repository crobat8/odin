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


const MultipleChoiceInput=(props)=>{
  let question = { color: "white", height:"20px",width:"20px"};
  let correct = { color: "green", height:"20px",width:"20px"};
  let wrong = { color: "red", height:"20px",width:"20px"};
  const [wrongs,setWrongs] = useState(3);

  const handleChangeWrong = (x) =>{
    if((wrongs+x)==0){

    }else if((wrongs+x)==6){

    }else{
      setWrongs(wrongs+x);
    }
    
  }


  const WrongAnswers = ()=>{
    const ret = []
    for(var x= 0;x<wrongs;x++){
      ret.push(        
      <div className="fullIn">
        <div className="Subleft">
          <AiFillCloseCircle style={wrong}/>
        </div>
        <div className="Subright">
          <label for='wrong'>Wrong Option</label>
          <input type="text" placeholder={x+3} />
        </div>
      </div>
      )
    }
    return ret
  }
  const handleSubmit = async (e) => {
    console.log(e);
    const question = e.target[0].value;
    const answer = e.target[1].value;
    var options = [] ;
    options.push(e.target[1].value)
    for(var x = 1;x<=wrongs;x++){
      options.push(e.target[1+x].value)
    }
    console.log("question",question)
    console.log("answer",answer)
    console.log("options",options)
    e.preventDefault();
    try{
      setDoc(doc(db, "Event", props.uid), {
        createdBy:props.uid,
        question,
        answer,
        options
      });
      
      
      alert("event was succesfully created")
      
    }catch(err){
      console.log(err)
    }

  }
  
  return(
    <div className="formWrapper">
      <h3>
        MultipleChoiceInput
      </h3>
      <form onSubmit={handleSubmit}>
        
        <div className="fullIn">
          <div className="Subleft">
            <AiFillQuestionCircle style={question}/>
          </div>
          <div className="Subright">
            <label for='question'>Question</label>
            <input type="text" placeholder="what is 1+1" />
          </div>
        </div>

        <div className="fullIn">
          <div className="Subleft">
            <AiFillCheckCircle style={correct}/>
          </div>
          <div className="Subright">
            <label for='correct'>Correct Answer</label>
            <input type="text" placeholder="2" />
          </div>
        </div>
        <WrongAnswers/>
        <div className="choices">
          <button type="button" onClick={()=>handleChangeWrong(-1)}>
            remove
          </button>
          <button type="button" onClick={()=>handleChangeWrong(1)}>
            add
          </button>
        </div>
        <button className="logButton">submit question</button>
        
      </form>
    </div>
    
  )
}
export default MultipleChoiceInput;