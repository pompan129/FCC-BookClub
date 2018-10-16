import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog,
      {DialogTitle,
       DialogContent,
       DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { renderModal,signin,setAuthenticationError} from '../actions';

//styles
const styles = {
  dialogTitle:{
    backgroundColor:'#25616E',
    textAlign:'center',
    color: 'white',
    marginBottom:'1rem'
  },
  footer:{
    color:'#999',
    textAlign:'center',
    cursor:'pointer',
    padding:'.5rem'
  }
}


class SignInModal extends React.Component {
  constructor(props){
     super(props);
     this.state = {
      open:props.modal.visible && (props.modal.modal_type === 'signin'),
      error: ``,
      username:'',
      password:'',
    };
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   componentWillReceiveProps(nextProps){
     this.setState({open:nextProps.modal.visible && (nextProps.modal.modal_type === 'signin'),
         error:nextProps.user.error})
   }

   handleSubmit(event){
      event.preventDefault();
      const {username,password} = this.state;
      this.props.signin(username,password,()=>{
        this.setState({
         error: ``,
         username:'',
         password:''
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

    return (
        <Dialog open={this.state.open}
          onExited={()=>{this.props.setAuthenticationError('')}}
          onClose={()=>{this.props.renderModal(false,'')}}>
          <DialogTitle
            disableTypography
            style={styles.dialogTitle}
            >
            <Typography
              color='inherit'
              variant="headline"
              >Sign In</Typography>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color='primary'>Submit</Button>
            <Button
              onClick={()=>this.props.renderModal(false,'')}
              >Cancel</Button>
          </DialogActions>
          <Divider/>
          <div style={styles.footer}>
            <a
              onClick={()=>this.props.renderModal(true,'signup')}>
              Create a new account
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
      { renderModal,signin,setAuthenticationError
      }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SignInModal);
