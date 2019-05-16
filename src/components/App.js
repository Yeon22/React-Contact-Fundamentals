import React, {Component} from 'react';
import Contact from './Contact';
import {hot} from 'react-hot-loader/root';
import '../styles/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  };

  render() {
    return (
      <div className="base_container">
        <Contact/>
      </div>
    );
  }
};

export default hot(App);