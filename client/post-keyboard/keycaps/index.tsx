import * as React from "react";
import { AutoComplete } from "antd";
import { connect } from "react-redux";
import * as actions from "./duck";

type KeycapsProps = {
	handleChange: () => void;
	fetchKeycaps: () => void;
	keycaps: string[];
};

type KeycapsState = {
	dataSource: string[];
};

class Keycaps extends React.Component<KeycapsProps, KeycapsState> {
	componentDidMount() {
		this.props.fetchKeycaps();
	}

	render() {
		console.log(this.props.keycaps);
		return <AutoComplete dataSource={["blah"]} />;
	}
}

const mapDispatchToProps = dispatch => ({
	fetchKeycaps: () => dispatch({ type: actions.FETCH_KEYCAPS })
});

const mapStateToProps = state => ({
	keycaps: state.keycaps
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Keycaps);
