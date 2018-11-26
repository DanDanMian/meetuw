import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import Logo1 from './picture/Logo1.png';
import './App.css';

class NewRegisterSuccess extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
          <div className="App">
            <div>
              <div>                 
                 <img src={Logo1} width="100" height="100" />
              </div>
              <h2 className="Logo">MeetUW</h2>
            </div>
            <h3 className="Text">Registered Sucessfull. You could start explore now!</h3>
            <Link to="/academic"><button>Let's Rock</button></Link>
          </div>
        );
    }
}

export default withRouter(NewRegisterSuccess)
