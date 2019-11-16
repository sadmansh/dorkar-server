export const fetchServices = (keywords, category) => {
	return (dispatch, getState) => {
		let headers = {'Content-Type': 'application/json'}
		let location = getState()
		console.log(location)
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