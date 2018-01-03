import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog,
      {DialogTitle,
       DialogContent,
       DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { renderModal,signin} from '../actions';

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
     this.setState({open:nextProps.modal.visible && (nextProps.modal.modal_type === 'signin'),})
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
    //console.log("SignInModal", this.props,this.state, this.props.visible &&
      //(this.props.modal_type == 'signin'));//todo
    //const open = this.props.modal.visible && (this.props.modal.modal_type == 'signin')

    return (
        <Dialog open={this.state.open}
          onClose={()=>{this.props.renderModal(false,'')}}>
          <DialogTitle>This is the signIN modal</DialogTitle>
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
      { renderModal,signin
      }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SignInModal);
