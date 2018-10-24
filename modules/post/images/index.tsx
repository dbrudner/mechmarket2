import * as React from "react";
import { Icon, Input, Button, Modal, Card, List } from "antd";
import { connect } from "react-redux";
import Router from "next/router";
import { UPDATE_KEYBOARD } from "../duck";
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

		if (images.includes(url)) {
			return this.setState({
				error: "This image has already been added."
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
		this.props.updateKeyboard({ images });
		Router.push("/post/preview");
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
				{this.state.error && <Warning message={this.state.error} />}
				<List
					dataSource={images}
					renderItem={image => (
						<List.Item
							actions={[
								<a href={image} target="blank">
									View
								</a>,
								<Button
									style={{ marginLeft: "5px" }}
									type="danger"
									icon="close"
									onClick={() => this.removeImage(image)}
								/>
							]}
						>
							{image}
						</List.Item>
					)}
				/>
				{/* <ul style={{ margin: "20px" }}>
					{images.map(image => (
						<li style={{ marginTop: "10px" }}>
							<a href={image}>{image}</a>
							<Button
								style={{ marginLeft: "5px" }}
								type="danger"
								icon="close"
							/>
						</li>
					))}
				</ul> */}
				<Button
					onClick={this.submitKeyboard}
					type="primary"
					disabled={!this.state.images.length}
				>
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
