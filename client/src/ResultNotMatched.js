import React, { Component } from "react";
import { Link } from "react-router-dom";
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

class ResultNotMatched extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false
    };

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack = async e => {
    e.preventDefault();
    this.setState({ submitted: true }, () => {
      if (this.state.submitted) {
        this.props.history.push({
          pathname: "/menu",
          state: {
            name: this.props.location.state.name,
            email: this.props.location.state.email
          }
        });
      }
    });
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
          <br />
          <br />
          <form onSubmit={this.handleBack}>
            <h3 className="Text">
              Sorry, we could not find a match for you. When we find a match, we
              will notify you by email. Thanks!
            </h3>
            <br />
            <br />
            <br />
            <br />
            <div>
              <form onSubmit={this.handleBack}>
                <input type="submit" value="Back to Menu Page" />
              </form>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

ResultNotMatched.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResultNotMatched);
