import * as React from "react";
import { Alert } from "antd";

export const Warning: React.SFC<{ message: string | React.ReactNode }> = ({
	message
}) => (
	<Alert
		style={{ marginTop: "10px" }}
		message="Error"
		description={message}
		type="error"
		showIcon
	/>
);
