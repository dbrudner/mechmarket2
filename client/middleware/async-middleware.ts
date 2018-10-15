import * as types from "../signup/duck";
import axios from "axios";

export const fetchMiddleware = store => next => action => {
	if (action.type === types.SIGNING_UP) {
		console.log(action.payload);

		axios.post("/api/signup", action.payload).then(res => {
			console.log(res);
			console.log(res.data);
			next({ type: types.SIGN_UP_SUCCESS, payload: res.data });
		});

		// const response = await axios.post("/login", action.payload);
		// const { data } = await response;
		// console.log({ data });
	}
	return next(action);
};
