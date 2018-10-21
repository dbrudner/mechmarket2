import * as React from "react";
import { Tag } from "antd";
import { PostKeyboardState } from "../post/duck";
import Slider from "react-slick";

export default class SingleKeyboard extends React.Component<
	PostKeyboardState,
	{}
> {
	constructor(props) {
		super(props);
	}

	render() {
		const { size, layout, keycaps, description, name, images } = this.props;

		const slickSettings = {
			centerMode: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerPadding: 0
		};

		return (
			<React.Fragment>
				<h1>{name}</h1>
				<Tag color="geekblue">{size}</Tag>
				<Tag color="purple">{layout}</Tag>
				<p>
					<strong>Keycaps: </strong>
					{keycaps}
				</p>
				<div>
					<Slider {...slickSettings}>
						{images.map(image => (
							<div key={`image-${image}`}>
								<img src={image} />
							</div>
						))}
					</Slider>
				</div>
				<p>{description}</p>
			</React.Fragment>
		);
	}
}
