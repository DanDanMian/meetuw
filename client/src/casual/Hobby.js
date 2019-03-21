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



const categories = ["sport","music","film","book","art"];

const subFields = {"subfeild":[
    {
        "hobby":"sport",
        "fields": ["NBA","hockey","skating","bowling","marathon","soccer","tennis","football","baseball",
        "gymnastics","track & field","volleyball","judo","boxing","diving","fencing","badminton",
        "skiing"]
    },
    {
         "hobby":"music",
         "fields": ["pop","jazz","blues","rock & roll","classical","folk","funk","heavy metal",
         "country","rhythm and blues","new age music","soul gospel music","hip hop"]
    },
    {
      "hobby":"film",
      "fields": ["comedy","literary","romance","thriller","tragedy","sowordsmen film","detective film",
      "adventure film","documentary","horror film","action movie","crime & gangster film","science fiction film",
      "musical film","episc/historical film","narrative movie","war movie","ethical movie","cartoon","anime"]
    },
    {
      "hobby":"book",
      "fields":["historical novel","documentary fiction","science fiction","realistic novel","romantic novel","mystery novel",
      "horror fiction","biography","encyclopedia","fairy tale","adventure book","magazine","periodical"]
  },
  {
      "hobby":"art",
      "fields":["the renaissance","contemporary art","abstract art","avant-garde","realism","impressionism",
      "dadaism","neoclassical","calligraphy","photography","cave art","mural painting","engraving"]
  },

]};


class Hobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
        field:"",
        subfeild:"",
        fields:[]
    };
this.handleCategory = this.handleCategory.bind(this);
this.handleSubField = this.handleSubField.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

handleCategory(option) {

    this.state.field = option.label;
    //console.log(option.label);
    this.state.subfeild = "";
    const index = categories.indexOf(this.state.field);
    const select = subFields.subfeild[index].fields;
    this.setState({ fields: select});
}

handleSubField(option) {
  this.state.subfeild = option.label;
  //console.log(JSON.stringify(this.state));

 }

 handleSubmit = async e => {
  e.preventDefault();
  //console.log(JSON.stringify(this.state));
  // Form Validation
  if (this.state.field === "") {
    this.setState({ error: "field cannot be empty" });
    return;
  } else if (this.state.fields === "") {
    this.setState({ error: "subfields" });
    return;
  }


  const response = await fetch("/api/match_request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: this.props.location.state.name,
      email: this.props.location.state.email,
      category: this.props.location.state.field,
      preference:this.props.location.state.subfeild
    })
  });

  const body = await response.text();

  this.setState({ responseToPost: body });

  if (this.state.responseToPost === "unmatched") {
    this.props.history.push({
      pathname: "/unmatched",
      state: {
        name: this.props.location.state.name,
        email: this.props.location.state.email
      }
    });
  } else if (this.state.responseToPost !== "") {
    var userData = JSON.parse(this.state.responseToPost);
    this.props.history.push({
      pathname: "/matched",
      state: { name: userData.name, email: userData.email }
    });
  }
};

render() {
  
    return (
      <div className="App">
        <div>
          <h2 className="Logo">Hobby</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
        <h3 className="Text">Find Your Hobby</h3>
          <div>
          <br/>
          <br/>
          <Dropdown
                    className="Dropdown"
                    name="category"
                    options={categories}
                    value={this.state.field}
                    onChange={this.handleCategory}
                    placeholder="--"
                    required
                    />

          <br/>
          <br/>
          <h3 className="Text">Select Interested Field</h3>
          <br/>
          <Dropdown
                    className="Dropdown"
                    name="sub field"
                    options={this.state.fields}
                    value={this.state.subfeild}
                    onChange={this.handleSubField}
                    placeholder="--"
                    required
                    />
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <input type="submit" value="submit" onChange={this.handleSubmit} />
          </form>
          <br />
          <br />
        <br />
      </div>
    );
  }
}

export default Hobby;
