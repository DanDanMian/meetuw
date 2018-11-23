import React, { Component } from 'react';
import './App.css';
import Picture1 from './picture/Picture1.png';
import Picture2 from './picture/Picture2.png';

class Login extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            email:'',
            password:'',
            submitted: false,
            keepSignIn: false,
            error: ''
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

    handleSubmit(event){
      event.preventDefault();
      this.setState({submitted:true});
    }
    render() {
      return (
        <div className="App">
            <img src={Picture2} width="100" height="80" />
            <h2 className="Logo">MeetUW</h2>
            <form  onSubmit={this.handleSubmit}>
                <div classname="email">
                    <input type="text" value={this.state.email} placeholder="userid@uwaterloo.ca"
                    onChange={this.handleEmail} />
                </div>

                <div classname="password">
                    <input type="text" value={this.state.password} placeholder="*********"
                    onChange={this.handlePassword} />
                </div>
                <div>
                    < input type="submit" value="submit" 
                    onChange ={this.handleSubmit} />
                </div>
            </form> 
        </div>
        );
    }
}

export default Login;
