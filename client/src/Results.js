import React, { Component } from 'react';
import kubo from "./picture/kubo.jpg";
import { Link } from 'react-router-dom';
import './App.css';

class Results extends Component {
    constructor(props){
        super(props);
        this.state = {
            invite: true,
            email:'d57wei@uwaterloo.ca',
        };
        this.handleInvite = this.handleInvite.bind(this);
    }


    handleInvite(event){
        alert("We will send a email to him.");
        this.setState({invite:true});
        //need to check if it is same as the password
        event.preventDefault();
    }

    render() {
        return (
          <div className="App">
              <h2 className="Text"> Hey! We find a matching for you.</h2> 
              <form name="PasswordRegister" onSubmit={this.handleConfirm}>
                  <div>
                      <img src={kubo} width="100" height="120" />
                      <h3 className="Result">{this.props.name}</h3>
                      <div>{this.props.email}</div>
                  </div>

                  <div>
                      <h4 className="Text">{this.state.email}</h4>
                  </div>
              </form> 
          </div>
          );
    }
}

export default Results;
