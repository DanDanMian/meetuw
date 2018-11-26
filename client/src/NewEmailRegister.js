import React, { Component } from 'react';

import Logo1 from './picture/Logo1.png';
import './App.css';

class NewEmailRegister extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            secondpassword: '',
            emailValid: false,
            error: '',
            responseToPost: '400',
        };
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event){
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event){
        this.setState({ password: event.target.value });
    }

    handlePasswordConfirmationChange(event){
        this.setState({ secondpassword: event.target.value });
    }

    userInputValidation(email, password, secondpassword){
        // Validate user email
        let start = email.indexOf('@');
        if (start < 0){
            this.setState({ error: "Invalid Email" });
            return false;
        }

        let suffix = email.substring(start+1, email.length);

        if (suffix !== "edu.uwaterloo.ca" && suffix !== "uwaterloo.ca"){
            this.setState({ error: "Invalid UWaterloo Email" });
            return false;
        }

        // Validate user password
        let minPasswordLength = 8;
        if (password.length < minPasswordLength || secondpassword.length < minPasswordLength){
            this.setState({ error: "Password length must be greater than 8" });
            return false;
        }

        if (password !== secondpassword){
            this.setState({ error: "Password does not matched" });
            return false;
        }

        return true;
    }

    handleSubmit = async event => {
        event.preventDefault();

        // Validation For Email & Password (TODO)
        if (!this.userInputValidation(this.state.email, this.state.password, this.state.secondpassword)){
            console.log("Validation False")
            return;
        }
        this.setState({ emailValid: true });
        //post to server
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: this.state.email,
            password: this.state.password,}),
        });
        const body = await response.text();
        console.log('response from server :'+body);
        this.setState({responseToPost:body});
       
    }

    render() {
        if (this.state.emailValid){
          this.props.history.push("/registered");
        }

        return (
          <div className="App">
            <div>
              <div>                 
                 <img src={Logo1} width="100" height="100" />
              </div>
              <h2 className="Logo">MeetUW</h2>
            </div>
            <form onSubmit={this.handleSubmit}>
                <h3 className="Text">Thanks! Before we introduce you a new
                    friend, please enter your school email and password to register.
                </h3> 
                <div classname="email">
                <input 
                    type="text" 
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder="userid@uwaterloo.ca" required />
                </div>
                <br/>
                <div classname="password">
                    <input type="password" 
                        value={this.state.password}
                        placeholder="password"
                        onChange={this.handlePasswordChange} required />
                </div>
                <br/>
                <div classname="confirmPassword">
                    <input type="password" 
                        value={this.state.secondpassword}
                        onChange={this.handlePasswordConfirmationChange}
                        placeholder="confirm password" required />
                </div>
                <br/>
                <input type="submit" value="submit" 
                        onChange ={this.handleSubmit} />
            </form>
            <p>{this.state.error}</p>
          </div>
        );
    }
}

export default NewEmailRegister;
