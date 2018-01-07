import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//actions
import {searchBooks,addBook} from '../actions';

//components
import Book from "./book-card";

//material UI components
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

//assets
import AddIcon from 'material-ui-icons/Add';
import CheckIcon from 'material-ui-icons/Check';
import Cyan from 'material-ui/colors/cyan';
import lightGreen from 'material-ui/colors/lightGreen';

//styles
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


    getFooter = (book)=>{
      const {selfLink}=book;
      const {username}=this.props.user;

      if(this.props.userlistIDs.includes(selfLink)){
        return {
          icon:<CheckIcon/>,
          text:"In Your Library",
          active:false,
          action:undefined,
          backgroundColor:lightGreen['A700'],
          backgroundColorOver:''
        }
      }
      return {
        icon:<AddIcon/>,
        text:"Add to Your Library",
        active:true,
        action:()=>{this.props.addBook(book,username)},
        backgroundColor:'transparent',
        backgroundColorOver:Cyan['A400']
      }
    }

  render(){
    console.log(this.state.term)
    const {searchResult} = this.props.books;
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
          {searchResult && searchResult.map((book,index)=>{

              const footer = this.getFooter(book);

              return <Book
                {...book}
                footer={footer}
                key={book.selfLink}
              />
            })}
        </div>
      </div>
    )
  }
}

function mapStateToProps({user,books}){
    return {user,books}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {searchBooks,addBook}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(AddBookPanel)
