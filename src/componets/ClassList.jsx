import React, { useState } from "react";
import FadeIn from "react-fade-in/lib/FadeIn";

const ClassList = (props) =>{
  const[selected,setSelected]=useState("")
  function change(e,num){
    props.changeClass(props.department+num)
    setSelected(num)

  }
  return(
    <FadeIn>
      {props.classNums.map((e,i)=>{
        return(
          <div>
            {selected==(e)?
            <p  onClick={(event) =>change(event,e)} className="classNumSelected" >
            {e}
            </p>
            :
            <p onClick={(event) =>change(event,e)} className="classNumNot">
            {e}
            </p>
          }
          </div>
        )
      })}
    </FadeIn>
  )
}
export default ClassList