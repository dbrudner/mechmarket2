import * as React from "react";
import Router from "next/router";
import { Form, Input, Button, Icon, AutoComplete } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostKeyboardState } from "../../../modules/post/duck";
import { UPDATE_KEYBOARD } from "../../../modules/post/duck";
import Container from "../../../modules/common/container";
import Warning from "../../../modules/common/warning";
import Steps from "../../../modules/post/steps";

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

const FormItem = Form.Item;

const PostKeyboard = ({ postKeyboardForm, updateKeyboard }) => {
	const hasError = errors => !!Object.keys(errors).length;
	const getError = errors => errors[Object.keys(errors)[0]];

	return (
		<Container>
			<h1>Post a keyboard</h1>
			<>
				<Steps stepNumber={0} />
				<Formik
					initialValues={{
						...postKeyboardForm
					}}
					onSubmit={(values, action) => {
						updateKeyboard(values);
						Router.push("/post/keyboard/2");
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string()
							.max(50, "Name must be less than 50 characters")
							.required("A name is required"),
						price: Yup.string()
							.matches(/^[0-9]*$/, "Must be a number")
							.max(4, "Must be less than $9999"),
						description: Yup.string().max(
							300,
							"Description must be less than 300 characters"
						)
					})}
					render={({
						handleSubmit,
						handleChange,
						values,
						errors
					}) => (
						<Form onSubmit={handleSubmit}>
							<h2>Name</h2>
							{errors.name && <div>{errors.name}</div>}
							<FormItem>
								<Input
									name="name"
									onChange={handleChange}
									value={values.name}
								/>
							</FormItem>
							<h2>Asking price</h2>
							{errors.price && <div>{errors.price}</div>}
							<FormItem>
								<Input
									name="price"
									onChange={e => {
										if (
											!new RegExp(/^[0-9]{0,4}$/).test(
												e.target.value
											)
										)
											return;
										handleChange(e);
									}}
									value={values.price}
									prefix="$"
								/>
							</FormItem>
							<h2>Description</h2>
							{errors.description && (
								<div>{errors.description}</div>
							)}
							<FormItem>
								<TextArea
									name="description"
									onChange={handleChange}
									value={values.description}
								/>
							</FormItem>
							{hasError(errors) && (
								<Warning message={getError(errors)} />
							)}
							<Button
								style={{ marginTop: "20px" }}
								type="primary"
								htmlType="submit"
								disabled={hasError(errors)}
							>
								Next
							</Button>
						</Form>
					)}
				/>
			</>
		</Container>
	);
};

const mapDispatchToProps = dispatch => ({
	updateKeyboard: keyboard =>
		dispatch({ type: UPDATE_KEYBOARD, payload: keyboard })
});

const mapStateToProps = ({ postKeyboardForm }) => ({ postKeyboardForm });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostKeyboard);
