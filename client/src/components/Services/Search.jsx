import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Row, Col, Input, Button} from 'antd'
import 'antd/dist/antd.css'


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
			return <Redirect push to={{pathname: '/search', state: {location: this.state.location, keywords: this.state.keywords, category: this.state.category}}} />
		}

		return (
			<div className="container">
				<form onSubmit={this.onSubmit}>
					<fieldset>
						<legend>Search Services</legend>
						<Row gutter={16}>
							<Col span={8}>
								<Input type="text" placeholder="Enter keywords" onChange={e => this.setState({keywords: e.target.value})} />
							</Col>
							<Col span={8}>
								<Input type="text" placeholder="Enter category" onChange={e => this.setState({category: e.target.value})} />
							</Col>
							<Col span={8}>
								<Button type="primary" htmlType="submit" icon="search">Search</Button>
							</Col>
						</Row>
					</fieldset>
				</form>
			</div>
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