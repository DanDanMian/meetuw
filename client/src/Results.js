import React, { Component } from 'react';
import kubo from "./picture/kubo.jpg";
import { Link } from 'react-router-dom';

import './App.css';
import Logo1 from './picture/Logo1.png';

class Results extends Component {
    constructor(props){
        super(props);

        this.state = {
            submitted: false
        };

        this.handleBack = this.handleBack.bind(this);
    }

    handleBack = async e => {
        this.setState({ submitted: true });
    }

    render() {

        if (this.state.submitted){
            console.log("NOT MATCH BACK TO ACADEMIC");
            console.log(this.props.location.state.name);
            console.log(this.props.location.state.email);

            this.props.history.push({
                pathname: '/academic',
                state: {
                    name: this.props.location.state.name,
                    email: this.props.location.state.email
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
                <form name="PasswordRegister" onSubmit={this.handleBack}>
                    <h2 className="Text"> Hey! We find a matching for you.</h2> 
                    <div>
                        <img src={kubo} width="100" height="120" />
                        <div className="Text">{this.props.location.state.name}</div>
                        <div className="Text">{this.props.location.state.email}</div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <input type="submit" 
                            value="Back" 
                            onChange ={this.handleBack} />
                    </div>
                </form> 
            </div>
          );
    }
}

export default Results;
