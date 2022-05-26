import React from "react";
// import img from "../../assets/images/profile.jpg";
import "./MyPortfolio.css";
const MyPortfolio = () => {
  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20">
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row">
          {/* <img src={img} alt="" /> */}
          <div>
            <p className="text-xl leading-tight">Name : Abdul Kahhar Nayeem</p>
            <h2 className="text-xl leading-tight">
              Email Address : nayeem@codexcube.com
            </h2>
            <h2 className="text-xl leading-tight">
              Educational background : Daffodil international university
              department of CSE
            </h2>
            <section id="skill" className="text-gray-700 body-font">
              <div className="container py-10 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
                  <img
                    alt="feature"
                    className="object-cover object-center h-full w-full"
                    src="https://i.ibb.co/ZHGrn4B/work4.jpg"
                  />
                </div>
                <div className="w-full flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-10">
                    My Skills
                  </h1>
                  <div className="flex flex-col mb-10 lg:items-start items-center">
                    <div className="w-full">
                      <h2>HTML & CSS</h2>
                      <div className="shadow w-full bg-gray-200">
                        <div
                          className="bg-gray-600 text-xs leading-none py-1 text-center text-white"
                          style={{ width: "90%" }}
                        >
                          90%
                        </div>
                      </div>

                      <h2 className="pt-5">JavaScript</h2>
                      <div className="shadow w-full bg-gray-200 mt-2">
                        <div
                          className="bg-gray-600 text-xs leading-none py-1 text-center text-white"
                          style={{ width: "70%" }}
                        >
                          70%
                        </div>
                      </div>
                      <h2 className="pt-5">React</h2>
                      <div className="shadow w-full bg-gray-200 mt-2">
                        <div
                          className="bg-gray-600 text-xs leading-none py-1 text-center text-white"
                          style={{ width: "80%" }}
                        >
                          80%
                        </div>
                      </div>

                      <h2 className="pt-5">PHP</h2>
                      <div className="shadow w-full bg-gray-200 mt-2">
                        <div
                          className="bg-gray-600 text-xs leading-none py-1 text-center text-white"
                          style={{ width: "75%" }}
                        >
                          75%
                        </div>
                      </div>

                      <h2 className="pt-5">Codeigniter 3</h2>
                      <div className="shadow w-full bg-gray-200 mt-2">
                        <div
                          className="bg-gray-600 text-xs leading-none py-1 text-center text-white"
                          style={{ width: "90%" }}
                        >
                          90%
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <h2>Three of my projects (live website links) here.</h2>
            <a className="text-green-500" href="https://ziscoerp.com/">
              ziscoerp.com
            </a>
            <br></br>
            <a className="text-green-500" href="https://hrm.codexcube.com/">
              hrm.codexcube.com
            </a>
            <br></br>
            <a className="text-green-500" href="http://codexcube.com/">
              Codexcube.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPortfolio;
