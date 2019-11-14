import React, {Component} from 'react'
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import dorkarApp from './reducers'
import {auth} from './actions'

import Login from './components/Account/Login'
import Register from './components/Account/Register'
import Dashboard from './components/Account/Dashboard'
import Home from './components/Services/Home'
import Results from './components/Services/Results'

let store = createStore(dorkarApp, applyMiddleware(thunk))

class RootContainerComponent extends Component {
	componentDidMount() {
		this.props.loadUser()
	}

	PrivateRoute = ({component: ChildComponent, ...rest}) => {
		return <Route {...rest} render={props => {
			if (this.props.auth.isLoading) {
				return <em>Loading...</em>
			}
			else if (!this.props.auth.isAuthenticated) {
				return <Redirect to="/login" />
			}
			else {
				return <ChildComponent {...props} />
			}
		}} />
	}

	render() {
		let {PrivateRoute} = this
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/services" component={Results} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</Switch>
			</BrowserRouter>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadUser: () => {
			return dispatch(auth.loadUser())
		}
	}
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<RootContainer />
			</Provider>
		)
	}
}