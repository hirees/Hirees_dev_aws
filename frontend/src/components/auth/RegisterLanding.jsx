import React from "react";
import { Button } from "@/components/ui/button";
import r1 from "../../assets/r1.svg";
import r2 from "../../assets/r2.svg";
import Navbar from "../shared/Navbar";
import homebackground from "../../assets/homebackground.svg";
import { useNavigate } from "react-router-dom";

function RegisterLanding() {
  const nav = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen flex items-center justify-center  py-12 px-4 bg-no-repeat bg-cover bg-center mt-12 overflow-y-hidden">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${homebackground})` }}
        ></div>
        <div className="w-full max-w-7xl relative">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center gap-4 mb-5">
            <h1 className="font-extrabold text-gray-800 text-4xl text-center leading-tight max-w-3xl">
              Join the Hirees Community
            </h1>
            <p className="font-light text-blue-700 text-l text-center leading-normal max-w-3xl">
              Connect with opportunities that match your skills and ambitions,
              or find the<br/> perfect talent for your company
            </p>
          </div>

          {/* Cards Section */}
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-2">
            {/* Employer Card */}
            <div className="w-full max-w-lg rounded-xl overflow-hidden   ">
              <div className="p-0 h-full">
                <div className="h-[454px] relative">
                  {/* Background Image */}
                  <img
                    src={r1}
                    alt="Employers Background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-12 w-full z-10">
                    <div className="flex flex-col gap-5 mb-5 ml-3">
                      <div className="flex flex-col gap-3">
                        <h2 className="font-extrabold text-white text-3xl leading-normal">
                          For Employers
                        </h2>
                        <p className="font-semibold text-white text-base leading-normal">
                          Global Talent, Local Impact — Find the Right
                          Professionals Wherever They Are.
                        </p>
                      </div>
                    </div>
                    <Button onClick={()=>nav('/signup/recruiter')} className="mb-7 ml-3 w-60 py-7 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 font-semibold text-white text-xl hover:opacity-90 transition-opacity">
                      Register as Employer
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate Card */}
            <div className="w-full max-w-lg rounded-xl overflow-hidden  ">
              <div className="p-0 h-full">
                <div className="h-[454px] relative">
                  {/* Background Image */}
                  <img
                    src={r2}
                    alt="Candidates Background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-12 w-full z-10">
                    <div className="flex flex-col gap-5 mb-6">
                      <div className="flex flex-col gap-3 ml-3">
                        <h2 className="font-extrabold text-white text-3xl leading-normal">
                          For Candidates
                        </h2>
                        <p className="font-semibold text-white text-base leading-normal">
                          Create a standout profile, connect with top companies,
                          and get hired faster than ever.
                        </p>
                      </div>
                    </div>
                    <Button onClick={()=>nav('/signup/candidate')} className="mb-7 ml-3 w-60 py-7  rounded-lg bg-gradient-to-r from-blue-600 to-blue-900 font-semibold text-white text-xl hover:opacity-90 transition-opacity">
                      Register as Candidate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Login Section */}
          <div className="flex items-center justify-center gap-5 p-6 bg-blue-50 rounded-xl border border-solid border-gray-300 max-w-3xl mx-auto ">
            <p className="font-semibold text-blue-900 text-xl">
              Already have an account?
            </p>
            <Button
             onClick={()=>nav('/login')}
              variant="outline"
              className="py-4 px-6 rounded-lg border-2 border-blue-900 font-bold text-blue-900 text-xl hover:bg-blue-50 "
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterLanding;
