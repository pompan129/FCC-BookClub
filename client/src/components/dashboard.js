import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Redirect } from 'react-router'


//actions
import {fetchBooks} from '../actions';

//components
import RootPage from "./root-page";
import AddBookPanel from "./dash-panel-addbook";
import UserLibraryPanel from "./dash-panel-userlibrary";
import WishlistPanel from "./dash-panel-wishlist";
import RequestedBooksPanel from "./dash-panel-requestedbooks";
//material UI components
import Tabs, { Tab } from 'material-ui/Tabs';
import TabContainer from './tab-container';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';

//assets
import FavoriteIcon from 'material-ui-icons/Favorite';
import EditIcon from 'material-ui-icons/Edit';
import AddCircleIcon from 'material-ui-icons/AddCircle';


//styles
const styles = {
  profile:{
    margin:'1em 0 0 2.5rem'
  },
  tabsContainer:{
    margin:'1rem'
  },
  tabs:{
    margin:'.5rem'
  }
}


class DashBoard extends React.Component {
  state = {
    value: 0
  };

  componentDidMount=()=>{
    if(!this.props.books.books){this.props.fetchBooks();}
  }

  handleChange = (event,value) => {
    this.setState({ value });
  };


  render(){
    if(!this.props.user.authenticated){return <Redirect to='/'/>}

    const { value } = this.state;
    const {username,email} = this.props.user;
    const {books} = this.props.books;
    const userList = books?books.filter(book=>book.owner === username):[];
    const wishList = books?books.filter(book=>book.rq_status.rq_by === username &&
      book.rq_status.rq_state === "requested"):[];
    const requestList = books?books.filter(book=>book.owner === username &&
      book.rq_status.rq_state === "requested"):[];



    return(
      <RootPage name="dashboard-root" fetching={this.props.message.fetching}
        title="Profile"
        subtitle=""
        >
        <div className="dashboard-profile" style={styles.profile}>
          {username && <Typography type="display3" align="left">{username}</Typography>}
          {email && <Typography type="title" align="left">{email}</Typography>}
          <Button raised color="accent">
            <EditIcon />
          </Button>
        </div>
        <div className="tabs-container" style={styles.tabsContainer}>
            <Tabs value={value} onChange={this.handleChange} style={styles.tabs}>
              <Tab label="Add Book" icon={<AddCircleIcon/>}/>
              <Tab label="Your Books" icon={userList.length}/>
              <Tab label="Wishlist" icon={
                  <Badge badgeContent={wishList.length} color="primary">
                    <FavoriteIcon/>
                  </Badge>}
                />
              <Tab label="Requested" icon={requestList.length}/>
              <Tab label="Loaned" />
              <Tab label="Recieved" />
            </Tabs>
            <Divider />
          {value === 0 && <TabContainer><AddBookPanel userlistIDs={userList.map(
            book=>book.selfLink
          )}/></TabContainer>}
          {value === 1 && <TabContainer><UserLibraryPanel userlist={userList} /></TabContainer>}
          {value === 2 && <TabContainer><WishlistPanel wishlist={wishList}/></TabContainer>}
          {value === 3 && <TabContainer><RequestedBooksPanel list={requestList}/></TabContainer>}
          {value === 4 && <TabContainer>Loaned</TabContainer>}
          {value === 5 && <TabContainer>Recieved</TabContainer>}
        </div>
      </RootPage>
    )
  }
}

function mapStateToProps({books,user,message}){
    return { books, message, user}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {fetchBooks}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(DashBoard)
