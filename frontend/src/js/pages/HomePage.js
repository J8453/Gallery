import React, { Component } from "react";
import { Link } from 'react-router-dom';

import '../../css/home.css';

import Window from "../containers/Window"

import { connect } from 'react-redux';
import { login, setCurrentUser, showWindow, askForWindow } from '../actions';

class HomePage extends React.Component {

	handleLogout(e) {
		e.preventDefault();
		const { login, setCurrentUser } = this.props;
		login(false);
		setCurrentUser({});
		localStorage.removeItem('token');
	}

	handleClick(windowTitle) {
		const { showWindow, askForWindow } = this.props;
		showWindow(true);
		askForWindow(windowTitle);
	}

	render() {
		const { isLoggedIn, currentUser } = this.props;
		const spanCss = {
			color: '#CC543A',
			flex: '0 0 0'
		}
		return (
			<div>
				<div className="container">
					<Window />
					<div className="bg">
			            <div className="title">the<span style={spanCss}>G</span>allery</div>
			            <div className="description">Customize your own photo gallery.</div>
			            { isLoggedIn && 
				            <div className="buttons">
				                <button className="btn" id="profileBtn"><Link to={`/user/${currentUser.id}`}>My Profile</Link></button>
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
			</div>
        )
	}
}

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  login: bool => dispatch(login(bool)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  showWindow: bool => dispatch(showWindow(bool)),
  askForWindow: windowTitle => dispatch(askForWindow(windowTitle))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)


