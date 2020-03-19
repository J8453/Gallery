import { ActionType } from 'redux-promise-middleware'

import { GET_ALBUM_INFO, PATCH_ALBUM_INFO, PATCH_ALBUM_COVER, GET_IMAGES, PREVIEW_PORTRAIT, TOGGLE_SELECT_MODE } from '../actionTypes'

const initialState = {
	coverSrc: '',
	name: '',
	description: '',
	isGetAlbumInfoRequesting: false,
	images: [],
	previewSrc: ''
};

export default function AlbumInfoReducer(state = initialState, action) {
	switch (action.type) {
		case `${GET_ALBUM_INFO}_${ActionType.Pending}`: {
			return Object.assign({}, state, {
				isGetAlbumInfoRequesting: true
			})
		}
		case `${GET_ALBUM_INFO}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {
				isGetAlbumInfoRequesting: false,
				name: action.payload.data.name,
				description: action.payload.data.description,
				coverSrc: action.payload.data.coverSrc
			})
		}
		case `${GET_ALBUM_INFO}_${ActionType.Rejected}`: {
			return Object.assign({}, state, {
				isGetAlbumInfoRequesting: false,
				name: 'Not found',
				description: '',
				coverSrc: ''
			})
		}
		case `${PATCH_ALBUM_INFO}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {
				name: action.payload.data.name,
				description: action.payload.data.description
			})
		}
		case `${PATCH_ALBUM_COVER}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {
				coverSrc: action.payload.data.coverSrc
			})
		}
		// 不知道這樣合理ㄇ？
		case `${GET_IMAGES}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {
				images: action.payload.data
			})
		}
		case PREVIEW_PORTRAIT: {
			const targetImage = state.images.find(image=>image.id===action.id);
			return Object.assign({}, state, {
				previewSrc: targetImage.src
			})
		}
		case TOGGLE_SELECT_MODE: {
			if (state.previewSrc) return Object.assign({}, state, {previewSrc: ''});
		}
		default:
			return state
	}
}


