import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Logo1 from "./picture/Logo1.png";
import "./App.css";

class activiteAccount extends Component {
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
  }

  render() {
    return (
      <div className="App">
        <div>
          <div>
            <img src={Logo1} width="100" height="100" alt="Logo" />
          </div>
          <h2 className="Logo">MeetUW</h2>
          <p>{this.state.responseToPost}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(activiteAccount);
