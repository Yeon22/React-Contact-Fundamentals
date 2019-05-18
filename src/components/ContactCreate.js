import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextFiled from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default class ContactCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleClick() {
    if (!this.state.name || !this.state.phone) {
      alert('Input is Empty!');
      return;
    }

    const contact = {
      name: this.state.name,
      phone: this.state.phone,
    };

    this.props.onCreate(contact);
    this.setState({
      name: '',
      phone: '',
    });

    // this.nameInput.focus();
  };

  handleKeyPress(e) {
    if (e.charCode === 13) { // 13은 enter
      this.handleClick();
    }
  };

  render() {
    return (
      <div className="flex_center">
        <Typography component="h2" variant="display2">Create Contact</Typography>
        <div>
          <TextFiled
            name="name"
            label="Name"
            value={this.state.name}
            onChange={this.handleChange}
            inputRef={(ref) => {this.nameInput = ref}}
            margin="normal"
            autoFocus/>
        </div>
        <div>
          <TextFiled
            name="phone"
            label="Phone"
            value={this.state.phone}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            margin="normal"/>
        </div>
        <div className="margin-top">
          <Fab
            color="primary"
            aria-label="Add"
            variant="extended"
            onClick={this.handleClick}>
              <AddIcon/>
              Create
          </Fab>
        </div>
      </div>
    );
  }
}

ContactCreate.propTypes = {
  onCreate: PropTypes.func,
};

ContactCreate.defaultProps = {
  onCreate: () => {console.error('onCreate not defined')},
};