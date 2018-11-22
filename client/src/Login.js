import React, { Component } from 'react';

class Login extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            email:'userid@uwaterloo.ca',
            password:'**********',
            submitted: false,
            keepSignIn: false,
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
      const target = event.target;
      const value = target.type ==='checkbox' ? target.check : target.value;
      const name = target.name;
      this.setState({[name]:value});
    }
    handleSubmit(event){
      event.preventDefault();
      this.setStatet({submitted: true});
      //process input data here
    }
    render() {
      return (
        <div>
            <h1 classname="name">MeetUW</h1>
            <form name="login" onSubmit={this.handleSubmit}>
                <div classname="email">
                    <input type="text" value={this.state.email}
                    onChange={this.handleChange} />
                </div>

                <div classname="password">
                    <input type="text" value={this.state.password}
                    onChange={this.handleChange} />
                </div>
                <div>
                    < input type="submit" value="submit" />
                </div>
                <div> 
                    <input name="keepSignIn" type="checkbox" value="keep me sign in" 
                    checked={this.state.keepSignIn} 
                    onChange={this.handleChange}/>
                    <input type="submit" value="Forget"/>
                </div>
            </form> 
        </div>
        );
    }
}

export default Login;
