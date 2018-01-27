import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Route,Switch} from 'react-router-dom';
import { withRouter } from 'react-router';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import NavBar from './components/navbar';
import About from './components/about';
import BookList from './components/book-list';
import Home from './components/home';
import DashBoard from './components/dashboard';
import SignUpModal from './components/signup';
import SignInModal from './components/signin';
import EditUserDialogue from './components/edit-user-dialogue';
import Blue from 'material-ui/colors/blue';
import Yellow from 'material-ui/colors/yellow';
import red from 'material-ui/colors/red';
import { renderModal,
        logout,
        setHeaderMessage,
        authRefreshJWT
  } from './actions';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {...Blue},
    secondary: {...Yellow},
    error: red,
  },
});

const homeMessage = {
  title:"Book Borrow",
  sub:"Go ahead and borrow a book. I dare you!"
}



class App extends Component {

  //test JWT on page refresh
  componentWillMount() {
    const token = localStorage.getItem("jwt");
      if(!this.props.user.authenticated && token){
        localStorage.setItem("jwt","");
        this.props.authRefreshJWT(token);
      }
  }

  render() {
    console.log("App","p:",this.props,"s:",this.state);//todo
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <NavBar authenticated={this.props.user.authenticated}
              renderModal={this.props.renderModal}
              logout={this.props.logout}></NavBar>
          <Switch>
            <Route exact path='/'
              render={()=><Home
                setHeaderMessage={()=>this.props.setHeaderMessage(homeMessage)}/>} />
            <Route path='/about' component={About} />
            <Route path='/browse' component={BookList} />
            <Route path='/DashBoard' component={DashBoard} />
          </Switch>
          <SignUpModal />
          <SignInModal />
          <EditUserDialogue />
        </div>
      </MuiThemeProvider>
    );
  }
}


function mapStateToProps({modal,user,books,message}){//todo all needed?
    return {modal,user,books,message}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { renderModal,logout,setHeaderMessage,authRefreshJWT
      }, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
