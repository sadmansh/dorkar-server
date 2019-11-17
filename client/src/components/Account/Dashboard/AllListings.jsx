import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {services} from '../../../actions'
import {Row, Col, Card} from 'antd'
import 'antd/dist/antd.css'


class AllListings extends Component {

	componentDidMount() {
		this.props.listServices()
	}

	render() {
		
		return (
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
		)
	}
}

const mapStateToProps = state => {
	return {
		services: state.services.query,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listServices: () => {
			return dispatch(services.listServices())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllListings)