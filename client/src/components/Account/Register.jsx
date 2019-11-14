import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {auth} from '../../actions'

class Register extends Component {
	state = {
		phone: '',
		name: '',
		company: '',
		password: ''
	}

	onSubmit = e => {
		e.preventDefault()
		this.props.register(this.state.phone, this.state.name, this.state.company, this.state.password)
	}

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect push to={{pathname: '/verify/phone', state: {code: '442322'}}} />
		}
		return (
			<form onSubmit={this.onSubmit}>
				<fieldset>
					<legend>Register</legend>
					{this.props.errors.length > 0 && (
						<ul>
							{this.props.errors.map(error => (
								<li key={error.field}>{error.message}</li>
							))}
						</ul>
					)}
					<label htmlFor="name">Name</label>
					<input type="text" id="name" onChange={e => this.setState({name: e.target.value})} />
					<label htmlFor="phone">Phone</label>
					<input type="phone" id="phone" onChange={e => this.setState({phone: e.target.value})} />
					<label htmlFor="company">Company</label>
					<input type="text" id="company" onChange={e => this.setState({company: e.target.value})} />
					<label htmlFor="password">Password</label>
					<input type="password" id="password" onChange={e => this.setState({password: e.target.value})} />
					<button type="submit">Register</button>
					<p>Already have an account? <Link to="/login">Login here</Link>.</p>
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
		errors,
		isAuthenticated: state.auth.isAuthenticated
	}
}

const mapDispatchToProps = dispatch => {
	return {
		register: (phone, name, company, password) => dispatch(auth.register(phone, name, company, password))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)