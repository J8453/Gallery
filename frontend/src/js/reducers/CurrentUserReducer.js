import { ActionType } from 'redux-promise-middleware'

import { SET_CURRENT_USER } from '../actionTypes'

const initialState = {
	id: '',
	username: '',
	avatarSrc: ''
};

function CurrentUserReducer(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER: {
			return Object.assign({}, state, {
				id: action.user.id,
				username: action.user.username,
				avatarSrc: action.user.avatarSrc
			})
		}
		default:
			return state
	}
}

export default CurrentUserReducer
