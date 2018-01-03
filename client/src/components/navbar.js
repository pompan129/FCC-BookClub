import React from "react";
import {Link} from 'react-router-dom';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import { grey, lightGreen } from 'material-ui/colors';
import logo from "../assets/logo.png";



const Navbar = (props)=>{
  const styles = {
    button: {
      margin: '0 .25em',
      backgroundColor:lightGreen[500]
    },
    toolbar:{
      backgroundColor: grey[800],
      justifyContent:'space-between'
    },
    img:{
      margin: '0 0 0 1.5em',
      flex: 1
    },
    link:{
    textDecoration: 'none',
    color:'white',
    margin:'0 .5em',
    fontSize:'1.25em'
    }
  };

  return (/*<FontIcon className="muidocs-icon-custom-sort" />*///todo

    <AppBar>
      <Toolbar style={styles.toolbar}>
          <Link to="/"><img src={logo} alt="Book Borrow logo" style={styles.img}/></Link>
          <div>
            <Link to="/about"  style={styles.link}>About</Link>
            <Link to="/browse"  style={styles.link}>Browse Books</Link>
            {props.authenticated &&
                <Link to="/dashboard"  style={styles.link}>Profile</Link>}
            {!props.authenticated && <Button label="SignUp"
              onClick={()=>{props.renderModal(true,'signup')}}
              style={styles.button}>Sign Up</Button>}
            {!props.authenticated && <Button label="Login"
              onClick={()=>{props.renderModal(true,'signin')}}
              style={styles.button}>Login</Button>}
            {props.authenticated && <Button label="Logout"
              onClick={props.logout}
              style={styles.button}>Logout</Button>}
          </div>
        </Toolbar>
    </AppBar>

  )
}

export default Navbar;
