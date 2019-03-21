import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo1 from "./picture/Logo1.png";
import "./App.css";

class ResultNotMatched extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false
    };

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack = async e => {
    e.preventDefault();
    this.setState({ submitted: true }, () => {
      if (this.state.submitted) {
        this.props.history.push({
          pathname: "/menu",
          state: {
            name: this.props.location.state.name,
            email: this.props.location.state.email
          }
        });
      }
    });
  };

  render() {
    // if (this.state.submitted){
    //     console.log("NOT MATCH BACK TO ACADEMIC");
    //     console.log(this.props.location.state.name);
    //     console.log(this.props.location.state.email)
    //     this.props.history.push({
    //         pathname: '/academic',
    //         state: {
    //             name: this.props.location.state.name,
    //             email: this.props.location.state.email
    //         }
    //     });
    // }

    return (
      <div className="App">
        <div>
          <div>
            <img src={Logo1} width="100" height="100" alt="Logo" />
          </div>
          <h2 className="Logo">MeetUW</h2>
        </div>
        <br />
        <br />
        <form onSubmit={this.handleBack}>
          <h3 className="Text">
            Sorry, we could not find a match for you. When we find a match, we
            will notify you by email. Thanks!
          </h3>
          <br />
          <br />
          <br />
          <br />
          <div>
            <form onSubmit={this.handleBack}>
              <input type="submit" value="Back to Menu Page" />
            </form>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default ResultNotMatched;
