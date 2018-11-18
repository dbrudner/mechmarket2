import * as React from "react";
import { Icon, Input, Button, Modal, Card, List, Alert } from "antd";
import { connect } from "react-redux";
import Router from "next/router";
import { UPDATE_KEYBOARD } from "../keyboard/duck";
import Warning from "../../common/warning";

type State = {
	url: string;
	previewKeyboard: string;
	images: string[];
	error: string;
};

type Props = {
	updateKeyboard: (payload: { images: string[] }) => void;
	images: string[];
};

class Images extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			url: "",
			previewKeyboard: "",
			images: [],
			error: ""
		};
	}

	componentDidMount() {
		const { images } = this.props;
		this.setState({ images });
	}

	handleImageSubmit = e => {
		e.preventDefault();
		const { images, url } = this.state;
		const validUrl = new RegExp(
			/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
		);

		if (!url) return;

		if (images.includes(url)) {
			return this.setState({
				error: "This image has already been added."
			});
		}

		if (!validUrl.test(url)) {
			return this.setState({
				error:
					"The URL you've entered is not valid. A valid URL must be begin with http, https and end in .jpg, .gif, or .png"
			});
		}

		this.setState({
			images: [...images, url],
			url: "",
			error: ""
		});
	};

	submitKeyboard = () => {
		const { images } = this.state;

		if (!images.length) {
			return this.setState({
				error: "Must add at least one image to continue."
			});
		}

		this.props.updateKeyboard({ images });
		Router.push("/post/keyboard/preview");
	};

	removeImage = (omitImage: string) => {
		this.setState({
			images: this.state.images.filter(image => image !== omitImage)
		});
	};

	render() {
		const { images } = this.state;
		return (
			<React.Fragment>
				<h2>Add images of your keyboard</h2>
				<Alert
					type="warning"
					closable
					style={{ margin: "15px 0" }}
					message="Time-stamped image required"
					description={
						<React.Fragment>
							You can add as many images as you'd like, but at
							least one <a href="time-stamp">time-stamped</a>{" "}
							image is required. Your post will not be published
							until a moderator has verified your listing contains
							at least one time-stamped image.{" "}
							<a href="time-stamp">
								<Icon type="question-circle" />
							</a>
						</React.Fragment>
					}
				/>
				<h3>Image URL</h3>
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
				{this.state.error && <Warning message={this.state.error} />}
				<List
					locale={{ emptyText: "Add an image of your keyboard" }}
					dataSource={images}
					renderItem={image => (
						<List.Item
							actions={[
								<a href={image} target="blank">
									View
								</a>,
								<a onClick={() => this.removeImage(image)}>
									Remove
								</a>
							]}
						>
							{image}
						</List.Item>
					)}
				/>
				<Button onClick={this.submitKeyboard} type="primary">
					Next
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

const mapStateToProps = ({ postKeyboardForm: { name, images } }) => ({
	name,
	images
});

const mapDispatchToProps = dispatch => ({
	updateKeyboard: keyboard =>
		dispatch({ type: UPDATE_KEYBOARD, payload: keyboard })
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Images);
