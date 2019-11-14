import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {auth} from '../../actions'

class Dashboard extends Component {

	render() {
		if (!this.props.user.phone_verified) {
			return <Redirect push to={{pathname: '/verify/phone', state: {code: '442322'}}} />
		}
		return (
			<div id="dashboard">
				<h1>Welcome to your dashboard, {this.props.user.name}</h1>
				<a onClick={this.props.logout}>Logout</a>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user
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