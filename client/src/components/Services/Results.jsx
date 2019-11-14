import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search} from '../../actions'

class Results extends Component {

	componentDidMount() {
		this.props.search()
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