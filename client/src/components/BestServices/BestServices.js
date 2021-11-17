import React, { useEffect, useState } from "react";
// import installed libraries
import Carousel from "react-multi-carousel";

// import css of react-multi-carousel
import "react-multi-carousel/lib/styles.css";
import "./bestServices.style.css";

// importing images
import { Container } from "react-bootstrap";
import Service from "../Service/Service";
import { SERVER_BASE_URL } from "../../App";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const BestServices = () => {

  const [bestServices, setBestServices] = useState([]);

  useEffect(() => {
    fetch(SERVER_BASE_URL + "/service/best-service")
      .then(res => res.json())
      .then(data => setBestServices(data.services))
    
  }, [])

  return (
    <div>
      <h1 className="headings m-5">OUR BEST SERVICES</h1>

      <Container>
        <Carousel className="block" responsive={responsive}>
          {
            bestServices.map(service => <Service key={service._id} service={service} />)
          }
        </Carousel>
      </Container>
    </div>
  );
};

export default BestServices;
