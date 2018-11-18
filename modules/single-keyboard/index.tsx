import { Tag } from "antd";
import Slider from "react-slick";
import { Alert } from "antd";

export default ({ size, layout, keycaps, description, name, images }) => {
	const slickSettings = {
		centerMode: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerPadding: 0,
		speed: 500
	};
	console.log(images);
	return (
		<div>
			<Alert
				showIcon
				style={{ marginBottom: "30px" }}
				message="Note"
				description={
					<p style={{ margin: 0 }}>
						This is a preview of your post. Click{" "}
						<strong>Submit</strong> below to create your post or
						<strong> Edit</strong> to change it.
					</p>
				}
			/>
			<div>
				<Slider {...slickSettings}>
					{images.map(image => (
						<div
							style={{ marginLeft: "20px" }}
							key={`image-${image}`}
						>
							<img style={{ width: "30vw" }} src={image} />
						</div>
					))}
				</Slider>
			</div>
			<h2>{name}</h2>
			<Tag color="geekblue">{size}</Tag>
			<Tag color="purple">{layout}</Tag>
			<Tag color="orange">{keycaps}</Tag>
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
