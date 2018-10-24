import * as React from "react";
import Router from "next/router";
import { Form, Input, Button, Icon } from "antd";
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
			askingPrice: 1,
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
		const validCurrency = new RegExp(
			/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/
		);

		if (value === "") {
			this.setState({ askingPrice: value });
		}

		if (parseFloat(value) <= 0 || parseFloat(value) > 99999) {
			return;
		}

		if (validCurrency.test(value)) {
			this.setState({ askingPrice: value });
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
						size="large"
					/>
				</FormItem>
				<h2>Asking price</h2>
				<FormItem>
					<Input
						name="asking price"
						value={this.state.askingPrice}
						onChange={this.askingPriceChange}
						prefix="$"
						style={{ width: "200px" }}
						size="large"
					/>
				</FormItem>
				<h2>
					Size{" "}
					<a
						href="https://www.reddit.com/r/MechanicalKeyboards/wiki/tenkeyless_keyboards"
						target="blank"
					>
						<Icon type="question-circle" theme="outlined" />
					</a>
				</h2>
				<FormItem>
					<Size
						selectedSize={this.state.size as SizeType}
						handleChange={size => this.setState({ size })}
					/>
				</FormItem>
				<h2>
					Layout{" "}
					<a
						href="https://deskthority.net/wiki/ANSI_vs_ISO"
						target="blank"
					>
						<Icon type="info-circle" theme="outlined" />
					</a>
				</h2>
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
						size="large"
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
					Next
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
