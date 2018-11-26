import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import UW from './picture/uw.png';
import Logo1 from './picture/Logo1.png';
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

    handleCateogryChange(option){
        this.setState({category: option.label});
    }

    render() {
        if (this.state.loginValid){
            this.props.history.push("/email");
        }

        var sectionStyle = {
            width: "100px",
            height: "100px",
            backgroundImage: "url(" + {UW } + ")"
        };
        const categoryList = ['study buddy'];
        return (
            <div className="App">
            <div >
                <div>  
                    <img src={Logo1} width="100" height="100" />
                </div>
                <h2 className="Logo">MeetUW</h2>
            </div >
            <form onSubmit={this.handleTryout}>
                <h3 className="Text">Welcome! MeetUW helps you find people with the same preference.</h3>
                <h3 className="Text"> You are looking for</h3>
                <Dropdown
                    className="Dropdown"
                    name = "category"
                    options = {categoryList}
                    value={this.state.category}
                    onChange={this.handleCateogryChange}
                    placeholder="--"/>
                <br/>
                <br/>
                <br/>
                <br/>
                <input type="submit" value="Tryout" required/>
            </form>
            <Link to="/login"><button>Explore</button></Link>
            </div>
        );
    }
}

export default withRouter(NewLandingRegister)
