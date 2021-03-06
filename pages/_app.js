import App, { Container } from "next/app";
import React from "react";
import withReduxStore from "../modules/redux/with-redux-store";
import { Provider } from "react-redux";
import stylesheet from "antd/dist/antd.min.css";
import "../style/style.css";

class MyApp extends App {
	render() {
		const { Component, pageProps, reduxStore } = this.props;
		return (
			<Container>
				<Provider store={reduxStore}>
					<Component {...pageProps} />
				</Provider>
			</Container>
		);
	}
}

export default withReduxStore(MyApp);
