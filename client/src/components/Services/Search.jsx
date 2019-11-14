import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


class Search extends Component {

	state = {
		location: '',
		keywords: '',
		category: '',
		isLoading: false,
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
		this.setState({isLoading: true})
	}

	render() {
		if (this.state.isLoading) {
			return <Redirect push to={{pathname: '/services/search', state: {location: this.state.location, keywords: this.state.keywords, category: this.state.category}}} />
		}

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
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)