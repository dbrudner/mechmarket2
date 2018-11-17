import { connect } from "react-redux";

type Props = {
	checkIfUserLoggedIn?: boolean;
};

const containerStyle = { maxWidth: "960px", margin: "auto", padding: "15px" };

const Container: React.SFC<Props> = ({ children, state }) => {
	console.log(state);

	return <div style={containerStyle}>{children}</div>;
};

export default connect(state => state)(Container);
