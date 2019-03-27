import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";
import UserIcon from "./picture/black-user-icon.png";

class Matches extends Component {
  constructor(props) {
    super(props);
  }

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
              <li key={`item_${i}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Matches);
