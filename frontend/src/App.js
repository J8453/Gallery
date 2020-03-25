import React, { Component } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, setCurrentUser } from './js/actions'

import HomePage from "./js/pages/HomePage";
import UserPage from "./js/pages/UserPage";
import AlbumPage from "./js/pages/AlbumPage";

import './css/index.css';

class App extends React.Component {
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) {
			// do sth to authenticate
			// this.props.login(true);
			// this.props.setCurrentUser();
		}
	}
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

const mapDispatchToProps = dispatch => ({
  login: bool => dispatch(login(bool)),
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App)



