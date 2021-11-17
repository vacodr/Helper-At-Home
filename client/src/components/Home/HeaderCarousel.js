import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

export default function HeaderCarousel() {
  return (
    <div className="align-items-center">
      
      <Carousel
        style={{ width: "", height: "" }}
        className=""
        prevIcon={
          <FaArrowCircleLeft size="3.5rem" color="black" opacity="0.7" />
        }
        nextIcon={
          <FaArrowCircleRight size="3.5rem" color="black" opacity="0.7" />
        }
      >
        <Carousel.Item style={{ width: "", height: "" }}>
          <img
            className="d-block w-100 img-fluid"
            src={require("../../assets/carousel/elec.jpg")}
            alt="First slide"
            style={{ width: "100%", height: "" }}
          />
          <Carousel.Caption style={{ bottom: "5%" }}>
            <h1>Electrician</h1>
            <h3>Plays with electrons!</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ width: "", height: "" }}>
          <img
            className="d-block w-100 img-fluid"
            src={require("../../assets/carousel/weld.jpg")}
            alt="First slide"
            style={{ width: "", height: "" }}
          />
          <Carousel.Caption style={{ bottom: "5%" }}>
            <h1>Blacksmith</h1>
            <h3>Cuts through metal!</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ width: "", height: "" }}>
          <img
            className="d-block w-100 img-fluid"
            src={require("../../assets/carousel/paint.jpg")}
            alt="First slide"
            style={{ width: "", height: "" }}
          />
          <Carousel.Caption style={{ bottom: "5%" }}>
            <h1>Construction Worker</h1>
            <h3>Ever heard of Bob the Builder?</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
