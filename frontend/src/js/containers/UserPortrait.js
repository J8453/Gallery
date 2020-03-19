import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { showCard, askForForm } from '../actions';
import { getUserInfo } from '../actions';
import Portrait from '../components/Portrait';

class UserPortrait extends React.Component {

  handleClickForEdit(formTitle) {
    const { showCard, askForForm } = this.props;
    askForForm(formTitle);
    showCard(true);
  }

  componentDidMount() {
  	const { getUserInfo } = this.props;
  	const { userId } = this.props.match.params;
  	getUserInfo(userId);
  }

  shouldComponentUpdate(nextProps, nextState) {
  	if (this.props.match.params.userId !== nextProps.match.params.userId) {
  		const { getUserInfo } = this.props;
  		const { userId } = nextProps.match.params;
  		getUserInfo(userId);
  	};
  	return true;
  }

  render() {
    // console.log('render');
    // console.log(this.props);
    const { maskText, editText, btnText } = this.props;
    const { isLoggedIn, currentUser, username, description, avatarSrc } = this.props;
    return (
    	<Portrait 
    		maskText={maskText}
    		maskCallback={this.handleClickForEdit.bind(this, maskText)}
    		editCallback={this.handleClickForEdit.bind(this, editText)}
    		btnText={btnText}
    		btnCallback={this.handleClickForEdit.bind(this, btnText)}

    		coverSrc={avatarSrc}
    		title={username}
    		description={description}

    		isLoggedIn={isLoggedIn}
    		currentUser={currentUser}
    	/>
    )
  }
}

const UserPortraitWithRouter = withRouter(UserPortrait);

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
  currentUser: state.app.currentUser,
  username: state.userInfo.username,
  description: state.userInfo.description,
  avatarSrc: state.userInfo.avatarSrc
})

const mapDispatchToProps = dispatch => ({
  showCard: bool => dispatch(showCard(bool)),
  askForForm: formTitle => dispatch(askForForm(formTitle)),
  getUserInfo: userId => dispatch(getUserInfo(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPortraitWithRouter)