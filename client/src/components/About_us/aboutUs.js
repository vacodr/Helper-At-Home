import React from "react";
import { Line } from "react-chartjs-2";
import "./aboutUs.css";
import Card from "./card";
import { Developers } from "./developers";

function aboutUs() {
	const data = {
		labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August"],
		datasets: [
			{
				label: "No of users",
				data: [100, 210, 298, 312, 400, 450, 600, 728],
				borderColor: ["rgba(255,0,0,1)"],
				backgroundColor: ["rgba(255,255,255,0)"],
				pointColor: ["rgba(255,255,255,0)"],
				pointBackgroundColor: ["rgba(255,255,255,0)"],
			},
		],
	};
	const options = {
		title: {
			dislay: true,
			text: "User count",
		},
		scales: {
			yAxes: [
				{
					ticks: {
						min: 0,
						max: 1000,
						stepSize: 200,
					},
				},
			],
		},
	};

	return (
		<div className="container">
			<div className="main-container">
				<div className="title">
					<h2 className="main-container-heading">About Us</h2>
					<p id="para" >
						Helpers At Home enables millions of underprivileged and unorganized blue-collar workforce in finding local employment, free of cost, directly from nearby employers, and without the middlemen in between.
						<br></br>
						In turn, the platform makes it easy, quick, reliable & affordable for millions of employers to find & hire nearby blue-collar workers, again without the middlemen in between.
						<br></br>
						With a larger vision to end poverty, forced labour, worker's exploitation, and human trafficking, Helpers At Home is working towards creating an ecosystem of inclusive economic growth for India's underprivileged unorganised blue-collar workforce.
						<br></br>
						In the long run, having enough local employment opportunities allows workers to find a better working environment and better salaries for themselves and an opportunity to improve their quality of life.
					</p>
				</div>
				<div className="row">
					<div className="col-md-6 mt-5">
						{" "}
						{/* <Line data={data} options={options} /> */}
					</div>
					<div className="col-md-6 mt-5">
						{" "}
						{/* <Line data={data} options={options} /> */}
					</div>
				</div>
				<h2 className="card-container-heading">Team of developers</h2>
				{/* <div className="card-container">{Developers.map(Card)}</div> */}
				<div className="container">
					<div className="row">
						{
							Developers.map(dev => <Card dev={dev} />)
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default aboutUs;
