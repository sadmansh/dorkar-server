export const fetchServices = () => {
	return (dispatch, getState) => {
		return fetch('//localhost:8000/api/services/')
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
			})
	}
}