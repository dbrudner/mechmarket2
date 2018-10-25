import { Steps, Icon } from "antd";

const { Step } = Steps;

export default ({ stepNumber }) => (
	<Steps style={{ margin: "30px 0" }} current={stepNumber}>
		<Step title="" />
		<Step title="" />
		<Step title="" />
		<Step title="" />
	</Steps>
);
