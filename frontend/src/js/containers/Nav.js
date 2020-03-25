import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { login, setCurrentUser, showWindow, askForWindow } from '../actions';

class Nav extends React.Component {

  handleLogout(e) {
    e.preventDefault();
		const { login, setCurrentUser } = this.props;
		login(false);
    setCurrentUser({});
    localStorage.removeItem('token');
	}

  handleClick(windowTitle, e) {
    e.preventDefault();
    const { showWindow, askForWindow } = this.props;
    askForWindow(windowTitle);
    showWindow(true);
  }

  render() {
    // console.log('Nav render');
    const { isLoggedIn, currentUser } = this.props;
    return (
        <div className="info__nav">
            { isLoggedIn &&
            	<ul>
                	<li className="info__nav--logo"><Link to="/">G</Link></li>
                	<li><Link to={`/user/${currentUser.id}`}>My Profile</Link></li>
                	<li><a href="/" onClick={this.handleLogout.bind(this)}>Logout</a></li>
            	</ul>
        	}
        	{ !isLoggedIn &&
        		<ul>
                	<li className="info__nav--logo"><Link to="/">G</Link></li>
                	<li><a href="/" onClick={this.handleClick.bind(this, 'login')}>Login</a></li>
                	<li><a href="/" onClick={this.handleClick.bind(this, 'register')}>Register</a></li>
            	</ul>
        	}
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav)