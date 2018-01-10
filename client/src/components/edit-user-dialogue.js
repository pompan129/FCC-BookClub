import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog,
      {DialogTitle,
       DialogContent,
       DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { renderModal,editUser} from '../actions';

class EditUserDialogue extends React.Component {
    constructor(props){
       super(props);

       const {user} = props;
       const {email} = user;
       const {street,city,state,zip} = user.address || {};

       this.state = {
        open:props.modal.visible && (props.modal.modal_type === 'edit-user'),
        error: ``,
        username:user.username,
        email:email || '',
        street:street || '',
        city:city || '',
        state:state || '',
        zip:zip || ''
      };

      this.handleSubmit = this.handleSubmit.bind(this);
   }

   componentWillReceiveProps(nextProps){
     const {user} = nextProps;
     const {email} = user;
     const {street,city,state,zip} = user.address || {};

       //console.log("EditUserDialogue-componentWillReceiveProps", 'PROPS:',nextProps,'STATE:',this.state,"user.email",user.email);//todo
     this.setState({
       open:nextProps.modal.visible && (nextProps.modal.modal_type === 'edit-user'),
       username:user.username,
       email:email || '',
       street:street || '',
       city:city || '',
       state:state || '',
       zip:zip || ''
     })
   }

   handleSubmit(event){
      event.preventDefault();
      const {username,email,street,city,zip,state} = this.state;
      this.props.editUser(username,email,street,city,zip,state);
  }

  handleInputChange(fieldname){
    return (event)=>{
      event.preventDefault();
      this.setState({[fieldname]:event.target.value})
    }
  }

  render() {
    //console.log("EditUserDialogue", 'PROPS:',this.props,'STATE:',this.state);//todo
    //const open = this.props.modal.visible && (this.props.modal.modal_type == 'signin')

    return (
        <Dialog open={this.state.open}
          onClose={()=>{this.props.renderModal(false,'')}}>
          <DialogTitle>{this.state.username}</DialogTitle>
          <form onSubmit={this.handleSubmit}>
          <DialogContent>
            <TextField
              id="email"
              label="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange("email")}
              margin="normal"
            /><br/>
            <TextField
              id="street"
              label="street"
              value={this.state.street}
              onChange={this.handleInputChange("street")}
              margin="normal"
            /><br/>
            <TextField
              id="city"
              label="city"
              type="text"
              value={this.state.city}
              onChange={this.handleInputChange("city")}
              margin="normal"
            /><br/>
            <TextField
              id="state"
              label="state"
              type="text"
              value={this.state.state}
              onChange={this.handleInputChange("state")}
              margin="normal"
            /><br/>
            <TextField
              id="zip"
              label="zip"
              type="text"
              value={this.state.zip}
              onChange={this.handleInputChange("zip")}
              margin="normal"
            /><br/>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
            <Button onClick={()=>this.props.renderModal(false,'')}>Cancel</Button>
          </DialogActions>
        </form>
        </Dialog>
    );
  }
}

function mapStateToProps({modal,user}){
    return {modal,user}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { renderModal,editUser
      }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EditUserDialogue);


/*
<TextField
  id="email"
  label="email"
  type="email"
  value={this.state.email}
  onChange={this.handleInputChange("email")}
  margin="normal"
/><br/>
*/
