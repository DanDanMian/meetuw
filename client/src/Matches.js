import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";
import UserIcon from "./picture/black-user-icon.png";

class Matches extends Component {
  constructor(props) {
    super(props);
  }

  checkProfile = async event => {
    event.preventDefault();

    let response = await fetch("/api/getProfileId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: event.currentTarget.textContent
      })
    });

    const id = await response.text();

    response = await fetch("/api/getEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const currentEmail = await response.text();

    response = await fetch("/api/getProfileId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: currentEmail
      })
    });

    const currentUserProfileId = await response.text();

    let path = "/profile";

    if (id !== currentUserProfileId) {
      path = "/profile/:" + id;
    }

    this.props.history.push({
      pathname: path
    });
  };

  render() {
    return (
      <div className="App">
        <Link to="/profile">
          <img
            id="user-icon"
            src={UserIcon}
            width="50"
            height="50"
            alt="User-icon"
          />
        </Link>
        <img src={Logo1} width="100" height="100" alt="Logo" />
        <h2 className="Logo">MeetUW</h2>
        <br />
        <div className="center-col">
          <span>Matches:</span>
          <ul>
            {this.props.location.state.data.map((item, i) => (
              <li onClick={this.checkProfile} key={`item_${i}`}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Matches);
