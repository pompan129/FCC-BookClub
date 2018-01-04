import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchBooks,
  requestTrade,
  setHeaderMessage} from '../actions';
import Book from "./book-card";
import Root from "./root-page";
import FavoriteIcon from 'material-ui-icons/Favorite';

const styles = {
  div:{
    display:'flex',
    flexWrap:'wrap'
  }
}

class BookList extends React.Component {

  componentDidMount=()=>{
    this.props.setHeaderMessage({title:"Browse Books",sub:"Click on a title to trade"})
    this.props.fetchBooks();
  }

  getReqText = (book)=>{
    return !this.props.user.authenticated?"Login to request trade":
      book.rq_status.rq_state === "available"? "Add to wishlist":
      book.rq_status.rq_state === "requested"? "Trade Pending":"???"
  }

  footerAction = (book)=>{
    if(book.rq_status.rq_state === "available"){
    this.props.requestTrade(book._id,this.props.user.username);
    }
  }

  render(){
    const {user,books,message} = this.props;
    const bookProps = {
      footer:{
        colorOver:"grey",
        colorOut:"white"
      }
    }

    return (
      <Root name="book-list-root"
        title="Browse Books"
        subtitle="click on a book to make a trade"
        fetching={message.fetching}
        >
        <div className="book-list" style={styles.div}>
        {books && books.map((book,index)=>{
            if(user.authenticated && book.owner == user.username)return "";
            return <Book
              {...book}
              {...bookProps}
              footerText={this.getReqText(book)}
              key={book._id}
              footerAction={()=>this.footerAction(book)}/>
          })}
        </div>
      </Root>
    )
  }
}


function mapStateToProps({books,message,user}){
    return {books:books.books,message,user}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {fetchBooks,setHeaderMessage,requestTrade}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(BookList)
