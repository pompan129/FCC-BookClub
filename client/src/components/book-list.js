import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchBooks,setHeaderMessage} from '../actions';
import Book from "./book-card";
import Root from "./root-page";

const styles = {
  div:{
    display:'flex'
  }
}


class BookList extends React.Component {

  componentDidMount(){
    this.props.setHeaderMessage({title:"Browse Books",sub:"Click on a title to trade"})
    this.props.fetchBooks();
  }

  render(){
    return (
      <Root name="book-list-root"
        title="Browse Books"
        subtitle="click on a book to make a trade"
        >
        <div className="book-list" style={styles.div}>
        {this.props.books && this.props.books.map((book,index)=>(
            <Book
              {...book}
              key={book._id}
            />
          ))}
        </div>
      </Root>
    )
  }
}


function mapStateToProps({books}){
    return {books:books.books}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {fetchBooks,setHeaderMessage}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(BookList)
