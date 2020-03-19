import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { getImages, patchAlbumCover, toggleSelectMode, singleSelect, reviseSelectedIdArr, updateSingleSelectedId, deleteImages, previewPortrait } from '../actions';

import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Image from '../components/Image';

class Album extends React.Component {

	sizeFunctionalRow() {
		const contentArea = document.querySelector('.content');
		const functionalRow = document.querySelector('.content__functionalRow');

		let {
            offsetLeft: left,
            offsetWidth: width
        } = contentArea;
        let contentInfo = {
            left,
            width
        };
        functionalRow.style.width = `${contentInfo.width}px`;
        functionalRow.style.left = `${contentInfo.left}px`;
	}

	handleDelete() {
		const { selectedImages, deleteImages, toggleSelectMode } = this.props;
		if (selectedImages.length===0) return alert("you haven't selected anything.");
		// if (confirm('Are you sure?')) {
		// 	deleteImages(selectedImages);
		// 	toggleSelectMode();
		// } else {
		// 	return;
		// }
		deleteImages(selectedImages);
		toggleSelectMode();
	}

	handleConfirm() {
		// 就去patch
		const { patchAlbumCover, singleSelectedId, toggleSelectMode } = this.props;
		const { albumId } = this.props.match.params;
		patchAlbumCover(albumId, singleSelectedId);
		toggleSelectMode();
	}

	componentDidMount() {
		// console.log('componentDidMount');
		this.sizeFunctionalRow();
        window.addEventListener('resize', this.sizeFunctionalRow);

		const { getImages } = this.props;
		const { albumId } = this.props.match.params;
		getImages(albumId);
	}

	componentWillUnmount(){
        window.removeEventListener('resize', this.sizeFunctionalRow);
    }

	render() {
		// console.log('Album render');
		const { images, isGetImagesRequesting, isSelectMode, isSingleSelect, toggleSelectMode, reviseSelectedIdArr, updateSingleSelectedId, selectedImages, singleSelectedId, previewPortrait } = this.props;

		const { url } = this.props.match;
		const prevUrl = url.slice(0, url.indexOf('/album/'));

		const textCss = {
			textDecoration: 'none',
			color: '#CC543A',
			marginLeft: '10px'
		}
		const cssHide = {
			display: 'none'
		};
		const bgPink = {
			backgroundColor: '#F6E7E4'
		};
		
		return (
			<div className="content"  style={ isSelectMode ? bgPink : {} }>
				<div className="content__functionalRow" style={ isSelectMode ? bgPink : {} }>
					{ !isSelectMode && <Link to={prevUrl} style={textCss}>Back to Profile</Link> }
					{ !isSelectMode && <span style={textCss} onClick={toggleSelectMode}>Select</span> }
					{ isSelectMode && <span></span> }
					{ isSelectMode &&
						<span>
							{ !isSingleSelect && <span style={textCss} onClick={() => {if(window.confirm('Delete the item?')){this.handleDelete()};}}>Delete</span> }
							{ isSingleSelect && <span style={textCss} onClick={this.handleConfirm.bind(this)}>Confirm</span> }
							<span style={textCss} onClick={toggleSelectMode}>Cancel</span>
						</span>
					}
				</div>
				<div className="span"></div>
				{ isGetImagesRequesting && <Loader /> }
				{ images.map(image=>{
					return (
						<Image 
							key={image.id}
							imageId={image.id}
							src={image.src}
							isSelectMode={isSelectMode}
							toggleSelectModeCallback={reviseSelectedIdArr}
							isSingleSelect={isSingleSelect}
							singleSelectedId={singleSelectedId}
							updateSingleSelectedId={updateSingleSelectedId}
							previewPortrait={previewPortrait} />
					)
				}) }
			</div>
		)
	}
}

const mapStateToProps = state => ({
  isGetImagesRequesting: state.album.isGetImagesRequesting,
  images: state.album.images,
  isSelectMode: state.album.isSelectMode,
  selectedImages: state.album.selectedImages,
  isSingleSelect: state.album.isSingleSelect,
  singleSelectedId: state.album.singleSelectedId,
})

const mapDispatchToProps = dispatch => ({
	getImages: albumId => dispatch(getImages(albumId)),
	toggleSelectMode: () => dispatch(toggleSelectMode()),
	reviseSelectedIdArr: imageId => dispatch(reviseSelectedIdArr(imageId)),
	deleteImages: imageIdArr => dispatch(deleteImages(imageIdArr)),
	updateSingleSelectedId: imageId => dispatch(updateSingleSelectedId(imageId)),
	previewPortrait: imageId => dispatch(previewPortrait(imageId)),
	patchAlbumCover: (albumId, imageId) => dispatch(patchAlbumCover(albumId, imageId))
})

const AlbumWithRouter = withRouter(Album);

export default connect(mapStateToProps, mapDispatchToProps)(AlbumWithRouter)