import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "../user/duck";
import { keycapReducer } from "../post/keyboard/keycaps/duck";
import { postKeyboardReducer } from "../post/keyboard/duck";
import {
	fetchKeycaps,
	signUp,
	login,
	postKeyboard,
	getUser
} from "./middleware/async";

const rootReducer = combineReducers({
	user: userReducer,
	keycaps: keycapReducer,
	postKeyboardForm: postKeyboardReducer
});

export function initializeStore() {
	return createStore(
		rootReducer,
		composeWithDevTools(
			applyMiddleware(fetchKeycaps, signUp, postKeyboard, login, getUser)
		)
	);
}
