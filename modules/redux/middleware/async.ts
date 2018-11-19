import {
	LOGIN_FAILURE,
	LOGIN_SUCCESS,
	LOGIN,
	SIGN_UP_FAILURE,
	SIGN_UP_SUCCESS,
	SIGN_UP,
	GET_USER,
	GET_USER_SUCCESS,
	GET_USER_FAILURE
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
} from "../../post/keyboard/duck";

import axios from "axios";

const createAsyncMiddleware = (
	route,
	method,
	actionType,
	successAction,
	failureAction
) => {
	return store => next => async action => {
		if (action.type === actionType) {
			try {
				const res =
					method === "POST"
						? await axios.post(route, action.payload)
						: await axios.get(route);

				await next({ type: successAction, payload: await res.data });
			} catch {
				await console.log("failureAction");
				await next({ type: failureAction, payload: "FAILED" });
			}
		}
		return next(action);
	};
};

export const signUp = createAsyncMiddleware(
	"/api/signup",
	"POST",
	SIGN_UP,
	SIGN_UP_SUCCESS,
	SIGN_UP_FAILURE
);

export const login = createAsyncMiddleware(
	"/api/login",
	"POST",
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILURE
);

export const getUser = createAsyncMiddleware(
	"/api/test",
	"GET",
	GET_USER,
	GET_USER_SUCCESS,
	GET_USER_FAILURE
);

export const fetchKeycaps = createAsyncMiddleware(
	"/api/keycaps",
	"get",
	FETCH_KEYCAPS,
	FETCH_KEYCAPS_SUCCESS,
	FETCH_KEYCAPS_FAILURE
);

export const postKeyboard = createAsyncMiddleware(
	"/api/post/keyboard",
	"POST",
	SUBMIT_KEYBOARD,
	SUBMIT_KEYBOARD_SUCCESS,
	SUBMIT_KEYBOARD_FAILURE
);
