import React, { Component } from "react";
import kubo from "./picture/kubo.jpg";
import { withRouter } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: "",
      match: ""
    };

    fetch("/api/getProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ course: data.course, match: data.match });
      });

    this.reselect = this.reselect.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout = async event => {
    event.preventDefault();

    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const body = await response.text();

    if (body === "SUCCESS") {
      this.props.history.push({
        pathname: "/login"
      });
    }
  };

  reselect = async event => {
    event.preventDefault();

    const response = await fetch("/api/getEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const curEmail = await response.text();

    let end = curEmail.indexOf("@");
    let tempName = curEmail.substring(0, end);

    this.props.history.push({
      pathname: "/academic",
      state: { name: tempName, email: curEmail }
    });
  };

  render() {
    return (
      <div className="App">
        <img src={Logo1} width="100" height="100" alt="Logo" />
        <h2 className="Logo">MeetUW</h2>
        <br />

        <img src={kubo} width="100" height="120" alt="Kubo" />

        <div>
          <p>Current Selection: {this.state.course}</p>
          <p>Matching: {this.state.match}</p>
          <button onClick={this.reselect}>Reselect study course</button>
        </div>
        <div>
          <button onClick={this.logout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
