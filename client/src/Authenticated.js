import React from "react";
import { withRouter } from "react-router-dom";

/* export default function requireAuth(Component){
  class AuthenticatedComponent extends React.Component {
    async componentWillMount() {
      this.checkAuth();
    }

    checkAuth = async event => {
      event.preventDefault();

      const response = await fetch("/api/isloggedin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const body = await response.text();
      console.log(body);

      if (body !== "SUCCESS") {
        this.props.history.push({ pathname: "/login" });
      }
    };

    render() {
      return this.props.isLoggedIn ? <Component {...this.props} /> : null;
    }
  }

  return withRouter(AuthenticatedComponent);
}

export default withRouter(AuthenticatedComponent) */

export default Component =>
  class AuthenticatedComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        isLoggedIn: false
      };
    }

    async componentWillMount() {
      const response = await fetch("/api/isloggedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const body = await response.text();
      
      if (body !== "SUCCESS") {
        this.state.isLoggedIn = false;
        this.props.history.push({ pathname: "/login" });
      } else {
        this.state.isLoggedIn = true;
      }
    }

    async componentWillUpdate() {
      const response = await fetch("/api/isloggedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const body = await response.text();
      
      if (body !== "SUCCESS") {
        this.state.isLoggedIn = false;
        this.props.history.push({ pathname: "/login" });
      } else {
        this.state.isLoggedIn = true;
      }
    }

    async componentDidMount() {
      const response = await fetch("/api/isloggedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const body = await response.text();
      
      if (body !== "SUCCESS") {
        this.state.isLoggedIn = false;
        this.props.history.push({ pathname: "/login" });
      } else {
        this.state.isLoggedIn = true;
      }
    }

    render() {
      return this.state.isLoggedIn ? <Component {...this.props} /> : null;
    }
  };
