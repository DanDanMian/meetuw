import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Logo1 from "./picture/Logo1.png";
import ImageUploader from 'react-images-upload';


import "./App.css";

import "./slider.css";
import "./Register";
import Register from "./Register";
import {DropzoneArea} from 'material-ui-dropzone';
import { Button } from "@material-ui/core";


const style = {
  height:100,
  width: 100
};

class NewEmailRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      secondpassword: "",
      emailValid: false,
      error: "",
      responseToPost: "400",
      saveDB: "",
      sendEmail: "",
      pictures: [] 
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSendEmailChange = this.handleSendEmailChange.bind(this);
    // this.handleSaveDBChange = this.handleSaveDBChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);

  }

  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
  }
  onFileLoad = (e, file) => console.log(e.target.result, file.name);


  handleChange(files){
    this.setState({
      files: files
    });
  }


  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handlePasswordConfirmationChange(event) {
    this.setState({ secondpassword: event.target.value });
  }

  // handleSaveDBChange(event) {
  //   console.log(event.target.value);
  //   this.setState({ saveDB: event.target.value });
  // }

  // handleSendEmailChange(event) {
  //   this.setState({ sendEmail: event.target.value });
  // }

  userInputValidation(email, password, secondpassword) {
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

    // Validation For Email & Password (TODO)
    if (
      !this.userInputValidation(
        this.state.email,
        this.state.password,
        this.state.secondpassword
      )
    ) {
      console.log("Validation False");
      return;
    }

    //post to server
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        devNoDB: this.state.saveDB,
        devNoEmail: this.state.sendEmail
      })
    });
    const body = await response.text();
    console.log("response from server :" + body);
    this.setState({ responseToPost: body });

    if (this.state.responseToPost === "SUCCESS") {
      this.setState({ emailValid: true });
      console.log("TEST EMAIL REGISTRATION");
      console.log(this.state.name);
      console.log(this.state.email);
      console.log("TEST EMAIL REGISTRATION END");
      this.props.history.push({
        pathname: "/registered",
        state: {
          name: this.state.name,
          email: this.state.email
        }
      });
    } else {
      this.setState({ error: "Register failed" });
    }
  };

  render() {
    return (
      <div>
      <Register />
      <ImageUploader
          withPreview={true}
          withIcon={true}
          buttonText='Choose images'
          onChange={this.onDrop}
          buttonClassName = "button1"
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          className = "Avatar"
      />
      </div>
      // <div className="App">
      //   <div>
      //     <div>
      //       <img src={Logo1} width="100" height="100" alt="Logo" />
      //     </div>
      //     <h2 className="Logo">MeetUW</h2>
      //   </div>
      //   <form onSubmit={this.handleSubmit}>
      //     <h3 className="Text">
      //       Thanks! Before we introduce you a new friend, please register.
      //     </h3>
      //     <br />
      //     <div className="name">
      //       <input
      //         type="text"
      //         value={this.state.name}
      //         onChange={this.handleNameChange}
      //         placeholder="username"
      //         required
      //       />
      //     </div>
      //     <div className="email">
      //       <input
      //         type="text"
      //         value={this.state.email}
      //         onChange={this.handleEmailChange}
      //         placeholder="userid@uwaterloo.ca"
      //         required
      //       />
      //     </div>
      //     <div className="password">
      //       <input
      //         type="password"
      //         value={this.state.password}
      //         placeholder="password"
      //         onChange={this.handlePasswordChange}
      //         required
      //       />
      //     </div>
      //     <div className="confirmPassword">
      //       <input
      //         type="password"
      //         value={this.state.secondpassword}
      //         onChange={this.handlePasswordConfirmationChange}
      //         placeholder="confirm password"
      //         required
      //       />
      //     </div>
      //     <div className="devOpt">
      //       Store in DB
      //       <label class="switch">
      //         <input type="checkbox" onChange={this.handleSaveDBChange} />
      //         <span class="slider round" />
      //       </label>
      //       <br />
      //       Don't send email
      //       <label class="switch">
      //         <input type="checkbox" onChange={this.handleSendEmailChange} />
      //         <span class="slider round" />
      //       </label>
      //     </div>
      //     <br />
      //     <input type="submit" value="submit" onChange={this.handleSubmit} />
      //   </form>
      //   <p className="Error">{this.state.error}</p>
      // </div>
    );
  }
}

export default NewEmailRegister;
