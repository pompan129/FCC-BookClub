import React from "react";
//components
import Root from "./root-page";
//material-UI
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

//logos
import ReduxLogo from "./logos/redux";
import ReactLogo from "./logos/react";
import ReactRouterLogo from "./logos/react-router";
import MaterialUILogo from "./logos/material-ui";
import NodeLogo from "./logos/nodejs";
import ExpressLogo from "./logos/express";
import MongoLogo from "./logos/mongo";
import GoogleBooksLogo from "./logos/google-books";

import avatarPic from "../assets/kurt_pic.jpg"


const Styles = {
  about:{
    margin:"1rem auto",
    width:"80%",
    textAlign:"left"
  },
  techstack:{
    display:"flex"
  },
  'logo-list':{
    margin:'.25rem 0 1rem 0',
    display:'flex',
    alignItems:'center',
    color:'white'
  },
  logo:{
    color:"white",
    padding:".25rem",
    border:"1px solid #ccc",
    borderRadius:"5px",
    margin:"0 .5rem",
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
  }
}


const About = (props)=>{

  return(
    <Root name="about-root"
      title="About"
      subtitle=""
      >
      <div className={props.classes.about}>
        <div >
          <Typography  type="display2" gutterBottom>
            Project Purpose
          </Typography>
          <Typography paragraph>
            This is my version of the freeCodeCamp full-stack project "Manage a Book Trading Club"
          </Typography>
          <Typography type="title" gutterBottom>
            The project fullfills the following user stories:
          </Typography>
          <ul>
            <li><Typography>I can view all books posted by every user.</Typography></li>
            <li><Typography>I can add a new book.</Typography> </li>
            <li><Typography>I can update my settings to store my full name, city, and state.</Typography> </li>
            <li><Typography>I can propose a trade and wait for the other user to accept the trade.</Typography></li>
          </ul>
        </div>
        <Typography type="title" gutterBottom>Frontend Tech Stack</Typography>
        <div className={props.classes['logo-list']}>
            <span className={props.classes.logo} style={{backgroundColor:"#006c80"}}>
              <ReactLogo/>
              <Typography type="subheading" style={{color:'white',margin:'.25rem .5rem'}}>React</Typography>
            </span>
            <span className={props.classes.logo} style={{backgroundColor:"#442970"}}>
              <ReduxLogo/>
              <Typography type="subheading" style={{color:'white',margin:'.25rem .5rem'}}>Redux</Typography>
            </span>
            <span className={props.classes.logo} style={{backgroundColor:"grey"}}>
              <ReactRouterLogo/>
              <Typography type="subheading" style={{color:'white',margin:'.25rem .5rem'}}>React Router</Typography>
            </span>
            <span className={props.classes.logo} style={{backgroundColor:"black"}}>
              <MaterialUILogo/>
              <Typography type="subheading" style={{color:'white',margin:'.25rem .5rem'}}>Material-UI</Typography>
            </span>
          </div>
          <Typography type="title" gutterBottom>Backend Tech Stack</Typography>
          <div className={props.classes['logo-list']}>
              <span className={props.classes.logo} style={{backgroundColor:"#305926"}}>
                <NodeLogo/>
                <Typography type="subheading" style={{color:'white',margin:'.25rem .5rem'}}>Node.js</Typography>
              </span>
              <span className={props.classes.logo} style={{backgroundColor:"#eee",height:"2rem"}}>
                <ExpressLogo style={{width:102}}/>
              </span>
              <span className={props.classes.logo} style={{backgroundColor:"#cbe7cb"}}>
                <MongoLogo style={{height:32, width:150}}/>
              </span>
            </div>
          <Typography type="title" gutterBottom>External API</Typography>
          <div className={props.classes['logo-list']}>
              <span className={props.classes.logo} style={{backgroundColor:"white"}}>
                <GoogleBooksLogo/>
                <Typography type="subheading" style={{color:'black',margin:'.25rem .5rem'}}>Google Books API</Typography>
              </span>
            </div>
            <Typography type="display1" gutterBottom>About The Author</Typography>

            <div style={{display:'flex'}}>
              <Avatar
                alt="Kurt Johnson"
                src={avatarPic}
                style={{width:"6rem",height:"6rem"}}
                />
              <div style={{margin:'1rem'}}>
                <Typography type="headline" gutterBottom>Kurt Johnson</Typography>
                <Typography type="title">A web developer in Sacramento, CA</Typography>
                <span><Typography>Get in Touch:</Typography></span>
              </div>
            </div>
        </div>

Contact me:
View my portfolio at
    </Root>
  )
}

export default withStyles(Styles)(About);
