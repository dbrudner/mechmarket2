import * as React from "react";
import { withFormik } from "formik";
import * as yup from "yup";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Warning from "./warning";
import { connect } from "react-redux";
import * as actions from "./duck";

type SignupType = {
	username?: string;
	password?: string;
	password2?: string;
	email?: string;
	remember?: boolean;
	signup?: (payload: { username?: string; password?: string }) => void;
};

const FormItem = Form.Item;

const labelStyle = {
	height: "30px",
	fontWeight: 700
};

const SignupForm: React.SFC<{
	values: SignupType;
	errors: SignupType;
	handleSubmit: any;
	handleChange: any;
	touched: any;
}> = ({ errors, handleSubmit, handleChange, values, touched }) => (
	<Form onSubmit={handleSubmit}>
		<FormItem style={{ marginBottom: 0 }}>
			<label>
				<div style={labelStyle}>Username</div>
				<Input
					onChange={handleChange}
					value={values.username}
					type="text"
					name="username"
					prefix={
						<Icon
							type="user"
							style={{ color: "rgba(0,0,0,.25)" }}
						/>
					}
				/>
			</label>
			{errors.username && touched.username && (
				<Warning message={errors.username} />
			)}
		</FormItem>
		<FormItem style={{ marginBottom: 0 }}>
			<label>
				<div style={labelStyle}>Email Address</div>
				<Input
					onChange={handleChange}
					value={values.email}
					type="text"
					name="email"
					prefix={
						<Icon
							type="mail"
							style={{ color: "rgba(0,0,0,.25)" }}
						/>
					}
				/>
			</label>
			{errors.email && touched.email && (
				<Warning message={errors.email} />
			)}
		</FormItem>
		<FormItem style={{ marginBottom: 0 }}>
			<label>
				<div style={labelStyle}>Password</div>
				<Input
					onChange={handleChange}
					value={values.password}
					type="password"
					name="password"
					prefix={
						<Icon
							type="lock"
							style={{ color: "rgba(0,0,0,.25)" }}
						/>
					}
				/>
			</label>
		</FormItem>
		<FormItem>
			<label>
				<div style={labelStyle}>Type your password again</div>
				<Input
					onChange={handleChange}
					value={values.password2}
					type="password"
					name="password2"
					prefix={
						<Icon
							type="lock"
							style={{ color: "rgba(0,0,0,.25)" }}
						/>
					}
				/>
			</label>
			{errors.password && touched.password && (
				<Warning message={errors.password} />
			)}
		</FormItem>
		<FormItem>
			<label style={{ cursor: "pointer" }}>
				<Checkbox onChange={handleChange} name="remember" />
				<span style={{ marginLeft: "5px" }}>Remember me</span>
			</label>
			<Button
				style={{ display: "block", width: "100%" }}
				type="primary"
				htmlType="submit"
			>
				Sign up
			</Button>
		</FormItem>
	</Form>
);

const SignupFormik = withFormik<SignupType, SignupType>({
	handleSubmit(values: SignupType, { props }) {
		props.signup(values);
	},
	validate(values) {
		if (values.password !== values.password2) {
			return { password: "Passwords don't match" };
		}
	},
	validationSchema: yup.object().shape({
		username: yup
			.string()
			.min(3, "Must be at least 3 characters.")
			.required("A username is required."),
		email: yup
			.string()
			.email("Must be a valid email")
			.required("An email address is required"),
		password: yup
			.string()
			.min(6, "Passwords must be at least 6 characters.")
			.required("Password is required."),
		password2: yup
			.string()
			.min(6, "Passwords must be at least 6 characters.")
			.required("Password is required.")
	}),
	displayName: "Sign up"
})(SignupForm as any);

const mapDispatchToProps = dispatch => {
	return {
		signup: payload => dispatch({ type: actions.SIGN_UP, payload }),
		dispatch
	};
};

const Signup = connect(
	null,
	mapDispatchToProps
)(SignupFormik);

export default Signup;
