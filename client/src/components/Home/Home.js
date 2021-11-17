import React, { useState } from "react";

import HeaderCarousel from "./HeaderCarousel";
import SetPreferences from "../set_preferences/SetPreferences";
import StarRating from "../Star-rating/StarRating";
import BestServices from "../BestServices/BestServices";
import VideoApp from "../VideoApp/VideoApp";
import HouseholdServices from "../HouseholdServices/HouseholdServices";
import ProfessionalServices from "../ProfessionalServices/ProfessionalServices";

export default function Home() {

  return (
    <>
      <HeaderCarousel />
      {/* <SetPreferences /> */}

      {/*<LogIn />*/}

      <BestServices />

      <HouseholdServices />

      <ProfessionalServices />

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <VideoApp />
          </div>
          <div className="col-md-6">
            <StarRating />
          </div>
        </div>
      </div>
    </>
  );
}
