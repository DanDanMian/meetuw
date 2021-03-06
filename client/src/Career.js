import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-dropdown";

import Logo1 from "./picture/Logo1.png";
import UserIcon from "./picture/black-user-icon.png";
import "react-dropdown/style.css";
import "./App.css";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: `${theme.spacing.unit * 3}px`,
    paddingBottom: `${theme.spacing.unit * 3}px`
  }
});

const termOptions = ["Winter 2019", "Spring 2019", "Fall 2019", "Winter 2020"];
const cityOptions = [
  "Toronto",
  "Waterloo",
  "Toronto Greater Area",
  "Bay Area",
  "Vancouver"
];

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
      this.setState({ error: "City cannot be empty" });
      return;
    }

    var index1 = termOptions.indexOf(this.state.term);
    var index2 = cityOptions.indexOf(this.state.city);

    const response = await fetch("/api/match_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id1: index1 + 1,
        id2: index2 + 2,
        name: this.props.location.state.name,
        email: this.props.location.state.email,
        term: this.state.term,
        city: this.state.city,
        cityOptions: cityOptions,
        termOptions: termOptions,
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
        state: {
          name: userData.name,
          email: userData.email,
          myname: userData.myname,
          myemail: userData.myemail,
          type: userData.type
        }
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Paper className={classes.paper}>
          <div>
            <div>
              <Link to="/profile">
                <img
                  id="user-icon"
                  src={UserIcon}
                  width="50"
                  height="50"
                  alt="User-icon"
                />
              </Link>
              <img src={Logo1} width="150" height="80" alt="Logo" />
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
            <br />
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
              <input
                type="submit"
                value="submit"
                onChange={this.handleSubmit}
              />
            </div>
          </form>
          <p className="Error">{this.state.error}</p>
        </Paper>
      </div>
    );
  }
}

Career.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Career);
