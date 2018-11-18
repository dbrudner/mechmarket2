import * as React from "react";
import Router from "next/router";
import { Form, Input, Button, Icon, AutoComplete } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostKeyboardState } from "../../../modules/post/keyboard/duck";
import { UPDATE_KEYBOARD } from "../../../modules/post/keyboard/duck";
import { Container, Warning } from "../../../modules/common";
import Steps from "../../../modules/post/steps";
import Size from "../../../modules/post/keyboard/size";
import Layout from "../../../modules/post/keyboard/layout";
import Keycaps from "../../../modules/post/keyboard/keycaps";

export type SizeType = "Full" | "TKL" | "75%" | "60%";
export type LayoutType = "ANSI" | "ISO";

type State = {
	size: string;
	layout: LayoutType;
	keycaps: string;
	switches: string;
};

type Props = {
	updateKeyboard: (keyboard: State) => void;
	postKeyboardForm: State;
};

const FormItem = Form.Item;

class PostKeyboard2 extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			size: "Full",
			layout: "ISO",
			keycaps: "",
			switches: ""
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.updateKeyboard({ ...this.state });
		Router.push("/post/keyboard/3");
	};

	render() {
		return (
			<Container>
				<h1>Post a keyboard</h1>
				<Steps stepNumber={1} />
				<Form onSubmit={this.handleSubmit}>
					<h2>Size</h2>
					<FormItem>
						<Size
							selectedSize={this.state.size as SizeType}
							handleChange={size => this.setState({ size })}
						/>
					</FormItem>
					<h2>Layout</h2>
					<FormItem>
						<Layout
							selectedLayout={this.state.layout}
							handleChange={layout => this.setState({ layout })}
						/>
					</FormItem>
					<h2>Keycaps</h2>
					<FormItem>
						<Keycaps
							handleChange={keycaps => this.setState({ keycaps })}
						/>
					</FormItem>
					<h2>Switches</h2>
					<FormItem>
						<Input
							onChange={e =>
								this.setState({ switches: e.target.value })
							}
						/>
					</FormItem>
					<Button
						style={{ marginTop: "20px" }}
						type="primary"
						htmlType="submit"
					>
						Next
					</Button>
				</Form>
			</Container>
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
)(PostKeyboard2);
