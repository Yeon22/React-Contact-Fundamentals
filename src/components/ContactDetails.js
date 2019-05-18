import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextFiled from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      name: '',
      phone: '',
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleToggle() {
    const isEdit = this.state.isEdit;
    if (!isEdit) {
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone,
      });
    } else if(isEdit && (!this.state.name && !this.state.phone)) {
      alert('Click name or Crate Contact');
    } else {
      this.handleEdit();
    }

    this.setState({
      isEdit: !isEdit,
    });
  };

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleEdit() {
    this.props.onEdit(this.state.name, this.state.phone);
  };

  handleKeyPress(e) {
    if (e.charCode === 13) { // 13은 enter
      this.handleToggle();
    }
  };

  render() {
    const details = (
      <div className="margin-bottom">
        <div>
          <Typography component="h2" variant="h5">
            {this.props.contact.name}
          </Typography>
        </div>
        <div>
          <Typography component="h2" variant="h5">
            {this.props.contact.phone}
          </Typography>
        </div>
      </div>
    );
    const blank = (
      <div>
        <Typography component="h2" variant="h5" gutterBottom>
          Blank
        </Typography>
      </div>
    );
    const edit = (
      <div>
        <div>
          <TextFiled
            id="outlined-name"
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"/>
        </div>
        <div className="margin-bottom">
          <TextFiled
            id="outlined-phone"
            label="Phone"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            margin="normal"
            variant="outlined"/>
        </div>
      </div>
    );
    const view = this.state.isEdit ? edit : details;

    return (
      <div className="margin-bottom">
        <Typography component="h2" variant="display2" gutterBottom>Details</Typography>
        {this.props.isSelected ? view : blank}
        <div>
          <span className="margin-right">
            <Fab
              variant="extended"
              onClick={this.handleToggle}>
                <EditIcon/>
                {this.state.isEdit ? 'OK' : 'Edit'}
            </Fab>
          </span>
          <Fab
            variant="extended"
            color="secondary"
            onClick={this.props.onRemove}>
              <DeleteIcon/>
              Remove
          </Fab>
        </div>
      </div>
    );
  }
}

ContactDetails.defaultProps = {
  contact: {
    name: '',
    phone: '',
  },
  onRemove: () => {console.error('onRemove not defined');},
  onEdit: () => {console.error('onEdit not defined')},
};

ContactDetails.propTypes = {
  contact: PropTypes.object,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
};