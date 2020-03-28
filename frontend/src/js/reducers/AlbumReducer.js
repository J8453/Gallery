import { ActionType } from 'redux-promise-middleware'

import { GET_IMAGES, DELETE_IMAGES, PATCH_ALBUM_COVER, ADD_IMAGES, TOGGLE_SELECT_MODE, SINGLE_SELECT, REVISE_SELECTED_ID_ARR, UPDATE_SINGLE_SELECTED_ID } from '../actionTypes'

const initialState = {
	isGetImagesRequesting: false,
	isDeleteImagesRequesting: false,
	images: [],
	isSelectMode: false,
	selectedImages: [],
	isSingleSelect: false,
	singleSelectedId: ''
};

function AlbumReducer(state = initialState, action) {
	switch (action.type) {
		case `${GET_IMAGES}_${ActionType.Pending}`: {
			return Object.assign({}, state, {
				isGetImagesRequesting: true,
				images: []
			})
		}
		case `${GET_IMAGES}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {
				isGetImagesRequesting: false,
				images: action.payload.data
			})
		}
		case `${GET_IMAGES}_${ActionType.Rejected}`: {
			return Object.assign({}, state, {
				isGetImagesRequesting: false
			})
		}
		case TOGGLE_SELECT_MODE: {
			return Object.assign({}, state, {
				isSelectMode: !state.isSelectMode,
				isSingleSelect: false,
				selectedImages: [],
				singleSelectedId: ''
			})
		}
		case SINGLE_SELECT: {
			return Object.assign({}, state, {
				isSingleSelect: action.isSingleSelect
			})
		}
		case REVISE_SELECTED_ID_ARR: {
			const selectedImages = [...state.selectedImages];
			if (!selectedImages.includes(action.id)) {
				selectedImages.push(action.id);
			} else {
				selectedImages.splice(selectedImages.indexOf(action.id),1);
			}
			console.log(`selectedImages: ${selectedImages}`);
			return Object.assign({}, state, {selectedImages})
		}
		case UPDATE_SINGLE_SELECTED_ID: {
			console.log(`singleSelectedId: ${action.id}`);
			return Object.assign({}, state, {
				singleSelectedId: action.id
			})
		}
		case `${DELETE_IMAGES}_${ActionType.Pending}`: {
			return Object.assign({}, state, {
				isDeleteImagesRequesting: true
			})
		}
		case `${DELETE_IMAGES}_${ActionType.Fulfilled}`: {
			let images = [...state.images];
			const imageIdArr = [...state.selectedImages];
			console.log('imageIdArr: ', imageIdArr);
			imageIdArr.forEach(imageId=>{
				images = images.filter(image => image.id !== imageId)
			})
			console.log('images: ', images);
			return Object.assign({}, state, {
				isDeleteImagesRequesting: false,
				images,
				selectedImages: [],
				isSelectMode: false
			})
		}
		case `${DELETE_IMAGES}_${ActionType.Rejected}`: {
			return Object.assign({}, state, {
				isDeleteImagesRequesting: false
			})
		}
		case `${PATCH_ALBUM_COVER}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {
				isSelectMode: false,
				selectedImages: [],
				isSingleSelect: false,
				singleSelectedId: ''
			})
		}
		case `${ADD_IMAGES}_${ActionType.Fulfilled}`: {
			const images = [...state.images];
			images.push(...action.payload.data); //action.payload.data應是一個array
			return Object.assign({}, state, {
				images
			})
		}
		default:
			return state
	}
}

export default AlbumReducer
