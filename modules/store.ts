import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { loginReducer } from "./signup/duck";
import { keycapReducer } from "./post-keyboard/page-1/keycaps/duck";
import { fetchKeycaps, signUp } from "./common/middleware/async";

const rootReducer = combineReducers({
	user: loginReducer,
	keycaps: keycapReducer
});

export function initializeStore() {
	return createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(fetchKeycaps, signUp))
	);
}
