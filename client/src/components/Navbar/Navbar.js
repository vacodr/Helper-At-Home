import React, { useContext, useState } from "react";
import './Navbar.css';
import * as ReactBootStrap from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { UserAuth } from "./../../userContext";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
	const { user, isLoading, authError, logout } = useAuth()
	console.log(user)
	const [isWorker, setIsWorker] = useState(true)
	let history = useHistory();
	return (
		<div>
			<ReactBootStrap.Navbar
				expand="lg"
				bg="primary"
				variant="dark"
				className="navbar bg-dark"
			>
				<ReactBootStrap.Navbar.Brand className="brand-logo ml-5">
					<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
						<b>Helpers At Home</b>
					</Link>
				</ReactBootStrap.Navbar.Brand>
				{/* <span id="google_translate_element"></span> */}
				<ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
				<ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
					<ReactBootStrap.Nav className="ml-auto">
					<NavLink to="/" className="nav-option nav-link active mr-5">
							Home
						</NavLink>
						{user.role == "customer" && <NavLink to="/workers" className="nav-option nav-link active mr-5">
							Our Workers
						</NavLink>}
						<NavLink to="/about_us" className="nav-option nav-link active mr-5">
							About Us
						</NavLink>
					</ReactBootStrap.Nav>
					{user.email ? (
						<>
							<Link to="/profile"><span className="mr-5 text-white">{user.displayName}</span></Link>
							<button
								onClick={() => {
									logout();
									history.push('/');

								}}
								className="custom-btn mr-5 btn-lg"
							>
								Sign out
							</button>
						</>
					) : (
						<>
							{" "}
							<Link to="/login">
								<button className="custom-btn mr-5 btn-lg">Sign In</button>
							</Link>
						</>
					)}
				</ReactBootStrap.Navbar.Collapse>
			</ReactBootStrap.Navbar>
		</div>
	);
}

export default Navbar;
