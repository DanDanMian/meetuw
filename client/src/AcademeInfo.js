import React, { Component } from 'react';
import './App.css';




class AcademeInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
        term: '',
        subject:'',
        number: ''
    };
    this.initData();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  initData(){
    var apiToken = 'blarg';
    var uwapi = require('uwapi')(apiToken);
    uwapi.foodservicesSearch({}, {
      'calories.lt': 600}).
      then(console.log, console.error);
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]:value});
  }

  handleCurrentTerm(event){
    this.setState({program: event.target.value});
  }


  handleAddCourse(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]:value});  
    event.preventDefault();
  }


  handleSubmit(event){
      //add here
  }


  render() {
    return (
      <div className="App">
        <div>
          <h2 className="Logo">MeetUW</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
            <label>
            <h3 className="Text">Select Term </h3>
                <input  type="text" name="term" value={this.state.term} 
                onChange={this.handleChange} />
            <h3 className="Text"> Select Subject</h3>
                <input  type="text" name="subject" value={this.state.subject} 
                onChange={this.handleChange}/>
            <h3 className="Text"> Select Course Number</h3>
                <input  type="text" name="number" value={this.state.number}
                onChange={this.handleChange}/>
            </label>
            <input className="Button"  type="submit"  value="submit" />
        </form>
      </div>
    );
  }
}

export default AcademeInfo;
