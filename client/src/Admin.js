import React, { Component } from "react";
import SignIn from "./SignIn";

class Admin extends Component {
  constructor(props){
    super(props);

    this.state ={

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    console.log(event.target.id);
    console.log(event.target.value);
  }

  handleSubmit(){
    console.log('submit');
  }

  render(){
    return(
      <div onChange={this.handleChange.bind(this)}>
        <SignIn handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
export default Admin;