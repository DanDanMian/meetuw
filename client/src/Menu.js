import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Logo1 from "./picture/Logo1.png";
import UserIcon from "./picture/black-user-icon.png";
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

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      category: "",
      responseToPost: "",
      tryoutValid: false,
      loginValid: false,
      error: ""
    };

    this.handleCateogryChange = this.handleCateogryChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = async e => {
    e.preventDefault();

    // Input Validation
    if (this.state.category === "") {
      this.setState({ error: "Must select a category" });
      return;
    }

    this.setState({ loginValid: true });
    if (this.state.category == "Academic") {
      this.props.history.push({
        pathname: "/academic",
        state: {
          name: this.props.location.state.name,
          email: this.props.location.state.email
        }
      });
    } else if (this.state.category == "Casual") {
      this.props.history.push({
        pathname: "/casual",
        state: {
          name: this.props.location.state.name,
          email: this.props.location.state.email
        }
      });
    } else {
      this.props.history.push({
        pathname: "/career",
        state: {
          name: this.props.location.state.name,
          email: this.props.location.state.email
        }
      });
    }
  };

  handleCateogryChange(option) {
    this.setState({ category: option.label });
  }

  render() {
    const { classes } = this.props;
    const categoryList = ["Academic", "Casual", "Career"];

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
          <form onSubmit={this.handleTryout}>
            <h3 className="Text">
              MeetUW can help you find people with the same preference.
            </h3>
            <h3 className="Text"> You are looking for a </h3>
            <Dropdown
              className="Dropdown"
              name="category"
              options={categoryList}
              value={this.state.category}
              onChange={this.handleCateogryChange}
              placeholder="--"
            />
            <h3 className="Text"> friend.</h3>
            <br />
            <br />
            <br />
            <br />
          </form>
          <br />
          <form onSubmit={this.handleSelect}>
            <input type="submit" value="Select" required />
          </form>
          <p className="Error">{this.state.error}</p>
        </Paper>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
