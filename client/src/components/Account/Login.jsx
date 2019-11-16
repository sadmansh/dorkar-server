import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {auth} from '../../actions'
import {Row, Col, Form, Input, Button} from 'antd'
import '../../styles/base.scss'

class Login extends Component {
	state = {
		phone: '',
		password: ''
	}

	onSubmit = e => {
		e.preventDefault()
		this.props.login(`+88${this.state.phone}`, this.state.password)
	}

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to="/dashboard" />
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
			<div id="login" className="container">
				<Row gutter={16}>
					<Col span={24} offset={5}>
						<h1>Log In</h1>
					</Col>
					<Col span={20}>
						<Form {...formItemLayout} onSubmit={this.onSubmit}>
							<Form.Item label="Phone" style={{ marginBottom: 16 }}>
								<Input type="phone" addonBefore="+88" placeholder="eg. 01711543033" onChange={e => this.setState({phone: e.target.value})} />
							</Form.Item>
							<Form.Item label="Password" style={{ marginBottom: 16 }}>
								<Input.Password type="password" onChange={e => this.setState({password: e.target.value})} />
							</Form.Item>
							<Form.Item {...tailFormItemLayout} style={{ marginBottom: 16 }}>
								<Button type="primary" htmlType="submit">Log In</Button>
								{this.props.errors.length > 0 && (
									<ul>
										{this.props.errors.map(error => (
											<li key={error.field}>{error.message}</li>
										))}
									</ul>
								)}
								<p>Don't have an account? <Link to="/register">Register here</Link>.</p>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
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