import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Logo1 from "./picture/Logo1.png";
import "./App.css";
import Button from '@material-ui/core/Button';

class NewRegisterSuccess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleLogin = async e => {
    e.preventDefault();
    this.setState({ submitted: true }, () => {
      if (this.state.submitted) {
        this.props.history.push({
          pathname: "/login"
        });
      }
    });
  };

  handleRegister = async e => {
    e.preventDefault();
    this.setState({ submitted: true }, () => {
      if (this.state.submitted) {
        this.props.history.push({
          pathname: "/email"
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <div>
            <img src={Logo1} width="100" height="100" alt="Logo" />
          </div>
          <h2 className="Logo">MeetUW</h2>
        </div>
        <form onSubmit={this.handleLogin}>
          <h3 className="Text">
            Successfully Registered. <br /> 
            Wait for your activation email: ...@uwaterloo.ca. <br />
            It may take several minutes. <br />
            Don't forget to check your junk folder.
          </h3>
          <br />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Go To Sign In Page
          </Button>
          </form>
          <form onSubmit={this.handleRegister}>
          <h3 className="Text">
            Wrong email?
          </h3>
          <br />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Go To Register Page
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(NewRegisterSuccess);
