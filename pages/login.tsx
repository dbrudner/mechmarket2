import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import { Container } from "../modules/common";
import Login from "../modules/login";
import * as types from "../modules/user/duck";

const IndexPage = ({ user }) => {
	if (user === types.SIGN_UP_SUCCESS) {
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
