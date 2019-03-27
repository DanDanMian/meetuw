import React, { Component } from "react";
import Dropdown from "react-dropdown";

import Logo1 from "./picture/Logo1.png";
import UserIcon from "./picture/black-user-icon.png";
import "react-dropdown/style.css";
import "./App.css";
import { stat } from "fs";
import { Link } from "react-router-dom";

const termOptions = ["Winter 2019", "Spring 2019", "Fall 2019", "Winter 2020"];

class AcademeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      subject: "",
      number: "",
      courseIDState: "",
      subjects: [],
      coursesLibrary: [],
      currentSujectCourses: [],
      currentSujectID: [],
      responseToPost: "",
      specialtestcases: "",
      error: ""
    };
    this.handleTerm = this.handleTerm.bind(this);
    this.handleCourseSubject = this.handleCourseSubject.bind(this);
    this.handleCourseNumber = this.handleCourseNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://api.uwaterloo.ca/v2/courses.json?key=3a9539294bd92db1e5c7587213a3e8dc"
    )
      .then(response => response.json())
      .then(data => {
        let subjectList = [];

        //    console.log("pulled data: "+JSON.stringify(data.data));
        for (let i = 0; i < data.data.length; i++) {
          const courseSubject = data.data[i].subject;
          if (subjectList.indexOf(courseSubject) === -1) {
            subjectList.push(courseSubject);
          }
        }
        const len = subjectList.length;
        // console.log("len"+len);
        let courseList = new Array(len);
        for (let i = 0; i < data.data.length; i++) {
          const courseSubject = data.data[i].subject;
          const num = data.data[i].catalog_number;
          const courseID = data.data[i].course_id;
          const index = subjectList.indexOf(courseSubject);
          if (courseList[index] == null) {
            courseList[index] = [];
          } else {
            courseList[index].push({ id: courseID, number: num });
          }
        }
        // console.log(JSON.stringify(courseList));
        this.setState({ subjects: subjectList });
        this.setState({ coursesLibrary: courseList });
        // console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleTerm(option) {
    //console.log('You selected term'+option.label )
    this.setState({ term: option.label });
  }

  handleCourseSubject(option) {
    //  console.log('You selected subject'+option.label )
    this.setState({ subject: option.label });
    const c = this.state.coursesLibrary[
      this.state.subjects.indexOf(option.label)
    ];
    const numList = new Array(c.length);
    const idList = new Array(c.length);
    //    console.log("c: "+JSON.stringify(c));

    for (var i = 0; i < c.length; i++) {
      // console.log("in loop: "+c[i].number+' '+c[i].id);
      numList[i] = c[i].number;
      idList[i] = c[i].id;
    }
    this.setState({ currentSujectCourses: numList, currentSujectID: idList });
    //console.log("print numlist: "+ this.state.currentSujectCourses);
    // console.log('print idlist '+this.state.currentSujectID);
  }

  handleCourseNumber(option) {
    //console.log('You selected number'+option.label)
    this.setState({ number: option.label });
    this.setState({ specialtestcases: option.label });
    var index = this.state.currentSujectCourses.indexOf(option.label);
    /* console.log('option label: '+option.label);
        console.log('state course number: '+this.state.number);
        console.log('test case: '+ this.state.specialtestcases);
        console.log('id index: '+index); */
    this.setState({ courseIDState: this.state.currentSujectID[index] });
  }

  handleSubmit = async e => {
    // console.log(this.state.body);
    // console.log(this.state.term);
    e.preventDefault();
    // Form Validation
    if (this.state.term === "") {
      this.setState({ error: "Term cannot be empty" });
      return;
    } else if (this.state.subject === "") {
      this.setState({ error: "Course Subject cannot be empty" });
      return;
    } else if (this.state.number === "") {
      this.setState({ error: "Course ID cannot be empty" });
      return;
    }

    console.log("print course id before sumbit: " + this.state.courseIDState);

    const response = await fetch("/api/match_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.props.location.state.name,
        email: this.props.location.state.email,
        term: this.state.term,
        subject: this.state.subject,
        number: this.state.number,
        id: this.state.courseIDState,
        subjectOptions: this.state.subjects,
        numberOptions: this.state.currentSujectCourses,
        termOptions: termOptions,
        userCase: "Academic"
      })
    });

    const body = await response.text();

    this.setState({ responseToPost: body });

    if (this.state.responseToPost === "unmatched") {
      this.props.history.push({
        pathname: "/unmatched",
        state: {
          name: this.props.location.state.name,
          email: this.props.location.state.email,
        }
      });
    } else if (this.state.responseToPost !== "") {
      var userData = JSON.parse(this.state.responseToPost);
      this.props.history.push({
        pathname: "/matched",
        state: {
          name: userData.name,
          email: userData.email,
          myname: userData.myname,
          myemail:userData.myemail,
          type: userData.type
        }
      });
    }
  };

  render() {
    return (
      <div className="App">
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
            <img src={Logo1} width="100" height="100" alt="Logo" />
          </div>
          <h2 className="Logo">MeetUW</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h4 className="Text">Select Term </h4>
          <Dropdown
            className="Dropdown"
            name="term"
            options={termOptions}
            value={this.state.term}
            onChange={this.handleTerm}
            placeholder="--"
            required
          />
          <h4 className="Text"> Select Subject</h4>
          <Dropdown
            className="Dropdown"
            name="subject"
            options={this.state.subjects}
            value={this.state.subject}
            onChange={this.handleCourseSubject}
            placeholder="--"
          />
          <h4 className="Text"> Select Course Id</h4>
          <Dropdown
            className="Dropdown"
            name="number"
            options={this.state.currentSujectCourses}
            value={this.state.number}
            onChange={this.handleCourseNumber}
            placeholder="--"
          />
          <br />
          <br />
          <br />
          <br />
          <div>
            <input type="submit" value="submit" onChange={this.handleSubmit} />
          </div>
        </form>
        <p className="Error">{this.state.error}</p>
      </div>
    );
  }
}

export default AcademeInfo;
