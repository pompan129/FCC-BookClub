import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog,
      {DialogTitle,
       DialogContent,
       DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { renderModal,signup} from '../actions';

class SignUpModal extends React.Component {
  constructor(props){
     super(props);
     this.state = {
      open:props.modal.visible && (props.modal.modal_type === 'signup'),
      error: ``,
      username:'',
      password:'',
      email:'',
      street:'',
      city:'',
      state:'',
      zip:''
    };
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleInputChange = this.handleInputChange.bind(this);
   }

   componentWillReceiveProps(nextProps){
     this.setState({open:nextProps.modal.visible && (nextProps.modal.modal_type === 'signup'),})
   }

   handleSubmit(event){
      event.preventDefault();
      this.props.renderModal(false,'');
      const {username,password,email} = this.state;
      this.props.signup(username,password,email,()=>{
        this.setState({
         error: ``,
         username:'',
         password:'',
         email:'',
         street:'',//todo needed??
         city:'',
         state:'',
         zip:''
       })
      });
  }

  handleInputChange(fieldname){
    return (event)=>{
      event.preventDefault();
      this.setState({[fieldname]:event.target.value})
    }
  }


  render() {
    //console.log("SignUpModal", this.props,this.state, this.props.modal.visible && (this.props.modal.modal_type === 'signup'));//todo

    return (
      <Dialog open={this.state.open}
        onClose={()=>{this.props.renderModal(false,'')}}>
        <DialogTitle>This is the signUp modal</DialogTitle>
        <DialogContent>
          <TextField
          id="username"
          label="username"
          value={this.state.username}
          onChange={this.handleInputChange("username")}
          margin="normal"
        /><br/>
        <TextField
          id="password"
          label="password"
          type="password"
          value={this.state.password}
          onChange={this.handleInputChange("password")}
          margin="normal"
        /><br/>
        <TextField
          id="email"
          label="email"
          value={this.state.email}
          onChange={this.handleInputChange("email")}
          margin="normal"
        /><br/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSubmit}>Submit</Button>
          <Button onClick={()=>this.props.renderModal(false,'')}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function mapStateToProps({modal,user}){
    return {modal,user}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { renderModal,signup
      }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpModal);


/*
username: { type: String, unique: true, lowercase: true },
password: String,
email: String,
Address:{
  street: String,
  city: String,
  state:String,
  zip:String
}
*/
