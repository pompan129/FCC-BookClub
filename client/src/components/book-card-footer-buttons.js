import React from "react";
import { withStyles } from 'material-ui/styles';
import { fade } from 'material-ui/styles/colorManipulator';

import Button from 'material-ui/Button';
import lightGreen from 'material-ui/colors/lightGreen';
import red from 'material-ui/colors/red';

const Styles = them=>({
  root:{
    width:'100%',
    height:'100%'
  },
  buttonConfirm:{
    width:'50%',
    height:'100%',
    background:lightGreen[500],
    borderRadius:0,
    '&:hover':{
      backgroundColor:fade(lightGreen[500],.50)
    }
  },
  buttonReject:{
    width:'50%',
    height:'100%',
    background:red[400],
    borderRadius:0,
    color:'white',
    '&:hover':{
      backgroundColor:fade(red[400],.50),
      color:'black'
    }
  }
})

const Buttons = (props)=>{

  return(
      <div className={props.classes.root}>
           <Button
             onClick={props.handleClickApprove}
             className={props.classes.buttonConfirm}
             >Approve
           </Button>
           <Button
             onClick={props.handleClickReject}
             className={props.classes.buttonReject}
             >Reject
           </Button>
      </div>
  )
}

export default withStyles(Styles)(Buttons);
