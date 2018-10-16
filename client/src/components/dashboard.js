import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//actions
import {fetchBooks,renderModal} from '../actions';

//components
import NoAuthPage from "./no-auth-page";
import RootPage from "./root-page";
import AddBookPanel from "./dash-panel-addbook";
import UserLibraryPanel from "./dash-panel-userlibrary";
import WishlistPanel from "./dash-panel-wishlist";
import RequestedBooksPanel from "./dash-panel-requestedbooks";
import LoanedBooksPanel from "./dash-panel-loanedbooks";
import BorrowedBooksPanel from "./dash-panel-borrowedbooks";
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
    margin:'2rem 0 0 3rem',
    position:'relative',
    border:'1px solid #eee',
    padding:'1rem',
    width:'40%',
    minWidth:'20rem',
    borderRadius:'1rem'
  },
  editButton:{
    position:'absolute',
    top: '-1rem',
    right:'-1rem'

  },
  tabsContainer:{
    margin:'1rem',
    padding:'1rem'
  },
  tab:{
    paddingTop:'1rem'
  }
}


class DashBoard extends React.Component {
  state = {
    value: Number(localStorage.getItem('tabValue'))
  };

  componentDidMount=()=>{
    if(!this.props.books.books){this.props.fetchBooks();}
  }

  handleChange = (event,value) => {
    this.setState({ value });
    localStorage.setItem('tabValue',value);
  };


  render(){
    if(!this.props.user.authenticated){return <NoAuthPage/>}

    const { value } = this.state;

    //console.log('DashBoard',this.props,this.state,'value=',value);//todo

    const {username,email,address} = this.props.user;
    const {street,city,state,zip} = address || {};
    const {books} = this.props.books;
    const userLibraryList = books?books.filter(book=>book.owner === username):[];
    const wishList = books?books.filter(book=>book.rq_status.rq_by === username &&
      book.rq_status.rq_state === "requested"):[];
    const requestList = books?books.filter(book=>book.owner === username &&
      book.rq_status.rq_state === "requested"):[];
    const loanedList = books?books.filter(book=>book.owner === username &&
      book.rq_status.rq_state === "traded"):[];
    const borrowedList = books?books.filter(book=>book.rq_status.rq_by === username &&
      book.rq_status.rq_state === "traded"):[];



    return(
      <RootPage name="dashboard-root" fetching={this.props.message.fetching}
        title="Profile"
        subtitle=""
        >
        <div className="dashboard-profile" style={styles.profile}>
          {username && <Typography type="display3" align="left">{username}</Typography>}
          {email && <Typography type="title" align="left">{email}</Typography>}
          {street && <Typography type="title" align="left">{street}</Typography>}
          {city && <Typography type="title" align="left">{city}</Typography>}
          {state && <Typography type="title" align="left">{state}</Typography>}
          {zip && <Typography type="title" align="left">{zip}</Typography>}

          <Button variant="fab" mini color="secondary"
            style={styles.editButton}
            onClick={()=>{this.props.renderModal(true,'edit-user')}}>
            <EditIcon />
          </Button>
        </div>
        <div className="tabs-container" style={styles.tabsContainer}>
            <Tabs value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChange}
              style={styles.tabs}>
              <Tab label="Your Books" style={styles.tab} icon={userLibraryList.length}/>
              <Tab label="Add Book" style={styles.tab} icon={<AddCircleIcon/>}/>
              <Tab label="Wishlist" style={styles.tab} icon={
                  <Badge badgeContent={wishList.length} color="primary">
                    <FavoriteIcon/>
                  </Badge>}
                />
              <Tab label="Requested" style={styles.tab} icon={requestList.length}/>
              <Tab label="Loaned" style={styles.tab} icon={loanedList.length} />
              <Tab label="Borrowed" style={styles.tab} icon={borrowedList.length} />
            </Tabs>
            <Divider />
          {value === 0 && <TabContainer><UserLibraryPanel userlist={userLibraryList} /></TabContainer>}
          {value === 1 && <TabContainer><AddBookPanel userlistIDs={userLibraryList.map(
            book=>book.selfLink
          )}/></TabContainer>}
          {value === 2 && <TabContainer><WishlistPanel wishlist={wishList}/></TabContainer>}
          {value === 3 && <TabContainer><RequestedBooksPanel list={requestList}/></TabContainer>}
          {value === 4 && <TabContainer><LoanedBooksPanel list={loanedList}/></TabContainer>}
          {value === 5 && <TabContainer><BorrowedBooksPanel list={borrowedList}/></TabContainer>}
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
      {fetchBooks,renderModal}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(DashBoard)
