export const FETCH_KEYCAPS = "FETCH_KEYCAPS";
export const FETCH_KEYCAPS_SUCCESS = "FETCH_KEYCAPS_SUCCESS";
export const FETCH_KEYCAPS_FAILURE = "FETCH_KEYCAPS_FAILURE";

export const keycapReducer = (state = [], action) => {
	if (action.type === FETCH_KEYCAPS_SUCCESS) {
		return action.payload;
	}

	return state;
};

export const fetchKeycaps = () => ({ type: FETCH_KEYCAPS });
