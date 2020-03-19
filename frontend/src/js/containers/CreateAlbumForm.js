import React, { Component } from "react";

import { connect } from 'react-redux';
import { showCard } from '../actions';
import axios from 'axios';

class EditPersonalInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ''
        }
    }

    handleChange(e) {
        this.setState({
            description: e.currentTarget.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { patchUserInfo } = this.props;
        const { userId } = this.props.match.params;
        patchUserInfo(userId, this.state.description);
    }

    render() {
        // console.log(this.props);
        return(
            <form action="" method="patch" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form__row form__title">
                    Edit Personal Info
                </div>
                <div className="form__row">
                    <label className="forTextarea" htmlFor="personalDescription">Personal Description</label>
                    <textarea type="text" name="description" id="personalDescription" rows="5" defaultValue={this.props.description} onChange={this.handleChange.bind(this)} />
                </div>
                <div className="form__row">
                    <button type="submit" className="btn">Submit</button>
                </div>
            </form>
        )
    }
}

class CreateAlbumForm extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        const { showCard } = this.props;
        const form = document.querySelector('.formInCard form');
        const formData = new FormData(form);
        const { userId } = this.props.match.params;
        formData.append('userId', userId); 

        axios({
            method: 'post',
            url: 'http://localhost:3006/upload/',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                console.log(response);
                
            })
            .then(()=>{
                showCard(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        // console.log(this.props);
        return(
            <form action="http://localhost:3006/upload/" method="post" encType="multipart/form-data">
                <div className="form__row form__title">
                    Create a New Album
                </div>
                <div className="form__row">
                    <label htmlFor="albumName">Album Name</label>
                    <input type="text" name="name" id="albumName" />
                </div>
                <div className="form__row">
                    <label className="forTextarea" htmlFor="albumDescription">Album Description</label>
                    <textarea type="text" name="description" id="albumDescription" rows="5" />
                </div>
                <div className="form__row">
                    <label htmlFor="uploads">Upload Photos</label>
                    <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="uploads" multiple />
                </div>
                <div className="form__row">
                    <button type="submit" className="btn" onClick={this.handleSubmit.bind(this)}>Submit</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
  description: state.userInfo.description,
})

const mapDispatchToProps = dispatch => ({
  showCard: bool => dispatch(showCard(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAlbumForm)
