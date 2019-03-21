import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Logo1 from "./picture/Logo1.png";
import "./App.css";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      category: "",
      responseToPost: "",
      tryoutValid: false,
      loginValid: false,
      error: ""
    };

    this.handleCateogryChange = this.handleCateogryChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = async e => {
    e.preventDefault();
    console.log(JSON.stringify(this.props.location.state.name));
    // Input Validation
    if (this.state.category === "") {
      this.setState({ error: "Must select a category" });
      return;
    }

    this.setState({ loginValid: true });
    if (this.state.category == "Academic") {
      this.props.history.push({
        pathname: "/academic",
        state: {
          name: this.props.location.state.name,
          email: this.props.location.state.email
        }
      });
    } else if (this.state.category == "Casual") {
      this.props.history.push({
        pathname: "/casual",
        state: {
          name: this.props.location.state.name,
          email: this.props.location.state.email
        }
      });
    } else {
      this.props.history.push({
        pathname: "/career",
        state: {
          name: this.props.location.state.name,
          email: this.props.location.state.email
        }
      });
    }
  };

  handleCateogryChange(option) {
    this.setState({ category: option.label });
  }

  render() {
    const categoryList = ["Academic", "Casual", "Career"];

    return (
      <div className="App">
        <div>
          <div>
            <img src={Logo1} width="100" height="100" alt="Logo" />
          </div>
          <h2 className="Logo">MeetUW</h2>
        </div>
        <form onSubmit={this.handleTryout}>
          <h3 className="Text">
            MeetUW can help you find people with the same preference.
          </h3>
          <h3 className="Text"> You are looking for a </h3>
          <Dropdown
            className="Dropdown"
            name="category"
            options={categoryList}
            value={this.state.category}
            onChange={this.handleCateogryChange}
            placeholder="--"
          />
          <h3 className="Text"> friend.</h3>
          <br />
          <br />
          <br />
          <br />
        </form>
        <br />
        <form onSubmit={this.handleSelect}>
          <input type="submit" value="Select" required />
        </form>
        <p className="Error">{this.state.error}</p>
      </div>
    );
  }
}

export default Menu;
