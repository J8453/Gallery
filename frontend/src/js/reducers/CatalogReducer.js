import { ActionType } from 'redux-promise-middleware'

import { GET_ALBUMS, DELETE_ALBUMS, TOGGLE_SELECT_MODE, REVISE_SELECTED_ID_ARR } from '../actionTypes'

const initialState = {
	isGetAlbumsRequesting: false,
	isDeleteAlbumsRequesting: false,
	albums: [],
	isSelectMode: false,
	selectedAlbums: []
};

function CatalogReducer(state = initialState, action) {
	switch (action.type) {
		case `${GET_ALBUMS}_${ActionType.Pending}`: {
			return Object.assign({}, state, {
				isGetAlbumsRequesting: true
			})
		}
		case `${GET_ALBUMS}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {
				isGetAlbumsRequesting: false,
				albums: action.payload.data
			})
		}
		case `${GET_ALBUMS}_${ActionType.Rejected}`: {
			return Object.assign({}, state, {
				isGetAlbumsRequesting: false
			})
		}
		case TOGGLE_SELECT_MODE: {
			return Object.assign({}, state, {
				isSelectMode: !state.isSelectMode,
				selectedAlbums: []
			})
		}
		case REVISE_SELECTED_ID_ARR: {
			const selectedAlbums = [...state.selectedAlbums];
			if (!selectedAlbums.includes(action.id)) {
				selectedAlbums.push(action.id);
			} else {
				selectedAlbums.splice(selectedAlbums.indexOf(action.id),1);
			}
			console.log(`selectedAlbums: ${selectedAlbums}`);
			return Object.assign({}, state, {selectedAlbums})
		}
		case `${DELETE_ALBUMS}_${ActionType.Pending}`: {
			return Object.assign({}, state, {
				isDeleteAlbumsRequesting: true
			})
		}
		case `${DELETE_ALBUMS}_${ActionType.Fulfilled}`: {
			let albums = [...state.albums];
			const albumIdArr = [...state.selectedAlbums];
			albumIdArr.forEach(albumId=>{
				albums = albums.filter(album => album.id !== albumId)
			})
			return Object.assign({}, state, {
				isDeleteAlbumsRequesting: false,
				albums,
				selectedAlbums: []
			})
		}
		case `${DELETE_ALBUMS}_${ActionType.Rejected}`: {
			return Object.assign({}, state, {
				isDeleteAlbumsRequesting: false
			})
		}
		default:
			return state
	}
}

export default CatalogReducer
