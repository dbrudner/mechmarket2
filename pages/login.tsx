import Link from "next/link";
import Container from "../modules/common/container";
import Login from "../modules/login";
import { connect } from "react-redux";
import * as types from "../modules/user/duck";
import Router from "next/router";

const IndexPage = ({ user }) => {
	if (user === types.LOGIN_SUCCESS) {
		Router.push("/");
		return null;
	}

	if (user) {
		return (
			<Container>
				<h1>Login</h1>
				You are already logged in. Click{" "}
				<Link href="/logout">
					<a>here</a>
				</Link>{" "}
				to logout.
			</Container>
		);
	}

	return (
		<Container>
			<h1>Login</h1>
			<Login />
			<Link href="/signup">
				<a>Sign up</a>
			</Link>
		</Container>
	);
};

export default connect(state => ({
	user: state.user
}))(IndexPage);
