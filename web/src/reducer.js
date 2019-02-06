import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { reducer as formReducer } from 'redux-form'

import * as reducers from './reducers/index'

const rootReducer = combineReducers({
    ...reducers,
    loadingBar: loadingBarReducer,
    form: formReducer
})

export default rootReducer