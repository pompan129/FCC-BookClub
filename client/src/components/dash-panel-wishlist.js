import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//actions
import {removeBookFromWishlist,fetchBooks} from '../actions';

//components
import Book from "./book-card";
//material UI components todo

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
class WishListPanel extends React.Component {

  state = {
    term: '',
  };

  componentDidMount=()=>{
    if(!this.props.books.books){this.props.fetchBooks();}
  }

  getFooter = (book)=>{
    return {
      icon:<DeleteIcon/>,
      text:"Remove From Wishlist",
      active:true,
      action:()=>this.props.removeBookFromWishlist(book._id),
      theme:footerTheme.remove
    }
  }

  render(){
    console.log(this.state.term);//todo
    const {wishlist} = this.props;

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
      {removeBookFromWishlist,fetchBooks}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(WishListPanel)
