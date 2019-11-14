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