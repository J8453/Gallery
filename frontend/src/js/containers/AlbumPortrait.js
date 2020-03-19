import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { showCard, askForForm, getAlbumInfo, toggleSelectMode, singleSelect } from '../actions';
import Portrait from '../components/Portrait';

class AlbumPortrait extends React.Component {

  handleClickForUpdateCover() {
    const { toggleSelectMode, singleSelect } = this.props;
    toggleSelectMode();
    singleSelect(true);
  }

  handleClickForEdit(formTitle) {
    const { showCard, askForForm } = this.props;
    askForForm(formTitle);
    showCard(true);
  }

  componentDidMount() {
  	const { getAlbumInfo } = this.props;
  	const { albumId } = this.props.match.params;
  	getAlbumInfo(albumId);
  }

  shouldComponentUpdate(nextProps, nextState) {
  	if (this.props.match.params.albumId !== nextProps.match.params.albumId) {
  		const { getAlbumInfo } = this.props;
  		const { albumId } = nextProps.match.params;
  		getAlbumInfo(albumId);
  	};
  	return true;
  }

  render() {
    // console.log('render');
    // console.log(this.props);
    const { maskText, editText, btnText } = this.props;
    const { isLoggedIn, currentUser, name: albumName, description, coverSrc, previewSrc } = this.props;
    return (
    	<Portrait 
    		maskText={maskText}
    		maskCallback={this.handleClickForUpdateCover.bind(this)}
    		editCallback={this.handleClickForEdit.bind(this, editText)}
    		btnText={btnText}
    		btnCallback={this.handleClickForEdit.bind(this, btnText)}

    		coverSrc={ previewSrc ? previewSrc : coverSrc }
    		title={albumName}
    		description={description}

    		isLoggedIn={isLoggedIn}
    		currentUser={currentUser}
    	/>
    )
  }
}

const AlbumPortraitWithRouter = withRouter(AlbumPortrait);

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
  currentUser: state.app.currentUser,
  name: state.albumInfo.name,
  description: state.albumInfo.description,
  coverSrc: state.albumInfo.coverSrc,
  previewSrc: state.albumInfo.previewSrc
})

const mapDispatchToProps = dispatch => ({
  showCard: bool => dispatch(showCard(bool)),
  askForForm: formTitle => dispatch(askForForm(formTitle)),
  getAlbumInfo: albumId => dispatch(getAlbumInfo(albumId)),
  toggleSelectMode: () => dispatch(toggleSelectMode()),
  singleSelect: bool => dispatch(singleSelect(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPortraitWithRouter)