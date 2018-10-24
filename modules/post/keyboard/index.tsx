import * as React from "react";
import Router from "next/router";
import { Form, Input, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as yup from "yup";
import Size from "./size";
import Layout from "./layout";
import Keycaps from "./keycaps";
import { PostKeyboardState } from "../duck";
import { UPDATE_KEYBOARD } from "../duck";

export type SizeType = "Full" | "TKL" | "75%" | "60%";
export type LayoutType = "ANSI" | "ISO";

type State = {
	size: string;
	askingPrice: number | string;
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
			askingPrice: 0,
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

	askingPriceChange = ({ target: { value } }) => {
		if (!isNaN(value)) {
			const askingPrice = parseFloat(value).toFixed(2);
			this.setState({ askingPrice });
		}
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<h2>Name</h2>
				<FormItem>
					<Input
						onChange={e => this.setState({ name: e.target.value })}
						value={this.state.name}
						name="name"
						type="number"
					/>
				</FormItem>
				<h2>Asking price</h2>
				<FormItem>
					<Input
						name="asking price"
						value={this.state.askingPrice}
						onChange={this.askingPriceChange}
					/>
				</FormItem>
				<h2>Size</h2>
				<FormItem>
					<Size
						selectedSize={this.state.size as SizeType}
						handleChange={size => this.setState({ size })}
					/>
				</FormItem>
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
				<h2>Description</h2>
				<FormItem>
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
