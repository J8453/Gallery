import React, { Component } from "react";
import { withRouter } from "react-router";
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Loader from '../components/Loader';
import AlbumCover from '../components/AlbumCover'

class Catalog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			albums: [{
				id: '45',
				name: 'Test(default)',
				description: 'Test(default)',
				userId: '3',
				coverSrc: '/images/bg.jpg'
			}],
			isSelectMode: false,
			selectedAlbumId: []
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

	reviseSelectedAlbumIdArr(albumId) {
		const selectedAlbumId = [...this.state.selectedAlbumId];
		if (!selectedAlbumId.includes(albumId)) {
			selectedAlbumId.push(albumId);
		} else {
			selectedAlbumId.splice(selectedAlbumId.indexOf(albumId),1);
		}
		this.setState(()=>{
			return {selectedAlbumId};
		})
		console.log(selectedAlbumId);
	}

	handleDelete() {
		const { deleteAlbums } = this.props;
		const { selectedAlbumId } = this.state;
		if (selectedAlbumId.length===0) return alert("you haven't selected anything.");
		if (confirm("Are you sure to delete album? All the images in it will also be deleted and it's impossible to resume.")) {
			// delete from db 還沒寫（寫在reducer）
			deleteAlbums(this.state.selectedAlbumId);
			this.toggleSelectMode();
		} else {
			return;
		}
	}

	handleCancel() {
		this.setState(()=>{
			return {selectedAlbumId: []};
		})
		this.toggleSelectMode();
	}

	shouldComponentUpdate(nextProps, nextState) {
		// console.log('shouldComponentUpdate');
		if (this.props.isGetAlbumsRequesting === false && nextProps.isGetAlbumsRequesting === true) {
			return false;
		} else {
			return true;
		}
	}

	componentDidMount() {
		// console.log('componentDidMount');
		this.sizeFunctionalRow();
        window.addEventListener('resize', this.sizeFunctionalRow);

		const { getAlbums } = this.props;
		const { userId } = this.props.match.params;
		getAlbums(userId);
	}

	componentWillUnmount(){
        window.removeEventListener('resize', this.sizeFunctionalRow);
    }

	render() {
		// console.log('Catalog render');
		// console.log('Catalog', this.props);
		const { albums, isGetAlbumsRequesting } = this.props;

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
		// 		{ albums.map(album=>{
		// 			return (
		// 				<div className="content__album" key={album.id}>
		//                     <Link to={`/user/${album.userId}/album/${album.id}`}>
		//                     	<div className="content__album--name mask">{album.name}</div>
		//                     </Link>
		//                     <img className="content__album--cover" src={album.coverSrc} alt="" />
		//                     <div className="content__album--description" style={cssHide}>{album.description}</div>
		//                 </div>
		// 			)
		// 		}) }				
	    //  </div>
		// )

		return (
			<div className="content">
				<div className="content__functionalRow">
					<span></span>
					{ !this.state.isSelectMode && <span style={textCss} onClick={this.toggleSelectMode.bind(this)}>Select</span> }
					{ this.state.isSelectMode &&
						<span>
							<span style={textCss} onClick={this.handleDelete.bind(this)}>Delete</span>
							<span style={textCss} onClick={this.handleCancel.bind(this)}>Cancel</span>
						</span>
					}
				</div>
				<div className="span"></div>
				{ isGetAlbumsRequesting && <Loader /> }
				{ albums.map(album=>{
					return (
						<AlbumCover 
							key={album.id}
							userId={album.userId}
							albumId={album.id}
							title={album.title}
							isSelectMode={this.state.isSelectMode}
							toggleSelectModeCallback={this.reviseSelectedAlbumIdArr.bind(this)} />
					)
				}) }				
	        </div>
		)
	}
}



const CatalogWithRouter = withRouter(Catalog);

export default CatalogWithRouter



