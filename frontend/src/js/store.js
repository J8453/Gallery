import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';

import reducers from './reducers/reducers';

const createStoreWithMiddleware = applyMiddleware(
	promise,
	logger
)(createStore)

const store = createStoreWithMiddleware(reducers)

export default store