import React from "react";
import { NavLink } from 'react-router-dom'

//material UI components
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

//assets
import logo from "../assets/logo.png";
//styles
const styles = {
  button: {
    margin: '0 .25em',
  },
  toolbar:{
    backgroundColor:'transparent',
    justifyContent:'space-between',
    borderBottom:'1px solid #999'
  },
  img:{
    margin: '0 0 0 1.5em',
    flex: 1
  },
  link:{
  textDecoration: 'none',
  color:'grey',
  padding:'1rem',
  fontSize:'1.25em',
  '&:hover': {
    color: '#ccc'
    }
  },
  activeLink:{
    color:'#ccc',
    borderBottom:'2px solid white'
  }
};

const Navbar = (props)=>{

  return (
    <AppBar>
      <Toolbar style={styles.toolbar}>
          <NavLink to="/"><img src={logo} alt="Book Borrow logo" style={styles.img}/></NavLink>
          <div>
            <NavLink to="/"
              exact
              activeStyle={{color:'#ccc',borderBottom:'2px solid white'}}
              className={props.classes.link}>
              Home
            </NavLink>
            <NavLink to="/about"
              activeStyle={{color:'#ccc',borderBottom:'2px solid white'}}
              className={props.classes.link}>
              About
            </NavLink>
            <NavLink to="/browse"
              activeStyle={{color:'#ccc',borderBottom:'2px solid white'}}
              className={props.classes.link}>
              Browse Books
            </NavLink>
            {props.authenticated &&
                <NavLink to="/dashboard"  style={styles.link}>Profile</NavLink>}

            {!props.authenticated && <Button label="SignUp"
              color='secondary'
              onClick={()=>{props.renderModal(true,'signup')}}
              style={styles.button}>Sign Up</Button>}
            {!props.authenticated && <Button label="Login"
              color='secondary'
              onClick={()=>{props.renderModal(true,'signin')}}
              style={styles.button}>Login</Button>}
            {props.authenticated && <Button label="Logout"
              color='secondary'
              onClick={()=>props.logout(props.history)}
              style={styles.button}>Logout</Button>}
          </div>
        </Toolbar>
    </AppBar>

  )
}

export default withStyles(styles)(Navbar);
