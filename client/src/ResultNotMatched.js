import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo1 from './picture/Logo1.png';
import './App.css';

class ResultNotMatched extends Component {
    constructor(props){
        super(props);

        this.state = {
            submitted: false
        }
    }

    handleSubmit = async e => {
        this.setState({ submitted: true });
    }

    render() {

        if (this.state.submitted){
            console.log("BACK TO ACADEMIC")
            this.props.history.push({
                pathname: '/academic',
                state: {
                    name: '',
                    email: ''
                }
            });
        }

        return (
            <div className="App">
                <div>
                    <div>                 
                        <img src={Logo1} width="100" height="100" />
                    </div>
                    <h2 className="Logo">MeetUW</h2>
                </div>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <h3 className="Text">Sorry, we could not find a match for you.
                        When we find a match, we will notify you by email. Thanks!</h3>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <input type="submit" 
                            value="Back" 
                            onChange ={this.handleSubmit} />
                    </div>
                </form>
            </div>
          );
    }
}

export default ResultNotMatched;
