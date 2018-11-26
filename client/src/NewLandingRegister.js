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
          category: '',
          responseToPost: '',
          loginValid: false,
          error: ''
        };
        
        this.handleCateogryChange = this.handleCateogryChange.bind(this);
    }


    handleTryout = async e => {
        e.preventDefault();
        
        // Input Validation
        if (this.state.category === ''){
            this.setState({ error:'Must select a category' })
            return;
        }
        
        this.setState({ loginValid: true });

    };

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
            <p className="Error">{this.state.error}</p>
            </div>
        );
    }
}

export default withRouter(NewLandingRegister)
