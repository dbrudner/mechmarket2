import * as React from "react";
import { Radio } from "antd";
import { SizeType } from "./index";

type SizeTypeProps = {
	handleChange: (value) => void;
	selectedSize: SizeType;
};

const Size: React.SFC<SizeTypeProps> = ({ handleChange, selectedSize }) => (
	<React.Fragment>
		<Radio.Group
			onChange={e => handleChange(e.target.value)}
			value={selectedSize}
			name="size"
		>
			<Radio value="Full">Full</Radio>
			<Radio value="TKL">TKL</Radio>
			<Radio value="75%">75%</Radio>
			<Radio value="60%">60%</Radio>
		</Radio.Group>
	</React.Fragment>
);

export default Size;
