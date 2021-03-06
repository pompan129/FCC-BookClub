import React from "react";
import { withStyles,MuiThemeProvider } from 'material-ui/styles';


const Styles = (theme)=>{
  return {
  main:{
    width: '100%',
    height: '100%',
    position:'relative',
    cursor: theme.footer.cursor,
    color:theme.footer.color,
    backgroundColor:theme.footer.backgroundColor,
    '&:hover': {
      backgroundColor:theme.footer.hoverBackgroundColor,
      color:theme.footer.hovercolor
    }
  },
  span:{
    position:'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'100%'
  }
}}

const theme3 = outerTheme => {
  console.log("outertheme",outerTheme);
  return {
  ...outerTheme,
  footer:{
    cursor:"inherit",
    color:"inherit"
  }
}};

const Footer = (props)=>{
  const {classes} = props;
  return(
      <div className={classes.main}
        onClick={props.active?props.action:undefined}>
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
