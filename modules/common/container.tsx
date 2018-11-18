import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { User, getUser, LOGIN_SUCCESS, SIGN_UP_SUCCESS } from "../user";
import { useEffect } from "react";
import Link from "next/link";

type Props = {
	checkIfUserLoggedIn?: boolean;
	user: User;
	children: React.ReactChildren;
	getUser: any;
	mustBeLoggedIn?: boolean;
};

const containerStyle = { maxWidth: "960px", margin: "auto", padding: "15px" };

const InnerContainer: React.SFC<Props> = ({
	user,
	children,
	getUser,
	mustBeLoggedIn
}) => {
	if (mustBeLoggedIn && !user) {
		return (
			<div style={containerStyle}>
				<h1>You must be logged in to view this page</h1>
				<div>
					<Link href="/login">
						<a>Login</a>
					</Link>
				</div>
				<div>
					<Link href="/signup">
						<a>Sign up</a>
					</Link>
				</div>
			</div>
		);
	}

	if (!user || user === LOGIN_SUCCESS || user === SIGN_UP_SUCCESS) {
		useEffect(
			() => {
				getUser();
			},
			[user]
		);
	}

	return <div style={containerStyle}>{children}</div>;
};

const mapStateToProps = ({ user }) => ({ user });

export const Container = connect(
	mapStateToProps,
	{ getUser }
)(InnerContainer);
