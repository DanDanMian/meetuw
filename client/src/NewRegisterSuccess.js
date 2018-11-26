import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import Logo1 from './picture/Logo1.png';
import './App.css';

class NewRegisterSuccess extends Component {
    constructor(props){
        super(props);

        this.state = {
            submitted: false
        }
    }

    handleSubmit(event){
        this.setState({ submitted: true });
    }

    render() {
        if (this.state.submitted){
            this.props.history.push({
                pathname: '/registered',
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
                <form onSubmit={this.handleSubmit}>
                    <h3 className="Text">Registered Sucessfull. You could start explore now!</h3>
                    <br />
                    <br />
                    <br />
                    <input type="submit" value="Let's Rock"
                            onChange ={this.handleSubmit} />
                </form>
            </div>
        );
    }
}

export default withRouter(NewRegisterSuccess)
