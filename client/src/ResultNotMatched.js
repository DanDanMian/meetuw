import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class ResultNotMatched extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
          <div className="App">
            <h2 className="Text">Currently no match for you, we will notify you by email.</h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <Link to="/academic"><button>Go back</button></Link>
          </div>
          );
    }
}

export default ResultNotMatched;
