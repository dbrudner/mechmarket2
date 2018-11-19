import { useState } from "react";
import Router from "next/router";
import { Form, Input, Button, Icon, AutoComplete } from "antd";
import { connect } from "react-redux";
import { Container } from "../../../modules/common";
import Steps from "../../../modules/post/steps";
import Size from "../../../modules/post/keyboard/size";
import Layout from "../../../modules/post/keyboard/layout";
import Keycaps from "../../../modules/post/keyboard/keycaps";
import { updateKeyboard, Keyboard } from "../../../modules/post";

export type Size = "Full" | "TKL" | "75%" | "60%";
export type Layout = "ANSI" | "ISO";

type State = {
	size: string;
	layout: string;
	keycaps: string;
	switches: string;
};

type Props = {
	updateKeyboard: (keyboard: State) => void;
	postKeyboardForm: State;
} & Keyboard;

const FormItem = Form.Item;

const PostKeyboard2: React.SFC<Props> = ({
	updateKeyboard,
	postKeyboardForm
}) => {
	const [size, setSize] = useState(postKeyboardForm.size);
	const [layout, setLayout] = useState(postKeyboardForm.layout);
	const [keycaps, setKeycaps] = useState(postKeyboardForm.keycaps);
	const [switches, setSwitches] = useState(postKeyboardForm.switches);

	const handleSubmit = e => {
		e.preventDefault();
		updateKeyboard({ size, layout, keycaps, switches });
		Router.push("/post/keyboard/3");
	};

	return (
		<Container mustBeLoggedIn>
			<h1>Post a keyboard</h1>
			<Steps stepNumber={1} />
			<Form onSubmit={handleSubmit}>
				<h2>Size</h2>
				<FormItem>
					<Size
						selectedSize={size as Size}
						handleChange={size => setSize(size)}
					/>
				</FormItem>
				<h2>Layout</h2>
				<FormItem>
					<Layout
						selectedLayout={layout as Layout}
						handleChange={layout => setLayout(layout)}
					/>
				</FormItem>
				<h2>Keycaps</h2>
				<FormItem>
					<Keycaps
						value={keycaps}
						handleChange={keycaps => setKeycaps(keycaps)}
					/>
				</FormItem>
				<h2>Switches</h2>
				<FormItem>
					<Input
						value={switches}
						onChange={e => setSwitches(e.target.value)}
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
};

const mapStateToProps = ({ postKeyboardForm }) => ({ postKeyboardForm });

export default connect(
	mapStateToProps,
	{ updateKeyboard }
)(PostKeyboard2);
