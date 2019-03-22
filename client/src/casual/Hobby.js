import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";
import "../App.css";



const categories = ["sport","music","film","book","art"];

const subFields = {"subfield":[
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
        subfield:"",
        fields:[]
    };
this.handleCategory = this.handleCategory.bind(this);
this.handleSubField = this.handleSubField.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

handleCategory(option) {

    this.state.field = option.label;
    //console.log(option.label);
    this.state.subfield = "";
    const index = categories.indexOf(this.state.field);
    const select = subFields.subfield[index].fields;
    this.setState({ fields: select});
}

handleSubField(option) {
  this.state.subfield = option.label;
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
  var index1= categories.indexOf(this.state.field);
  var index2= subFields.subfield[index1].fields.indexOf(this.state.subfield);


  const response = await fetch("/api/match_request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id1:index1+1,
      id2:index2+1,
      name: this.props.location.state.name,
      email: this.props.location.state.email,
      category: this.state.field,
      preference:this.state.subfield,
      userCase: "CasualHobby"
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
                    value={this.state.subfield}
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
