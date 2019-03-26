import React, { Component } from "react";
import kubo from "./picture/kubo.jpg";
import { withRouter } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      course: "",
      match: "",
      matches: []
    };

    this.reselect = this.reselect.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch("/api/getProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        profileId: this.props.match.params.profileId
      })
    })
      .then(response => response.json())
      .then(profileInfo => {
        console.log(profileInfo);
        this.setState({
          email: profileInfo.email,
          course:
            profileInfo.courseSelection.term +
            " " +
            profileInfo.courseSelection.subject +
            profileInfo.courseSelection.number,
          match: profileInfo.courseSelection.match,
          matches: profileInfo.courseSelection.matches
        });
      });
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

  seeMatches = async event => {
    event.preventDefault();

    this.props.history.push({
      pathname: "/matches",
      state: { data: this.state.matches }
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
          <p>Profile: {this.state.email}</p>
          <p>Current Selection: {this.state.course}</p>
          <p>
            Matching: <a onClick={this.seeMatches}>{this.state.match}</a>
          </p>
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
