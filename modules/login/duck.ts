export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

type InitialState = {
	user: any;
};

const initialState: InitialState = {
	user: null
};

export const loginReducer = (state = initialState, action) => {
	if (action.type === LOGIN) {
		return { ...state, user: action.payload };
	}

	return state;
};
