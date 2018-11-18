import * as React from "react";
import Router from "next/router";
import { Form, Input, Button, Icon, AutoComplete } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateKeyboard } from "../../../modules/post";
import { Container, Warning, labelStyle } from "../../../modules/common";
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
		<Container mustBeLoggedIn>
			<h1>Post a keyboard</h1>
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
						.required("Asking price is required.")
						.max(4, "Must be less than $9999"),
					description: Yup.string().max(
						300,
						"Description must be less than 300 characters"
					)
				})}
				render={({ handleSubmit, handleChange, values, errors }) => (
					<Form onSubmit={handleSubmit}>
						<FormItem style={{ marginBottom: 0 }}>
							<label>
								<div style={labelStyle}>Name</div>
								<Input
									name="name"
									onChange={handleChange}
									value={values.name}
								/>
							</label>
						</FormItem>
						<FormItem style={{ marginBottom: 0 }}>
							<label>
								<div style={labelStyle}>Asking price</div>
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
							</label>
						</FormItem>
						<FormItem>
							<label>
								<div style={labelStyle}>Description</div>
								<TextArea
									name="description"
									onChange={handleChange}
									value={values.description}
								/>
							</label>
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
		</Container>
	);
};

const mapStateToProps = ({ postKeyboardForm }) => ({ postKeyboardForm });

export default connect(
	mapStateToProps,
	{ updateKeyboard }
)(PostKeyboard);
