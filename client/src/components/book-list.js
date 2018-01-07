import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//actions
import {fetchBooks,
  requestTrade,
  setHeaderMessage} from '../actions';

//components
import Book from "./book-card";
import Root from "./root-page";

//assets
import FavoriteIcon from 'material-ui-icons/Favorite';
import ImportExportIcon from 'material-ui-icons/ImportExport';
import Cyan from 'material-ui/colors/cyan';
import blueGrey from 'material-ui/colors/blueGrey';

//styles
const styles = {
  list:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center',
    paddingTop:"1.5rem",
  }
}

const footerTheme = outerTheme => ({
  ...outerTheme,
  footer: {
    color: 'orange',
  },
});



class BookList extends React.Component {

  componentDidMount=()=>{
    this.props.setHeaderMessage({title:"Browse Books",sub:"Click on a title to trade"})
    this.props.fetchBooks();
  }

  getFooter = (book)=>{
    const {rq_status,_id}=book;

    if(!this.props.user.authenticated){
      return {
        icon:'',
        text:"Login to Trade Books",
        active:false,
        action:undefined,
        backgroundColor:blueGrey[100],
        backgroundColorOver:undefined
      }
    }
    if(rq_status.rq_state === "available"){
      return {
        icon:<FavoriteIcon/>,
        text:"Add to Wishlist",
        active:true,
        action:()=>this.props.requestTrade(_id, this.props.user.username),
        backgroundColor:'',
        backgroundColorOver:Cyan['A400'],
        theme:footerTheme
      }
    }
    if(rq_status.rq_state === "requested"){
      return {
        icon:<ImportExportIcon/>,
        text:"Trade Pending",
        active:false,
        action:undefined,
        backgroundColor:blueGrey[100],
        backgroundColorOver:undefined
      }
    }
  }

  render(){
    const {user,books,message} = this.props;

    return (
      <Root name="book-list-root"
        title="Browse Books"
        subtitle="click on a book to make a trade"
        fetching={message.fetching}
        >
          <div className="book-list" style={styles.list}>
          {books && books.map((book,index)=>{

              //don't show if ...
              if(user.authenticated && book.owner === user.username)return '';
              if(book.rq_status.rq_state === 'traded')return '';

              const footer = this.getFooter(book);

              return <Book
                {...book}
                footer={footer}
                key={book._id}/>
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
