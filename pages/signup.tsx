import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import { Container } from "../modules/common";
import Signup from "../modules/signup";
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
			<h1>Sign up</h1>
			<Signup />
			<Link href="/login">
				<a>Login</a>
			</Link>
		</Container>
	);
};

export default connect(state => ({
	user: state.user
}))(IndexPage);
