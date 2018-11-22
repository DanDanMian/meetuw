import React, { Component } from 'react';

class NewEmailRegister extends Component {
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
    this.setStatet({category: event.target.value});
  }


  render() {
    return (
       <form onSubmit={this.handleSubmit}>
       <label>I am a UW student in</label>
        <label>
          <input type="text" value={this.state.program} onChange={this.handleProgramChange} />
           Program.
        </label>
        <label>I am looking for </label>
        <label>
          <input type="text" value={this.state.category} onChange={this.handleCateogryChange} /> 
        </label>
        <input type="submit" value="Submit" />
        <input type="submit" value="Tryout" />
      </form>
    );
  }
}

export default NewEmailRegister;
