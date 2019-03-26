import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {withStyles} from "@material-ui/core/styles";
import hobby from "../picture/hobby.png";
import daily from "../picture/daily.png";

import Card from "@material-ui/core/Card";

import "../App.css";
import { Button } from "@material-ui/core";

class Casual extends Component {
  constructor(props) {
    super(props);
    this.state ={
      selected: false
    }

  this.handleDaily = this.handleDaliy.bind(this);
  this.handleHobby = this.handleHobby.bind(this);
  }

  handleDaliy = async e =>{
      e.preventDefault();
      this.setState({selected:true},()=>{
        if (this.state.selected){
          this.props.history.push({
            pathname:"/daily",
            state:{
              name: this.props.location.state.name,
              email:this.props.location.state.email
            }
          });
        }
      });
  };

  handleHobby = async e =>{
    e.preventDefault();
    this.setState({selected:true},()=>{
      if (this.state.selected){
        this.props.history.push({
          pathname:"/hobby",
          state:{
            name:this.props.location.state.name,
            email:this.props.location.state.email
          }
        });
      }
    });
};

  render() {

    return (
      <div className="App">
        <div>
          <h2 className="Logo">Casual</h2>
          <br />
          <br />
        </div>
          <div className = "Text">
          <Button variant="extendedFab" size="large" color="primary" onClick={this.handleDaliy}> Daily Life </Button>
          <br />
          <br />
          <br />

          <Button variant="extendedFab" size="large" color="black" onClick ={this.handleHobby}  > &nbsp;  &nbsp;Hobby &nbsp;&nbsp; </Button>
          </div>

          <br />
          <br />
        <br />
      </div>
    );
  }
}

export default Casual;
