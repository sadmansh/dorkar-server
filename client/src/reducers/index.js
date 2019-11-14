import { combineReducers } from 'redux'
import auth from './auth'
import services from './services'


const dorkarApp = combineReducers({
	auth, services
})

export default dorkarApp