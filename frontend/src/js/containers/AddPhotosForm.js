import React, { Component } from "react";
import { connect } from 'react-redux';
import { addImages } from '../actions';

class AddPhotosForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: ''
        }
    }

    handleFilesChange(e) {
        this.setState({
            files: e.currentTarget.files,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { addImages } = this.props;
        const { userId, albumId } = this.props.match.params;
        const formData = new FormData();
        const files = [...this.state.files];
        files.forEach((file, index)=>{
            formData.append('image', file, `file${index}.jpg`);
        })
        formData.append('userId', userId);
        formData.append('albumId', albumId);
        addImages(formData); 
        // 現在這個動作做完之後會reload
    }

    render() {
        console.log(this.props);
        return(
            <form action="" method="post" encType="multipart/form-data" id="addPhotosForm" onSubmit={this.handleSubmit.bind(this)} >
                <div className="form__row form__title">
                    Add photos
                </div>
                <div className="form__row">
                    <label htmlFor="uploads">Upload Photos</label>
                    <input type="file" accept="image/jpeg" name="image" id="uploads" multiple onChange={this.handleFilesChange.bind(this)} />
                </div>
                <div className="form__row">
                    <button type="submit" className="btn">Upload</button>
                </div>
            </form>
        )
    }
}


const mapDispatchToProps = dispatch => ({
  addImages: formData => dispatch(addImages(formData))
})

export default connect(null, mapDispatchToProps)(AddPhotosForm)
