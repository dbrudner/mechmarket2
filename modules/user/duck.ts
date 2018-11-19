import { Keyboard } from "../post/keyboard/duck";

export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT = "LOGOUT";

export const USER_NOT_AUTHORIZED = "USER_NOT_AUTHORIZED";

export type User =
	| {
			_id: string;
			username: string;
			password: string;
			email: string;
			keyboards: Keyboard[];
	  }
	| "LOGIN_SUCCESS"
	| "SIGN_UP_SUCCESS"
	| "USER_NOT_AUTHORIZED";

const initialState: User = null;

export const userReducer = (state = initialState, action) => {
	if (action.type === GET_USER_SUCCESS) {
		return action.payload || USER_NOT_AUTHORIZED;
	}

	if (action.type === LOGIN_SUCCESS) {
		return LOGIN_SUCCESS;
	}

	if (action.type === SIGN_UP_SUCCESS) {
		return SIGN_UP_SUCCESS;
	}

	if (action.type === LOGIN_FAILURE) {
		return LOGIN_FAILURE;
	}

	if (action.type === LOGOUT_SUCCESS) {
		return null;
	}

	return state;
};

export const getUser = () => {
	return { type: GET_USER };
};

export const logout = () => {
	return { type: LOGOUT };
};

export const login = payload => {
	return { type: LOGIN, payload };
};

export const signUp = payload => {
	return { type: SIGN_UP, payload };
};
