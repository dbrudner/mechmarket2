import * as React from "react";
import { Radio } from "antd";
import { KeyboardSize } from "../index";

type SizeTypeProps = {
	handleChange: (value) => void;
	selected: KeyboardSize;
};

const Size: React.SFC<SizeTypeProps> = ({ handleChange, selected }) => (
	<Radio.Group onChange={e => handleChange(e.target.value)} value={selected}>
		<Radio value="Full">Full</Radio>
		<Radio value="TKL">TKL</Radio>
		<Radio value="75%">75%</Radio>
		<Radio value="60%">60%</Radio>
	</Radio.Group>
);

export default Size;
