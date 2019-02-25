import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "react-dropdown/style.css";
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import Select from '@material-ui/core/Select';
import hobby from "../picture/hobby.png";
import daily from "../picture/daily.png";
import P1 from "../picture/P1.png";

import Dropdown from "react-dropdown";


import GridListTileBar from '@material-ui/core/GridListTileBar';


import "../App.css";
import { CardHeader, CardMedia, CardContent, Grid, GridListTile,GridList } from "@material-ui/core";





class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {
        category:""
    };
this.handleCategory = this.handleCategory.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

handleCategory(option) {
//console.log('You selected term'+option.label )
    this.setState({ category: option.label });
}


handleSubmit(){

}

render() {
  const categories = ["gym buddy","game buddy","shopping buddy","meal buddy"];
    return (
      <div className="App">
        <div>
          <h2 className="Logo">Daily Life</h2>
        </div>
        <h3 className="Text">Find the category</h3>

          <div>
          <Grid container spacing={0} direction="column"
          alignItems="center" justify="center" style={{minHeight: '100vh'}}>
          <img src={P1} width="80%" height="80%" />
          <br/>
          <br/>
          <br/>

          <Dropdown
                    className="Dropdown"
                    name="category"
                    options={categories}
                    value={this.state.category}
                    onChange={this.handleCategory}
                    placeholder="--"
                    required
                    />

          </Grid>
          <br/>
          <br/>
          <br/>

          </div>
          <input type="submit" value="submit" onChange={this.handleSubmit} />
          <br />
          <br />
        <br />
      </div>
    );
  }
}

export default Daily;
