import React, { Component } from "react";
import { connect } from 'react-redux';
import { login, setCurrentUser, showWindow } from '../actions';
import axios from 'axios';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
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

    handlePasswordConfirmChange(e) {
        this.setState({
            passwordConfirm: e.currentTarget.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.username || !this.state.password || !this.state.passwordConfirm) {
            this.setState({
                message: 'all fields are required.'
            })
            return;
        }
        if (this.state.password!==this.state.passwordConfirm) {
            this.setState({
                message: 'the password confirm discords with the password.'
            });
            return;
        }

        const { login, setCurrentUser, showWindow } = this.props;
        axios.post('https://thegallery.onthewifi.com/backend/register', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response=>{
                login(true);
                setCurrentUser(response.data.user);
                localStorage.setItem('token', response.data.jwt);
                showWindow(false);
            })
            .catch(err=>{
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
                    Register
                </div>
                <div className="form__row">
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" onChange={this.handleUsernameChange.bind(this)} />
                </div>
                <div className="form__row">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" onChange={this.handlePasswordChange.bind(this)} />
                </div>
                <div className="form__row">
                    <label htmlFor="password">password confirm</label>
                    <input type="password" name="confirm" onChange={this.handlePasswordConfirmChange.bind(this)} />
                </div>
                 { this.state.message && 
                    <div className="form__row">
                        <span style={messageCss}>{`* ${this.state.message}`}</span>
                    </div>
                }
                <div className="form__row">
                    <button type="submit" className="btn">Create Account</button>
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

export default connect(null, mapDispatchToProps)(RegisterForm)