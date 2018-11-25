import React, { Component } from 'react';
import './App.css';

class NewEmailRegister extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            emailValid: false
        };
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleEmailChange(event){
        this.setState({ email: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();

        // Validation For Email & Password (TODO)
        

        this.setState({ emailValid: true });
    }

    render() {
        if (this.state.emailValid){
          this.props.history.push("/academic");
        }

        return (
          <div className="App">
            <h2 className="Text">Thanks! Before we introduce you a new
            friend, please enter your school email and password to register.
            </h2> 
            <form onSubmit={this.handleSubmit}>
                <div classname="email">
                <input 
                    type="text" 
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder="userid@uwaterloo.ca" />
                </div>
                <br/>
                <div classname="password">
                    <input type="text" 
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="password" />
                </div>
                <br/>
                <div classname="confirmPassword">
                    <input type="text" 
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        placeholder="confirm password" />
                </div>
                <br/>
                <input type="submit" value="submit" 
                        onChange ={this.handleSubmit} />
            </form>
          </div>
        );
    }
}

export default NewEmailRegister;
