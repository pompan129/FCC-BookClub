import React from "react";
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

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
    paddingTop:'1rem',
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
          <Typography  type="title" color='inherit' gutterBottom>PROJECT</Typography>
          <Typography>
            A freeCodeCamp full-stack project
            Check project descriptions
            <a href="https://www.freecodecamp.org/challenges/manage-a-book-trading-club"> here. </a>
          </Typography>
        </div>
        <div className={props.classes.box}>
          <Typography  type="title" color='inherit'>TECH STACK</Typography>
          <ul>
            <li><Typography>Front-end: React + Redux + React Router + Material UI React</Typography></li>
            <li><Typography>Back-end: Express.js + MongoDB + NodeJS</Typography></li>
            <li><Typography>Public API: Google Books API</Typography></li>
          </ul>
        </div>
        <div className={props.classes.box}>
          <Typography  type="title" color='inherit'>AUTHOR: Kurt Johnson</Typography>
          <ul>
            <li><Typography>A web developer in Sacramento, CA</Typography></li>
            <li><Typography>View my resume:</Typography></li>
            <li>
              <a href="https://registry.jsonresume.org/kurtjohnson">
                <Typography>https://registry.jsonresume.org/kurtjohnson</Typography>
              </a>
            </li>
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
