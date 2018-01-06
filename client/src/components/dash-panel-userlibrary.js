import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//actions
import {removeBookFromUserLibraryAndDB,fetchBooks} from '../actions';

//components
import Book from "./book-card";

//material UI components
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

//assets
import DeleteIcon from 'material-ui-icons/Delete';
import Red from 'material-ui/colors/red';

//styles
const styles = {
  listPanel:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center'
  }
}


class Libray extends React.Component {

  state = {
    term: '',
  };

  componentDidMount=()=>{
    if(!this.props.books.books){this.props.fetchBooks();}
  }

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
        action:()=>this.props.removeBookFromUserLibraryAndDB(book._id),
        backgroundColor:'',
        backgroundColorOver:Red[300]
      }
    }

  render(){
    console.log(this.state.term);//todo
    const {user} = this.props;
    const {books} = this.props.books

    const wishlist = books?books.filter(book=>(
      book.rq_status.rq_state === "requested" &&
      book.rq_status.rq_by === user.username
    )):[];

    return (
        <div className="dash-panel-wishlist" style={styles.listPanel}>
          {wishlist.map((book,index)=>{

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
    return {books,user}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {removeBookFromUserLibraryAndDB,fetchBooks}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Libray)
