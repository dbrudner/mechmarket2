import { Keyboard } from "../post/duck";

export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

type User = {
	_id: string;
	username: string;
	password: string;
	email: string;
	keyboards: Keyboard[];
};

type InitialState = {
	user: "LOGIN_SUCCESS" | User;
};

const initialState: InitialState = null;

export const userReducer = (state = initialState, action) => {
	if (action.type === GET_USER_SUCCESS) {
		return action.payload;
	}

	if (action.type === LOGIN_SUCCESS) {
		return LOGIN_SUCCESS;
	}

	return state;
};
