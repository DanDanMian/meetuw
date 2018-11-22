import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {program: '', category: '' };

    this.handleProgramChange = this.handleProgramChange.bind(this);
    this.handleCateogryChange = this.handleCateogryChange.bind(this);
  }

  handleProgramChange(event){
    this.setState({program: event.target.value});
  }

  handleCateogryChange(event){
    this.setState({category: event.target.value});
  }

  handleTryout(event){
    alert('A student submit with' + this.program.value + " with intended category" + this.category.value);
    event.preventDefault();
  }

  handleLogin(event){
    fetch('./login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        program: "CS",
        category: "Academic",
      })
    }).then(response => response.json())
    console.log('Login')
    //alert('A student submit with' + this.program.value + " with intended category" + this.category.value);
    //event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div>
          <div>Logo</div>
          <div>UW Meet</div>
        </div>
        <form onSubmit={this.handleTryout}>
           <label>I am a UW student in</label>
            <label>
              <input type="text" value={this.state.program} onChange={this.handleProgramChange} />
               Program.
            </label>
            <label>I am looking for </label>
            <label>
              <input type="text" value={this.state.category} onChange={this.handleCateogryChange} /> 
            </label>
            <input type="submit" value="Tryout" />
        </form>
        <button onClick={this.handleLogin} value="Login">Login</button>
        <div>TEST: {this.props.program} {this.props.category}</div>
      </div>
    );
  }
}

export default App;
