import React from "react";

const About = (props)=>{

    const Style = {
      width: '100%',
      height: '100%',
      position:'relative',
      cursor: props.active?'pointer':'auto',
      backgroundColor:props.backgroundColor
    };
    const Span = {
      position:'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display:'flex',
      alignItems:'center'
    }

  return(
    <div style={Style}
      onClick={props.active?props.action:undefined}
      onMouseEnter={!props.active?undefined:
        ({target})=>target.style.backgroundColor = props.backgroundColorOver}
      onMouseLeave={!props.active?undefined:
        ({target})=>target.style.backgroundColor = props.backgroundColor}
      >
      <span style={Span}>{props.children}</span>
    </div>
  )
}

export default About;
