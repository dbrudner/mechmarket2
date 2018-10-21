import * as React from "react";
import { Icon, Input, Button, Modal, Card } from "antd";
import { PostKeyboardState } from "../index";

type State = {
	url: string;
	previewKeyboard: string;
};

type Props = PostKeyboardState & {
	images: string[];
	handleChange: (object: any) => void;
};

export default class Images extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			url: "",
			previewKeyboard: ""
		};
	}

	handleImageSubmit = e => {
		e.preventDefault();
		this.props.handleChange({
			images: [...this.props.images, this.state.url]
		});
	};

	render() {
		const { images } = this.props;
		console.log(this.props);
		return (
			<React.Fragment>
				<h2>Add images</h2>
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
				<ul style={{ margin: "20px" }}>
					{images.map(image => (
						<li>
							{image}
							<Button.Group style={{ marginLeft: "20px" }}>
								<Button
									onClick={() =>
										this.setState({
											previewKeyboard: image
										})
									}
								>
									Preview
								</Button>
								<Button type="danger">Remove</Button>
							</Button.Group>
						</li>
					))}
				</ul>
				<Modal
					visible={!!this.state.previewKeyboard}
					footer={null}
					onOk={() => this.setState({ previewKeyboard: "" })}
					onCancel={() => this.setState({ previewKeyboard: "" })}
				>
					<Card
						style={{ width: "60%", marginLeft: "20%" }}
						cover={
							<img
								alt={this.props.name}
								src={this.state.previewKeyboard}
							/>
						}
					>
						<Card.Meta
							title={this.props.name}
							description={this.state.previewKeyboard}
						/>
					</Card>
					<div style={{ textAlign: "right" }}>
						<Button
							style={{ marginTop: "15px" }}
							type="primary"
							onClick={() =>
								this.setState({ previewKeyboard: "" })
							}
						>
							Okay
						</Button>
					</div>
				</Modal>
			</React.Fragment>
		);
	}
}
