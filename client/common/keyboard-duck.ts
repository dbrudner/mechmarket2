export const FETCH_KEYCAPS = "FETCH_KEYCAPS";
export const FETCH_KEYCAPS_SUCCESS = "FETCH_KEYCAPS_SUCCESS";
export const FETCH_KEYCAPS_FAILURE = "FETCH_KEYCAPS_FAILURE";

type State = {
	keycaps: string[];
};

const initialState: State = {
	keycaps: []
};

export const keyboardReducer = (state = initialState, action) => {
	if (action.payload === FETCH_KEYCAPS_SUCCESS) {
		return { ...state, keycaps: action.payload };
	}
};
