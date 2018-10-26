import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { loginReducer } from "../signup/duck";
import { keycapReducer } from "../post/keyboard/keycaps/duck";
import { postKeyboardReducer } from "../post/duck";
import { fetchKeycaps, signUp, postKeyboard } from "./middleware/async";

const rootReducer = combineReducers({
	user: loginReducer,
	keycaps: keycapReducer,
	postKeyboardForm: postKeyboardReducer
});

export function initializeStore() {
	return createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(fetchKeycaps, signUp, postKeyboard))
	);
}
