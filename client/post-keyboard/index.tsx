import * as React from "react";
import formik from "formik";
import * as yup from "yup";
import SizeRadios from "./size-radios";

export type KeyboardSize = "Full" | "TKL" | "75%" | "60%";

type PostKeyboardProps = {};

type PostKeyboardState = {
	size: KeyboardSize;
};

export default class PostKeyboard extends React.Component<
	PostKeyboardProps,
	PostKeyboardState
> {
	constructor(props) {
		super(props);
		this.state = {
			size: "Full"
		};
	}

	render() {
		return (
			<div>
				<SizeRadios
					selected={this.state.size}
					handleChange={size => this.setState({ size })}
				/>
			</div>
		);
	}
}
