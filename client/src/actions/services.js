export const fetchServices = (location, keywords, category) => {
	return (dispatch, getState) => {
		let headers = {'Content-Type': 'application/json'}
		let body = JSON.stringify({location, keywords, category})
		return fetch('//localhost:8000/api/services/search/', {headers, body, method: 'POST'})
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return {status: res.status, data}
					})
				}
				else {
					console.log('Server error.')
					throw res
				}
			})
			.then(res => {
				if (res.status === 200) {
					return dispatch({type: 'FETCH_SERVICES', services: res.data})
				}
				else {
					throw res
				}
			})
	}
}


export const listServices = (user = null) => {
	return (dispatch, getState) => {
		const token = getState().auth.token
		let headers = {
			'Content-Type': 'application/json'
		}
		if (token) {
			headers['Authorization'] = `Token ${token}`
		}
		
		return fetch('//localhost:8000/api/dashboard/services/', {headers, method: 'GET'})
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return {status: res.status, data}
					})
				}
				else {
					console.log('Server error.')
				}
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({type: 'SERVICES_LOADED', services: res.data})
					return res.data
				}
				else {
					dispatch({type: 'USER_UPDATE_FAILED'})
					return res.data
				}
			})
	}
}

export const createService = (serviceData) => {
	return (dispatch, getState) => {
		const token = getState().auth.token
		let headers = {
			'Content-Type': 'application/json'
		}
		if (token) {
			headers['Authorization'] = `Token ${token}`
		}
		let body = JSON.stringify(serviceData)
		
		return fetch('//localhost:8000/api/dashboard/services/', {headers, body, method: 'POST'})
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return {status: res.status, data}
					})
				}
				else {
					console.log('Server error.')
				}
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({type: 'SERVICES_CREATION_SUCCESSFUL', service: res.data})
					return res.data
				}
				else {
					dispatch({type: 'SERVICES_CREATION_FAILED'})
					return res.data
				}
			})
	}
}


export const getCategories = () => {
	return (dispatch, getState) => {
		let headers = {
			'Content-Type': 'application/json'
		}
		
		return fetch('//localhost:8000/api/services/categories/', {headers, method: 'GET'})
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return {status: res.status, data}
					})
				}
				else {
					console.log('Server error.')
				}
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({type: 'CATEGORIES_LOAD_SUCCESSFUL', categories: res.data})
					return res.data
				}
				else {
					dispatch({type: 'CATEGORIES_LOAD_FAILED'})
					return res.data
				}
			})
	}
}


export const getLocation = () => {
	return (dispatch, getState) => {
		if (window.navigator.geolocation) {
			let latitude, longitude
			navigator.geolocation.getCurrentPosition(async (position) => {
				latitude = position.coords.latitude
				longitude = position.coords.longitude
				console.log(position.coords.latitude)
				return `${latitude},${longitude}`
			})
		}
		else {
			console.log('Geolocation not supported.')
		}
	}
}