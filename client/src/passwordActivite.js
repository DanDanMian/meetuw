import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Logo1 from "./picture/Logo1.png";
import "./App.css";

class passwordActivite extends Component {
  constructor(props) {
    super(props);
    var url = new URL(window.location);
    var token = url.searchParams.get("t");
    console.log(token);

    this.state = {
      token: token,
      password: "",
      secondpassword: "",
      emailValid: false,
      error: "",
      responseToPost: "400",
      isVerified: "FAIL"
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    fetch("/api/passwordactivite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: token })
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        this.setState({ isVerified: data });
      });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handlePasswordConfirmationChange(event) {
    this.setState({ secondpassword: event.target.value });
  }

  userInputValidation(password, secondpassword) {
    // Validate user password
    let minPasswordLength = 8;
    if (
      password.length < minPasswordLength ||
      secondpassword.length < minPasswordLength
    ) {
      this.setState({ error: "Password length must be greater than 8" });
      return false;
    }

    if (password !== secondpassword) {
      this.setState({ error: "Password does not matched" });
      return false;
    }
    return true;
  }

  handleSubmit = async event => {
    event.preventDefault();

    //validate password
    if(!this.userInputValidation(this.state.password, this.state.secondpassword)){
      return;
    }
    //post to server
    const response = await fetch("/api/passwordactivitereset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password: this.state.password, 
        resetToken: this.state.token})
    });
    const body = await response.text();
    console.log("response from server :" + body);
    this.setState({ responseToPost: body });

    if (this.state.responseToPost === "SUCCESS"){
      // this.props.history.push({
      //   pathname: "/registered",
      //   state: {
      //     name: this.state.name,
      //     email: this.state.email
      //   }
      // });
    } else {
      this.setState({ error: "Register failed" });
    }
  };

  render() {
    const isVerified = this.state.isVerified;
    let passwordForm;
    if(isVerified === "SUCCESS"){
      passwordForm = <form onSubmit={this.handleSubmit}>
      <h3 className="Text">
        Enter your new password
      </h3>
      <br />
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
      <br />
      <input type="submit" value="submit" onChange={this.handleSubmit} />
    </form>
    }else{
      passwordForm=
      <div>
        <p>This link is invalid</p>
        <br />
        <a href="/">Go to Home</a>
      </div>
    }
    return (
      <div className="App">
        <div>
          <div>
            <img src={Logo1} width="150" height="80" alt="Logo" />
          </div>
          <h2 className="Logo">MeetUW</h2>
          {passwordForm}
          <p className="Error">{this.state.error}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(passwordActivite);
