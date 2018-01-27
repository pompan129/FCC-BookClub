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
import GithubLogo from "./logos/github";
import FreecodecampLogo from "./logos/freecodecamp";
import CodepenLogo from "./logos/codepen";

import avatarPic from "../assets/avatar.jpg"


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
    color:'white',
    '& a':{
      textDecoration:"none"
    }
  },
  logoSpan:{
    color:"white",
    padding:".25rem",
    border:"1px solid #ccc",
    borderRadius:"5px",
    cursor:'pointer',
    margin:"0 .5rem",
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    '&:hover': {
        backgroundColor:"#666 !important",
    }
  },
  getInTouchLogo:{
    width:'2rem',
    height:'2rem',
    fill:'#eee',
    margin:'0 .25rem',
    backgroundColor:'#000',
    borderRadius:'50%',
    padding:'4px',
    cursor:'pointer',
    '&:hover': {
      fill: '#000',
      backgroundColor:'#999'
    }
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
            <a href="https://reactjs.org/">
              <span className={props.classes.logoSpan} style={{backgroundColor:"#006c80"}}>
                <ReactLogo/>
                <Typography type="subheading" style={{color:'white',margin:'.25rem .5rem'}}>React</Typography>
              </span></a>
            <a href="https://redux.js.org/">
              <span className={props.classes.logoSpan} style={{backgroundColor:"#442970"}}>
                <ReduxLogo/>
                <Typography type="subheading" style={{color:'white',margin:'.25rem .5rem'}}>Redux</Typography>
              </span></a>
            <a href="https://reacttraining.com/react-router/">
              <span className={props.classes.logoSpan} style={{backgroundColor:"grey"}}>
                <ReactRouterLogo/>
                <Typography type="subheading" style={{color:'white',margin:'.25rem .5rem'}}>React Router</Typography>
              </span></a>
            <a href="https://material-ui-next.com/">
              <span className={props.classes.logoSpan} style={{backgroundColor:"black"}}>
                <MaterialUILogo/>
                <Typography type="subheading" style={{color:'white',margin:'.25rem .5rem'}}>Material-UI</Typography>
              </span>
            </a>
          </div>
          <Typography type="title" gutterBottom>Backend Tech Stack</Typography>
          <div className={props.classes['logo-list']}>
              <a href="https://nodejs.org">
                <span className={props.classes.logoSpan} style={{backgroundColor:"#305926"}}>
                  <NodeLogo/>
                  <Typography type="subheading" style={{color:'white',margin:'.25rem .5rem'}}>Node.js</Typography>
                </span></a>
              <a href="https://expressjs.com/">
                <span className={props.classes.logoSpan} style={{backgroundColor:"#eee",height:"2rem"}}>
                  <ExpressLogo style={{width:102}}/>
                </span></a>
              <a href="https://www.mongodb.com/">
                <span className={props.classes.logoSpan} style={{backgroundColor:"#cbe7cb"}}>
                  <MongoLogo style={{height:32, width:150}}/>
                </span></a>
            </div>
          <Typography type="title" gutterBottom>External API</Typography>
          <div className={props.classes['logo-list']}>
              <a href="https://developers.google.com/books/">
                <span className={props.classes.logoSpan} style={{backgroundColor:"white"}}>
                  <GoogleBooksLogo/>
                  <Typography type="subheading" style={{color:'black',margin:'.25rem .5rem'}}>Google Books API</Typography>
                </span></a>
            </div>
            <Typography type="display1" gutterBottom>About The Author</Typography>

            <div style={{display:'flex'}}>
              <Avatar
                alt="Kurt Johnson"
                src={avatarPic}
                style={{width:"10rem",height:"10rem"}}
                />
              <div style={{margin:'1rem'}}>
                <Typography type="headline" gutterBottom>Kurt Johnson</Typography>
                <Typography type="title" gutterBottom>A web developer in Sacramento, CA</Typography>
                <span style={{display:'flex',alignItems:'center'}}>
                  <Typography type="body2" gutterBottom>Get in touch: </Typography>
                  <GithubLogo className={props.classes.getInTouchLogo}/>
                  <FreecodecampLogo className={props.classes.getInTouchLogo}/>
                  <CodepenLogo className={props.classes.getInTouchLogo}/>
                </span>
                <span styel={{margin:'1rem'}}>
                  <Typography type="body2" gutterBottom>View my portfolio @ </Typography>
                  <a href="https://s.codepen.io/fazbat/debug/avoEOJ/XxrVwDVjOEZA">
                  https://s.codepen.io/fazbat/debug/avoEOJ/XxrVwDVjOEZA
                  </a>
                </span>
              </div>
            </div>
        </div>
    </Root>
  )
}

export default withStyles(Styles)(About);
