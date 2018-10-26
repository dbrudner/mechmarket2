import { SIGN_UP_FAILURE, SIGN_UP_SUCCESS, SIGN_UP } from "../../signup/duck";
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
		if (action.type === actionType) {
			const res =
				method === "POST"
					? await axios.post(route, action.payload)
					: await axios.get(route);
			await next({ type: successAction, payload: await res.data });
		}
		return next(action);
	};
};

export const signUp = createAsyncMiddleware(
	"/api/signup",
	"post",
	SIGN_UP,
	SIGN_UP_SUCCESS
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
