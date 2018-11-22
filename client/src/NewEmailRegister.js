import React, { Component } from 'react';
import './App.css';

class NewEmailRegister extends Component {
  constructor(props){
    super(props);
    this.state = {email: '' };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCateogryChange = this.handleCateogryChange.bind(this);
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handleSubmit(event){
    alert("This is to submit new email register");
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        NewEmailRegister
      </div>
    );
  }
}

export default NewEmailRegister;
