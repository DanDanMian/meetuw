import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ResetPasswordComp from "./ResetPasswordComp";
import Logo1 from "./picture/Logo1.png";
import "./App.css";


class resetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      responseToPost: "",
      error: "",
      message: ""
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(event){
      this.setState({ email: event.target.value});
  }

  emailValidation(email){
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

    return true;
  }

  handleSubmit = async event =>{
    event.preventDefault();

    if (!this.emailValidation(this.state.email)){
        return;
    }

    const response = await fetch("/api/resetpassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: this.state.email
        })
    });

    const body = await response.text();
    this.setState({ responseToPost: body});

    if(this.state.responseToPost === "SUCCESS") {
        this.setState({ message: "email sent"});
    }else{
        this.setState({error:"email sent failed"});
    }
  }

  render() {
    return (
      <div>
      <ResetPasswordComp handleEmail={this.handleEmail} handleSubmit={this.handleSubmit}/>
      <p style="text-align:center">{this.state.message}</p>
      <p style="text-align:center">{this.state.error}</p>
      </div>
    );
  }
}

export default withRouter(resetPassword);
