import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import Picture2 from './picture/Picture2.png';
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
                 <img src={Picture2} width="100" height="80" />
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
