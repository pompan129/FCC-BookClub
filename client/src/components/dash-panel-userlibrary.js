import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//actions
import {removeBook} from '../actions';

//components
import Book from "./book-card";

//assets
import DeleteIcon from 'material-ui-icons/Delete';


//styles
const styles = {
  listPanel:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center'
  }
}

const footerTheme = {
  remove: outerTheme => ({
    ...outerTheme,
    footer: {
      hovercolor: outerTheme.palette.error.main,
      hoverBackgroundColor:outerTheme.palette.grey[100],
      cursor:'pointer',
    },
  }),
}

class Libray extends React.Component {

  state = {
    term: '',
  };

  handleChange = (event) => {
    this.setState({ term:event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {term} = this.state;
    this.props.searchBooks(term);
  };


    getFooter = (book)=>{
      const {username}=this.props.user;

      return {
        icon:<DeleteIcon/>,
        text:"Remove From Your Library",
        active:true,
        action:()=>this.props.removeBook(book._id,username),
        theme:footerTheme.remove
      }
    }

  render(){
    const {userlist} = this.props;

    return (
        <div className="dash-panel-wishlist" style={styles.listPanel}>
          {userlist && userlist.map((book,index)=>{

              const footer = this.getFooter(book);

              return <Book
                {...book}
                footer={footer}
                key={book.selfLink}
              />
            })}
        </div>
    )
  }
}

function mapStateToProps({books,user}){
    return {user}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {removeBook}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Libray)
