import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "../App.css";
import Logo1 from "../picture/Logo1.png";

class Profile extends Component {
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

    this.reselect = this.reselect.bind(this);
    this.logout = this.logout.bind(this);
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
        console.log(profileInfo);
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

        console.log("courseMatch" + this.state.courseMatch);
      });
  }

  logout = async event => {
    event.preventDefault();

    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const body = await response.text();

    if (body === "SUCCESS") {
      this.props.history.push({
        pathname: "/login"
      });
    }
  };

  reselect = async (event, matchType) => {
    event.preventDefault();

    const response = await fetch("/api/getEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const curEmail = await response.text();

    let end = curEmail.indexOf("@");
    let tempName = curEmail.substring(0, end);

    let path = "";
    switch (matchType) {
      case "course":
        path = "/academic";
        break;
      case "daily":
        path = "/daily";
        break;
      case "hobby":
        path = "/hobby";
        break;
      case "career":
        path = "/career";
        break;
    }

    this.props.history.push({
      pathname: path,
      state: { name: tempName, email: curEmail }
    });
  };

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
      state: { data: matchesData, type: matchType.charAt(0).toUpperCase() + matchType.slice(1) }
    });
  };

  render() {
    return (
      <div className="App">
        <img src={Logo1} width="100" height="100" alt="Logo" />
        <h2 className="Logo">MeetUW</h2>
        <br />

        <div>
          <p>Profile: {this.state.email}</p>
          <p>Name: {this.state.name}</p>
          <hr />

          <div>
            <p>Current Course Selection: {this.state.course}</p>
            <p>
              Matching:{" "}
              <a onClick={e => this.seeMatches(e, "course")}>
                {this.state.courseMatch}
              </a>
            </p>
            <button onClick={e => this.reselect(e, "course")}>
              Reselect Course
            </button>
          </div>

          <div>
            <p>Current Daily Selection: {this.state.daily}</p>
            <p>
              Matching:{" "}
              <a onClick={e => this.seeMatches(e, "daily")}>
                {this.state.dailyMatch}
              </a>
            </p>
            <button onClick={e => this.reselect(e, "daily")}>
              Reselect Daily
            </button>
          </div>

          <div>
            <p>Current Hobby Selection: {this.state.hobby}</p>
            <p>
              Matching:{" "}
              <a onClick={e => this.seeMatches(e, "hobby")}>
                {this.state.hobbyMatch}
              </a>
            </p>
            <button onClick={e => this.reselect(e, "hobby")}>
              Reselect Hobby
            </button>
          </div>

          <div>
            <p>Current Career Selection: {this.state.career}</p>
            <p>
              Matching:{" "}
              <a onClick={e => this.seeMatches(e, "career")}>
                {this.state.careerMatch}
              </a>
            </p>
            <button onClick={e => this.reselect(e, "career")}>
              Reselect Career
            </button>
          </div>
        </div>
        <div>
          <button onClick={this.logout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
