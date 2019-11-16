import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {services} from '../../actions'
import {Row, Col, Input, Select, Button} from 'antd'
import 'antd/dist/antd.css'


const {Option} = Select

class Search extends Component {

	state = {
		location: '',
		keywords: '',
		category: '',
		isLoading: false,
	}

	componentDidMount() {
		this.props.getCategories()
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
								<Select showSearch style={{ width: '100%' }} placeholder="Select a category" optionFilterProp="children" onChange={value => this.setState({category: value})} >
									{this.props.categories.map((category, id) => (
										<Option key={id} value={category.slug}>{category.name}</Option>
									))}
								</Select>
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
	return {
		categories: state.services.categories
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getCategories: () => {
			return dispatch(services.getCategories())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)