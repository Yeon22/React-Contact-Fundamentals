import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class ContactInfo extends Component {
  render() {
    return (
      <ListItem onClick={this.props.onClick} className="pointer">
        <ListItemText>
          {this.props.contact.name}
        </ListItemText>
      </ListItem>
    );
  }
};

export default ContactInfo;