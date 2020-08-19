import React, { Component } from "react";
import { connect } from 'react-redux';
import { login, setCurrentUser, showWindow } from '../actions';
import axios from 'axios';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        }
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.currentTarget.value,
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.currentTarget.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.username || !this.state.password) {
            this.setState({
                message: 'please fill in username and password.'
            })
            return;
        }
        
        const { login, setCurrentUser, showWindow } = this.props;

        axios.post(`${process.env.REACT_APP_API_URL}/login`, {
            username: this.state.username,
            password: this.state.password
        })
            .then(response=>{
                login(true);
                setCurrentUser(response.data.user);
                localStorage.setItem('token', response.data.jwt);
                showWindow(false);
            })
            .catch(err=> {
                // console.log(err.response);
                this.setState({
                    message: err.response.data
                })
            });
    }

    render() {
        const messageCss = {
            fontSize: '0.8em',
        };
        return (
            <form action="" method="post" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form__row form__title">
                    Login
                </div>
                <div className="form__row">
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" onChange={this.handleUsernameChange.bind(this)} />
                </div>
                <div className="form__row">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" onChange={this.handlePasswordChange.bind(this)} />
                </div>
                { this.state.message && 
                    <div className="form__row">
                        <span style={messageCss}>{`* ${this.state.message}`}</span>
                    </div>
                }
                <div className="form__row">
                    <button type="submit" className="btn">Submit</button>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  login: bool => dispatch(login(bool)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  showWindow: bool => dispatch(showWindow(bool))
})

export default connect(null, mapDispatchToProps)(LoginForm)
