import React, { useEffect, useState } from "react";
import { UserAuth } from "../../userContext";
import "./Profile.css";
import edit_button from "../../assets/edit_button.png";
import useAuth from "../../hooks/useAuth";
import Orders from "../Orders/Orders";

const OtherInfo = ({
	info,
	name,
	editable,
	editableName,
	handleChange,
	handleSubmit,
	changeInfo,
}) => {
	return (
		<>
			{editable ? (
				<div className="other-info">
					<input
						name={name}
						type="text"
						value={info}
						className="edit-input"
						onChange={handleChange}
					/>
					<input
						name={editableName}
						className=""
						onClick={handleSubmit}
						type="button"
						value="OK"
					/>
				</div>
			) : (
				<div className="other-info">
					<div className="info-title">{info}</div>
					<input
						name={editableName}
						className="edit-button"
						onClick={changeInfo}
						type="image"
						alt="Login"
						src={edit_button}
					></input>
				</div>
			)}
		</>
	);
};

const Profile = () => {

	const { user } = useAuth()

	return (
		<div>
			<div className="customer-profile">
				<h2 className="profile-heading">{user.displayName}'s profile</h2>

				<div className="section-one">
					<div className="profile-detail">
						<div className="profile-image">
							<img alt="profile" className="profile-image" src={user.photoURL || "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"} ></img>
						</div>

						<div className="profile-info">
							<div className="overlap"></div>

							<div className="mt-3 text-center">
								<h4>Name: {user.displayName}</h4>
								<h4>Email: {user.email}</h4>
								<h4>Role: {user.role}</h4>
							</div>

						</div>
					</div>
					<div className="container m-5 text-center">
						<h3 className="service-heading my-3">{user.role == "worker" ? "YOUR WORKING HISTORY" : "SERVICES USED"}</h3>
						<Orders />
					</div>
					
				</div>

				<div className="section-two">
					<div className="featured-photo">
						<h3 className="featured-heading heading">Featured Photos:-</h3>
						<div className="grid">
							<div className="grid-box"></div>
							<div className="grid-box"></div>
							<div className="grid-box"></div>
							<div className="grid-box"></div>
							<div className="grid-box"></div>
							<div className="grid-box"></div>
							<div className="grid-box"></div>
							<div className="grid-box"></div>
							<div className="grid-box"></div>
						</div>
					</div>
					<div className="reviews">
						<h3 className="reviews-heading heading">Reviews</h3>
						<div className="reviews-list">
							<div className="reviews-box">
								Review given to you by particular worker who you employed
								(this will not be there for the individual)
							</div>
							<div className="reviews-box">
								Review given to you by particular worker who you employed
								(this will not be there for the individual)
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
