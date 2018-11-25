import React, { Component } from 'react';
import kubo from "./picture/kubo.jpg";
import { Link } from 'react-router-dom';
import './App.css';

class Results extends Component {
    constructor(props){
        super(props);

        this.state = {
            invite: true
        };

        this.handleInvite = this.handleInvite.bind(this);
    }

    handleInvite(event){
        alert("We will send a email to him.");
        this.setState({invite:true});
        event.preventDefault(); //need to check if it is same as the password
    }

    render() {
        return (
          <div className="App">
              <h2 className="Text"> Hey! We find a matching for you.</h2> 
              <form name="PasswordRegister" onSubmit={this.handleConfirm}>
                  <div>
                      <img src={kubo} width="100" height="120" />
                      <h3 className="Result">{this.props.location.state.name}</h3>
                      <div>{this.props.location.state.email}</div>
                  </div>
                  <Link to="/academic"><button>Go back</button></Link>
              </form> 
          </div>
          );
    }
}

export default Results;
