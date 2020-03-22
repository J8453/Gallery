import { LOGIN, GET_ALBUMS, GET_IMAGES, SHOW_CARD, ASKFOR_FORM, SHOW_WINDOW, ASKFOR_WINDOW, DELETE_ALBUMS, DELETE_IMAGES } from './actionTypes';
import { GET_USER_INFO, PATCH_USER_INFO, GET_ALBUM_INFO, PATCH_ALBUM_INFO, PATCH_ALBUM_COVER, PREVIEW_PORTRAIT, TOGGLE_SELECT_MODE, REVISE_SELECTED_ID_ARR, SINGLE_SELECT, UPDATE_SINGLE_SELECTED_ID } from './actionTypes';
import { ADD_ALBUM, ADD_IMAGES, PATCH_USER_AVATAR } from './actionTypes';

import axios from 'axios';

// action creater

// App
export const login = (bool, userId) => {
	return {
		type: LOGIN,
		isLoggedIn: bool,
		currentUser: userId
	}
}

export const showCard = (bool) => {
	return {
		type: SHOW_CARD,
		shouldShown: bool
	}
}

export const askForForm = (formTitle) => {
	return {
		type: ASKFOR_FORM,
		formTitle
	}
}

export const showWindow = (bool) => {
	return {
		type: SHOW_WINDOW,
		shouldShown: bool
	}
}

export const askForWindow = (windowTitle) => {
	return {
		type: ASKFOR_WINDOW,
		windowTitle
	}
}

// UserInfo
export const getUserInfo = (userId) => {
	return {
		type: GET_USER_INFO,
		payload: axios.get(`http://localhost:3006/user/${userId}`)
	}
}

export const patchUserInfo = (userId, description) => {
	return {
		type: PATCH_USER_INFO,
		payload: axios({
			method: 'patch',
		  	url: `http://localhost:3006/user/${userId}/info`,
		  	data: {
		    	description
		  	}
		})
	}
}

export const patchUserAvatar = (formData) => {
	return {
		type: PATCH_USER_AVATAR,
		payload: axios({
            method: 'patch',
            url: 'http://localhost:3006/upload/avatar',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
	}
}

// AlbumInfo
export const getAlbumInfo = (albumId) => {
	return {
		type: GET_ALBUM_INFO,
		payload: axios.get(`http://localhost:3006/album/${albumId}`)
	}
}

export const patchAlbumInfo = (albumId, data) => {
	return {
		type: PATCH_ALBUM_INFO,
		payload: axios({
			method: 'patch',
		  	url: `http://localhost:3006/album/${albumId}/info`,
		  	data: {
		    	name: data.name,
		    	description: data.description
		  	}
		})
	}
}

export const previewPortrait = (id) => {
	return {
		type: PREVIEW_PORTRAIT,
		id
	}
}

// Catalog
export const getAlbums = (userId) => {
	return {
		type: GET_ALBUMS,
		payload: axios.get(`http://localhost:3006/album/user/${userId}`)
	}
}

export const deleteAlbums = (albumIdArr) => {
	return {
		type: DELETE_ALBUMS,
		payload: axios({
			method: 'delete',
		  	url: 'http://localhost:3006/album',
		  	data: {
		    	idArr: albumIdArr
		  	}
		})
	}
}

export const addAlbum = (formData) => {
	return {
		type: ADD_ALBUM,
		payload: axios({
            method: 'post',
            url: 'http://localhost:3006/upload/album',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })
	}
}

// Album
export const getImages = (albumId) => {
	return {
		type: GET_IMAGES,
		payload: axios.get(`http://localhost:3006/image/album/${albumId}`)
	}
}

export const deleteImages = (imageIdArr) => {
	return {
		type: DELETE_IMAGES,
		payload: axios({
			method: 'delete',
		  	url: 'http://localhost:3006/image',
		  	data: {
		    	idArr: imageIdArr
		  	}
		})
	}
}

export const addImages = (formData) => {
	return {
		type: ADD_IMAGES,
		payload: axios({
            method: 'post',
            url: 'http://localhost:3006/upload/image',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
	}
}

export const patchAlbumCover = (albumId, imageId) => {
	return {
		type: PATCH_ALBUM_COVER,
		payload: axios({
			method: 'patch',
		  	url: `http://localhost:3006/album/${albumId}/cover`,
		  	data: {
		    	imageId
		  	}
		}) 
	}
}

// Catalog & Album
export const toggleSelectMode = () => {
	return {
		type: TOGGLE_SELECT_MODE
	}
}

export const singleSelect = (bool) => {
	return {
		type: SINGLE_SELECT,
		isSingleSelect: bool
	}
}

export const reviseSelectedIdArr = (id) => {
	return {
		type: REVISE_SELECTED_ID_ARR,
		id
	}
}

export const updateSingleSelectedId = (id) => {
	return {
		type: UPDATE_SINGLE_SELECTED_ID,
		id
	}
}
