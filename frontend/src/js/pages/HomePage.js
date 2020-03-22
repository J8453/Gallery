import React, { Component } from "react";
import { Link } from 'react-router-dom';

import '../../css/home.css';

import Window from "../containers/Window"

import { connect } from 'react-redux';
import { login, showWindow, askForWindow } from '../actions';

class HomePage extends React.Component {

	handleLogout(e) {
		e.preventDefault();
		const { login } = this.props;
		login(false, '');
	}

	handleClick(windowTitle) {
		const { showWindow, askForWindow } = this.props;
		showWindow(true);
		askForWindow(windowTitle);
	}

	render() {
		const { isLoggedIn, currentUser } = this.props;
		return (
			<div>
				<div className="container">
					<Window />
					<div className="bg">
			            <div className="title">Gallery.co</div>
			            <div className="description">Customize your own photo gallery.</div>
			            { isLoggedIn && 
				            <div className="buttons">
				                <button className="btn" id="profileBtn"><Link to={`/user/${currentUser}`}>My Profile</Link></button>
			                	<button className="btn" onClick={this.handleLogout.bind(this)}>Logout</button>
				            </div>
				        }
				        { !isLoggedIn &&
					        <div className="buttons">
			                	<button className="btn" onClick={this.handleClick.bind(this, 'login')}>Login</button>
			                	<button className="btn" onClick={this.handleClick.bind(this, 'register')}>Register</button>
				            </div>
			        	}
			        </div>
			    </div>
			    <div className="container">
			    	some introduction :)
			    </div>
			</div>
        )
	}
}

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
  currentUser: state.app.currentUser
})

const mapDispatchToProps = dispatch => ({
  login: (bool, userId) => dispatch(login(bool, userId)),
  showWindow: bool => dispatch(showWindow(bool)),
  askForWindow: windowTitle => dispatch(askForWindow(windowTitle))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)


