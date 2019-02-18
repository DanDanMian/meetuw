import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Logo1 from "./picture/Logo1.png";
import "./App.css";

class NewRegisterSuccess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ submitted: true }, () => {
      if (this.state.submitted) {
        /* console.log("TEST REGISTRED SUCESS");
        console.log(this.props.location.state.name);
        console.log(this.props.location.state.email);
        console.log("TEST REGISTRED END"); */

        this.props.history.push({
          pathname: "/academic",
          state: {
            name: this.props.location.state.name,
            email: this.props.location.state.email
          }
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
        <form onSubmit={this.handleSubmit}>
          <h3 className="Text">
            Successfully Registered. You can start to explore now!
          </h3>
          <br />
          <br />
          <br />
          <input
            type="submit"
            value="Let's Rock"
            onChange={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(NewRegisterSuccess);
