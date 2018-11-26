import React, { Component } from 'react';
import kubo from "./picture/kubo.jpg";
import { Link } from 'react-router-dom';
import './App.css';

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
                <h2 className="Text"> Hey! We find a matching for you.</h2> 
                <form name="PasswordRegister" onSubmit={this.handleBack}>
                    <div>
                        <img src={kubo} width="100" height="120" />
                        <h3 className="Text">{this.props.location.state.name}</h3>
                        <div>{this.props.location.state.email}</div>
                    </div>
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
