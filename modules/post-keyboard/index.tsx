import * as React from "react";
import Page1 from "./page-1";
import Page2 from "./page-2";
import { connect } from "react-redux";

export type SizeType = "Full" | "TKL" | "75%" | "60%";
export type LayoutType = "ANSI" | "ISO";

export type PostKeyboardState = {
	page: number;
	size: string;
	layout: LayoutType;
	keycaps: string;
	description: string;
	name: string;
	images: string[];
};

class PostKeyboard extends React.Component {
	state = {
		page: 1,
		size: "Full",
		layout: "ISO",
		keycaps: "",
		description: "",
		name: "",
		images: []
	};

	goToPage = page => this.setState({ page });

	handleChange = object => this.setState({ ...this.state, ...object });

	render() {
		console.log(this.props);
		return this.state.page === 1 ? (
			<Page1
				goToPage={this.goToPage}
				handleChange={this.handleChange}
				{...this.state}
			/>
		) : (
			<Page2
				goToPage={this.goToPage}
				handleChange={this.handleChange}
				{...this.state}
			/>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	page1Submit: page1form => dispatch({})
});

export default connect()(PostKeyboard);
