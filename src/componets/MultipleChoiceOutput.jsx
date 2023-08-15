import React from "react";

const MultipleChoiceOutput=( props )=>{
  return(
    <div className="fullQuestion">
      <div className="ask">
        {props.data.question }
      </div>
      <div className="answer">
        
      </div>
    </div>
  )
}
export default MultipleChoiceOutput