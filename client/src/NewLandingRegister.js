import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Logo1 from "./picture/Logo1.png";
import "./App.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class NewLandingRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      category: "",
      responseToPost: "",
      tryoutValid: false,
      loginValid: false,
      error: ""
    };

    this.handleCateogryChange = this.handleCateogryChange.bind(this);
    const React = require('react');
    console.log("react version:"+React.version);
  }

  handleTryout = async e => {
    e.preventDefault();

    // Input Validation
    // if (this.state.category === "") {
    //   this.setState({ error: "Must select a category" });
    //   return;
    // }

    this.setState({ tryoutValid: true });
    this.props.history.push("/email");
  };

  handleLogin = async e => {
    e.preventDefault();

    // Input Validation
    // if (this.state.category === "") {
    //   this.setState({ error: "Must select a category" });
    //   return;
    // }

    this.setState({ loginValid: true });
    this.props.history.push("/login");
  };

  handleCateogryChange(option) {
    this.setState({ category: option.label });
  }

  render() {
    const categoryList = [
      "study buddy",
      "gym buddy",
      "game buddy",
      "friend with same hobbies",
      "traveling mate"
    ];

    return (
      <div className="App">
        <div>
          <div>
            <img src={Logo1} width="100" height="100" alt="Logo" />
          </div>
          <h2 className="Logo">MeetUW</h2>
        </div>
        <form onSubmit={this.handleTryout}>
          <h3 className="Text">
            Welcome! MeetUW helps you find people with the same preference.
          </h3>
          <br />
          <br />
          <br />
          <br />
          <input type="submit" value="Register" required />
        </form>
        <br />
        <form onSubmit={this.handleLogin}>
          <input type="submit" value="Login" required />
        </form>
        <p className="Error">{this.state.error}</p>
      </div>
    );
  }
}

export default withRouter(NewLandingRegister);
