import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {auth} from '../../actions'
import {Row, Col, Form, Input, Button} from 'antd'
import '../../styles/base.scss'


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

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 18 },
			},
		}

		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 6,
				},
			},
		}

		return (
			<div id="verify-phone" className="container">
				<Row gutter={16}>
					<Col span={24} offset={5}>
						<h1>Please verify your phone number</h1>
						<p>{`Status: ${this.props.status ? 'Verified' : 'Unverified'}`}</p>
					</Col>
					<Col span={20}>
						<Form {...formItemLayout} onSubmit={this.onSubmit}>
							{!this.state.status ? (
								<div>
									<Form.Item label="Phone" style={{ marginBottom: 16 }}>
										<Input type="phone" addonBefore="+88" defaultValue={this.state.phone} readOnly />
									</Form.Item>
									<Form.Item label="Verification Code" style={{ marginBottom: 16 }}>
										<Input type="phone" onChange={e => this.setState({code: e.target.value})} />
									</Form.Item>
									<Form.Item {...tailFormItemLayout} style={{ marginBottom: 16 }}>
										<Button type="primary" htmlType="submit">Verify Phone Number</Button>
										<p>Don't have an account? <Link to="/register">Register here</Link>.</p>
									</Form.Item>
								</div>
								) : 
							(
								<Form.Item {...tailFormItemLayout} style={{ marginBottom: 16 }}>
									<p><Link to="/dashboard">Return to Dashboard.</Link></p>
								</Form.Item>
							)}
						</Form>
					</Col>
				</Row>
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