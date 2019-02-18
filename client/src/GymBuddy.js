import React, { Component } from "react";
import Dropdown from "react-dropdown";

import Logo1 from "./picture/Logo1.png";
import "react-dropdown/style.css";
import "./App.css";


class GymBuddy  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sport:""
        };
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCategory(option) {
    //console.log('You selected term'+option.label )
        this.setState({ sport: option.label });
    }


    handleSubmit(){

    }

    render(){
        const sports = ["badminton","baseball","basketball","hockey","skiing",
        "soccer","squash","swimming","tennis","volleyball","football","skating",
        "cycling","running","fitness"];
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
                <form onSubmit={this.handleSubmit}>
                    <h3 className="Text">Select Sport </h3>
                    <br />
                    <br />
                    <Dropdown
                    className="Dropdown"
                    name="sport"
                    options={sports}
                    value={this.state.sport}
                    onChange={this.handleCategory}
                    placeholder="--"
                    required
                    />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>
                    <input type="submit" value="submit" onChange={this.handleSubmit} />
                </div>
                </form>
                    <p className="Error">{this.state.error}</p>   
            </div>
        )

    }

}


export default GymBuddy;
