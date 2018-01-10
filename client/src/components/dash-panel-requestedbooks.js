import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//actions
import {removeBookFromWishlist,
  approveTrade,
  fetchBooks} from '../actions';

//components
import Book from "./book-card";
import FooterButtons from './book-card-footer-buttons'

//material UI components todo

//assets

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

  getFooter = (book)=>{
    return {
      icon: <FooterButtons
        handleClickReject={()=>this.props.approveTrade(book,false)}
        handleClickApprove={()=>this.props.approveTrade(book,true)}
        />,
    }
  }

  render(){
    console.log(this.state.term);//todo
    const {list} = this.props;

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
      {removeBookFromWishlist,fetchBooks,approveTrade}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(WishListPanel)
