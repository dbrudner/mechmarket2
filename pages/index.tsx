import { Layout, Menu, Breadcrumb, Icon } from "antd";
import axios from "axios";

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

const { Header, Content, Footer, Sider } = Layout;
const Dashboard: React.SFC<Props> = props => {
	return (
		<Layout>
			<Header />
			<Content>
				<h1>MechMarket</h1>
				<h2>Buy and sell mechanical keyboards</h2>
			</Content>
		</Layout>
	);
};

// Dashboard.getInitialProps = async () => (

// );

export default Dashboard;
