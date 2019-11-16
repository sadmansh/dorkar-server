import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {auth, services} from '../../actions'

import CreateListing from './Dashboard/CreateListing'
import AllListings from './Dashboard/AllListings'


class Dashboard extends Component {

	render() {
		if (!this.props.user.phone_verified) {
			return <Redirect push to={{pathname: '/verify/phone', state: {code: '442322'}}} />
		}
		
		return (
			<div id="dashboard" className="container">
				<h1>Welcome to your dashboard, {this.props.user.name}</h1>
				<p onClick={this.props.logout}>Logout</p>
				<CreateListing />
				<AllListings />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => {
			dispatch(auth.logout())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)