import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";
import UserIcon from "./picture/black-user-icon.png";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: "",
      email_subject: "Introduction Message",
      email_content:
        "Hi, \nWe got matched on UW Meet. I would love for us to have a quick chat. We can meet up for a coffee when you're available. \nThanks! \n\n<Reply to Respond>",
      responseToPost: ""
    };
  }

  componentDidMount() {
    this.setState({ match: this.props.location.state.email });
  }

  send_Email = async e => {
    e.preventDefault();

    // Call api to send email
    const response = await fetch("/api/sendmatchemail", {
      // api in user.js
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.match,
        subject: this.state.email_subject,
        content: this.state.email_content
      })
    });

    const body = await response.text();
    console.log("response from server :" + body);
    this.setState({ responseToPost: body });
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
          <div>
            <form>
              <input
                id="email_subject"
                type="text"
                maxlength="100"
                value={this.state.email_subject}
              />
              <br />
              <textarea id="mssg" rows="4" cols="35" wrap="hard">
                {this.state.email_content}
              </textarea>
              <br />
              <br />
              <button onClick={this.send_Email}>Send Message</button>
            </form>
            <Typography>{this.state.responseToPost}</Typography>
          </div>
        </Paper>
      </div>
    );
  }
}

Message.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Message));
