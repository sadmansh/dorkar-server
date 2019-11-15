import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {auth} from '../../actions'


class VerifyPhone extends Component {
	state = {
		phone: this.props.phone,
		status: this.props.status,
		code: ''
	}

	onSubmit = e => {
		e.preventDefault()
		if (this.state.code === this.props.code) {
			this.setState({status: true}, () => {
				this.props.updateUser(this.state.status)
			})
		}
		else {
			console.log('sorry')
		}
	}

	render() {
		if (this.props.updated) {
			return <Redirect push to="/dashboard" />
		}

		return (
			<div id="verify-phone">
				<h1>Please verify your phone number</h1>
				<p>{`Status: ${this.props.status ? 'Verified' : 'Unverified'}`}</p>
				{!this.state.status ? (
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
				) : 
				(
					<p><Link to="/dashboard">Return to Dashboard.</Link></p>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		status: state.auth.user.phone_verified,
		phone: state.auth.user.phone,
		updated: state.auth.updated,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		code: ownProps.location.state ? ownProps.location.state.code : null,
		updateUser: (status) => dispatch(auth.updateUser({phone_verified: status}))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhone)