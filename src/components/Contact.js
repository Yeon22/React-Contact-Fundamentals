import React, {Component} from 'react';
import update from 'react-addons-update';

import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';

const sampleContactData = JSON.stringify([
  {
    name: 'Abet',
    phone: '010-0000-0001',
  },
  {
    name: 'Betty',
    phone: '010-0000-0002',
  },
  {
    name: 'Charlie',
    phone: '010-0000-0003',
  },
  {
    name: 'David',
    phone: '010-0000-0004',
  }
]);

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: '',
      contactData: JSON.parse(localStorage.contactData || sampleContactData),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const currentContactData = JSON.stringify(this.state.contactData);
    if (JSON.stringify(prevState.contactData) != currentContactData) {
      localStorage.contactData = currentContactData;
    }
  };

  handleChange(e) {
    this.setState({keyword: e.target.value});
  };

  handleClick(key) {
    this.setState({selectedKey: key});
  };

  handleCreate(contact) {
    this.setState({
      contactData: update(this.state.contactData, {$push: [contact]}),
    });
  };

  handleRemove() {
    if (this.state.selectedKey < 0) {
      return;
    }

    this.setState({
      contactData: update(this.state.contactData, {
        $splice: [[this.state.selectedKey, 1]],
      }),
      selectedKey: -1,
    });
  };

  handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: {$set: name},
          phone: {$set: phone},
        }
      })
    });
  };

  render() {
    const mapToComponents = data => {
      data.sort();
      data = data.filter((contact) => {
        return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
      });
      return data.map((contact, i) => {
        return (
          <ContactInfo
              contact={contact}
              key={i}
              onClick={() => this.handleClick(i)}/>
        );
      });
    };

    return (
      <div>
        <Typography component="h2" variant="display2">Contacts</Typography>
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          margin="normal"
          variant="outlined"
          value={this.state.keyword}
          onChange={this.handleChange}/>
        <div>
          <List>
            {mapToComponents(this.state.contactData)}
          </List>
          <ContactDetails
              isSelected={this.state.selectedKey != -1}
              contact={this.state.contactData[this.state.selectedKey]}
              onRemove={this.handleRemove}
              onEdit={this.handleEdit}/>
          <ContactCreate onCreate={this.handleCreate}/>
        </div>
      </div>
    );
  }
}

export default Contact;