import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import './App.css';

import Homepage from "../src/Pages/Homepage/Homepage";
import RegisterPage from "../src/Pages/RegisterPage/RegisterPage";

function App() {
	return (
		<div className="App">
			<h1>Poe Build Stash </h1>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route exact path="/register" component={RegisterPage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
