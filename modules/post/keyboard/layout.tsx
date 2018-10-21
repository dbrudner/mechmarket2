import { Radio, Form } from "antd";
import { LayoutType } from "..";

const { Group, Button } = Radio;

type LayoutProps = {
	handleChange: (value) => void;
	selectedLayout: LayoutType;
};

const Layout: React.SFC<LayoutProps> = ({ handleChange, selectedLayout }) => (
	<Form.Item>
		<Group
			onChange={e => handleChange(e.target.value)}
			defaultValue="a"
			buttonStyle="solid"
			value={selectedLayout}
		>
			<Button value="ANSI">ANSI</Button>
			<Button value="ISO">ISO</Button>
		</Group>
	</Form.Item>
);

export default Layout;
