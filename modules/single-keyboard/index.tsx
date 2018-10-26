import { Tag } from "antd";
import Slider from "react-slick";

export default ({ size, layout, keycaps, description, name, images }) => {
	const slickSettings = {
		centerMode: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerPadding: 0,
		speed: 500
	};
	return (
		<div>
			<h1>{name}</h1>
			<Tag color="geekblue">{size}</Tag>
			<Tag color="purple">{layout}</Tag>
			<Tag color="orange">{keycaps}</Tag>
			<div>
				<Slider {...slickSettings}>
					{images.map(image => (
						<div
							style={{ marginLeft: "20px" }}
							key={`image-${image}`}
						>
							<img src={image} />
						</div>
					))}
				</Slider>
			</div>
			<p
				style={{
					marginTop: "20px",
					fontSize: "20px",
					lineHeight: "30px"
				}}
			>
				{description}
			</p>
		</div>
	);
};
