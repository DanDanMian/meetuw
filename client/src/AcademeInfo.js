import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'react-dropdown/style.css';
import './App.css';

var dict = [];

class AcademeInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: '',
            subject:'',
            number: '',
            subjects: [],
            coursesLibrary:[],
            currentSujectCourses:[],
            responseToPost: ''
        };
        this.handleTerm = this.handleTerm.bind(this);
        this.handleCourseSubject = this.handleCourseSubject.bind(this);
        this.handleCourseNumber = this.handleCourseNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('https://api.uwaterloo.ca/v2/courses.json?key=3a9539294bd92db1e5c7587213a3e8dc')
        .then(response => response.json())
        .then(data => {
            let subjectList =[];
            let subjectSet = [];
            console.log(data.data);
            for (var i = 0; i < data.data.length; i++) {
                const courseSubject = data.data[i].subject;
                if (subjectList.indexOf(courseSubject) === -1 ) {
                    subjectList.push(courseSubject);
                }
            }
            const len = subjectList.length;
            console.log("len"+len);
            let courseList = new Array(len);
            for (var i = 0; i < data.data.length; i++) {
                const courseSubject = data.data[i].subject;
                const num = data.data[i].catalog_number;
                const index = subjectList.indexOf(courseSubject);
                if (courseList[index]==null){
                    courseList[index]=[];
                } else {
                    courseList[index].push(num);
                }
            }
            this.setState({subjects:subjectList});
            this.setState({coursesLibrary:courseList});
            console.log(data);
            console.log(this.state.coursesLibrary);
          })
          .catch(error => {
            console.log(error);
          });
        }

    handleSelect(){
        const c = this.state.courses[this.state.subjects.indexOf(this.state.subject)];
        return c;
    }

    handleTerm (option) {
        console.log('You selected term'+option.label )
        this.setState({term: option.label});
    }   

    handleCourseSubject (option) {
        console.log('You selected subject'+option.label )
        this.setState({subject: option.label});
        const c = this.state.coursesLibrary[this.state.subjects.indexOf(option.label)];
        this.setState({currentSujectCourses:c});
    }   

    handleCourseNumber (option) {
        console.log('You selected number'+option.label)
        this.setState({number: option.label});
    }   
    
    handleSubmit = async e => {
        console.log(this.state.term);
        e.preventDefault();
        const response = await fetch('/api/match_request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({term: this.state.term,
          subject: this.state.subject, number: this.state.number}),
        });

        const body = await response.text();

        this.setState({ responseToPost:body });

    }

    render() {
        const termOptions = ['Fall','Spring','Winter'];
        const termDfaultOption = this.state.term;
        const numOptions = ['115','116','245','256','349','350','452','486','680','458','493'];
        const numDfaultOption = this.state.number;

        if (this.state.responseToPost === "unmatched"){
            console.log(this.state.responseToPost);
            this.props.history.push({
                pathname: '/unmatched',
                state: { name: "Da Wei", email:"d4wei@uwaterloo.ca" }
            })
        } else if (this.state.responseToPost !== "") {
            console.log(this.state.responseToPost);
            this.props.history.push({
                pathname: '/matched',
                state: { name: "Da Wei", email:"d4wei@uwaterloo.ca" }
            })
        }

        return (
          <div className="App">
            <div>
                <h2 className="Logo">MeetUW</h2>
                <h2 className="Text">Add More Info</h2>

            </div>
            <form onSubmit={this.handleSubmit}>
              <label>
                <h3 className="Text">Select a Term </h3>
                <Dropdown
                    className="Dropdown"
                    name = "term"
                    options={termOptions}
                    value={this.state.term}
                    onChange={this.handleTerm}
                    placeholder=""/>
                <br/>
                <h3 className="Text"> Select a Subject</h3>
                <Dropdown
                    className="Dropdown"
                    name = "subject"
                    options={this.state.subjects}
                    value={this.state.subject}
                    onChange={this.handleCourseSubject}
                    placeholder=""/>
                <br/>
                <h3 className="Text"> Select a Course Number</h3>
                <Dropdown
                    className="Dropdown"
                    name = "number"
                    options = {this.state.currentSujectCourses}
                    value={this.state.number}
                    onChange={this.handleCourseNumber}
                    placeholder=""/>
                <br/>
                <br/>
                <br/>
              </label>
                <div>
                    < input type="submit" value="submit" 
                            onChange ={this.handleSubmit} />
                    <input type="submit" value="submit(test)" 
                        onChange ={this.handleSubmit} />
                </div>
                <p>{this.state.responseToPost}</p>
                </form>
          </div>
        );
    }
}

export default AcademeInfo;
