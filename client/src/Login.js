import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      responseToPost: "",
      loginValid: false,
      error: ""
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  userInputValidation(email, password) {
    // Validate user email
    let start = email.indexOf("@");
    if (start < 0) {
      this.setState({ error: "Invalid Email" });
      return false;
    }

    let suffix = email.substring(start + 1, email.length);

    if (suffix !== "edu.uwaterloo.ca" && suffix !== "uwaterloo.ca") {
      this.setState({ error: "Invalid UWaterloo Email" });
      return false;
    }

    // Validate user password
    let minPasswordLength = 8;
    if (password.length < minPasswordLength) {
      this.setState({ error: "Invalid Password" });
      return false;
    }

    return true;
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (!this.userInputValidation(this.state.email, this.state.password)) {
      console.log("Validation False");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    });

    const body = await response.text();
    this.setState({ responseToPost: body });

    if (this.state.responseToPost === "SUCCESS") {
      this.setState({ loginValid: true });

      let end = this.state.email.indexOf("@");
      let tempName = this.state.email.substring(0, end);

      this.props.history.push({
        pathname: "/menu",
        state: { name: tempName, email: this.state.email }
      });
    } else {
      this.setState({ error: "Login failed" });
    }
  };

  render() {
    return (
      <div className="App">
        <img src={Logo1} width="100" height="100" alt="Logo" />
        <h2 className="Logo">MeetUW</h2>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="email">
            <input
              type="text"
              value={this.state.email}
              placeholder="userid@uwaterloo.ca"
              onChange={this.handleEmail}
              required
            />
          </div>
          <div className="password">
            <input
              type="password"
              value={this.state.password}
              placeholder="*********"
              onChange={this.handlePassword}
              required
            />
          </div>
          <br />
          <br />
          <br />
          <br />
          <div>
            <input type="submit" value="submit" onChange={this.handleSubmit} />
            <br />
            <a href="/resetpassword">forget password?</a>
          </div>
        </form>
        <p className="Error">{this.state.error}</p>
      </div>
    );
  }
}

export default withRouter(Login);
