import { Radio } from "antd";
import { LayoutType } from "./index";

type LayoutProps = {
	handleChange: (value) => void;
	selectedLayout: LayoutType;
};

const Layout: React.SFC<LayoutProps> = ({ handleChange, selectedLayout }) => (
	<Radio.Group
		onChange={e => handleChange(e.target.value)}
		defaultValue="a"
		buttonStyle="solid"
		value={selectedLayout}
	>
		<Radio.Button value="ANSI">ANSI</Radio.Button>
		<Radio.Button value="ISO">ISO</Radio.Button>
	</Radio.Group>
);

export default Layout;
