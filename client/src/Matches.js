import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";
import UserIcon from "./picture/black-user-icon.png";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

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

class Matches extends Component {
  constructor(props) {
    super(props);
  }

  checkProfile = async event => {
    event.preventDefault();

    let response = await fetch("/api/getProfileId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: event.currentTarget.textContent
      })
    });

    const id = await response.text();

    response = await fetch("/api/getEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const currentEmail = await response.text();

    response = await fetch("/api/getProfileId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: currentEmail
      })
    });

    const currentUserProfileId = await response.text();

    let path = "/profile";

    if (id !== currentUserProfileId) {
      path = "/profile/:" + id;
    }

    this.props.history.push({
      pathname: path
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Paper className={classes.paper}>
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
          <div className="center-col">
            <Typography align="left">Matches:</Typography>
            <List>
              {this.props.location.state.data.map((item, i) => (
                <ListItem>
                  <Link onClick={this.checkProfile}>{item}</Link>
                  {/* <ListItemText primary={item} /> */}
                </ListItem>
              ))}
            </List>
          </div>
        </Paper>
      </div>
    );
  }
}

Matches.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Matches));
