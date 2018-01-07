import React from "react";
import { withStyles,MuiThemeProvider } from 'material-ui/styles';


const Styles = (theme)=>{
  console.log("THEME: ",theme);
  return {
  main:{
    width: '100%',
    height: '100%',
    position:'relative',
    '&:hover': {backgroundColor:theme.footer.color}//{backgroundColor:'green'}//
    //cursor: props.active?'pointer':'auto',
    //backgroundColor:props.backgroundColor
  },
  span:{
    position:'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display:'flex',
    alignItems:'center'
  }
}}

const theme3 = outerTheme => ({
  ...outerTheme,
  footer: {
    color: 'pink',
  },
});

const Footer = (props)=>{
  const {classes} = props;
  return(
      <div className={classes.main}
        onClick={props.active?props.action:undefined}
      /*  onMouseEnter={!props.active?undefined:
          ({target})=>target.style.backgroundColor = props.backgroundColorOver}
        onMouseLeave={!props.active?undefined:
          ({target})=>target.style.backgroundColor = props.backgroundColor}*/
        >
        <span className={classes.span}>{props.children}</span>
      </div>
  )
}

const FooterWithStyles =  withStyles(Styles)(Footer);

const FooterWithTheme = (props)=>{
  return (
    <MuiThemeProvider theme={props.theme || theme3}>
      <FooterWithStyles {...props}/>
    </MuiThemeProvider>
  )
}

export default FooterWithTheme;
