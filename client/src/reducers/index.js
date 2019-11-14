import { combineReducers } from 'redux'
import auth from './auth'


const dorkarApp = combineReducers({
	auth,
})

export default dorkarApp