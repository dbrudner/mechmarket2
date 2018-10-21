export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

type InitialState = {
	user: any;
};

const initialState: InitialState = {
	user: null
};

export const loginReducer = (state = initialState, action) => {
	if (action.type === SIGN_UP) {
		return { ...state, user: action.payload };
	}

	return state;
};
