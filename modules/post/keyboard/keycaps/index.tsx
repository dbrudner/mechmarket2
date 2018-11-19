import { useEffect } from "react";
import { AutoComplete } from "antd";
import { connect } from "react-redux";
import { fetchKeycaps } from "./duck";

type Props = {
	handleChange: () => void;
	fetchKeycaps: () => void;
	keycaps: string[];
	value: string;
};

const Keycaps: React.SFC<Props> = ({ handleChange, fetchKeycaps, value }) => {
	useEffect(() => {
		fetchKeycaps();
	});

	return (
		<AutoComplete
			onChange={handleChange}
			dataSource={["blah"]}
			value={value}
		/>
	);
};

const mapStateToProps = state => ({
	keycaps: state.keycaps
});

export default connect(
	mapStateToProps,
	{ fetchKeycaps }
)(Keycaps);
