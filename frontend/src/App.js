import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import './css/index.css';

import HomePage from "./js/pages/HomePage";
import UserPage from "./js/pages/UserPage";
import AlbumPage from "./js/pages/AlbumPage";

class App extends React.Component {
	render() {
		return(
			<Router>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/user/:userId' component={UserPage} />
				<Route path='/user/:userId/album/:albumId' component={AlbumPage} />
			</Router>
		)
	}
}

export default App



