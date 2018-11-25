import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import Picture2 from './picture/Picture2.png';
import './App.css';

class NewLandingRegister extends Component {
    constructor(props){
        super(props);

        this.state = {
          response: '',
          program: '',
          category: '',
          responseToPost: '',
          loginValid: false
        };

        this.handleProgramChange = this.handleProgramChange.bind(this);
        this.handleCateogryChange = this.handleCateogryChange.bind(this);
    }

    userInputValidation(program){
      // If a not valid program 
      // return false
      return true;
    }


    handleTryout = async e => {
        e.preventDefault();

        console.log("TEST PROGRAM: ")
        console.log(this.state.program)
        
        if (!this.userInputValidation(this.state.program, this.state.category)){
            console.log("Validation False")
            return;
        }

        this.setState({ loginValid: true });

    };

    handleProgramChange(event){
        this.setState({program: event.target.value});
    }

    handleCateogryChange(event){
        this.setState({category: event.target.value});
    }

    render() {
        if (this.state.loginValid){
          this.props.history.push("/email");
        }

        return (
          <div className="App">
            <div>
              <div>                 
                 <img src={Picture2} width="100" height="80" />
              </div>
              <h2 className="Logo">MeetUW</h2>
            </div>
            <form onSubmit={this.handleTryout}>
                <h3 className="Text">I am a UW student in</h3>
                <label>
                <h3 className="Text"> in &nbsp;
                  <input  type="text" value={this.state.program} 
                  onChange={this.handleProgramChange} required/>
                </h3>
                </label>
                <h3 className="Text"> Program. I am looking</h3>
                <label>
                <h3 className="Text"> for a&nbsp;&nbsp;
                        <select id="category" name="category">
                          <option value={this.state.category} 
                            onChange={this.handleCateogryChange}>Study Buddy</option>
                        </select>
                    &nbsp;&nbsp;.
                  </h3>
                </label>
                <input type="submit" value="Tryout" required/>
            </form>
            <Link to="/login"><button>Login</button></Link>
          </div>
        );
    }
}

export default withRouter(NewLandingRegister)
