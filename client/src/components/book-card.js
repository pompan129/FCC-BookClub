import React from "react";
import { withStyles } from 'material-ui/styles';
import Card,
  {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';


const styles = {
  card: {
    width: '16rem',
    height:'24rem',
    margin:'.5rem',
    overflow: 'hidden'
  },
  media: {
    height: '14rem'
  },
  title:{
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width:'15rem'
  },
  subheader:{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width:'15rem',
  }
};

const BookCard = (props)=>{
  console.log("BookCard", props);//todo
  const { classes } = props;

  return(
    <div className="book-card">
      <Card className={classes.card}>
        <CardHeader
          title={props.title}
          subheader={"by " + props.authors}
          classes={{title:classes.title,subheader:classes.subheader}}
        />
          <CardMedia
            className={classes.media}
            image={props.thumbnail}
            title="Book Thumbnail"
          />
        <CardContent>
          <Typography type="body2">{props.publisher}</Typography>
          <Typography type="body1">{props.publishedDate}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default withStyles(styles)(BookCard);
