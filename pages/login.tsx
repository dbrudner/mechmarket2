import Link from "next/link";
import Container from "../modules/common/container";
import Login from "../modules/login";
import { connect } from "react-redux";

const IndexPage = props => {
	console.log(props);

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

export default connect(state => state)(IndexPage);
