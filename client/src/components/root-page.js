import React from "react";
import Spinner from "./spinner";

const Page = (props)=>{
  console.log("Root,fetching? ",props.fetching)
  return(
    <div className={props.name}>
      <header className="App-header" >
          <div className="App-title-container">
            <h1 className="App-title">{props.title}</h1>
            <h2>{props.subtitle}</h2>
          </div>
      </header>
      {props.fetching? <Spinner/>:props.children}
    </div>
  )
}

export default Page;
