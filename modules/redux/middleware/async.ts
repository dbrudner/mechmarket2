import {
	LOGIN_FAILURE,
	LOGIN_SUCCESS,
	LOGIN,
	SIGN_UP_FAILURE,
	SIGN_UP_SUCCESS,
	SIGN_UP,
	GET_USER,
	GET_USER_SUCCESS
} from "../../user/duck";
import {
	FETCH_KEYCAPS,
	FETCH_KEYCAPS_SUCCESS,
	FETCH_KEYCAPS_FAILURE
} from "../../post/keyboard/keycaps/duck";
import {
	SUBMIT_KEYBOARD,
	SUBMIT_KEYBOARD_SUCCESS,
	SUBMIT_KEYBOARD_FAILURE
} from "../../post/duck";

import axios from "axios";

const createAsyncMiddleware = (route, method, actionType, successAction) => {
	return store => next => async action => {
		console.log(action);
		if (action.type === actionType) {
			const res =
				method === "POST"
					? await axios.post(route, action.payload)
					: await axios.get(route);

			await console.log(successAction);
			await next({ type: successAction, payload: await res.data });
		}
		return next(action);
	};
};

export const signUp = createAsyncMiddleware(
	"/api/signup",
	"POST",
	SIGN_UP,
	SIGN_UP_SUCCESS
);

export const login = createAsyncMiddleware(
	"/api/login",
	"POST",
	LOGIN,
	LOGIN_SUCCESS
);

export const getUser = createAsyncMiddleware(
	"/api/test",
	"GET",
	GET_USER,
	GET_USER_SUCCESS
);

export const fetchKeycaps = createAsyncMiddleware(
	"/api/keycaps",
	"get",
	FETCH_KEYCAPS,
	FETCH_KEYCAPS_SUCCESS
);

export const postKeyboard = createAsyncMiddleware(
	"/api/post/keyboard",
	"POST",
	SUBMIT_KEYBOARD,
	SUBMIT_KEYBOARD_SUCCESS
);
