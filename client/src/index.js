import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import NewLandingRegister from './NewLandingRegister';
import NewPasswordRegister from './NewPasswordRegister';
import NewEmailRegister from './NewEmailRegister';
import AcademeInfo from './AcademeInfo';
import Career from './Career';
import Login from './Login';
import Results from './Results';
import GymBuddy from './GymBuddy';
import Casual from './casual/Casual';
import Hobby from './casual/Hobby';

import ResultNotMatched from './ResultNotMatched';
import NewRegisterSuccess from './NewRegisterSuccess';

import Daily from './casual/Daily';

ReactDOM.render(
	<BrowserRouter>
	  <div>
	    <Route exact path="/" component={NewLandingRegister} />
	    <Route path='/email' component={NewEmailRegister}/>
	    <Route 
			path='/registered' 
			render={(props) => <NewRegisterSuccess {...props} />}
		/>
    	<Route path='/login' component={Login} />
    	<Route 
    		path='/academic'
    		render={(props) => <AcademeInfo {...props} />}
    	/>
    	<Route 
    		path='/career'
    		render={(props) => <Career {...props} />}
    	/>
		<Route 
    		path='/sport'
    		render={(props) => <GymBuddy {...props} />}
    	/>
    	<Route
    		path='/matched'
    		render={(props) => <Results {...props} />}
		/>
		<Route
    		path='/casual'
    		render={(props) => <Casual {...props} />}
		/>
		 <Route	
		 	path='/hobby'
    		render={(props) => <Hobby {...props} />}
		/>
		<Route
    		path='/daily'
    		render={(props) => <Daily {...props} />}
		/>
		<Route 
			path='/unmatched' 
			render={(props) => <ResultNotMatched {...props} />}
		/>
		<Route path='/password' component={NewPasswordRegister}/>
	  </div>
	</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
