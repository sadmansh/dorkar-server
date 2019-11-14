import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search} from '../../actions'

class Results extends Component {

	componentDidMount() {
		this.props.fetchServices()
	}

	render() {
		return (
			<div>
				<h1>Welcome to dorkar</h1>
				<table>
					<tbody>
						{this.props.services.map((service, id) => (
							<tr key={`service-${service.id}`}>
								<td><img src={service.images[0].image.thumbnail} alt={service.images[0].image.alt}/></td>
								<td>{service.title}</td>
								<td>{service.description}</td>
								<td>{service.location}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		services: state.services
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchServices: () => {
			dispatch(search.fetchServices())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)