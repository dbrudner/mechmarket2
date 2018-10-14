import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({});

export function initializeStore() {
	return createStore(rootReducer, composeWithDevTools(applyMiddleware()));
}
