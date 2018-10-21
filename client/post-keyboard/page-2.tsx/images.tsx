import * as React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

type State = {
	url: string;
};

type Props = {
	images: string[];
	addImage: (url: string) => void;
	removeImage: () => void;
};

export default class Images extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			url: ""
		};
	}

	handleSubmit = e => {
		this.props.addImage(e.target.value);
	};

	render() {
		const { images, addImage, removeImage } = this.props;
		return (
			<React.Fragment>
				<form>
					<Input />
					<Button
						style={{ display: "block", marginTop: "15px" }}
						htmlType="button"
						type="primary"
						icon="plus"
					>
						Add Image
					</Button>
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
