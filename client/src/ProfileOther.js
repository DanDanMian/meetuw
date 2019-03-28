import React, { Component } from "react";
import kubo from "./picture/kubo.jpg";
import { withRouter, Link } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";
import UserIcon from "./picture/black-user-icon.png";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

          <img src={kubo} width="100" height="120" alt="Kubo" />

          <div>
            <Typography>Profile: {this.state.email}</Typography>
            <Typography>Name: {this.state.name}</Typography>

            <Link
              to={{ pathname: "/message", state: { email: this.state.email } }}
            >
              <button>Send Message</button>
            </Link>

            <hr />

            <div>
              <Typography>
                Current Course Selection: {this.state.course}
              </Typography>
              <Typography inline>Matching: </Typography>
              <Link onClick={e => this.seeMatches(e, "course")}>
                {this.state.courseMatch}
              </Link>
            </div>
            <br />
            <div>
              <Typography>
                Current Daily Selection: {this.state.daily}
              </Typography>
              <Typography inline>Matching: </Typography>
              <Link onClick={e => this.seeMatches(e, "daily")}>
                {this.state.dailyMatch}
              </Link>
            </div>
            <br />
            <div>
              <Typography>
                Current Hobby Selection: {this.state.hobby}
              </Typography>
              <Typography inline>Matching: </Typography>
              <Link onClick={e => this.seeMatches(e, "hobby")}>
                {this.state.hobbyMatch}
              </Link>
            </div>
            <br />
            <div>
              <Typography>
                Current Career Selection: {this.state.career}
              </Typography>
              <Typography inline>Matching: </Typography>
              <Link onClick={e => this.seeMatches(e, "career")}>
                {this.state.careerMatch}
              </Link>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

ProfileOther.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ProfileOther));
