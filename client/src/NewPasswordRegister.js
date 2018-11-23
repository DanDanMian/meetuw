import React, { Component } from 'react';
import kubo from "./picture/kubo.jpg"
import './App.css';

class NewPasswordRegister extends Component {
  constructor(props){
    super(props);
    this.state = {
        password:'password',
        confirmPassword:'confirm password',
        confirmed:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.type;
    this.setState({[name]:value});
  }

  handleConfirm(event){
    alert("This is to submit new password");
    this.setState({confirmed:true});
    //need to check if it is same as the password
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
          <h2>Hey! We find a matching for you.</h2> 
          <form name="PasswordRegister" onSubmit={this.handleConfirm}>
              <div>
                  <img src={kubo} width="100" height="120" />
                  <h3>DW</h3>
                  <h4>computer science</h4>
                  <h2>Register for better matching</h2>
              </div>

              <div classname="password">
                  <input type="text" value={this.state.password}
                  onChange={this.handleChange} />
              </div>
              <div classname="confirmPassword">
                  <input type="text" value={this.state.confirmPassword}
                  onChange={this.handleChange} />
              </div>
              <div>
                  < input type="submit" value="Register" 
                  onChange ={this.handleConfirm} />
              </div>
          </form> 
      </div>
      );
  }
}

export default NewPasswordRegister;
