export const UPDATE_KEYBOARD = "UPDATE_KEYBOARD";

const initialState = {
	size: "Full",
	layout: "ISO",
	keycaps: "",
	description: "",
	name: "",
	images: []
};

export const postKeyboardReducer = (state = initialState, action) => {
	if (action.type === UPDATE_KEYBOARD) {
		return { ...state, ...action.payload };
	}

	return state;
};
