import * as React from "react";
import { PostKeyboardState } from "../post/duck";

export default class SingleKeyboard extends React.Component<
	PostKeyboardState,
	{}
> {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		const { size, layout, keycaps, description, name, images } = this.props;

		return (
			<div>
				<h1>{name}</h1>
			</div>
		);
	}
}
