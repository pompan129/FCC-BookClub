import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog,
      {DialogTitle,
       DialogContent} from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { renderModal,signup,setAuthenticationError} from '../actions';

//styles
const styles = {
  dialogTitle:{
    backgroundColor:'#1faa00',
    textAlign:'center',
    color: 'white',
  },
  footer:{
    color:'#999',
    textAlign:'center',
    cursor:'pointer',
    padding:'.5rem'
  }
}



class SignUpModal extends React.Component {
  constructor(props){
     super(props);
     this.state = {
      open:props.modal.visible && (props.modal.modal_type === 'signup'),
      error: `props.user.error`,
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
     this.setState({
       open:nextProps.modal.visible && (nextProps.modal.modal_type === 'signup'),
       error:nextProps.user.error
     })
   }

   handleSubmit(event){
      event.preventDefault();
      this.props.renderModal(false,'');
      const {username,password,email} = this.state;
      this.props.signup(username,password,email,()=>{
        this.setState({
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
        onExited={()=>{this.props.setAuthenticationError('')}}
        onClose={()=>{this.props.renderModal(false,'')}}>
        <DialogTitle  disableTypography style={styles.dialogTitle}>
          <h2 style={styles.dialogTitleH2}>Signup</h2>
        </DialogTitle>
        {
          this.state.error?
            <div style={{width:'75%',margin:'auto',color:'red',textAlign:'center'}}>
              <span >
                {this.state.error}
              </span>
            </div>:
            ''
        }
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
        <Button
          fullWidth
          color='primary'
          onClick={this.handleSubmit}>
          Submit
        </Button>
        <Divider/>
        <div style={styles.footer}>
          <a
            onClick={()=>this.props.renderModal(true,'signin')}>
            LOGIN to your account
          </a>
         </div>
      </Dialog>
    );
  }
}

function mapStateToProps({modal,user}){
    return {modal,user}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { renderModal,signup,setAuthenticationError
      }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(SignUpModal);
