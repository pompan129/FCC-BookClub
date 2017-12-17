import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Route,Switch} from 'react-router-dom';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './components/navbar';
import About from './components/about';
import Home from './components/home';
import DashBoard from './components/dashboard';
import SignUpModal from './components/signup';
import { renderModal
  } from './actions';
import './App.css';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <NavBar authenticated={true} renderModal={(visible,type)=>{renderModal(visible,type)}} ></NavBar>
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
          <SignUpModal visible={this.props.modal.visible}
            renderModal={(visible,type)=>{this.props.renderModal(visible,type)}}
            modal_type={this.props.modal.modal_type} />
        </div>
      </MuiThemeProvider>
    );
  }
}


function mapStateToProps({modal}){
    return {modal}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { renderModal
      }, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
