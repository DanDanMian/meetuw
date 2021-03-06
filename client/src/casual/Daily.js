import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";
import "../App.css";
import Logo1 from "../picture/Logo1.png";
import UserIcon from "../picture/black-user-icon.png";

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

const categories = [
  "gym buddy",
  "game buddy",
  "shopping buddy",
  "meal buddy",
  "traveling mate"
];

const termOptions = ["Winter 2019", "Spring 2019", "Fall 2019", "Winter 2020"];

class Daily extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      term: ""
    };

    this.handleCategory = this.handleCategory.bind(this);
    this.handleTerm = this.handleTerm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCategory(option) {
    this.state.category = option.label;
    console.log(JSON.stringify(this.state));
  }

  handleTerm(option) {
    this.state.term = option.label;
    console.log(JSON.stringify(this.state));
  }

  handleSubmit = async e => {
    e.preventDefault();

    // Form Validation
    if (this.state.category === "") {
      this.setState({ error: "Category cannot be empty" });
      return;
    } else if (this.state.term === "") {
      this.setState({ error: "Term cannot be empty" });
      return;
    }

    console.log("print course id before sumbit: ");

    var index = categories.indexOf(this.state.category);

    const response = await fetch("api/match_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.props.location.state.name,
        email: this.props.location.state.email,
        category: this.state.category,
        term: this.state.term,
        userCase: "Daily"
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
            <h2 className="Logo">MeetUW</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <h3 className="Text">Find the category</h3>

            <div>
              <br />
              <Dropdown
                className="Dropdown"
                name="category"
                options={categories}
                value={this.state.category}
                onChange={this.handleCategory}
                placeholder="--"
                required
              />
              <br />
              <h3 className="Text">Select Term</h3>
              <br />
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
              <br />
              <br />
            </div>
            <input type="submit" value="submit" onChange={this.handleSubmit} />
          </form>
          <p className="Error">{this.state.error}</p>
          <br />
          <br />
          <br />
        </Paper>
      </div>
    );
  }
}

Daily.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Daily);
