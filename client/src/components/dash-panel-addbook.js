import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Book from "./book-card";
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {searchBooks,addBook} from '../actions';

const styles = {
  listPanel:{
    display:'flex',
    flexWrap:'wrap'
  }
}


class AddBookPanel extends React.Component {

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

  getBookPanelOptions = (book)=>{
    const {user} = this.props;
    const options ={
      footer:{
        colorOver:"grey",
        colorOut:"white"
      },
      footerAction:()=>{this.props.addBook(book,this.props.user.username)}
    };
    return options;
  }

  render(){
    console.log(this.state.term)

    return (
      <div className="dash-add-panel">
        <div className="add-book-panel-search">
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="search"
              label="Search for Books to add"
              type="search"
              margin="normal"
              onChange={this.handleChange}
              value={this.state.term}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
        <div className="dash-add-panel-list" style={styles.listPanel}>
          {this.props.books && this.props.books.map((book,index)=>{
              const options = this.getBookPanelOptions(book);
              return <Book
                {...book}
                {...options}
                key={book.selfLink}
              />
            })}
        </div>
      </div>
    )
  }
}

function mapStateToProps({books,user}){
    return {books:books.searchResult,user}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {searchBooks,addBook}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(AddBookPanel)
