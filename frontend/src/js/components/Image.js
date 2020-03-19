import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Image extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSelected: false
		}
	}

	toggleSelectedState() {
		this.setState(()=>{
			return { isSelected: !this.state.isSelected }
		})
	}

	handleClick(imageId) {
		this.toggleSelectedState();
		const { toggleSelectModeCallback: reviseSelectedImageIdArr, updateSingleSelectedId, previewPortrait } = this.props;
		reviseSelectedImageIdArr(imageId);
		const { isSingleSelect } = this.props;
		if (isSingleSelect) {
			updateSingleSelectedId(imageId);
			// 預覽功能
			previewPortrait(imageId);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.isSelectMode===true && nextProps.isSelectMode===false && this.state.isSelected===true) {
			this.toggleSelectedState();
			return false;
		} else return true;
	}

	shouldShowSelectedCss() {
		const { imageId, isSelectMode, isSingleSelect, singleSelectedId } = this.props;
		if (isSelectMode && !isSingleSelect && this.state.isSelected) {
			return true;
		} else if (isSelectMode && isSingleSelect && imageId===singleSelectedId) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const selectedCss = {
			borderColor: '#CC543A60'
		}
		const notSelectedCss = {
			borderColor: 'transparent'
		}
		const { imageId, src, isSelectMode, isSingleSelect, selectedImages } = this.props;
		// const lastSelectedImage = selectedImages.pop();
		return (
			<div 
				className="content__img"
				style={ this.shouldShowSelectedCss() ? selectedCss : notSelectedCss }
			>
                { isSelectMode && <div className="mask" onClick={this.handleClick.bind(this, imageId)}></div>}
                <img src={src} alt="" />
            </div>
		)
	}
}

// style={ (isSelectMode && this.state.isSelected) ? selectedCss : notSelectedCss }

export default Image