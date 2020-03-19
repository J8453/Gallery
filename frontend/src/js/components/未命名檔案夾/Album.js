import React, { Component } from "react";
import { withRouter } from "react-router";
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Loader from '../components/Loader';

class Album extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [{
				id: '8',
				src: '/images/bg.jpg',
				userId: '3',
				albumId: '45'
			}],
			isSelectMode: false,
			selectedImageId: []
		};
	}

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

	toggleSelectMode() {
		this.setState(()=>{
			return {isSelectMode: !this.state.isSelectMode}
		})
	}

	reviseSelectedImageIdArr(imageId) {
		const selectedImageId = [...this.state.selectedImageId];
		if (!selectedImageId.includes(imageId)) {
			selectedImageId.push(imageId);
		} else {
			selectedImageId.splice(selectedImageId.indexOf(imageId),1);
		}
		this.setState(()=>{
			return {selectedImageId};
		})
		console.log(selectedImageId);
	}

	handleDelete() {
		const { deleteImages } = this.props;
		const { selectedImageId } = this.state;
		if (selectedImageId.length===0) return alert("you haven't selected anything.");
		if (confirm('Are you sure?')) {
			// delete from db 還沒寫（寫在reducer）
			deleteImages(this.state.selectedImageId);
			this.toggleSelectMode();
		} else {
			return;
		}
	}

	handleCancel() {
		this.setState(()=>{
			return {selectedImageId: []};
		})
		this.toggleSelectMode();
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
		const { images, isGetImagesRequesting } = this.props;

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

		// return (
		// 	<div className="content">
		// 		<div className="content__functionalRow"><Link to={prevUrl} style={backLinkCss}>Back</Link></div>
		// 		<div className="span"></div>
		// 		{ images.map(image=>{
		// 			return (
		// 				<div className="content__img" key={image.id}>
		//                     <img src={image.src} alt="" />
		//                     <div style={cssHide}>some info (maybe)</div>
		// 	            </div>
		// 			)
		// 		}) }
		// 	</div>
		// )
		
		console.log(this.props);
		return (
			<div className="content">
				<div className="content__functionalRow">
					<Link to={prevUrl} style={textCss}>Back to Profile</Link>
					{ !this.state.isSelectMode && <span style={textCss} onClick={this.toggleSelectMode.bind(this)}>Select</span> }
					{ this.state.isSelectMode &&
						<span>
							<span style={textCss} onClick={this.handleDelete.bind(this)}>Delete</span>
							<span style={textCss} onClick={this.handleCancel.bind(this)}>Cancel</span>
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
							title={image.title}
							isSelectMode={this.state.isSelectMode}
							reviseSelectedImageIdArr={this.reviseSelectedImageIdArr.bind(this)} />
					)
				}) }
			</div>
		)
	}
}

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
		const { reviseSelectedImageIdArr } = this.props;
		reviseSelectedImageIdArr(imageId);
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
		const { imageId, title, isSelectMode } = this.props;
		return (
			<div 
				className="content__img"
				style={ (isSelectMode && this.state.isSelected) ? selectedCss : notSelectedCss }
			>
                { isSelectMode && <div className="mask" onClick={this.handleClick.bind(this, imageId)}></div>}
                <div>{title}</div>
            </div>
		)
	}
}

const AlbumWithRouter = withRouter(Album);

export default AlbumWithRouter

