import React, { Component } from 'react';
import Picture1 from './picture/Picture1.png';
import Picture2 from './picture/Picture2.png';
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
          <div>                 
             <img src={Picture2} width="100" height="80" />
          </div>
          <h2 className="Logo">MeetUW</h2>
        </div>
        <form onSubmit={this.handleTryout}>
           <h3 className="Text">I am a UW student in</h3>
            <label>
            <h3 className="Text"> in &nbsp;
              <input  type="text" value={this.state.program} onChange={this.handleProgramChange} />
            </h3>
            </label>
            <h3 className="Text"> Program. I am looking</h3>
            <label>
            <h3 className="Text"> for a&nbsp;&nbsp;
                    <select id="category" name="category">
                      <option value={this.state.category} onChange={this.handleCateogryChange}>Study Buddy</option>
                    </select>
                &nbsp;&nbsp;.
              </h3>
            </label>
            <input  type="submit" value="Tryout" />
        </form>
        <button onClick={this.handleLogin} value="Login">Login</button>
        <div>TEST: {this.props.program} {this.props.category}</div>
      </div>
    );
  }
}

export default App;
