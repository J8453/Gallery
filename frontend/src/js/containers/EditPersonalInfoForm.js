import React, { Component } from "react";

import { connect } from 'react-redux';
import { patchUserInfo } from '../actions';

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

const mapStateToProps = state => ({
  description: state.userInfo.description,
})

const mapDispatchToProps = dispatch => ({
  patchUserInfo: (userId, description) => dispatch(patchUserInfo(userId, description)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPersonalInfoForm)
