import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Logo1 from "./picture/Logo1.png";
import "./App.css";
import Button from '@material-ui/core/Button';

class AccountActive extends Component {
  constructor(props) {
    super(props);
    var url = new URL(window.location);
    var token = url.searchParams.get("t");
    console.log(token);

    this.state = {
      token: token,
      responseToPost: "400"
    };

    fetch("/api/activite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: token })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      this.setState({ responseToPost: data });
    });

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleLogin = async e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/login"
    });
  };

  handleRegister = async e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/email"
    });
  };

  render() {
    const linkOk = this.state.responseToPost;
    let display;
    if(linkOk === "SUCCESS"){
      display = 
      <div>
        <h3 className="Text">
          Your account is activited!
        </h3>
        <br />
        <br />
        <br />
        <form onSubmit={this.handleLogin}>
        <Button
            type="submit"
            variant="contained"
            color="primary"
          >
          Register Page
          </Button>
        </form>
      </div>
    }else{
      display =
      <div>
        <h3 className="Text">
          This link is invalid
        </h3>
        <br />
        <br />
        <br />
        <form onSubmit={this.handleRegister}>
        <Button
            type="submit"
            variant="contained"
            color="primary"
          >
          Register Page
          </Button>
        </form>
      </div>
    }
    return (
      <div className="App">
        <div>
          <div>
            <img src={Logo1} width="100" height="100" alt="Logo" />
          </div>
          {display}
        </div>
      </div>
    );
  }
}

export default withRouter(AccountActive);
