import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {withStyles} from "@material-ui/core/styles";
import hobby from "../picture/hobby.png";
import daily from "../picture/daily.png";

import Card from "@material-ui/core/Card";


import "../App.css";
import { CardHeader, CardMedia, CardContent, Grid } from "@material-ui/core";



class Casual extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      category: "",
      responseToPost: "",
      error: ""
    };

    this.handleCateogryChange = this.handleCateogryChange.bind(this);
  }


  handleCateogryChange(option) {
    this.setState({ category: option.label });
  }

  render() {

    return (
      <div className="App">
        <div>
          <h2 className="Logo">MeetUW</h2>
        </div>
          <h2 className="Text">
          Casual
          </h2>
          <div>
          <br/>
          <Grid container spacing={0} direction="column"
          alignItems="center" justify="center" style={{minHeight: '100vh'}}>
          <Card style = {{width:'75%'}} >
            <CardMedia style={{height:0,paddingTop:'100%'}} image={daily}></CardMedia>

          </Card>
          <br />
          <Card style = {{width:'75%'}} >

            <CardMedia style={{height:0,paddingTop:'100%'}} 
            image={hobby}
            title="Hobby"></CardMedia>

          </Card>

          </Grid>
          </div>

          <br />
          <br />
        <br />
        <p className="Error">{this.state.error}</p>
      </div>
    );
  }
}

export default Casual;
