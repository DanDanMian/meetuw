import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";

class Matches extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
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
