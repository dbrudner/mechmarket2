import * as React from "react";
import { Alert } from "antd";

const Warning: React.SFC<{ message: string }> = ({ message }) => (
	<Alert
		style={{ marginTop: "10px" }}
		message="Error"
		description={message}
		type="error"
		showIcon
	/>
);

export default Warning;
