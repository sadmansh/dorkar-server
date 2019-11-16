import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search} from '../../actions'
import {Layout, Row, Col, Card} from 'antd'
import 'antd/dist/antd.css'


const { Header, Footer, Sider, Content } = Layout

class Results extends Component {

	componentDidMount() {
		this.props.search()
	}

	render() {
		return (
			<div>
				<h1>Welcome to dorkar</h1>
				<Content width={800}>
					{this.props.services.map((service, id) => (
						<Card title={service.title} extra={<a href="#">More</a>} key={id}>
							<Row gutter={16}>
								<Col span={6}>
									<img src={service.images[0].image.thumbnail} alt={service.images[0].image.alt}/>
								</Col>
								<Col span={18}>
									<p>{service.description}</p>
									<p>{service.location.coordinates.toString()}</p>
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
			return dispatch(search.fetchServices(location, keywords, category))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)