import { ActionType } from 'redux-promise-middleware'

import { LOGIN, SHOW_CARD, ASKFOR_FORM, SHOW_WINDOW, ASKFOR_WINDOW, PATCH_USER_INFO, PATCH_ALBUM_INFO, ADD_ALBUM, ADD_IMAGES, PATCH_USER_AVATAR } from '../actionTypes'

const initialState = {
	isLoggedIn: false,
	currentUser: '',
	cardIsShown: false,
	formTitle: '',
	windowIsShown: false,
	windowTitle: '',
};

function AppReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN: {
			return Object.assign({}, state, {
				isLoggedIn: action.isLoggedIn,
				currentUser: action.currentUser
			})
		}
		case SHOW_CARD: {
			return Object.assign({}, state, {cardIsShown: action.shouldShown})
		}
		case ASKFOR_FORM: {
			return Object.assign({}, state, {formTitle: action.formTitle})
		}
		case SHOW_WINDOW: {
			return Object.assign({}, state, {windowIsShown: action.shouldShown})
		}
		case ASKFOR_WINDOW: {
			return Object.assign({}, state, {windowTitle: action.windowTitle})
		}
		case `${PATCH_USER_INFO}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {cardIsShown: false})
		}
		case `${PATCH_ALBUM_INFO}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {cardIsShown: false})
		}
		case `${ADD_ALBUM}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {cardIsShown: false})
		}
		case `${ADD_IMAGES}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {cardIsShown: false})
		}
		case `${PATCH_USER_AVATAR}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {cardIsShown: false})
		}
		default:
			return state
	}
}

export default AppReducer
