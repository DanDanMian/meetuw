import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "../App.css";
import Logo1 from "../picture/Logo1.png";
import UserIcon from "../picture/black-user-icon.png";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
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
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <img src={Logo1} width="100" height="100" alt="Logo" />
          <Typography variant="h6" className={classes.title}>
            {this.props.location.state.type} Matches
          </Typography>
          <div className={classes.demo}>
            <List>
              {this.props.location.state.data.data.map((item, i) => (
                <ListItem onClick={this.checkProfile}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item} />
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
