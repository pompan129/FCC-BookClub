import React from "react";
import {Link} from 'react-router-dom';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import { grey, lightGreen,lightBlue } from 'material-ui/colors';
import logo from "../assets/logo.png";



const Navbar = (props)=>{
  const styles = {
    button: {
      margin: 1,
      backgroundColor:lightGreen[500]
    },
    h_two:{
    color:grey[100],
    'margin-left':25
    },
    toolbar:{
      backgroundColor: grey[800]
    },
    img:{
      marginLeft: '1em'
    },
    seperator:{  /**/
      'height':'100%',
      marginRight:'15px',
      backgroundColor:'rgba(100,100,100,.25)',
      width:'2px'
    },
    link:{
    textDecoration: 'none',
    color:'white',
    fontSize:'1.5em'
    }
  };

  return (/*<FontIcon className="muidocs-icon-custom-sort" />*///todo

    <AppBar>
      <Toolbar style={styles.toolbar}>
          <Link to="/"><img src={logo} alt="Book Borrow logo" style={styles.img}/></Link>
          <Link to="/about"  style={styles.link}>About</Link>
          {!props.authenticated && <Button label="SignUp"
            onClick={()=>{props.renderModal(true,'signup')}}
            style={styles.button}>Sign Up</Button>}
          {!props.authenticated && <Button label="Login"
            onClick={()=>{props.renderModal(true,'signin')}}
            style={styles.button}>Login</Button>}
          {props.authenticated && <Button label="Logout"
            onClick={props.logout}
            style={styles.button}>Logout</Button>}
        </Toolbar>
    </AppBar>

  )
}

export default Navbar;
