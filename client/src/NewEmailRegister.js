import React, { Component } from 'react';
import './App.css';

class NewEmailRegister extends Component {
    constructor(props){
        super(props);
        this.state = {email: 'userid@uwaterloo.ca' };
        this.handleEmailChange = this.handleEmailChange.bind(this);
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
            <h2 className="Text">Thanks! Before we introduce you a new
            friend, please enter your school email(check in spam).
            </h2> 
            <input type="text" value={this.state.email}
            onChange={this.handleEmailChange} />
            <button className="Button"  onClick={this.handleSubmit} value="">submit</button>
          </div>
        );
    }
}

export default NewEmailRegister;
