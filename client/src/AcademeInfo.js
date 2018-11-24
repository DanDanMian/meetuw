import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'react-dropdown/style.css';
import './App.css';

class AcademeInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: '',
            subject:'',
            number: '',
            items: [],
            responseToPost: ''
        };
        this.handleTerm = this.handleTerm.bind(this);
        this.handleCourseSubject = this.handleCourseSubject.bind(this);
        this.handleCourseNumber = this.handleCourseNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleTerm (option) {
        console.log('You selected ', )
        this.setState({term: option});
    }   

    handleCourseSubject (option) {
        console.log('You selected ', )
        this.setState({subject: option});
    }   

    handleCourseNumber (option) {
        console.log('You selected ', )
        this.setState({number: option});
    }   

    handleSubmit = async e => {
        console.log(this.state.body);
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
        const subOptions = ['AB','ACC','ACINTY','CLAS','CS','CM','MATH','SCI','PHYS','PMATH','FINE'];
        const subDfaultOption = this.state.subject;
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
            // this.props.history.push({
            //   pathname: '/template',
            //   search: '?query=abc',
            //   state: { detail: response.data }
            // })
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
                    options={subOptions}
                    value={this.state.subject}
                    onChange={this.handleCourseSubject}
                    placeholder=""/>
                <br/>
                <h3 className="Text"> Select a Course Number</h3>
                <Dropdown
                    className="Dropdown"
                    name = "number"
                    options={numOptions}
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
