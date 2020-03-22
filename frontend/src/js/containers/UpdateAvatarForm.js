import React, { Component } from "react";

import { connect } from 'react-redux';
import { patchUserAvatar } from '../actions';

class UpdateAvatarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ''
        }
    }

    handleFileChange(e) {
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
        this.setState({
            file: e.currentTarget.files,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { patchUserAvatar } = this.props;
        const { userId } = this.props.match.params;
        const formData = new FormData();
        const file = [...this.state.file];
        formData.append('image', file[0], 'userAvatar.jpg');
        formData.append('userId', userId);
        patchUserAvatar(formData);
        this.setState({
            file: ''
        })
    }

    render() {
        const hideCss = {
            display: 'none'
        }
        return(
            <form action="" method="post" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form__row form__title">
                    Update Personal Avatar
                </div>
                <div className="form__row">
                    <label htmlFor="upload">Choose a Photo</label>
                    <input type="file" accept="image/jpeg" name="image" id="upload" onChange={this.handleFileChange.bind(this)}/>
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

// const mapStateToProps = state => ({
// })

const mapDispatchToProps = dispatch => ({
  patchUserAvatar: (formData) => dispatch(patchUserAvatar(formData)),
})

export default connect(null, mapDispatchToProps)(UpdateAvatarForm)
