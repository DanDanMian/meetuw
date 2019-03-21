import React from "react";
import { withRouter, Redirect } from "react-router-dom";

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    constructor() {
      super();

      this.state = {
        isLoggedIn: false
      };
    }

    componentWillMount() {
      this.checkAuth();
    }

    componentDidMount() {
      this.checkAuth();
    }

    checkAuth() {
      fetch("/api/isloggedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.text())
        .then(data => {
          if (data === "FAIL") {
            console.log(data);
            this.setState({ isLoggedIn: false });
            this.props.history.push({ pathname: "/login" });
          } else {
            this.setState({ isLoggedIn: true });
          }
        });

      /* const body = await response.text();
      console.log(body);

      if (body !== "SUCCESS") {
        this.props.history.push({ pathname: "/login" });
      } */
    }

    render() {
      return <Component {...this.props} />;
      //return this.state.isLoggedIn ? <Component {...this.props} /> : <Redirect to={"/login"} />;
    }
  }

  return withRouter(AuthenticatedComponent);
}

//export default withRouter(AuthenticatedComponent)

/* export default (Component) =>
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
 */
