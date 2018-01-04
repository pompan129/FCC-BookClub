import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import RootPage from "./root-page";
import AddBookPanel from "./dash-panel-addbook";//todo
import Tabs, { Tab } from 'material-ui/Tabs';
import TabContainer from './tab-container';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import FavoriteIcon from 'material-ui-icons/Favorite';
import EditIcon from 'material-ui-icons/Edit';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';


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

  handleChange = (event,value) => {
    this.setState({ value });
  };


  render(){
    const { value } = this.state;
    const {username,email,book_ids,wishlist} = this.props.user;

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
              <Tab label="Your Books" />
              <Tab label="Wishlist" icon={
                  <Badge badgeContent={4} color="primary">
                    <FavoriteIcon/>
                  </Badge>}
                />
              <Tab label="Requested" />
              <Tab label="Loaned" />
              <Tab label="Recieved" />
            </Tabs>
            <Divider />
          {value === 0 && <TabContainer><AddBookPanel /></TabContainer>}
          {value === 1 && <TabContainer>Your Books</TabContainer>}
          {value === 2 && <TabContainer>Wishlist</TabContainer>}
          {value === 3 && <TabContainer>Requested</TabContainer>}
          {value === 4 && <TabContainer>Loaned</TabContainer>}
          {value === 5 && <TabContainer>Recieved</TabContainer>}
        </div>
      </RootPage>
    )
  }
}

function mapStateToProps({books,user,message}){
    return {
      books:books.searchResult,
      message,
      user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(DashBoard)
