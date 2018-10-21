import * as React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

type State = {
	url: string;
};

type Props = {
	images: string[];
	handleSubmit: (object: any) => void;
};

export default class Images extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			url: ""
		};
	}

	handleImageSubmit = e => {
		e.preventDefault();
		this.props.handleSubmit({
			images: [...this.props.images, this.state.url]
		});
	};

	render() {
		const { images } = this.props;
		return (
			<React.Fragment>
				<form onSubmit={this.handleImageSubmit}>
					<Input
						onChange={e => this.setState({ url: e.target.value })}
						addonAfter={
							<Icon
								style={{ margin: "8px", cursor: "pointer" }}
								type="plus"
								onClick={this.handleImageSubmit}
							/>
						}
					/>
				</form>
				<ul>
					{images.map(image => (
						<li>{image}</li>
					))}
				</ul>
			</React.Fragment>
		);
	}
}
