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

		case 'GET_LOCATION':
			return {...state, search: {location: action.location}}

		default:
			return state
	}
}