import React, { Component } from "react";
import kubo from "./picture/kubo.jpg";
import { Link } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";
import UserIcon from "./picture/black-user-icon.png";

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

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      profileId: ""
    };

    this.handleBack = this.handleBack.bind(this);
    this.checkProfile = this.checkProfile.bind(this);
  }

  handleBack = async e => {
    e.preventDefault();
    this.setState({ submitted: true }, () => {
      if (this.state.submitted) {
        this.props.history.push({
          pathname: "/menu",
          state: {
            name: this.props.location.state.myname,
            email: this.props.location.state.myemail
          }
        });
      }
    });
  };

  checkProfile = async event => {
    event.preventDefault();

    const response = await fetch("/api/getProfileId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: event.currentTarget.textContent
      })
    });

    const id = await response.text();
    this.props.history.push({
      pathname: "/profile/:" + id
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
          <form name="PasswordRegister" onSubmit={this.handleBack}>
            <h2 className="Text"> Hey! We found a matching for you.</h2>
            <div>
              <img src={kubo} width="100" height="120" alt="Kubo" />
              <h3 className="Text"> {this.props.location.state.type}:</h3>
              <div className="Text">{this.props.location.state.name}</div>
              <div onClick={this.checkProfile} className="Text">
                {this.props.location.state.email}
              </div>
            </div>
            <br />
            <br />
            <div>
              <form onSubmit={this.handleBack}>
                <input type="submit" value="Back to Menu Page" />
              </form>
            </div>
            <br />
          </form>
        </Paper>
      </div>
    );
  }
}

Results.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Results);
