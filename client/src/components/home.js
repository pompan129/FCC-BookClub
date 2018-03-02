import React from "react";
import Root from "./root-page";
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';


const Styles = {
  home:{
    padding:'2rem'
  },
  features:{

  }
}

const Home = (props)=>{

  return(
    <Root name="home-root"
      title="Book Borrow"
      subtitle="Go ahead and borrow a book. I dare you!"
      >
      <div className={props.classes.home}>
        <Typography type="display1" >
          Lend and borrow books from others
        </Typography>
        <Typography type="title" gutterBottom>
          A non-profit book sharing and exchanging platform.
        </Typography>
        <div className={props.classes.features}>

        </div>
      </div>
    </Root>
  )
}

export default withStyles(Styles)(Home);
