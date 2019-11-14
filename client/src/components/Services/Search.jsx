import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search} from '../../actions'

class Search extends Component {

	state = {
		location: '',
		keywords: '',
		category: ''
	}

	componentDidMount() {
		if (window.navigator.geolocation) {
			let latitude, longitude
			navigator.geolocation.getCurrentPosition(async (position) => {
				latitude = position.coords.latitude
				longitude = position.coords.longitude
				this.setState({location: `${latitude},${longitude}`})
			})
		}
		else {
			console.log('Geolocation not supported.')
		}
	}

	onSubmit = e => {
		e.preventDefault()
		console.log('searching...')
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<fieldset>
					<legend>Search Services</legend>
					<input type="text" placeholder="Enter keywords" onChange={e => this.setState({keywords: e.target.value})} />
					<input type="text" placeholder="Enter category" onChange={e => this.setState({category: e.target.value})} />
					<button type="submit">Search</button>
				</fieldset>
			</form>
		)
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		search: (location, keywords, category) => {
			return dispatch(search.fetchServices(location, keywords, category))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)