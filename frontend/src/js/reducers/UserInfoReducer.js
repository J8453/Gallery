import { ActionType } from 'redux-promise-middleware'

import { GET_USER_INFO, PATCH_USER_INFO } from '../actionTypes'

const initialState = {
	avatarSrc: '',
	username: '',
	description: '',
	isGetUserInfoRequesting: false,
};

export default function UserInfoReducer(state = initialState, action) {
	switch (action.type) {
		case `${GET_USER_INFO}_${ActionType.Pending}`: {
			return Object.assign({}, state, {
				isGetUserInfoRequesting: true
			})
		}
		case `${GET_USER_INFO}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {
				isGetUserInfoRequesting: false,
				username: action.payload.data.username,
				description: action.payload.data.description,
				avatarSrc: action.payload.data.avatarSrc
			})
		}
		case `${GET_USER_INFO}_${ActionType.Rejected}`: {
			return Object.assign({}, state, {
				isGetUserInfoRequesting: false,
				username: 'Not found',
				description: '',
				avatarSrc: ''
			})
		}
		case `${PATCH_USER_INFO}_${ActionType.Fulfilled}`: {
			return Object.assign({}, state, {
				description: action.payload.data.description 
			})
		}
		default:
			return state
	}
}
