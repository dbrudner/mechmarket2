import * as React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Icon, Input, Button, Checkbox, Alert } from "antd";
import Warning from "./warning";
import { connect } from "react-redux";
import { login, LOGIN_FAILURE } from "../user";
import { labelStyle } from "../common";

const FormItem = Form.Item;

type LoginType = {
	username?: string;
	password?: string;
	remember?: boolean;
	login?: (payload: { username?: string; password?: string }) => void;
};

const Login = ({ user, login }) => (
	<div>
		<Formik
			initialValues={{ username: "", password: "" }}
			onSubmit={(values: LoginType) => {
				login(values);
			}}
			validationSchema={yup.object().shape({
				username: yup
					.string()
					.min(3, "Must be at least 3 characters.")
					.required("Must enter a user name."),
				password: yup.string().required("Must enter a password.")
			})}
			render={({
				errors,
				handleSubmit,
				handleChange,
				values,
				touched
			}) => (
				<Form onSubmit={handleSubmit}>
					<FormItem style={{ marginBottom: 0 }}>
						<label>
							<div style={labelStyle}>User name</div>
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
					<FormItem>
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
						{errors.password && touched.password && (
							<Warning message={errors.password} />
						)}
					</FormItem>
					<FormItem>
						<label style={{ cursor: "pointer" }}>
							<Checkbox onChange={handleChange} name="remember" />
							<span style={{ marginLeft: "5px" }}>
								Remember me
							</span>
						</label>
						{user === LOGIN_FAILURE && (
							<Alert
								message="Failed to log in"
								description="Password doesn't match user name"
								style={{ marginBottom: "15px" }}
								type="error"
							/>
						)}
						<Button
							style={{ display: "block", width: "100%" }}
							type="primary"
							htmlType="submit"
						>
							Login
						</Button>
					</FormItem>
				</Form>
			)}
		/>
	</div>
);

export default connect(
	({ user }) => ({
		user
	}),
	{ login }
)(Login);
