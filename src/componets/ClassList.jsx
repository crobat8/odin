import React from "react";
import FadeIn from "react-fade-in/lib/FadeIn";

const ClassList = (props) =>{

  function change(e,x){
    props.changeClass(props.department+x)

  }
  console.log(props.classNums)
  return(
    // <div onClick={(event)=>change(event,props.brokenDown[0])}>
    //   class list 
    // </div>
    <FadeIn>
      {props.classNums.map((e,i)=>{
        return(
          <h4 onClick={(event) =>change(event,e)} className="classNum">
            {e}
          </h4>
        )
      })}
    </FadeIn>
  )
}
export default ClassList