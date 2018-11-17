import Link from "next/link";
import { Container } from "../modules/common";

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
};

const Dashboard: React.SFC<Props> = () => (
	<Container>
		<h1>MechMarket</h1>
		<h2>Buy and sell mechanical keyboards</h2>
		<Link href="/post/keyboard/1">
			<a>Post a keyboard</a>
		</Link>
	</Container>
);

export default Dashboard;
