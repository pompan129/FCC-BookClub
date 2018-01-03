import React from "react";
import { CircularProgress } from 'material-ui/Progress';
import Modal from 'material-ui/Modal';

 const style = {
   backdrop:{
    position: 'absolute',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    padding: '.5rem',
    borderRadius:'50%'

  }};

  const open = true;

const Spinner = (props)=>{
  console.log("spinning****");//todo
  return(
    <div style={style.backdrop}>
        <CircularProgress  color="primary" size={100} thickness={10}/>
    </div>



  )
}

export default Spinner;
