import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchBooks,setHeaderMessage} from '../actions';
import Book from "./book-card";
import Root from "./root-page";
import FavoriteIcon from 'material-ui-icons/Favorite';

const styles = {
  div:{
    display:'flex'
  }
}

class BookList extends React.Component {

  componentDidMount=()=>{
    this.props.setHeaderMessage({title:"Browse Books",sub:"Click on a title to trade"})
    this.props.fetchBooks();
  }

  handleRequest = ()=>{
    if(this.props.user.authenticated){

    }
  }

  getReqText = (book)=>{
    return <FavoriteIcon></FavoriteIcon>;
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
            return (user.authenticated && book.owner == user.username)? "":
            <Book
              {...book}
              {...bookProps}
              footerText={this.getReqText(book)}
              key={book._id}
            />
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
      {fetchBooks,setHeaderMessage}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(BookList)
