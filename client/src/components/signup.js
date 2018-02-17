import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog,
      {DialogTitle,
       DialogContent,
       DialogActions} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/ButtonBase';
import TextField from 'material-ui/TextField';
import { renderModal,signup,setAuthenticationError} from '../actions';

//styles
const styles = {
  dialogTitle:{
    backgroundColor:'#1faa00',
    textAlign:'center',
    color: 'white',
  },
  dialogTitleH2:{
    margin:'0'
  },
  dialogActions:{
    position:'relative',
  },
  submitButton:{
    width:'100%'
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
        style={styles.dialog}
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



//  <Button onClick={()=>this.props.renderModal(false,'')}>Cancel</Button>
