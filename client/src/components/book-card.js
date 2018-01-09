import React from "react";
import { withStyles } from 'material-ui/styles';
import Card,
  {CardHeader, CardMedia, CardContent,CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Footer from "./book-card-footer";
import imageNotAvailable from "../assets/ImageNotAvailable.png";


const styles = {
  card: {
    width: '15rem',
    margin:'.5rem',
    overflow: 'hidden'
  },
  media: {
    height: '15rem',
  },
  headerRoot:{
    padding:'0 .5rem'
  },
  title:{
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width:'14rem'
  },
  subheader:{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign:'left',
    width:'14rem',
  },
  content:{
    padding:'0',
    textAlign:'left',
    margin:'1rem .5rem'
  },
  footer:{
    margin:0,
    cursor: 'pointer',
    width:'100%',
    height:'100%',
    position:'relative'
  },
  actions:{
    margin:0,
    padding:0
  }

};

const BookCard = (props)=>{
  //console.log("BookCard", props);//todo
  const { classes,footer,authors,publisher,publishedDate,
    thumbnail,title} = props;

  return(
    <div className="book-card">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={thumbnail || imageNotAvailable}
          title="Book Thumbnail"
        />
        <CardHeader
          title={title}
        subheader={""}
          classes={{title:classes.title,
            root:classes.headerRoot,subheader:classes.subheader}}
        />
        <CardContent className={classes.content}>
          <Typography type="caption">by: {authors}</Typography> {/*todo put in commas*/}
          <Typography type="caption">{publisher || '--'}</Typography>
          <Typography type="caption">{publishedDate || '--'}</Typography>
        </CardContent>
        <Divider light />
        <CardActions disableActionSpacing={true} className={classes.actions}>
          <Footer {...footer}>{footer.icon}{footer.text}</Footer>
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(BookCard);
