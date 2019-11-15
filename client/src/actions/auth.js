export const loadUser = () => {
	return (dispatch, getState) => {
		dispatch({type: 'USER_LOADING'})

		const token = getState().auth.token
		let headers = {
			'Content-Type': 'application/json'
		}

		if (token) {
			headers['Authorization'] = `Token ${token}`
		}
		return fetch('//localhost:8000/api/account/user/', {headers, })
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
					dispatch({type: 'USER_LOADED', user: res.data})
					return res.data
				}
				else if (res.status >= 400 && res.status < 500) {
					dispatch({type: 'AUTHENTICATION_ERROR', data: res.data})
					throw res.data
				}
			})
	}
}


export const login = (phone, password) => {
	return (dispatch, getState) => {
		let headers = {'Content-Type': 'application/json'}
		let body = JSON.stringify({phone, password})

		return fetch('//localhost:8000/api/account/login/', {headers, body, method: 'POST'})
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
					dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data})
					return res.data
				}
				else if (res.status === 403 || res.status === 401) {
					dispatch({type: 'AUTHENTICATION_ERROR', data: res.data})
					throw res.data
				}
				else {
					dispatch({type: 'LOGIN_FAILED', data: res.data})
					throw res.data
				}
			})
	}
}


export const updateUser = (updateData) => {
	return (dispatch, getState) => {
		const token = getState().auth.token
		let headers = {
			'Content-Type': 'application/json'
		}
		if (token) {
			headers['Authorization'] = `Token ${token}`
		}
		let body = JSON.stringify(updateData)
		
		return fetch('//localhost:8000/api/account/user/', {headers, body, method: 'POST'})
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
					dispatch({type: 'USER_UPDATE_SUCCESSFUL', user: res.data})
					return res.data
				}
				else {
					dispatch({type: 'USER_UPDATE_FAILED', user: res.data})
					return res.data
				}
			})
	}
}


export const register = (phone, name, company, password) => {
	return (dispatch, getState) => {
		let headers = {'Content-Type': 'application/json'}
		let body = JSON.stringify({phone, name, company, password})

		return fetch('//localhost:8000/api/account/register/', {headers, body, method: 'POST'})
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
					dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data})
					return res.data
				}
				else if (res.status === 403 || res.status === 401) {
					dispatch({type: 'AUTHENTICATION_ERROR', data: res.data})
					return res.data
				}
				else {
					dispatch({type: 'REGISTRATION_FAILED', data: res.data})
					return res.data
				}
			})
	}
}

export const logout = () => {
	return (dispatch, getState) => {
		let headers = {'Content-Type': 'application/json'}

		return fetch('//localhost:8000/api/account/logout/', {headers, body: '', method: 'POST'})
			.then(res => {
				if (res.status === 204) {
					return {status: res.status, data: {}}
				}
				else if (res.status < 500) {
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
				if (res.status === 204) {
					dispatch({type: 'LOGOUT_SUCCESSFUL'})
					return res.data
				}
				else if (res.status === 403 || res.status === 401) {
					dispatch({type: 'AUTHENTICATION_ERROR', data: res.data})
					throw res.data
				}
			})
	}
}






















