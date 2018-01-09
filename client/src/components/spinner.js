import React from "react";
import { CircularProgress } from 'material-ui/Progress';

 const style = {
   backdrop:{
    position: 'absolute',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    backgroundColor: 'rgba(0, 0, 0, .05)',
    padding: '.5rem',
    borderRadius:'50%'
  }};

const Spinner = (props)=>{
  //console.log("spinning****");//todo
  return(
    <div style={style.backdrop}>
        <CircularProgress  color="primary" size={100} thickness={10}/>
    </div>



  )
}

export default Spinner;
