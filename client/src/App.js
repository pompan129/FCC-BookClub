import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Route,Switch} from 'react-router-dom';
import { withRouter } from 'react-router';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import NavBar from './components/navbar';
import About from './components/about';
import Home from './components/home';
import DashBoard from './components/dashboard';
import SignUpModal from './components/signup';
import SignInModal from './components/signin';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import { renderModal,
        logout
  } from './actions';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      ...green
    },
    error: red,
  },
});


class App extends Component {
  render() {
    console.log("App","p:",this.props,"s:",this.state)
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <NavBar authenticated={this.props.user.authenticated}
              renderModal={this.props.renderModal}
              logout={this.props.logout}></NavBar>
          <header className="App-header" >
              <div className="App-title-container">
                <h1 className="App-title">Book Borrow</h1>
                <h2>Go ahead and borrow a book. I dare you!</h2>
              </div>
          </header>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/DashBoard' component={DashBoard} />
          </Switch>
          <SignUpModal />
          <SignInModal />
        </div>
      </MuiThemeProvider>
    );
  }
}


function mapStateToProps({modal,user}){
    return {modal,user}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { renderModal,logout
      }, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
