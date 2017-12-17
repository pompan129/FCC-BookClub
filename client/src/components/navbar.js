import React from "react";
import {Link} from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {grey800,grey100,lightGreen500} from 'material-ui/styles/colors';
import logo from "../assets/logo.png";



const Navbar = (props)=>{
  const styles = {
    button: {
      margin: 1
    },
    h_two:{
      color:grey100,
    'margin-left':25
    },
    toolbar:{
      backgroundColor: grey800
    },
    img:{
      'margin-left': '1em'
    },
    seperator:{  /**/
      'height':'100%',
      'margin-right':'15px',
      backgroundColor:'rgba(100,100,100,.25)',
      width:'2px'
    },
    link:{
    'text-decoration': 'none',
    color:'white',
    'font-size':'1.5em'
    }
  };

  return (/*<FontIcon className="muidocs-icon-custom-sort" />*/
    <Toolbar style={styles.toolbar}>
        <ToolbarGroup firstChild={true} >
          <Link to="/"><img src={logo} alt="Book Borrow logo" style={styles.img}/></Link>
        </ToolbarGroup>

        <ToolbarGroup>
          <Link to="/about"  style={styles.link}>About</Link>
          <ToolbarSeparator style={styles.seperator} />
          {props.authenticated && <RaisedButton label="SignUp"
            onClick={()=>{props.renderModal(true,'signup')}}
            style={styles.button}
            backgroundColor={lightGreen500}/>}
          {props.authenticated && <RaisedButton label="Login" backgroundColor={lightGreen500}/>}
        </ToolbarGroup>
      </Toolbar>
  )
}

export default Navbar;
