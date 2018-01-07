import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//actions
import {removeBookFromWishlist,fetchBooks} from '../actions';

//components
import Book from "./book-card";

//material UI components todo
import Button from 'material-ui/Button';

//assets
import DeleteIcon from 'material-ui-icons/Delete';
import Green from 'material-ui/colors/green';
import Red from 'material-ui/colors/red';

//styles
const styles = {
  listPanel:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center'
  }
}


class WishListPanel extends React.Component {

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
      return {
        icon: <span>
          <Button color='contrast'>Confirm</Button>
          <Button color='accent'>Reject</Button>
          </span>,
        active:false,
        //action:()=>this.props.removeBookFromWishlist(book._id),
        backgroundColor:'',
        backgroundColorOver:Red[300]
      }
    }

  render(){
    console.log(this.state.term);//todo
    const {user,list} = this.props;
    const {books} = this.props.books

    return (
        <div className="dash-panel-wishlist" style={styles.listPanel}>
          {list.map((book,index)=>{

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
      {removeBookFromWishlist,fetchBooks}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(WishListPanel)
