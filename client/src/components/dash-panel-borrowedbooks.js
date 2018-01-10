import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//actions
import {fetchBooks,returnBook} from '../actions';

//components
import Book from "./book-card";
//material UI components todo

//assets
import DeleteIcon from 'material-ui-icons/Delete';
import Cyan from 'material-ui/colors/cyan';

//styles
const styles = {
  listPanel:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center'
  }
}

const footerTheme = {
  return: outerTheme => ({
    ...outerTheme,
    footer: {
      hovercolor: 'white',
      hoverBackgroundColor:Cyan[300],
      cursor:'pointer',
    },
  }),
}
class LoanedPanel extends React.Component {

  state = {
    term: '',
  };

  componentDidMount=()=>{
    if(!this.props.books.books){this.props.fetchBooks();}
  }

  getFooter = (book)=>{
    return {
      icon:<DeleteIcon/>,
      text:"Return Book",
      active:true,
      action:()=>this.props.returnBook(book),
      theme:footerTheme.return
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
      {fetchBooks,returnBook}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(LoanedPanel)
