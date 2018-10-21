import SingleKeyboard from "../../modules/single-keyboard";
import { connect } from "react-redux";
import Container from "../../modules/common/container";

const Preview = props => (
	<Container>
		<SingleKeyboard {...props.keyboard} />
	</Container>
);

const mapStateToProps = ({ postKeyboardForm }) => ({
	keyboard: postKeyboardForm
});

export default connect(mapStateToProps)(Preview);
