import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'

import persistState from 'redux-localstorage'

import rootReducer from './reducer.js'

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware(),
    loadingBarMiddleware(),
    createLogger({
      predicate: (getState, action) => process.env.REACT_APP_MODE=="local" 
        // && action.type.indexOf("@@redux-form") === -1
    }),
  ),
  persistState(["auth", "message", "user"])
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

export default store