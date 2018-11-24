import React, { Component } from 'react';
import { Link, withRouter, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import './App.css';
import Picture1 from './picture/Picture1.png';
import Picture2 from './picture/Picture2.png';


class Login extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            email:'',
            password:'',
            responseToPost: '',
            loginValid: false,
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(event){
      // const target = event.target;
      // const value = target.type ==='checkbox' ? target.check : target.value;
      // const name = target.name;
      this.setState({email:event.target.value});
    }

    handlePassword(event){
        this.setState({password: event.target.value});
    }

    handleSubmit = async event => {
      event.preventDefault();

      if (!event.target.checkValidity()) {
        console.log("Invalid Input")
        this.setState({ loginValid: false });
        return;
      }

      // TODO: Email/Password Format Validation
      // https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs

      const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: this.state.email, 
            password: this.state.password}),
      });
      const body = await response.text();
      this.setState({ responseToPost: body});

      if (this.state.responseToPost == 'SUCCESS'){
        this.setState({ loginValid: true });
      }

    }

    render() {
        const loginValid = this.state.loginValid;
        let newPage;
        if (loginValid){
            this.props.history.push("/academic")
        }

        return (
        <div className="App">
            <img src={Picture2} width="100" height="80" />
            <h2 className="Logo">MeetUW</h2>
            <form  onSubmit={this.handleSubmit}>
                <div className="email">
                    <input type="text" value={this.state.email} placeholder="userid@uwaterloo.ca"
                    onChange={this.handleEmail} required />
                </div>

                <div className="password">
                    <input type="text" value={this.state.password} placeholder="*********"
                    onChange={this.handlePassword} required />
                </div>
                <div>
                    < input type="submit" value="submit" 
                            onChange ={this.handleSubmit} />
                </div>
            </form> 

            <p>{this.state.responseToPost}</p>
        </div>
        );
    }
}

export default withRouter(Login);
