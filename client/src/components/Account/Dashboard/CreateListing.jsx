import React, {Component} from 'react'
import {connect} from 'react-redux'
import {services} from '../../../actions'
import {Row, Col, Form, Input, Select, Button, message} from 'antd'
import 'antd/dist/antd.css'


const {TextArea} = Input
const {Option} = Select

class CreateListing extends Component {

	state = {
		title: '',
		description: '',
		keywords: '',
		category: '',
		phone: '',
		location: ''
	}

	componentDidMount() {
		this.props.getCategories()
	}

	onSubmit = e => {
		e.preventDefault()
		let serviceData = {
			title: this.state.title,
			description: this.state.description,
			keywords: this.state.keywords,
			category: this.state.category,
			phone: `+88${this.state.phone}`,
			location: {
				type: 'Point',
				coordinates: [90.43864307880969, 23.174755093473564]
			}
		}
		this.props.createService(serviceData)
		message.success('Listing added successfully.')
	}

	render() {

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 18 },
			},
		}

		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 6,
				},
			},
		}
		
		return (
			<div id="create-listing" style={{ marginBottom: 24 }}>
				<h2>Create New Listing</h2>
				<Row gutter={16}>
					<Col span={20}>
						<Form {...formItemLayout} onSubmit={this.onSubmit}>
							<Form.Item label="Title" style={{ marginBottom: 16 }}>
								<Input type="text" placeholder="Give your service a short but descriptive title" onChange={e => this.setState({title: e.target.value})} />
							</Form.Item>
							<Form.Item label="Description" style={{ marginBottom: 16 }}>
								<TextArea placeholder="Description" autoSize={{ minRows: 2, maxRows: 6 }} onChange={e => this.setState({description: e.target.value})} />
							</Form.Item>
							<Form.Item label="Keywords" style={{ marginBottom: 16 }}>
								<Input type="text" onChange={e => this.setState({keywords: e.target.value})} />
							</Form.Item>
							<Form.Item label="Category" style={{ marginBottom: 16 }}>
								<Select showSearch style={{ width: '100%' }} placeholder="Select a category" optionFilterProp="children" onChange={value => this.setState({category: value})} >
									{this.props.categories.map((category, id) => (
										<Option key={id} value={category.id}>{category.name}</Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item label="Phone" style={{ marginBottom: 16 }}>
								<Input type="text" addonBefore="+88" onChange={e => this.setState({phone: e.target.value})} />
							</Form.Item>
							<Form.Item label="Location" style={{ marginBottom: 16 }}>
								<Input type="text" onChange={e => this.setState({location: e.target.value})} />
							</Form.Item>
							<Form.Item {...tailFormItemLayout} style={{ marginBottom: 16 }}>
								<Button type="primary" htmlType="submit">Create Listing</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
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
		createService: (serviceData) => {
			return dispatch(services.createService(serviceData))
		},
		getCategories: () => {
			return dispatch(services.getCategories())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing)