import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { renderModal,signin} from '../actions';

class SignInModal extends React.Component {
  constructor(props){
     super(props);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event){
      event.preventDefault();
      this.props.signin('SignInModal_name');
  }


  render() {
    console.log("SignInModal", this.props,this.state, this.props.visible &&
      (this.props.modal_type == 'signin'));//todo
    const open = this.props.modal.visible &&
      (this.props.modal.modal_type == 'signin')

    return (
        <Dialog open={open}>
          <DialogTitle>This is the signIN modal</DialogTitle>
          <Button onClick={this.handleSubmit}>Submit</Button>
          <Button onClick={()=>this.props.renderModal(false,'')}>Cancel</Button>
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
