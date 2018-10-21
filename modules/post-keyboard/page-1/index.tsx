import * as React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import FormItem from "antd/lib/form/FormItem";
import Size from "./size";
import Layout from "./layout";
import Keycaps from "./keycaps";
import Warning from "../../common/warning";
import { PostKeyboardState } from "../index";

type Props = PostKeyboardState & {
	goToPage: (page: number) => void;
	handleChange: (object: any) => void;
};

export default ({ goToPage, handleChange, ...state }) => (
	<Form onSubmit={() => goToPage(2)}>
		<h1>Post a keyboard</h1>
		<FormItem>
			<h2>Name</h2>
			<Input
				onChange={e => this.handleChange({ name: e.target.value })}
				value={state.name}
				name="name"
			/>
		</FormItem>
		<h2>Size</h2>
		<Size
			selectedSize={state.size}
			handleChange={size => this.handleChange({ size })}
		/>
		<h2>Layout</h2>
		<Layout
			selectedLayout={state.layout}
			handleChange={layout => this.handleChange({ layout })}
		/>
		<div
			style={{
				margin: "20px 0",
				width: "30%",
				minWidth: "200px"
			}}
		>
			<h2>Keycaps</h2>
			<Keycaps handleChange={keycaps => this.handleChange({ keycaps })} />
		</div>
		<FormItem>
			<h2>Description</h2>
			<Input.TextArea
				onChange={e =>
					this.handleChange({ description: e.target.value })
				}
				value={state.description}
				name="description"
				autosize={{ minRows: 3, maxRows: 6 }}
			/>
		</FormItem>
		<Button htmlType="submit" type="primary">
			Submit
		</Button>
	</Form>
);
