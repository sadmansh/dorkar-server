import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {auth, services} from '../../actions'
import {Row, Col, Card, Form, Input, Select, Button} from 'antd'
import 'antd/dist/antd.css'


const {TextArea} = Input
const {Option} = Select

class Dashboard extends Component {

	componentDidMount() {
		this.props.listServices()
	}

	render() {
		if (!this.props.user.phone_verified) {
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
			<div id="dashboard" className="container">
				<h1>Welcome to your dashboard, {this.props.user.name}</h1>
				<p onClick={this.props.logout}>Logout</p>
				<div id="create-listing" style={{ marginBottom: 24 }}>
					<h2>Create New Listing</h2>
					<Row gutter={16}>
						<Col span={20}>
							<Form {...formItemLayout}>
								<Form.Item label="Title" style={{ marginBottom: 16 }}>
									<Input type="text" placeholder="eg. Driver services in Baridhara" />
								</Form.Item>
								<Form.Item label="Description" style={{ marginBottom: 16 }}>
									<TextArea placeholder="Description" autoSize={{ minRows: 2, maxRows: 6 }} />
								</Form.Item>
								<Form.Item label="Keywords" style={{ marginBottom: 16 }}>
									<Input type="text" />
								</Form.Item>
								<Form.Item label="Category" style={{ marginBottom: 16 }}>
									<Select showSearch style={{ width: '100%' }} placeholder="Select a category" optionFilterProp="children">
										<Option value="jack">Jack</Option>
										<Option value="lucy">Lucy</Option>
										<Option value="tom">Tom</Option>
									</Select>
								</Form.Item>
								<Form.Item label="Phone" style={{ marginBottom: 16 }}>
									<Input type="text" />
								</Form.Item>
								<Form.Item label="Location" style={{ marginBottom: 16 }}>
									<Input type="text" />
								</Form.Item>
								<Form.Item {...tailFormItemLayout} style={{ marginBottom: 16 }}>
									<Button type="primary" htmlType="submit">Create Listing</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</div>

				<div id="all-listings">
					<h2>Your listings</h2>
					{this.props.services.map((service, id) => (
						<Card title={service.title} extra={<Link to="#">Edit</Link>} key={id} style={{ marginTop: 16 }}>
							<Row gutter={16}>
								<Col span={24}>
									<p>{service.description}</p>
								</Col>
							</Row>
						</Card>
					))}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		services: state.services.query,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => {
			dispatch(auth.logout())
		},
		listServices: () => {
			return dispatch(services.listServices())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)