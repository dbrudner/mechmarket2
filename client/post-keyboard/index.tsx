import * as React from "react";
import { Formik, withFormik } from "formik";
import * as yup from "yup";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import FormItem from "antd/lib/form/FormItem";
import Size from "./size";
import Layout from "./layout";
import Keycaps from "./keycaps";
import Warning from "../../client/common/warning";
import Images from "./images";

export type SizeType = "Full" | "TKL" | "75%" | "60%";
export type LayoutType = "ANSI" | "ISO";

type PostKeyboardProps = {};

type PostKeyboardState = {
	size: SizeType;
	layout: LayoutType;
	keycaps: string;
	images: string[];
	name: string;
	description: string;
};

export default class PostKeyboard extends React.Component<
	PostKeyboardProps,
	PostKeyboardState
> {
	constructor(props) {
		super(props);
		this.state = {
			size: "Full",
			layout: "ISO",
			keycaps: "",
			description: "",
			images: [],
			name: ""
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state);
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<h1>Post a keyboard</h1>
				<FormItem>
					<h2>Name</h2>
					<Input
						onChange={e => this.setState({ name: e.target.value })}
						value={this.state.name}
						name="name"
					/>
				</FormItem>
				{/* <FormItem>
					<h2 style={{ display: "inline", marginRight: "15px" }}>
						Images
					</h2>
					<p style={{ display: "inline", margin: 0 }}>
						Must add at least one image
					</p>
					<Images
						images={this.state.images}
						addImage={url =>
							this.setState({
								images: [...this.state.images, url]
							})
						}
						removeImage={url =>
							this.setState({
								images: this.state.images.filter(
									image => image !== url
								)
							})
						}
					/>
				</FormItem> */}
				<h2>Size</h2>
				<Size
					selectedSize={this.state.size}
					handleChange={size => this.setState({ size })}
				/>
				<h2>Layout</h2>
				<Layout
					selectedLayout={this.state.layout}
					handleChange={layout => this.setState({ layout })}
				/>
				<div
					style={{
						margin: "20px 0",
						width: "30%",
						minWidth: "200px"
					}}
				>
					<h2>Keycaps</h2>
					<Keycaps
						handleChange={keycaps => this.setState({ keycaps })}
					/>
				</div>
				<FormItem>
					<h2>Description</h2>
					<Input.TextArea
						onChange={e =>
							this.setState({ description: e.target.value })
						}
						value={this.state.description}
						name="description"
						autosize={{ minRows: 3, maxRows: 6 }}
					/>
				</FormItem>
				<Button htmlType="submit" type="primary">
					Submit
				</Button>
			</Form>
		);
	}
}
