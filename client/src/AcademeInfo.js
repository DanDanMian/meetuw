import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'react-dropdown/style.css';
import './App.css';



class AcademeInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
        term: '',
        subject:'',
        number: '',
        error:''
    };
    this.term_onSelect = this.term_onSelect.bind(this);
    this.sub_onSelect = this.sub_onSelect.bind(this);
    this.num_onSelect = this.num_onSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  term_onSelect (option) {
    console.log('You selected ', )
    this.setState({term: option});

  }   
  sub_onSelect (option) {
    console.log('You selected ', )
    this.setState({subject: option});

  }   

  num_onSelect (option) {
    console.log('You selected ', )
    this.setState({number: option});
  }   

  handleSubmit = async e => {
    console.log("state body: "+this.state.term+' '+this.state.subject+' '+this.state.number);
    e.preventDefault();
    const response = await fetch('/api/match_request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({term: this.state.term,
      subject: this.state.subject, number: this.state.number}),
    });
    const body = await response.text();

    this.setState({responseToPost:body});
  }


  render() {
    const { error, subject,term,number, items } = this.state;
    const termOptions = ['Fall','Spring','Winter'];
    const termDfaultOption = this.state.term;

    const subOptions = ['AB','ACC','ACINTY','CLAS','CS','CM','MATH','SCI','PHYS','PMATH']; 
    const subDfaultOption = this.state.subject;

    const numOptions = ['115','116','245','256','349','350','452','486','680','458'];
    const numDfaultOption = this.state.number;

    return (
      <div className="App">
        <div>
          <h2 className="Logo">MeetUW</h2>
          <h2 className="Text">Add More Info</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h3 className="Text">Select a Term </h3>
            <Dropdown
            className="Dropdown"
            name = "term"
            options={termOptions}
            value={this.state.term}
            onChange={this.term_onSelect}
            placeholder=""/>
            <br/>
            <h3 className="Text"> Select a Subject</h3>
            <Dropdown
            className="Dropdown"
            name = "subject"
            options={subOptions}
            value={this.state.subject}
            onChange={this.sub_onSelect}
            placeholder=""/>
            <br/>
            <h3 className="Text"> Select a Course Number</h3>
            <Dropdown
            className="Dropdown"
            name = "number"
            options={numOptions}
            value={this.state.number}
            onChange={this.num_onSelect}
            placeholder=""/>
            <br/>
            <br/>
          </label>

            <Link to="/match">
                  <input type="submit" value="submit" 
                      onChange ={this.handleSubmit} />
            </Link>
            <button to="/match">
                  <input type="submit" value="submit(test)" 
                      onChange ={this.handleSubmit} />
            </button>
            <p>{this.state.responseToPost}</p>
            </form>
      </div>
    );
  }
}

export default AcademeInfo;
