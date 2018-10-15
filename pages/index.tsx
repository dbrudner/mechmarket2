import Signup from "../client/signup";
import Link from "next/link";

const IndexPage = () => (
	<div style={{ maxWidth: "960px", margin: "auto" }}>
		<h1>Sign up</h1>
		<Signup />
		<Link>
			<a href="/login">Login</a>
		</Link>
	</div>
);

export default IndexPage;
