import React, { useState,useEffect } from "react";

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
  onSnapshot,
  getDocs,
  QuerySnapshot
} from "firebase/firestore";
import DepartmentList from "./DepartmentList";


const Questions =() =>{
  const[loading,setLoading]=useState(true)
  const[loading2,setLoading2]=useState(true)
  const[classes,setClasses]=useState([])
  const[brokenDown,setBrokenDown]=useState()
  const[choseClass,setChoseClass]=useState("MATH101")
  const[keys,setKeys] =useState()
  const getClasses = async()=>{

    await getDocs(collection(db,"classes"),
                  where("Document ID","==","Western_Washington_University"))
                  .then((querySnapshot)=>{
                    const newData = querySnapshot.docs
                      .map((doc)=>(setClasses(doc.data())))

                      setLoading(false)
                  })
  }

  function breakDown(){

    const keys = Object.keys(classes)
    setKeys(keys)
    var ret = []
    for(var x = 0;x<keys.length;x++){
      for(var y = 0;y<classes[keys[x]].length;y++){
        ret.push(keys[x]+classes[keys[x]][y])

      }
    }
    setBrokenDown(ret)
    setLoading2(false)
  }

  useEffect(()=>{
    getClasses();
  },[]);

  useEffect(()=>{
    breakDown();
  },[classes])

  if(loading){
    return(
      <h1>
        loading 1
      </h1>
    )
  }
  if(loading2){
    console.log(classes)
    return(
      <h1>
        loading 2
      </h1>
    )
  }
  return(
    <div className="questions">
      <div className='left'>
        <h1>
          pick a class 
        </h1>
        <DepartmentList 
        keys={keys} 
        classes={classes} 
        brokenDown={brokenDown} 
        changeClass={setChoseClass} />
      </div>
      <div className='right'>
        <h1>
          test
          {choseClass}
        </h1>
      </div>
    </div>
  )
}
export default Questions;