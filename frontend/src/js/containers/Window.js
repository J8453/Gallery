import React, { Component } from "react";

import { connect } from 'react-redux';
import { showWindow } from '../actions';

import RegisterForm from "../containers/RegisterForm";
import LoginForm from "../containers/LoginForm";

class Window extends React.Component {
    constructor(props) {
        super(props);
        this.windowElem = React.createRef();
    }

    closeWindow(e) {
        const { showWindow } = this.props;
        const windowArea = this.windowElem.current;
        if (e.target===windowArea) showWindow(false);
    }

    render() {
        const { windowIsShown, windowTitle } = this.props;
        if (!windowIsShown) return null;
        return(
            <div className="window" ref={this.windowElem} onClick={this.closeWindow.bind(this)}>
            { (windowTitle==='register') && <RegisterForm /> }
            { (windowTitle==='login') && <LoginForm /> }
            </div>
        )
    }
}

const mapStateToProps = state => ({
  windowIsShown: state.app.windowIsShown,
  windowTitle: state.app.windowTitle
})

const mapDispatchToProps = dispatch => ({
  showWindow: bool => dispatch(showWindow(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Window)
