import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "../App.css";
import Logo1 from "../picture/Logo1.png";
import UserIcon from "../picture/black-user-icon.png";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import { CardHeader } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

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
  card: {
    maxWidth: 400,
    backgroundColor: "orange"
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

class ProfileOther extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      course: "",
      courseMatch: "",
      courseMatches: [],
      daily: "",
      dailyMatch: "",
      dailyMatches: [],
      hobby: "",
      hobbyMatch: "",
      hobbyMatches: [],
      career: "",
      careerMatch: "",
      careerMatches: []
    };
  }

  componentDidMount() {
    fetch("/api/getProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        profileId: this.props.match.params.profileId
      })
    })
      .then(response => response.json())
      .then(profileInfo => {
        const courseInfo =
          profileInfo.courseSelection.term +
          ", " +
          profileInfo.courseSelection.subject +
          profileInfo.courseSelection.number;

        const dailyInfo =
          profileInfo.casualDaily.term + ", " + profileInfo.casualDaily.daily;

        const hobbyInfo =
          profileInfo.casualHobby.term + ", " + profileInfo.casualHobby.hobby;

        const careerInfo =
          profileInfo.career.term + ", " + profileInfo.career.city;

        this.setState({
          name: profileInfo.name,
          email: profileInfo.email,

          course: !courseInfo.includes("undefined") ? courseInfo : "N/A",
          courseMatch: profileInfo.courseSelection.match,
          courseMatches: profileInfo.courseSelection.matches,

          daily: !dailyInfo.includes("undefined") ? dailyInfo : "N/A",
          dailyMatch: profileInfo.casualDaily.match,
          dailyMatches: profileInfo.casualDaily.matches,

          hobby: !hobbyInfo.includes("undefined") ? hobbyInfo : "N/A",
          hobbyMatch: profileInfo.casualHobby.match,
          hobbyMatches: profileInfo.casualHobby.matches,

          career: !careerInfo.includes("undefined") ? careerInfo : "N/A",
          careerMatch: profileInfo.career.match,
          careerMatches: profileInfo.career.matches
        });
      });
  }

  seeMatches = async (event, matchType) => {
    event.preventDefault();

    let matchesData = null;

    switch (matchType) {
      case "course":
        matchesData = { data: this.state.courseMatches };
        break;
      case "daily":
        matchesData = { data: this.state.dailyMatches };
        break;
      case "hobby":
        matchesData = { data: this.state.hobbyMatches };
        break;
      case "career":
        matchesData = { data: this.state.careerMatches };
        break;
    }

    this.props.history.push({
      pathname: "/matches",
      state: matchesData
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
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
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
          <Divider variant="middle" />
          <Card className={classes.card} raised="true">
            <CardHeader title="Academic" />
            <div>
              <p>Current Course Selection: {this.state.course}</p>
              <p>
                Matching:{" "}
                <a onClick={e => this.seeMatches(e, "course")}>
                  {this.state.courseMatch}
                </a>
              </p>
            </div>
          </Card>
          <Card raised="true">
            <CardHeader title="Daily" />
          </Card>
          <Card raised="true">
            <CardHeader title="Hobby" />
          </Card>
          <Card raised="true">
            <CardHeader title="Career" />
          </Card>
        </Paper>
      </div>
    );
  }
}

ProfileOther.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ProfileOther));
