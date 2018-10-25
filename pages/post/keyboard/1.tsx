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

const PostKeyboard = ({ postKeyboardForm, updateKeyboard }) => {
	const hasError = errors => !!Object.keys(errors).length;
	const getError = errors => errors[Object.keys(errors)[0]];

	return (
		<Container>
			<Formik
				initialValues={{
					...postKeyboardForm
				}}
				onSubmit={(values, action) => {
					updateKeyboard(values);
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
				render={({ handleSubmit, handleChange, values, errors }) => (
					<Form onSubmit={handleSubmit}>
						<h2>Name</h2>
						{errors.name && <div>{errors.name}</div>}
						<Input
							name="name"
							onChange={handleChange}
							value={values.name}
						/>
						<h2>Asking price</h2>
						{errors.price && <div>{errors.price}</div>}
						<Input
							name="price"
							onChange={e => {
								console.log(errors);
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
						<h2>Description</h2>
						{errors.description && <div>{errors.description}</div>}
						<TextArea
							name="description"
							onChange={handleChange}
							value={values.description}
						/>
						{hasError(errors) && (
							<Warning message={getError(errors)} />
						)}
						<Button
							style={{ marginTop: "20px" }}
							type="primary"
							htmlType="submit"
							disabled={!hasError(errors)}
						>
							Next
						</Button>
					</Form>
				)}
			/>
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
