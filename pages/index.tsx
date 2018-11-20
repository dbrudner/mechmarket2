import Link from "next/link";
import { Container } from "../modules/common";
import { connect } from "react-redux";
import { User } from "modules/user";

type Keyboard = {
	switches?: string;
	size?: string;
	layout?: string;
	custom?: boolean;
	description?: string;
	sold?: boolean;
	condition?: string;
	imgs?: string[];
	plate?: string;
	askingPrice?: Number;
	keycaps?: string;
	timeStampVerified: { type: boolean; default: false; required: true };
	upvotes: {
		type: Number;
		default: 0;
		required: true;
	};
	created_at: Date;
};

type Props = {
	newest: Keyboard[];
	user: User;
};

const Dashboard: React.SFC<Props> = ({ user }) => (
	<Container>
		<h1>MechMarket</h1>
		<h2>Buy and sell mechanical keyboards</h2>
		<ul>
			<li>
				<Link href="/post/keyboard/1">
					<a>Post a keyboard</a>
				</Link>
			</li>
			{user.username ? (
				<li>
					<Link href="/logout">
						<a>Logout</a>
					</Link>
				</li>
			) : (
				<li>
					<Link href="/login">
						<a>Login</a>
					</Link>
				</li>
			)}
		</ul>
	</Container>
);

export default connect(({ user }) => ({ user }))(Dashboard);
