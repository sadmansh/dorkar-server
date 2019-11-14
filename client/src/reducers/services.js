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

		default:
			return state
	}
}