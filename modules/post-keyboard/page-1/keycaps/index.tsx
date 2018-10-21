import * as React from "react";
import { AutoComplete, Form } from "antd";
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
		return (
			<Form.Item>
				<AutoComplete
					onChange={this.props.handleChange}
					dataSource={["blah"]}
				/>
			</Form.Item>
		);
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