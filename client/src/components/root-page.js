import React from "react";

const Page = (props)=>{
  return(
    <div className={props.name}>
      <header className="App-header" >
          <div className="App-title-container">
            <h1 className="App-title">{props.title}</h1>
            <h2>{props.subtitle}</h2>
          </div>
      </header>
      {props.children}
    </div>
  )
}

export default Page;
