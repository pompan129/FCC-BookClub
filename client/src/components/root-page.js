import React from "react";
import { withStyles } from 'material-ui/styles';
import Spinner from "./spinner";
import Footer from "./footer-root";

const Styles = {
  body:{
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  content:{
    flex:1
  }
}

const Page = (props)=>{
  return(
    <div className={props.classes.body}>
      <div  className={props.classes.content}>
        <header className="App-header" >
            <div className="App-title-container">
              <h1 className="App-title">{props.title}</h1>
              <h2>{props.subtitle}</h2>
            </div>
        </header>
        {props.fetching? <Spinner/>:props.children}
      </div>
      <Footer/>
    </div>
  )
}


export default withStyles(Styles)(Page);
