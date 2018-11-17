import * as React from "react";
import { withFormik } from "formik";
import * as yup from "yup";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Warning from "./warning";
import { connect } from "react-redux";
import * as actions from "./duck";

const FormItem = Form.Item;

type LoginType = {
	username?: string;
	password?: string;
	remember?: boolean;
	login?: (payload: { username?: string; password?: string }) => void;
};

const LoginForm: React.SFC<{
	values: LoginType;
	errors: LoginType;
	handleSubmit: any;
	handleChange: any;
	touched: any;
}> = ({ errors, handleSubmit, handleChange, values, touched }) => (
	<Form onSubmit={handleSubmit}>
		<FormItem>
			<Input
				onChange={handleChange}
				value={values.username}
				type="text"
				name="username"
				placeholder="Username"
				prefix={
					<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
				}
			/>
			{errors.username && touched.username && (
				<Warning message={errors.username} />
			)}
		</FormItem>
		<FormItem>
			<Input
				onChange={handleChange}
				value={values.password}
				type="password"
				name="password"
				placeholder="Password"
				prefix={
					<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
				}
			/>
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
				Login
			</Button>
		</FormItem>
	</Form>
);

const LoginFormik = withFormik<LoginType, LoginType>({
	async handleSubmit(values: LoginType, { props }) {
		await props.login(values);
	},
	validationSchema: yup.object().shape({
		username: yup
			.string()
			.min(3, "Must be at least 3 characters.")
			.required("A username is required."),
		password: yup
			.string()
			.min(6, "Passwords must be at least 6 characters.")
			.required("Password is required.")
	}),
	displayName: "Sign up"
})(LoginForm as any);

const mapDispatchToProps = dispatch => {
	return {
		login: payload => dispatch({ type: actions.LOGIN, payload }),
		dispatch
	};
};

const Login = connect(
	null,
	mapDispatchToProps
)(LoginFormik);

export default Login;
