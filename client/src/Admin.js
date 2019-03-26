import React, { Component } from "react";
import "./App.css";
//import SignIn from "./SignIn";

class Admin extends Component {
  constructor(props){
    super(props);

    this.state ={

    };
  }

  render(){
    return(
      <div className="App">
        <div>
          <div>
           
          </div>
          <h2 className="Logo">MeetUW</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h3 className="Text">
            Thanks! Before we introduce you a new friend, please register.
          </h3>
          <br />
          <div className="name">
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="username"
              required
            />
          </div>
          <div className="email">
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleEmailChange}
              placeholder="userid@uwaterloo.ca"
              required
            />
          </div>
          <div className="password">
            <input
              type="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.handlePasswordChange}
              required
            />
          </div>
          <div className="confirmPassword">
            <input
              type="password"
              value={this.state.secondpassword}
              onChange={this.handlePasswordConfirmationChange}
              placeholder="confirm password"
              required
            />
          </div>
          <div className="devOpt">
            Store in DB
            <label class="switch">
              <input type="checkbox" onChange={this.handleSaveDBChange} />
              <span class="slider round" />
            </label>
            <br />
            Don't send email
            <label class="switch">
              <input type="checkbox" onChange={this.handleSendEmailChange} />
              <span class="slider round" />
            </label>
          </div>
          <br />
          <input type="submit" value="submit" onChange={this.handleSubmit} />
        </form>
        <p className="Error">{this.state.error}</p>
      </div>
    );
  }
}
export default Admin;