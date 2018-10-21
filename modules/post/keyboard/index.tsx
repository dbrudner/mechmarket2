import * as React from "react";
import Router from "next/router";
import { Form, Input, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import Size from "./size";
import Layout from "./layout";
import Keycaps from "./keycaps";
import { PostKeyboardState } from "../duck";
import { connect } from "react-redux";
import { UPDATE_KEYBOARD } from "../duck";

export type SizeType = "Full" | "TKL" | "75%" | "60%";
export type LayoutType = "ANSI" | "ISO";

type State = {
	size: string;
	layout: LayoutType;
	keycaps: string;
	description: string;
	name: string;
	images: string[];
};

type Props = {
	updateKeyboard: (keyboard: State) => void;
	postKeyboardForm: State;
};

class PostKeyboard extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			size: "Full",
			layout: "ISO",
			keycaps: "",
			description: "",
			name: "",
			images: []
		};
	}

	componentDidMount() {
		this.setState({ ...this.props.postKeyboardForm });
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.updateKeyboard(this.state);
		Router.push("/post/images");
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem>
					<h2>Name</h2>
					<Input
						onChange={e => this.setState({ name: e.target.value })}
						value={this.state.name}
						name="name"
					/>
				</FormItem>
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
				<div
					style={{
						margin: "20px 0",
						width: "30%",
						minWidth: "200px"
					}}
				>
					<h2>Keycaps</h2>
					<Keycaps
						handleChange={keycaps => this.setState({ keycaps })}
					/>
				</div>
				<FormItem>
					<h2>Description</h2>
					<Input.TextArea
						onChange={e =>
							this.setState({ description: e.target.value })
						}
						value={this.state.description}
						name="description"
						autosize={{ minRows: 3, maxRows: 6 }}
					/>
				</FormItem>
				<Button htmlType="submit" type="primary">
					Next page
				</Button>
			</Form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	updateKeyboard: keyboard =>
		dispatch({ type: UPDATE_KEYBOARD, payload: keyboard })
});

const mapStateToProps = ({ postKeyboardForm }) => ({ postKeyboardForm });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostKeyboard);
