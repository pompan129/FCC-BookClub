import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//actions
import {fetchBooks} from '../actions';

//components
import Book from "./book-card";
//material UI components todo

//assets
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
      hovercolor: 'white',
      hoverBackgroundColor:Red[300],
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
      icon:'',
      text:`Loaned to ${book.rq_status.rq_by}`,
      active:false,
      //theme:footerTheme.remove
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
      {fetchBooks}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(LoanedPanel)
