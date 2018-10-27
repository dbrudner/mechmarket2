import Link from "next/link";
import Container from "../modules/common/container";
import Signup from "../modules/signup";

const IndexPage = () => (
	<Container>
		<h1>Sign up</h1>
		<Signup />
		<Link>
			<a href="/login">Login</a>
		</Link>
	</Container>
);

export default IndexPage;
