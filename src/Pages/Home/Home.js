import React from "react";
import Footer from "../Shared/Footer";
import Banner from "./Banner";
import BusinessSummary from "./BusinessSummary";
import Reviews from "./Reviews";
import Tools from "./Tools";

const Home = () => {
  return (
    <div>
      <Banner />
      <Tools />
      <BusinessSummary />
      <Reviews />
      {/* <Info />
      <Services />
      <MakeAppointment />
      <Testimonial />
      <Contact /> */}
      <Footer />
    </div>
  );
};

export default Home;
