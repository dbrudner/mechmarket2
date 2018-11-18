export const UPDATE_KEYBOARD = "UPDATE_KEYBOARD";
export const SUBMIT_KEYBOARD = "SUBMIT_KEYBOARD";
export const SUBMIT_KEYBOARD_SUCCESS = "SUBMIT_KEYBOARD_SUCCESS";
export const SUBMIT_KEYBOARD_FAILURE = "SUBMIT_KEYBOARD_FAILURE";

export type SizeType = "Full" | "TKL" | "75%" | "60%";
export type LayoutType = "ANSI" | "ISO";
export type Keyboard = {
	size: string;
	layout: LayoutType | "";
	keycaps: string;
	description: string;
	name: string;
	images: string[];
	price: number | "";
};

const initialState: Keyboard = {
	size: "",
	layout: "",
	keycaps: "",
	price: "",
	description: "",
	name: "",
	images: [
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl2ibKfw9K6ntYDgzFx55xcEiOZSO7YBASCruP5R5ckNE2Sv5K",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl2ibKfw9K6ntYDgzFx55xcEiOZSO7YBASCruP5R5ckNE2Sv5K",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl2ibKfw9K6ntYDgzFx55xcEiOZSO7YBASCruP5R5ckNE2Sv5K"
	]
};

export const postKeyboardReducer = (state: Keyboard = initialState, action) => {
	if (action.type === UPDATE_KEYBOARD) {
		return { ...state, ...action.payload };
	}

	return state;
};

export const updateKeyboard = payload => ({
	type: UPDATE_KEYBOARD,
	payload
});
