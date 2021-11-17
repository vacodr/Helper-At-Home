import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./VideoApp.css";

class VideoApp extends Component {
	render() {
		return (
			<div>
				<iframe width="100%" height="315" src="https://www.youtube.com/embed/MhkGQAoc7bc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
			</div>
		);
	}
}
export default VideoApp;
