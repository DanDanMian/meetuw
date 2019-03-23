import React, { Component } from "react";
import Dropdown from "react-dropdown";

import Logo1 from "./picture/Logo1.png";
import UserIcon from "./picture/black-user-icon.png";
import "react-dropdown/style.css";
import "./App.css";

const termOptions = ["Fall 2018", "Spring 2019", "Winter 2019"];
const cityOptions = ["Toronto", "Waterloo", "Toronto Greater Area", "Bay Area"];

class Career extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      city: "",
      responseToPost: "",
      specialtestcases: "",
      error: ""
    };
    this.handleTerm = this.handleTerm.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTerm(option) {
    this.setState({ term: option.label });
  }

  handleCity(option) {
  	this.setState({ city: option.label });
  }

  handleSubmit = async e => {
    e.preventDefault();

    // Form Validation
    if (this.state.term === "") {
      this.setState({ error: "Term cannot be empty" });
      return;
    } else if (this.state.city === "") {
      this.setState({ error: "City" });
      return;
    }

    var index1= termOptions.indexOf(this.state.term);
    var index2= cityOptions.indexOf(this.state.city);


    const response = await fetch("/api/match_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id1:index1+1,
        id2:index2+2,
        name: this.props.location.state.name,
        email: this.props.location.state.email,
        category: this.state.term,
        preference: this.state.city,
        userCase: "Career"
      })
    });

    const body = await response.text();

    this.setState({ responseToPost: body });

    if (this.state.responseToPost === "unmatched") {
      this.props.history.push({
        pathname: "/unmatched",
        state: {
          name: this.props.location.state.name,
          email: this.props.location.state.email
        }
      });
    } else if (this.state.responseToPost !== "") {
      var userData = JSON.parse(this.state.responseToPost);
      this.props.history.push({
        pathname: "/matched",
        state: { name: userData.name, email: userData.email }
      });
    }
  };

  profile = async e => {
    this.props.history.push({
      pathname: "/profile"
    });
  }


  render() {
  
    return (
      <div className="App">
        <div>
          <div>
            <img id="user-icon" src={UserIcon} width="50" height="50" alt="User-icon" onClick={this.profile} />
            <img src={Logo1} width="100" height="100" alt="Logo" />
          </div>
          <h2 className="Logo">MeetUW</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h4 className="Text">Select Term </h4>
          <Dropdown
            className="Dropdown"
            name="term"
            options={termOptions}
            value={this.state.term}
            onChange={this.handleTerm}
            placeholder="--"
            required
          />
          <h4 className="Text"> Select City</h4>
          <Dropdown
            className="Dropdown"
            name="subject"
            options={cityOptions}
            value={this.state.city}
            onChange={this.handleCity}
            placeholder="--"
          />
          <br />
          <br />
          <br />
          <br />
          <div>
            <input type="submit" value="submit" onChange={this.handleSubmit} />
          </div>
        </form>
        <p className="Error">{this.state.error}</p>
      </div>
    );
  }
}

export default Career;