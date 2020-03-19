import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from 'axios';

import EditPersonalInfoForm from '../containers/EditPersonalInfoForm';
import EditAlbumInfoForm from '../containers/EditAlbumInfoForm';
import CreateAlbumForm from '../containers/CreateAlbumForm';

class Form extends React.Component {
    render() {
        // console.log(this.props);
        const { formTitle } = this.props;
        return (
            <div className="formInCard">
                { (formTitle==='Update Avatar') && <UpdateAvatarForm {...this.props} /> }
                { (formTitle==='Edit Personal Info') && <EditPersonalInfoForm {...this.props} /> }
                { (formTitle==='Create a New Album') && <CreateAlbumForm {...this.props}/> }
                { (formTitle==='Edit Album Info') && <EditAlbumInfoForm {...this.props} /> }
                { (formTitle==='Add Photos') && <AddPhotosForm {...this.props} /> }
            </div>
        )
    }
}

class UpdateAvatarForm extends React.Component {

    handleInputChange() {
        const inputElem = document.querySelector('.formInCard form input');
        const previewImg = document.querySelector('.form__updateAvatar--preview img');

        const file = inputElem.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            document.querySelector('.form__updateAvatar--preview').style.display = 'flex';
            previewImg.setAttribute('src',reader.result);
        };
        reader.onerror = () => {
            console.log(reader.error);
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const { showCard } = this.props;
        const form = document.querySelector('.formInCard form');
        const formData = new FormData(form);

        axios({
            method: 'post', /**/
            url: 'http://localhost:3006/upload/', /**/
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
          })
          .then(function (response) {
            console.log(response);
          })
          .then(()=>{
            showCard(false);
            // 
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        const hideCss = {
            display: 'none'
        }

        return(
            <form action="/upload/avatar" method="post" encType="multipart/form-data">
                <div className="form__row form__title">
                    Update Personal Avatar
                </div>
                <div className="form__row">
                    <label htmlFor="upload">Choose a Photo</label>
                    <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="upload" onChange={this.handleInputChange.bind(this)}/>
                </div>
                <div className="form__row">
                    <div className="form__updateAvatar--preview" style={hideCss}>
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="form__row">
                    <button type="submit" className="btn">Upload</button>
                </div>
            </form>
        )
    }
}

class AddPhotosForm extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        // console.log(this.state)
        const { showCard } = this.props;
        const form = document.querySelector('.formInCard form');
        const formData = new FormData(form);
        const { userId, albumId } = this.props.match.params;
        formData.append('userId', userId);
        formData.append('albumId', albumId); 

        axios({
            method: 'post',
            url: 'http://localhost:3006/upload/album', /**/
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                console.log(response);
                // getImages(albumId); //或是寫addImages
            })
            .then(()=>{
                showCard(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log(this.props)
        return(
            <form action="http://localhost:3006/upload/album" method="post" encType="multipart/form-data" id="addPhotosForm">
                <div className="form__row form__title">
                    Add photos
                </div>
                <div className="form__row">
                    <label htmlFor="uploads">Upload Photos</label>
                    <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="uploads" multiple />
                </div>
                <div className="form__row">
                    <button type="submit" className="btn">Upload</button>
                </div>
            </form>
        )
    }
}

const FormWithRouter = withRouter(Form);

export default FormWithRouter;
