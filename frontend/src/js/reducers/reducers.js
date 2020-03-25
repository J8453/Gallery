import { combineReducers } from 'redux'
import AppReducer from './AppReducer'
import CurrentUserReducer from './CurrentUserReducer'
import UserInfoReducer from './UserInfoReducer'
import AlbumInfoReducer from './AlbumInfoReducer'
import CatalogReducer from './CatalogReducer'
import AlbumReducer from './AlbumReducer'

const reducers = combineReducers({
	app: AppReducer,
	currentUser: CurrentUserReducer,
	userInfo: UserInfoReducer,
	albumInfo: AlbumInfoReducer,
	catalog: CatalogReducer,
	album: AlbumReducer,
});

export default reducers
