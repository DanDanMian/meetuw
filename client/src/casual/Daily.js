import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";
import "../App.css";

const categories = ["gym buddy","game buddy","shopping buddy","meal buddy","traveling mate"];
const preferences = ["female","male"];
const genders = ["female", "male"];



class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {
        category:"",
        preference:"",
        gender:"",
    };
this.handleCategory = this.handleCategory.bind(this);
this.handlePreference = this.handlePreference.bind(this);
this.handleGender = this.handleGender.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

handleCategory(option) {

//console.log('You selected term'+option.label )
    this.state.category = option.label;
    console.log(JSON.stringify(this.state));

}
handlePreference(option) {
  //console.log('You selected term'+option.label )
  this.state.preference = option.label;
  console.log(JSON.stringify(this.state));
}


handleGender(option){
  //console.log('You selected term'+option.label )
  this.state.gender = option.label;
  console.log(JSON.stringify(this.state));
}

handleSubmit = async e => {
  e.preventDefault();
  // Form Validation
  if (this.state.category === "") {
    this.setState({ error: "category cannot be empty" });
    return;
  } else if (this.state.preference === "") {
    this.setState({ error: "preference" });
    return;
  }
  console.log("print course id before sumbit: ");

  var index= categories.indexOf(this.state.category);

  const response = await fetch("api/match_request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: this.props.location.state.name,
      email: this.props.location.state.email,
      category: this.state.category,
      preference:this.state.preference,
      gender:this.state.gender,
      id: index+1,
      userCase:"CasualDaily"
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
          <h2 className="Logo">Daily Life</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
        <h3 className="Text">Find the category</h3>

          <div>
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
                    <br/>
           <h3 className="Text">Select Gender Preference</h3>
           <br/>

                <Dropdown
                    className="Dropdown"
                    name="category"
                    options={preferences}
                    value={this.state.preference}
                    onChange={this.handlePreference}
                    placeholder="--"
                    required
                    />
          <br/>
          < h3 className="Text">Select Your Gender</h3>
          <br/>
          <Dropdown
                    className="Dropdown"
                    name="category"
                    options={genders}
                    value={this.state.gender}
                    onChange={this.handleGender}
                    placeholder="--"
                    required
                    />
          <br/>
          <br/>
          <br/>
          </div>
          <input type="submit" value="submit" onChange={this.handleSubmit} />
          </form>
          <br />
          <br />
        <br />
      </div>
    );
  }
}

export default Daily;
