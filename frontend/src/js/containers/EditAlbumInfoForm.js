import React, { Component } from "react";

import { connect } from 'react-redux';
import { patchAlbumInfo } from '../actions';


class EditAlbumInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        }
    }

    handleNameChange(e) {
        this.setState({
            name: e.currentTarget.value,
        })
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.currentTarget.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { patchAlbumInfo } = this.props;
        const { albumId } = this.props.match.params;
        patchAlbumInfo(albumId, this.state);
    }

    render() {
        // console.log(this.props);
        return(
            <form action="" method="patch" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)} >
                <div className="form__row form__title">
                    Edit Album Info
                </div>
                <div className="form__row">
                    <label htmlFor="albumName">Album Name</label>
                    <input type="text" name="name" id="albumName" defaultValue={this.props.name} onChange={this.handleNameChange.bind(this)} />
                </div>
                <div className="form__row">
                    <label className="forTextarea" htmlFor="personalDescription">Album Description</label>
                    <textarea type="text" name="description" id="albumDescription" rows="5" defaultValue={this.props.description} onChange={this.handleDescriptionChange.bind(this)} />
                </div>
                <div className="form__row">
                    <button type="submit" className="btn">Submit</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
  name: state.albumInfo.name,
  description: state.albumInfo.description,
})

const mapDispatchToProps = dispatch => ({
  patchAlbumInfo: (albumId, data) => dispatch(patchAlbumInfo(albumId, data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditAlbumInfoForm)
