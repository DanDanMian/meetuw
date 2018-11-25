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
            term: 'winter',
            subject:'sssss',
            number: '1122',
            items: [],
            responseToPost: ''
        };
        this.handleTerm = this.handleTerm.bind(this);
        this.handleCourseSubject = this.handleCourseSubject.bind(this);
        this.handleCourseNumber = this.handleCourseNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleTerm (option) {
        console.log('You selected term'+option.label )
        this.setState({term: option.label});
    }   

    handleCourseSubject (option) {
        console.log('You selected subject'+option.label )
        this.setState({subject: option.label});
    }   

    handleCourseNumber (option) {
        console.log('You selected number'+option.label)
        this.setState({number: option.label});
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }
        
    handleSubmit = async e => {

        console.log(this.state.body);
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
        this.setState({ responseToPost: body });
    }

    render() {
        const termOptions = ['Fall','Spring','Winter'];
        const termDfaultOption = this.state.term;
        const subOptions = ['AB','ACC','ACINTY','CLAS','CS','CM','MATH','SCI','PHYS','PMATH','FINE'];
        const subDfaultOption = this.state.subject;
        const numOptions = ['115','116','245','256','349','350','452','486','680','458','493'];
        const numDfaultOption = this.state.number;

        if (this.state.responseToPost === "unmatched"){
            this.props.history.push({
                pathname: '/unmatched',
            })
        } else if (this.state.responseToPost != "") {
            var userData = JSON.parse(this.state.responseToPost)
            this.props.history.push({
                pathname: '/matched',
                state: { name: userData.name, email: userData.email }
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
                </div>
                </form>
          </div>
        );
    }
}

export default AcademeInfo;
