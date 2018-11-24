import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import Picture1 from './picture/Picture1.png';
import Picture2 from './picture/Picture2.png';
import './App.css';

class NewLandingRegister extends Component {
  constructor(props){
    super(props);

    this.handleProgramChange = this.handleProgramChange.bind(this);
    this.handleCateogryChange = this.handleCateogryChange.bind(this);
  }

  state = {
    response: '',
    program: '',
    category: '',
    responseToPost: '',
  };

  handleSubmit = async e => {
    console.log(this.state.body);
    e.preventDefault();
    const response = await fetch('/testpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({program: this.state.program, category: this.state.category}),
    });
    const body = await response.text();

    this.setState({ responseToPost: body});
  };

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
              <input  type="text" value={this.state.program} 
              onChange={this.handleProgramChange} required/>
            </h3>
            </label>
            <h3 className="Text"> Program. I am looking</h3>
            <label>
            <h3 className="Text"> for a&nbsp;&nbsp;
                    <select id="category" name="category">
                      <option value={this.state.category} 
                      onChange={this.handleCateogryChange}>Study Buddy</option>
                    </select>
                &nbsp;&nbsp;.
              </h3>
            </label>
            <input type="submit" value="Tryout" required/>
        </form>
        <Link to="/login"><button>Login</button></Link>
      
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.program}
            onChange={e => this.setState({ program: e.target.value })}
          />
          <input
            type="text"
            value={this.state.category}
            onChange={e => this.setState({ category: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>

      </div>
    );
  }
}

export default withRouter(NewLandingRegister)
