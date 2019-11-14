import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {auth} from '../../actions'


class VerifyPhone extends Component {
	state = {
		phone: this.props.phone,
		code: ''
	}

	onSubmit = e => {
		e.preventDefault()
		if (this.state.code === this.props.code) {
			console.log('verified')
		}
		else {
			console.log('sorry')
		}
	}

	render() {
		return (
			<div id="verify-phone">
				<h1>Please verify your phone number</h1>
				<p>{`Status: ${this.props.status}`}</p>
				<form onSubmit={this.onSubmit}>
					<fieldset>
						<legend>Phone verification</legend>
						<label htmlFor="phone">Phone Number</label>
						<input type="phone" id="phone" defaultValue={this.state.phone} readOnly />
						<label htmlFor="code">Code</label>
						<input type="phone" id="code" onChange={e => this.setState({code: e.target.value})} />
						<button type="submit">Verify</button>
					</fieldset>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		status: state.auth.user.phone_verified ? 'Verified' : 'Unverified',
		phone: state.auth.user.phone,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		code: ownProps.location.state.code,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhone)