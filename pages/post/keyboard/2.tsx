import * as React from "react";
import Router from "next/router";
import { Form, Input, Button, Icon, AutoComplete } from "antd";
import { connect } from "react-redux";
import { Container } from "../../../modules/common";
import Steps from "../../../modules/post/steps";
import Size from "../../../modules/post/keyboard/size";
import Layout from "../../../modules/post/keyboard/layout";
import Keycaps from "../../../modules/post/keyboard/keycaps";
import { updateKeyboard, Keyboard } from "../../../modules/post";

export type SizeType = "Full" | "TKL" | "75%" | "60%";
export type LayoutType = "ANSI" | "ISO";

type State = {
	size: string;
	layout: LayoutType | "";
	keycaps: string;
	switches: string;
};

type Props = {
	updateKeyboard: (keyboard: State) => void;
	postKeyboardForm: State;
} & Keyboard;

const FormItem = Form.Item;

class PostKeyboard2 extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			size: "",
			layout: "",
			keycaps: "",
			switches: ""
		};
	}

	componentDidMount() {
		const { size, layout, keycaps, switches } = this.props;
		this.setState({ size, layout, keycaps, switches });
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.updateKeyboard({ ...this.state });
		Router.push("/post/keyboard/3");
	};

	render() {
		return (
			<Container mustBeLoggedIn>
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

const mapStateToProps = ({ postKeyboardForm }) => ({ postKeyboardForm });

export default connect(
	mapStateToProps,
	{ updateKeyboard }
)(PostKeyboard2);
