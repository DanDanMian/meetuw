import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";
import "../App.css";
import Logo1 from "../picture/Logo1.png";
import UserIcon from "../picture/black-user-icon.png";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: `${theme.spacing.unit * 3}px`,
    paddingBottom: `${theme.spacing.unit * 3}px`
  }
});

const categories = ["sport", "music", "film", "book", "art"];

const subFields = {
  subfield: [
    {
      hobby: "sport",
      fields: [
        "NBA",
        "hockey",
        "skating",
        "bowling",
        "marathon",
        "soccer",
        "tennis",
        "football",
        "baseball",
        "gymnastics",
        "track & field",
        "volleyball",
        "judo",
        "boxing",
        "diving",
        "fencing",
        "badminton",
        "skiing"
      ]
    },
    {
      hobby: "music",
      fields: [
        "pop",
        "jazz",
        "blues",
        "rock & roll",
        "classical",
        "folk",
        "funk",
        "heavy metal",
        "country",
        "rhythm and blues",
        "new age music",
        "soul gospel music",
        "hip hop"
      ]
    },
    {
      hobby: "film",
      fields: [
        "comedy",
        "literary",
        "romance",
        "thriller",
        "tragedy",
        "sowordsmen film",
        "detective film",
        "adventure film",
        "documentary",
        "horror film",
        "action movie",
        "crime & gangster film",
        "science fiction film",
        "musical film",
        "episc/historical film",
        "narrative movie",
        "war movie",
        "ethical movie",
        "cartoon",
        "anime"
      ]
    },
    {
      hobby: "book",
      fields: [
        "historical novel",
        "documentary fiction",
        "science fiction",
        "realistic novel",
        "romantic novel",
        "mystery novel",
        "horror fiction",
        "biography",
        "encyclopedia",
        "fairy tale",
        "adventure book",
        "magazine",
        "periodical"
      ]
    },
    {
      hobby: "art",
      fields: [
        "the renaissance",
        "contemporary art",
        "abstract art",
        "avant-garde",
        "realism",
        "impressionism",
        "dadaism",
        "neoclassical",
        "calligraphy",
        "photography",
        "cave art",
        "mural painting",
        "engraving"
      ]
    }
  ]
};

class Hobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: "",
      subfield: "",
      fields: []
    };

    this.handleCategory = this.handleCategory.bind(this);
    this.handleSubField = this.handleSubField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCategory(option) {
    this.state.field = option.label;
    this.state.subfield = "";

    const index = categories.indexOf(this.state.field);
    const select = subFields.subfield[index].fields;

    this.setState({ fields: select });
  }

  handleSubField(option) {
    this.state.subfield = option.label;
  }

  handleSubmit = async e => {
    e.preventDefault();

    // Form Validation
    if (this.state.field === "") {
      this.setState({ error: "Hobby cannot be empty" });
      return;
    } else if (this.state.subfield === "") {
      this.setState({ error: "Interest cannot be empty" });
      return;
    }

    var index1 = categories.indexOf(this.state.field);
    var index2 = subFields.subfield[index1].fields.indexOf(this.state.subfield);

    const response = await fetch("/api/match_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id1: index1 + 1,
        id2: index2 + 1,
        name: this.props.location.state.name,
        email: this.props.location.state.email,
        category: this.state.field,
        preference: this.state.subfield,
        userCase: "Hobby"
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
        state: {
          name: userData.name,
          email: userData.email,
          myname: userData.myname,
          myemail: userData.myemail,
          type: userData.type
        }
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Paper className={classes.paper}>
          <div>
            <Link to="/profile">
              <img
                id="user-icon"
                src={UserIcon}
                width="50"
                height="50"
                alt="User-icon"
              />
            </Link>
            <img src={Logo1} width="150" height="80" alt="Logo" />
            <h2 className="Logo">MeetUW</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <h3 className="Text">Find Your Hobby</h3>
            <div>
              <br />
              <Dropdown
                className="Dropdown"
                name="category"
                options={categories}
                value={this.state.field}
                onChange={this.handleCategory}
                placeholder="--"
                required
              />

              <br />
              <h3 className="Text">Select Interested Field</h3>
              <br />
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
            <br />
            <br />
            <br />
            <br />
            <input type="submit" value="submit" onChange={this.handleSubmit} />
          </form>
          <p className="Error">{this.state.error}</p>
          <br />
          <br />
          <br />
        </Paper>
      </div>
    );
  }
}

Hobby.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hobby);
