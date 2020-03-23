import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { getAlbums, toggleSelectMode, reviseSelectedIdArr, deleteAlbums } from '../actions';

import Loader from '../components/Loader';
import AlbumCover from '../components/AlbumCover'

class Catalog extends React.Component {

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
		const { selectedAlbums, deleteAlbums } = this.props;
		if (selectedAlbums.length===0) return alert("you haven't selected anything.");
		if (window.confirm("Are you sure to delete album? All the images in it will also be deleted and it's impossible to resume.")) {
			deleteAlbums(selectedAlbums);
		} else {
			return;
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
		const { albums, isGetAlbumsRequesting, isSelectMode, toggleSelectMode, reviseSelectedIdArr } = this.props;

		const textCss = {
			textDecoration: 'none',
			color: '#CC543A',
			marginLeft: '10px'
		};
		const bgPink = {
			backgroundColor: '#F6E7E4'
		};

		return (
			<div className="content" style={ isSelectMode ? bgPink : {} }>
				<div className="content__functionalRow" style={ isSelectMode ? bgPink : {} }>
					<span></span>
					{ !isSelectMode && <span style={textCss} onClick={toggleSelectMode}>Select</span> }
					{ isSelectMode &&
						<span>
							<span style={textCss} onClick={this.handleDelete.bind(this)}>Delete</span>
							<span style={textCss} onClick={toggleSelectMode}>Cancel</span>
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
							coverSrc={album.coverSrc}
							albumName={album.name}
							isSelectMode={isSelectMode}
							toggleSelectModeCallback={reviseSelectedIdArr} />
					)
				}) }				
	        </div>
		)
	}
}

const CatalogWithRouter = withRouter(Catalog);

const mapStateToProps = state => ({
  isGetAlbumsRequesting: state.catalog.isGetAlbumsRequesting,
  albums: state.catalog.albums,
  isSelectMode: state.catalog.isSelectMode,
  selectedAlbums: state.catalog.selectedAlbums
})

const mapDispatchToProps = dispatch => ({
	getAlbums: userId => dispatch(getAlbums(userId)),
	toggleSelectMode: () => dispatch(toggleSelectMode()),
	reviseSelectedIdArr: albumId => dispatch(reviseSelectedIdArr(albumId)),
	deleteAlbums: albumIdArr => dispatch(deleteAlbums(albumIdArr)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogWithRouter)