import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./card.css";

function Card({ dev }) {
	const { name, img, github, linkedin, branch } = dev;

	return (
		<div className="col-md-4">
			<div className="profile-card">
				<div className="upper-container">
					<img
						className="img-fluid"
						src={img}
						alt=""
					/>
				</div>

				<div className="lower-container">
					<h3>{name}</h3>
					<h4>{branch}</h4>

					<div className="icon-container">
						<a href={github} target="_blank" rel="noreferrer noopener">
							<FaGithub className="icon-links fa-2x github-icon" />
						</a>
						<a href={linkedin} target="_blank" rel="noreferrer noopener">
							<FaLinkedin className="icon-links fa-2x linkedin-icon" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Card;
