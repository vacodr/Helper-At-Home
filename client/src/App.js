import React from "react";

//import Display from "./components/best_services/component.bestServices";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { UserProvider } from "./userContext";
import Navbar from "./components/Navbar/Navbar";
//import VideoDisplay from "./components/videoDisplay/videoDisplay.js";
import ServicePage from "./components/workers/Workers";

//import CarouselComponent from "./components/section_carousel/CarouselComponent";

import AboutUS from "./components/About_us/aboutUs";
import Profile from "./components/Profile/Profile";

import "./components/Star-rating/StarRating.css";
//import StarRating from "./components/Star-rating/StarRating.jsx";

import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Register from "./components/Login/Register";
import Workers from "./components/workers/Workers";

/*
import image1 from "./assets/image 1.jpg";
import image2 from "./assets/image 1 (1).jpg";
import image3 from "./assets/image 1 (2).jpg";
import MainCarousel from "./components/set_preferences/MainCarousel";
import SetPreferences from "./components/set_preferences/SetPreferences";*/

 //export const SERVER_BASE_URL = "http://localhost:5000"
export const SERVER_BASE_URL = 'https://helpers-at-home.herokuapp.com/'

function App() {
	return (
		<AuthProvider>
			<UserProvider>
				<Router>
					<Navbar />
					{/* Our best services carousel (Vaibhav Agarwal) */}
					<Switch>
						<Route exact path="/" component={Home} />
						<PrivateRoute path="/workers/:service?">
							<Workers />
						</PrivateRoute>
						<PrivateRoute path="/profile">
							<Profile />
						</PrivateRoute>
						<Route path="/about_us" component={AboutUS} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="*" component={NotFound} />
						<Redirect to="/" />
					</Switch>
					{/*Book Service Modal , now integrated in services page*/}

					<Footer />
				</Router>
			</UserProvider>
		</AuthProvider>
	);
}

export default App;
