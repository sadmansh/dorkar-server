import React, {Component} from 'react'
import {connect} from 'react-redux'

class Dashboard extends Component {

	render() {
		return (
			<h1>Welcome to your dashboard, {this.props.user.name}</h1>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)