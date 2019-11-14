const initialState = {
	isLoading: null,
}

export default function services(state=initialState, action) {
	// let servicesList = state.slice()

	switch (action.type) {
		case 'FETCH_SERVICES':
			return [...state, ...action.services]

		default:
			return state
	}
}