import {
	LOAD_PROFILE,
	GET_PROFILE
} from '../constants'

const initialState = {
	loading: false,
	user: null
}

export default function (state = initialState, action) {
	switch(action.type) {
		case LOAD_PROFILE:
			return {
				...state,
				loading: true
			}
		case GET_PROFILE:
			return {
				...state,
				loading: false,
				user: action.payload
			}
		default:
			return state
	}
}