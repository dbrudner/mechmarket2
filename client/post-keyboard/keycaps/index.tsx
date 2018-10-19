import * as React from "react";
import { AutoComplete } from "antd";
import { connect } from "react-redux";
import * as actions from "./duck";

type KeycapsProps = {
	handleChange: () => void;
	fetchKeycaps: () => void;
};

type KeycapsState = {
	dataSource: string[];
};

class Keycaps extends React.Component<KeycapsProps, KeycapsState> {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: ["12345", "23456", "34567", "9"]
		};
	}

	componentDidMount() {
		this.props.fetchKeycaps();
	}

	render() {
		return <AutoComplete dataSource={this.state.dataSource} />;
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
