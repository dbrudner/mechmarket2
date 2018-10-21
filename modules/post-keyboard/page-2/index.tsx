import { Button } from "antd";
import Images from "./images";

export default props => (
	<div>
		<Images {...props} />
		<Button onClick={props.submitKeyboard} type="primary">
			Submit Keyboard
		</Button>
	</div>
);
