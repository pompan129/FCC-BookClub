import React from "react";
import { withStyles } from 'material-ui/styles';

const Styles = {
  wrap:{
    flexDirection:'column',
    backgroundColor:'#0D47A1',
    padding:'1rem',

  },
  main:{
     display: 'flex',
     flexDirection: 'row',
     justifyContent: 'space-around',
     textAlign:'left'
  },
  box:{
    width:'25%',
    borderLeft:'2px solid #ccc',
    padding:'1rem',
    listStyle:'none',
    color:'#ccc',
    '& p':{
      color:'white'
    },
    '& ul':{
      listStyle:'none'
    },
    '& a':{
      textDecoration:'none',
      color:'#64dd17'
    }
  },
  small:{
    color:'white',
    '& a':{
      textDecoration:'none',
      color:'#64dd17'
    }
  }
}

const Footer = (props)=>{
  return(
    <div className={props.classes.wrap}>
      <div className={props.classes.main}>
        <div className={props.classes.box}>
          <h3>PROJECT</h3>
          <p>
            A freeCodeCamp full-stack project
            Check project descriptions
            <a href="https://www.freecodecamp.org/challenges/manage-a-book-trading-club"> here. </a>
          </p>
        </div>
        <div className={props.classes.box}>
          <h3>TECH STACK</h3>
          <ul>
            <li>Front-end: React + Redux + React Router + Material UI React</li>
            <li>Back-end: Express.js + MongoDB + NodeJS</li>
            <li>Public API: Google Books API</li>
          </ul>
        </div>
        <div className={props.classes.box}>
          <h3>AUTHOR: Kurt Johnson</h3>
          <ul>
            <li>A web developer in Sacramento, CA</li>
            <li>View my resume:</li>
            <li><a href="https://registry.jsonresume.org/kurtjohnson">https://registry.jsonresume.org/kurtjohnson</a></li>
          </ul>
        </div>
      </div>
      <div className={props.classes.small}>
        by Kurt Johnson, 2018 | <a href="https://github.com/pompan129/FCC-BookClub">Github</a>
      </div>
    </div>
  )
}

export default withStyles(Styles)(Footer);
