import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {auth} from '../../actions'

class Login extends Component {
	state = {
		phone: '',
		password: ''
	}

	onSubmit = e => {
		e.preventDefault()
		this.props.login(this.state.phone, this.state.password)
	}

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to="/dashboard" />
		}

		return (
			<form onSubmit={this.onSubmit}>
				<fieldset>
					<legend>Login</legend>
					{this.props.errors.length > 0 && (
						<ul>
							{this.props.errors.map(error => (
								<li key={error.field}>{error.message}</li>
							))}
						</ul>
					)}
					<label htmlFor="phone">Phone</label>
					<input type="phone" id="phone" onChange={e => this.setState({phone: e.target.value})} />
					<label htmlFor="password">Password</label>
					<input type="password" id="password" onChange={e => this.setState({password: e.target.value})} />
					<button type="submit">Login</button>
					<p>Don't have an account? <Link to="/register">Register here</Link>.</p>
				</fieldset>
			</form>
		)
	}
}

const mapStateToProps = state => {
	let errors = []
	if (state.auth.errors) {
		errors = Object.keys(state.auth.errors).map(field => {
			return {field, message: state.auth.errors[field]}
		})
	}
	return {
		errors, isAuthenticated: state.auth.isAuthenticated
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: (phone, password) => {
			return dispatch(auth.login(phone, password))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)