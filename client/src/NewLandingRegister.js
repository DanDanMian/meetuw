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

    const React = require('react');
    console.log("react version:"+React.version);
  }

  handleTryout = async e => {
    e.preventDefault();
    this.setState({ tryoutValid: true });
    this.props.history.push("/email");
  };

  handleLogin = async e => {
    e.preventDefault();
    this.setState({ loginValid: true });
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="App">
        <div>
          <div>
            <img src={Logo1} width="150" height="80" alt="Logo" />
          </div>
          <h2 className="Logo">MeetUW</h2>
        </div>
        <h3 className="Text">Finding students with same interests</h3>
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={this.handleTryout}>
        <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </form>
        <br />
        <form onSubmit={this.handleLogin}>
        <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </form>
        <p className="Error">{this.state.error}</p>
      </div>
    );
  }
}

export default withRouter(NewLandingRegister);
