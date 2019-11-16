const initialState = {
	query: [],
	search: {
		location: '',
		keywords: '',
		category: ''
	}
}

export default function services(state=initialState, action) {
	// let servicesList = state.slice()

	switch (action.type) {
		case 'FETCH_SERVICES':
			return {...state, query: action.services}

		case 'SERVICES_LOADED':
			return {...state, query: action.services}

		case 'SERVICES_CREATION_SUCCESSFUL':
			return {...state, query: action.service}

		case 'SERVICES_CREATION_FAILED':
			return {...state}

		case 'GET_LOCATION':
			return {...state, search: {location: action.location}}

		default:
			return state
	}
}