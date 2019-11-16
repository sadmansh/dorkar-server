import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {auth, services} from '../../actions'
import {Row, Col, Card, Input, Select, Button} from 'antd'
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
		return (
			<div id="dashboard" className="container">
				<h1>Welcome to your dashboard, {this.props.user.name}</h1>
				<p onClick={this.props.logout}>Logout</p>
				<div id="create-listing">
					<h2>Create New Listing</h2>
					<Row gutter={16}>
						<Col span={24}>
							<Input addonBefore="Title" type="text" style={{ marginBottom: 16 }} />
						</Col>
						<Col span={24}>
							<TextArea placeholder="Description" autoSize={{ minRows: 2, maxRows: 6 }} style={{ marginBottom: 16 }} />
						</Col>
						<Col span={12}>
							<Input addonBefore="Keywords" type="text" style={{ marginBottom: 16 }} />
						</Col>
						<Col span={12}>
							<Select showSearch style={{ width: '100%', marginBottom: 16 }} placeholder="Select a category" optionFilterProp="children">
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="tom">Tom</Option>
							</Select>
						</Col>
						<Col span={12}>
							<Input addonBefore="Phone" type="text" style={{ marginBottom: 16 }} />
						</Col>
						<Col span={12}>
							<Input addonBefore="Location" type="text" style={{ marginBottom: 16 }} />
						</Col>
						<Col span={24} style={{ marginBottom: 16 }}>
							<Button type="primary" htmlType="submit">Create Listing</Button>
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