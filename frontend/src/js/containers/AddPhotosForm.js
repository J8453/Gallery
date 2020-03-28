import React, { Component } from "react";
import { connect } from 'react-redux';
import { addImages } from '../actions';
import axios from 'axios';

import FormLoader from '../components/FormLoader';

class AddPhotosForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: '',
            isSubmitting: false
        }
    }

    handleFilesChange(e) {
        this.setState({
            files: e.currentTarget.files,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        });
        const { addImages } = this.props;
        const { userId, albumId } = this.props.match.params;
        // const formData = new FormData();
        const files = [...this.state.files];
        // files.forEach((file, index)=>{
        //     formData.append('image', file, `file${index}.jpg`);
        // })
        // formData.append('userId', userId);
        // formData.append('albumId', albumId);
        // addImages(formData); 
        // 現在這個動作做完之後會reload
        const config = {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Client-ID 329e78071fa9118'
            }
        };
        const requests = files.map(file => {
            const data = new FormData();
            data.append('image', file);
            return axios.post('https://api.imgur.com/3/image', data, config);
        });
        Promise.all(requests)
            .then(responses => {
                const finalData = {
                    userId: userId,
                    albumId: albumId,
                    images: []
                };
                responses.forEach(res => {
                    finalData.images.push({
                        src: res.data.data.link,
                        deletehash: res.data.data.deletehash
                    });
                });
                return finalData;
            })
            .then(finalData=>{
                addImages(finalData);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        // console.log(this.props);
        return(
            <form action="" method="post" encType="multipart/form-data" id="addPhotosForm" onSubmit={this.handleSubmit.bind(this)} >
                <div className="form__row form__title">
                    Add photos
                </div>
                { this.state.isSubmitting && <FormLoader /> }
                { !this.state.isSubmitting &&
                    <div>
                        <div className="form__row">
                            <label htmlFor="uploads">Upload Photos</label>
                            <input type="file" accept="image/jpeg" name="image" id="uploads" multiple onChange={this.handleFilesChange.bind(this)} />
                        </div>
                        <div className="form__row">
                            <button type="submit" className="btn">Upload</button>
                        </div>
                    </div> }
            </form>
        )
    }
}


const mapDispatchToProps = dispatch => ({
  addImages: data => dispatch(addImages(data))
})

export default connect(null, mapDispatchToProps)(AddPhotosForm)
