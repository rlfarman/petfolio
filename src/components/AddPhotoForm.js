import React from 'react';
import {getHostPetKeys, addPhoto} from '../firebase';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class AddPhotoForm extends React.Component {
  componentWillMount() {
    var petKeys = getHostPetKeys();
    console.log(petKeys);
    this.setState({petKeys: petKeys});
  }
  constructor(props) {
    super(props);
    this.state = {
      petKeys: undefined,
      petValue: undefined,
      photoValue: undefined,
      open: true
    };
    this.handlePetChange = this.handlePetChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handlePetChange(value) {
    this.setState({petValue: value});
  }
  handlePhotoChange(event) {
    this.setState({photoValue: event.target.value});
  }
  handleSubmit() {
    addPhoto(
      this.state.petKeys[this.state.petValue],
      this.state.photoValue
    );
  }
  handleClose() {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <Dialog
            title="Add Photo Form"
            actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                           />,
              <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSubmit}
                           />,
            ]}
            modal={false}
            open={this.state.open}
            autoScrollBodyContent={true}
            onRequestClose={this.handleClose}
        >
              <TextField
                  hintText="Add a photo"
                  onChange={this.handlePhotoChange}
                  value={this.state.photoValue}
              /><br />
              <AutoComplete
                  floatingLabelText="Tag a pet"
                  filter={AutoComplete.fuzzyFilter}
                  dataSource={Object.keys(this.state.petKeys)}
                  maxSearchResults={5}
                  onNewRequest={this.handlePetChange}
              />
        </Dialog>
      </div>
    );
  }
}
