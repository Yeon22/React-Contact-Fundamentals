import React, {Component} from 'react';
import Contact from './Contact';
import {hot} from 'react-hot-loader/root';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  };

  render() {
    return (
      <Contact/>
    );
  }
};

export default hot(App);