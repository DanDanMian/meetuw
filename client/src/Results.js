import React, { Component } from 'react';
import kubo from "./picture/kubo.jpg"
import './App.css';

class Results extends Component {
    constructor(props){
        super(props);
        this.state = {
            invited:false
        };
        this.handleInvite = this.handleInvite.bind(this);
    }


    handleInvite(event){
        alert("We will send a email to him.");
        this.setState({invited:true});
        //need to check if it is same as the password
        event.preventDefault();
    }

    render() {
        return (
          <div className="App">
              <h2 className="Text">Hey! We find a matching for you.</h2> 
              <form name="PasswordRegister" onSubmit={this.handleConfirm}>
                  <div>
                      <img src={kubo} width="100" height="120" />
                      <h3 className="Result">{this.props.name}</h3>
                      <div>{this.props.email}</div>
                  </div>

                  <div>
                      <button className="Button" 
                      onClick={this.handleInvite} onChange ={this.handleInvite}
                       value="Invite">Invite</button>
                  </div>
              </form> 
          </div>
          );
    }
}

export default Results;
