import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {auth} from '../../actions'
import {Row, Col, Form, Input, Button} from 'antd'
import 'antd/dist/antd.css'

class Register extends Component {
	state = {
		phone: '',
		name: '',
		company: '',
		password: '',
		confirmPassword: ''
	}

	onSubmit = e => {
		e.preventDefault()
		this.props.register(`+88${this.state.phone}`, this.state.name, this.state.company, this.state.password)
	}

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect push to={{pathname: '/verify/phone', state: {code: '442322'}}} />
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
			<div id="register" className="container">
				<Row gutter={16}>
					<Col span={24} offset={5}>
						<h1>Register</h1>
					</Col>
					<Col span={20}>
						<Form {...formItemLayout} onSubmit={this.onSubmit}>
							<Form.Item label="Name" style={{ marginBottom: 16 }}>
								<Input type="text" placeholder="eg. Kamrul Hassan" onChange={e => this.setState({name: e.target.value})} />
							</Form.Item>
							<Form.Item label="Phone Number" style={{ marginBottom: 16 }}>
								<Input type="phone" addonBefore="+88" placeholder="0170100100" onChange={e => this.setState({phone: e.target.value})} />
							</Form.Item>
							<Form.Item label="Company" style={{ marginBottom: 16 }}>
								<Input type="text" placeholder="Kamrul Auto Repairs" onChange={e => this.setState({company: e.target.value})} />
							</Form.Item>
							<Form.Item label="Password" style={{ marginBottom: 16 }}>
								<Input.Password type="password" onChange={e => this.setState({password: e.target.value})} />
							</Form.Item>
							<Form.Item {...tailFormItemLayout} style={{ marginBottom: 16 }}>
								<Button type="primary" htmlType="submit">Register</Button>
								{this.props.errors.length > 0 && (
									<ul>
										{this.props.errors.map(error => (
											<li key={error.field}>{error.message}</li>
										))}
									</ul>
								)}
								<p>Already have an account? <Link to="/login">Login here</Link>.</p>
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