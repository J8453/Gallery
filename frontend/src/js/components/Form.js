import React, { Component } from "react";
import { withRouter } from "react-router";

import EditPersonalInfoForm from '../containers/EditPersonalInfoForm';
import EditAlbumInfoForm from '../containers/EditAlbumInfoForm';
import CreateAlbumForm from '../containers/CreateAlbumForm';
import AddPhotosForm from '../containers/AddPhotosForm';
import UpdateAvatarForm from '../containers/UpdateAvatarForm';

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

const FormWithRouter = withRouter(Form);

export default FormWithRouter;
