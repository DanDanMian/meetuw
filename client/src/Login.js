import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./App.css";
import SignIn from "./SignIn";

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

    const body = await response.json();
    this.setState({ responseToPost: body });

    if (body.success) {
      this.setState({ loginValid: true });

      let end = this.state.email.indexOf("@");
      let tempName = this.state.email.substring(0, end);

      this.props.history.push({
        pathname: "/menu",
        state: { name: tempName, email: this.state.email }
      });
    } else {
      this.setState({ error: body.message });
    }
  };

  render() {
    return (
      <div>
        <SignIn handleEmail={this.handleEmail} handlePassword={this.handlePassword} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default withRouter(Login);
