import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { User, getUser, LOGIN_SUCCESS, SIGN_UP_SUCCESS } from "../user";
import { useEffect } from "react";

type Props = {
	checkIfUserLoggedIn?: boolean;
	user: User;
	children: React.ReactChildren;
	getUser: any;
};

const containerStyle = { maxWidth: "960px", margin: "auto", padding: "15px" };

const InnerContainer: React.SFC<Props> = ({ user, children, getUser }) => {
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
