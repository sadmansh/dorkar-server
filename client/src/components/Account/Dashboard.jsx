import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {auth, search} from '../../actions'
import {Layout, Row, Col, Card} from 'antd'
import 'antd/dist/antd.css'


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
				<a onClick={this.props.logout}>Logout</a>
				{this.props.services.map((service, id) => (
					<Card title={service.title} extra={<a href="#">Edit</a>} key={id} style={{ marginTop: 16 }}>
						<Row gutter={16}>
							<Col span={24}>
								<p>{service.description}</p>
							</Col>
						</Row>
					</Card>
				))}
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
			return dispatch(search.listServices())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)