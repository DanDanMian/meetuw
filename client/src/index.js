import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import "./index.css";
import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";

import NewLandingRegister from "./NewLandingRegister";
import NewPasswordRegister from "./NewPasswordRegister";
import NewEmailRegister from "./NewEmailRegister";
import AcademeInfo from "./AcademeInfo";
import Career from "./Career";
import Login from "./Login";
import Results from "./Results";
import Casual from "./casual/Casual";
import Hobby from "./casual/Hobby";
import Menu from "./Menu";
import ResultNotMatched from "./ResultNotMatched";
import NewRegisterSuccess from "./NewRegisterSuccess";

import Daily from "./casual/Daily";
import Profile from "./Profile";
import ProfileOther from "./ProfileOther";
import requireAuth from "./Authenticated";
import resetPassword from "./resetPassword";
import passwordActivite from "./passwordActivite";
import AccountActivite from "./AccountActivite";

import Matches from "./Matches";
import Message from "./Message";
import Admin from "./Admin";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={NewLandingRegister} />
      <Route exact path="/admin" component={Admin} />
      <Route path="/email" component={NewEmailRegister} />
      <Route
        path="/registered"
        render={props => <NewRegisterSuccess {...props} />}
      />
      <Route path="/login" component={Login} />
      <Route path="/menu" render={props => requireAuth(Menu)({ ...props })} />
      <Route exact path="/profile" component={requireAuth(Profile)} />
      <Route path="/profile/:profileId" component={ProfileOther} />
      <Route
        path="/matches"
        render={props => requireAuth(Matches)({ ...props })}
      />
      <Route
        path="/academic"
        render={props => requireAuth(AcademeInfo)({ ...props })}
      />
      <Route path="/activite" component={AccountActivite} />
      <Route
        path="/career"
        render={props => requireAuth(Career)({ ...props })}
      />
      <Route
        path="/matched"
        render={props => requireAuth(Results)({ ...props })}
      />
      <Route
        path="/casual"
        render={props => requireAuth(Casual)({ ...props })}
      />
      <Route path="/hobby" render={props => requireAuth(Hobby)({ ...props })} />
      <Route path="/daily" render={props => requireAuth(Daily)({ ...props })} />
      <Route
        path="/unmatched"
        render={props => requireAuth(ResultNotMatched)({ ...props })}
      />
      <Route path="/password" component={NewPasswordRegister} />
      <Route
        path="/message"
        render={props => requireAuth(Message)({ ...props })}
      />
      <Route path="/resetpassword" component={resetPassword} />
      <Route path="/passwordactivite" component={passwordActivite} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
