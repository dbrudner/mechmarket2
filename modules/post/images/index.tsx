import * as React from "react";
import { Icon, Input, Button, Modal, Card } from "antd";
import { connect } from "react-redux";
import { UPDATE_KEYBOARD } from "../duck";

type State = {
	url: string;
	previewKeyboard: string;
	images: string[];
};

type Props = {
	updateKeyboard: (payload: { images: string[] }) => void;
};

class Images extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			url: "",
			previewKeyboard: "",
			images: []
		};
	}

	handleImageSubmit = e => {
		e.preventDefault();
		this.setState({
			images: [...this.state.images, this.state.url]
		});
	};

	submitKeyboard = () => {
		const { images } = this.state;
		this.props.updateKeyboard({ images });
	};

	render() {
		const { images } = this.state;
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
				<Button
					onClick={this.submitKeyboard}
					type="primary"
					disabled={!this.state.images.length}
				>
					Submit
				</Button>
				<Modal
					visible={!!this.state.previewKeyboard}
					footer={null}
					onOk={() => this.setState({ previewKeyboard: "" })}
					onCancel={() => this.setState({ previewKeyboard: "" })}
				>
					<Card
						style={{ width: "60%", marginLeft: "20%" }}
						cover={<img src={this.state.previewKeyboard} />}
					>
						<Card.Meta description={this.state.previewKeyboard} />
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

const mapStateToProps = ({ name, images }) => ({ name, images });

const mapDispatchToProps = dispatch => ({
	updateKeyboard: keyboard =>
		dispatch({ type: UPDATE_KEYBOARD, payload: keyboard })
});

export default connect()(Images);
