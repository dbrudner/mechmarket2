import * as React from "react";
import Router from "next/router";
import { Form, Input, Button, Icon, AutoComplete } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import Size from "./size";
import Layout from "./layout";
import Keycaps from "./keycaps";
import { PostKeyboardState } from "../duck";
import { UPDATE_KEYBOARD } from "../duck";
import TextArea from "antd/lib/input/TextArea";

export type SizeType = "Full" | "TKL" | "75%" | "60%";
export type LayoutType = "ANSI" | "ISO";

type State = {
	size: string;
	askingPrice: number | string;
	layout: LayoutType;
	keycaps: string;
	switches: string;
	description: string;
	name: string;
	images: string[];
};

type Props = {
	updateKeyboard: (keyboard: State) => void;
	postKeyboardForm: State;
};

function PostKeyboard(props) {
	return (
		<Formik
			initialValues={{
				...props.postKeyboardForm
			}}
			onSubmit={(values, action) => {
				console.log(values);
			}}
			render={({ handleSubmit, handleChange, values, errors }) => (
				<form onSubmit={handleSubmit}>
					<h2>Name</h2>
					<Input
						name="name"
						onChange={handleChange}
						value={values.name}
					/>
					<h2>Asking price</h2>
					<Input
						name="price"
						onChange={handleChange}
						value={values.price}
					/>
					<h2>Description</h2>
					<TextArea
						name="description"
						onChange={handleChange}
						value={values.description}
					/>
					<Button
						style={{ marginTop: "20px" }}
						type="primary"
						htmlType="submit"
					>
						Next
					</Button>
				</form>
			)}
		/>
	);
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
