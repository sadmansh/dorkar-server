import React, {Component} from 'react'
import {connect} from 'react-redux'
import Geocode from 'react-geocode'
import {Link} from 'react-router-dom'
import {services} from '../../actions'
import {Layout, Row, Col, Card} from 'antd'
import 'antd/dist/antd.css'


const { Content } = Layout

class Results extends Component {
	state = {
		address: ''
	}

	componentDidMount() {
		this.props.search()
	}

	getAddress = (coords) => {
		Geocode.fromLatLng(coords[1], coords[0]).then(
			response => {
				let address = response.results[0].formatted_address;
				return address
			},
			error => {
				console.error(error)
			}
		);
	}

	render() {
		return (
			<div className="container">
				<h1>Welcome to dorkar</h1>
				<Content>
					{this.props.services.map((service, id) => (
						<Card title={service.title} extra={<Link to="#">More</Link>} key={id} style={{ marginTop: 16 }}>
							<Row gutter={16}>
								{service.images.length > 0 ? (
									<Col span={6}>
										<img src={service.images[0].image.thumbnail} alt={service.images[0].image.alt} width="120"/>
									</Col>
								) : ('')}
								<Col span={18}>
									<p>{service.description}</p>
									{this.getAddress(service.location.coordinates)}
								</Col>
							</Row>
						</Card>
					))}
				</Content>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		services: state.services.query,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	let location = ownProps.location.state.location
	let keywords = ownProps.location.state.keywords
	let category = ownProps.location.state.category
	return {
		search: () => {
			return dispatch(services.fetchServices(location, keywords, category))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)