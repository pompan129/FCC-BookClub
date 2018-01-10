import React from "react";
import Root from "./root-page";




const About = (props)=>{

  return(
    <Root name="about-root"
      title="About"
      subtitle=""
      >
      <div className="about">
        <h1>You are not Authorized for this route.</h1>
      </div>
    </Root>
  )
}

export default About;
