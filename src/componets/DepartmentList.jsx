import React, { useState } from "react";
import ClassList from "./ClassList";
import FadeIn from "react-fade-in/lib/FadeIn";

const DepartmentList = (props) =>{

  const[subject,setSubject]=useState("")

  function change(e,x){
    props.changeClass(x)

  }

  function handleSubject(e,x){
    if(subject==x){
      setSubject("")
    }else{
      setSubject(x)
    }

  }

  return(
    // <div onClick={(event)=>change(event,props.brokenDown[0])}>
    //   class list 
    // </div>
    <FadeIn>
      {props.keys.map((e,i)=>{
        return(
          <div className="nameHolder">
            <h3 onClick={(event)=>handleSubject(event,e)} className="nameOfDept">
              {e}
            </h3>
            {subject==(e)?
            <ClassList changeClass={props.changeClass} department={e} classNums={props.classes[e]}/>:
            <div>
              
            </div>}
            {/* {props.brokenDown.map((x,j)=>{
              return(
                <h4>
                  {x}
                  
                </h4>
              )
            })} */}
          </div>

        )
        })}
    </FadeIn>

  )
}
export default DepartmentList