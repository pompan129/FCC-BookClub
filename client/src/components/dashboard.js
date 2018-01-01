import React from "react";
import RootPage from "./root-page";
import Test from "./test";//todo
import AddBookPanel from "./dash-panel-addbook";//todo
import Tabs, { Tab } from 'material-ui/Tabs';
import TabContainer from './tab-container';
import AppBar from 'material-ui/AppBar';//todo
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import FavoriteIcon from 'material-ui-icons/Favorite';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import Badge from 'material-ui/Badge';


class DashBoard extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event,value) => {
    this.setState({ value });
  };


  render(){
    const { value } = this.state;
    const testValue = 22;

    return(
      <RootPage name="dashboard-root"
        title="Profile"
        subtitle=""
        >
        <div>
          profile info
        </div>
        <div>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Add Book" icon={<Badge badgeContent={4}/>}/>
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

export default DashBoard;
