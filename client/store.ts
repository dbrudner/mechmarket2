import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { loginReducer } from "./signup/duck";
import { fetchMiddleware } from "../client/middleware/async-middleware";

const rootReducer = combineReducers({
	user: loginReducer
});

export function initializeStore() {
	return createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(fetchMiddleware))
	);
}
