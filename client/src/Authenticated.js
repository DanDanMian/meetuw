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
      fetch("/api/isLoggedIn", {
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
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return withRouter(AuthenticatedComponent);
}
