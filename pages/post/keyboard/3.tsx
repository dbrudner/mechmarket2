import Images from "../../../modules/post/images";
import { Container } from "../../../modules/common";
import Steps from "../../../modules/post/steps";

export default () => {
	return (
		<Container>
			<Steps stepNumber={2} />
			<Images />
		</Container>
	);
};
