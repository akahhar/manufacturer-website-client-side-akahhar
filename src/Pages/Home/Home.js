import React from "react";
import Footer from "../Shared/Footer";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import Faq from "./Faq";
import Reviews from "./Reviews";
import Team from "./Team";
import Tools from "./Tools";

const Home = () => {
  return (
    <div>
      <Banner />
      <Tools />
      <BusinessSummary />
      <Reviews />
      <Team />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
