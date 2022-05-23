import React from "react";
import cavity from "../../assets/images/cavity.png";
import fluoride from "../../assets/images/fluoride.png";
import treatment from "../../assets/images/treatment.png";
import whitening from "../../assets/images/whitening.png";
import PrimaryButton from "../Shared/PrimaryButton";
import Service from "./Service";
const Services = () => {
  return (
    <div className="py-20 lg:px-12">
      <div className="text-center mb-10">
        <span className=" text-primary">OUR SERVICES</span>
        <h2 className="text-3xl font-bold">Services We Provide</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Service
          img={fluoride}
          title="Fluoride Treatment"
          content="Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the"
        />
        <Service
          img={cavity}
          title="Cavity Filling"
          content="Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the"
        />
        <Service
          img={whitening}
          title="Teeth Whitening"
          content="Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-12 lg:px-48 lg:py-20 ">
        <div>
          <img src={treatment} alt="" />
        </div>
        <div className="mt-0 lg:mt-28">
          <h3 className="text-3xl font-bold mb-3">
            Exceptional Dental Care, on Your Terms
          </h3>
          <p className="mb-2">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page
          </p>
          <PrimaryButton>GET STARTED</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Services;
