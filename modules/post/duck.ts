export const UPDATE_KEYBOARD = "UPDATE_KEYBOARD";

export type SizeType = "Full" | "TKL" | "75%" | "60%";
export type LayoutType = "ANSI" | "ISO";
export type PostKeyboardState = {
	size: string;
	layout: LayoutType;
	keycaps: string;
	description: string;
	name: string;
	images: string[];
};

const initialState: PostKeyboardState = {
	size: "Full",
	layout: "ISO",
	keycaps: "lorem",
	description:
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	name: "Name",
	images: [
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl2ibKfw9K6ntYDgzFx55xcEiOZSO7YBASCruP5R5ckNE2Sv5K",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl2ibKfw9K6ntYDgzFx55xcEiOZSO7YBASCruP5R5ckNE2Sv5K",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl2ibKfw9K6ntYDgzFx55xcEiOZSO7YBASCruP5R5ckNE2Sv5K"
	]
};

export const postKeyboardReducer = (
	state: PostKeyboardState = initialState,
	action
) => {
	if (action.type === UPDATE_KEYBOARD) {
		return { ...state, ...action.payload };
	}

	return state;
};
