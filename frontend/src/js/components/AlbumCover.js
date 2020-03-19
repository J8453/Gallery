import React, { Component } from "react";
import { Link } from 'react-router-dom';

class AlbumCover extends React.Component {
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

	handleClick(albumId) {
		this.toggleSelectedState();
		const { toggleSelectModeCallback: reviseSelectedAlbumIdArr } = this.props;
		reviseSelectedAlbumIdArr(albumId);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.isSelectMode===true && nextProps.isSelectMode===false && this.state.isSelected===true) {
			this.toggleSelectedState();
			return false;
		} else return true;
	}

	render() {
		const selectedCss = {
			borderColor: '#CC543A60'
		}
		const notSelectedCss = {
			borderColor: 'transparent'
		}
		const { userId, albumId, coverSrc, albumName, isSelectMode } = this.props;
		return (
			<div 
				className="content__album"
				style={ (isSelectMode && this.state.isSelected) ? selectedCss : notSelectedCss }
			>
                { !isSelectMode &&
                	<Link to={`/user/${userId}/album/${albumId}`}>
                    	<div className="content__album--name mask">{albumName}</div>
                    </Link>
                }
                { isSelectMode && <div className="mask" onClick={this.handleClick.bind(this, albumId)}>{albumName}</div> }
                <img className="content__album--cover" src={coverSrc} alt="" />
            </div>
		)
	}
}

export default AlbumCover