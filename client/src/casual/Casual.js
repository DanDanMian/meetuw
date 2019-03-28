import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "react-dropdown/style.css";

import Logo1 from "../picture/Logo1.png";
import UserIcon from "../picture/black-user-icon.png";

import "../App.css";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
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

class Casual extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };

    this.handleDaily = this.handleDaliy.bind(this);
    this.handleHobby = this.handleHobby.bind(this);
  }

  handleDaliy = async e => {
    e.preventDefault();
    this.setState({ selected: true }, () => {
      if (this.state.selected) {
        this.props.history.push({
          pathname: "/daily",
          state: {
            name: this.props.location.state.name,
            email: this.props.location.state.email
          }
        });
      }
    });
  };

  handleHobby = async e => {
    e.preventDefault();
    this.setState({ selected: true }, () => {
      if (this.state.selected) {
        this.props.history.push({
          pathname: "/hobby",
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
            <br />
            <br />
            <h1 className="Logo">Causal</h1>

            <br />
          </div>
          <div className="Text">
            <Button
              variant="extendedFab"
              size="large"
              color="primary"
              onClick={this.handleDaliy}
            >
              {" "}
              Daily Life{" "}
            </Button>
            <br />
            <br />
            <br />

            <Button
              variant="extendedFab"
              size="large"
              color="black"
              onClick={this.handleHobby}
            >
              {" "}
              &nbsp; &nbsp;Hobby &nbsp;&nbsp;{" "}
            </Button>
          </div>

          <br />
          <br />
          <br />
        </Paper>
      </div>
    );
  }
}

Casual.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Casual);
