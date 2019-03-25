import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./App.css";
import Logo1 from "./picture/Logo1.png";

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: "",
      email_subject: "Introduction Message",
      email_content: "Hi, \nWe got matched on UW Meet. I would love for us to have a quick chat. We can meet up for a coffee when you're available. \n Thanks!",
      response: ""
    };

    fetch("/api/getProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ match: data.match });
      });
  }

  send_Email = async e => {
    e.preventDefault();
    //send intro message email to match
    console.log("sending email");
    var helper = require("sendgrid").mail;
    var from_email = new helper.Email("app113928750@heroku.com");
    var to_email = new helper.Email(this.state.match);
    var subject = this.state.email_subject;
    var content = this.state.email_content;
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require("sendgrid")(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });

    this.setState({response: "Message Sent!"});
  }

  render() {
    return (
      <div className="App">
        <img src={Logo1} width="100" height="100" alt="Logo" />
        <h2 className="Logo">MeetUW</h2>
        <br />

        <div>
            <form>
                <input id="email_subject" type="text" maxlength="100" value={this.state.email_subject} /><br />
                <input type="text" maxlength="100" value={this.state.match} disabled /><br />
                <textarea id="mssg" rows="4" cols="35" wrap="hard">
                    {this.state.email_content}
                </textarea><br /><br />
                <button onClick={this.send_Email()}>Send Message</button>
            </form>
            <p>{this.response}</p>
        </div>
       
      </div>
    );
  }
}

export default withRouter(Message);