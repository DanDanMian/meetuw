import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import NewLandingRegister from './NewLandingRegister';
import NewPasswordRegister from './NewPasswordRegister';
import NewEmailRegister from './NewEmailRegister';
import AcademeInfo from './AcademeInfo';
import Login from './Login';
import Results from './Results';

ReactDOM.render(
	<BrowserRouter>
	  <div>
	    <Route exact path="/" component={NewLandingRegister} />
    	<Route path='/login' component={Login} />
    	<Route path='/academic' component={AcademeInfo} />
    	<Route path='/match' component={Results} />
	  </div>
	</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
