import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../../actions'

class Dashboard extends Component {

	render() {
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