import { logout, User } from "../modules/user";
import { Container } from "../modules/common";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Router from "next/router";
import { Alert } from "antd";

type Props = {
	logout: () => void;
	user: User;
};

const LOGGED_OUT = "LOGGED_OUT";
const LOGGING_OUT = "LOGGING_OUT";

const Logout: React.SFC<Props> = ({ logout, user }) => {
	const [logoutStatus, setLogoutStatus] = useState(null);

	setTimeout(() => setLogoutStatus(LOGGED_OUT), 3000);

	useEffect(() => {
		if (logoutStatus === LOGGED_OUT) {
			Router.push("/");
		} else {
			logout();
		}

		return () => {
			logout();
		};
	});

	return (
		<Container>
			<h1>Logging out</h1>
			<Alert
				showIcon
				style={{ margin: "30px" }}
				message="You will be logged out and redirected home momentarily."
			/>
		</Container>
	);
};

export default connect(
	({ user }) => ({ user }),
	{ logout }
)(Logout);
