import * as React from "react";
import formik from "formik";
import * as yup from "yup";
import Size from "./size";
import Layout from "./layout";
import Keycaps from "./keycaps";

export type SizeType = "Full" | "TKL" | "75%" | "60%";
export type LayoutType = "ANSI" | "ISO";

type PostKeyboardProps = {};

type PostKeyboardState = {
	size: SizeType;
	layout: LayoutType;
	keycaps: string;
};

export default class PostKeyboard extends React.Component<
	PostKeyboardProps,
	PostKeyboardState
> {
	constructor(props) {
		super(props);
		this.state = {
			size: "Full",
			layout: "ISO",
			keycaps: ""
		};
	}

	render() {
		return (
			<div>
				<h1>Post a keyboard</h1>
				<h2>Size</h2>
				<Size
					selectedSize={this.state.size}
					handleChange={size => this.setState({ size })}
				/>
				<h2>Layout</h2>
				<Layout
					selectedLayout={this.state.layout}
					handleChange={layout => this.setState({ layout })}
				/>
				<div style={{ margin: "20px 0" }}>
					<Keycaps />
				</div>
			</div>
		);
	}
}
