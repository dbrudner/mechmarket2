import { connect } from "react-redux";
import SingleKeyboard from "../../../modules/single-keyboard";
import { Container } from "../../../modules/common";
import { Button, Icon } from "antd";
import { SUBMIT_KEYBOARD } from "../../../modules/post/keyboard/duck";
import Steps from "../../../modules/post/steps";
import Link from "next/link";

const Preview = props => (
	<Container>
		<h1>Post a keyboard</h1>
		<Steps stepNumber={3} />
		<SingleKeyboard {...props.keyboard} />
		<Button
			type="primary"
			onClick={() => {
				props.submitKeyboard();
			}}
		>
			Submit
		</Button>
		<Link href="/post/keyboard/1">
			<a>
				<Button style={{ marginLeft: "20px" }}>
					Edit <Icon type="edit" />
				</Button>
			</a>
		</Link>
	</Container>
);

const mapDispatchToProps = dispatch => ({
	submitKeyboard() {
		dispatch({ type: SUBMIT_KEYBOARD });
	}
});

const mapStateToProps = ({ postKeyboardForm }) => ({
	keyboard: postKeyboardForm
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Preview);
