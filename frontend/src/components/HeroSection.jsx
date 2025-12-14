import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bp from "../assets/bp.svg";
import hbg from "../assets/group 7.svg";
import avatars from "../assets/avatars.svg"

export default function HeroSection() {
  const navigate = useNavigate();
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const trimmedJobQuery = jobQuery.trim();
    const trimmedLocationQuery = locationQuery.trim();

    const params = new URLSearchParams();
    if (trimmedJobQuery) params.append("keyword", trimmedJobQuery);
    if (trimmedLocationQuery) params.append("location", trimmedLocationQuery);
    if (experienceLevel) params.append("experience", experienceLevel);

    navigate({
      pathname: "/browse",
      search: params.toString(),
    });
  };

  return (
    <div
      className="w-full min-h-[50vh] sm:min-h-[70vh] md:min-h-[73vh] lg:min-h-[66vh] lg:mt-7 bg-fit bg-center bg-no-repeat overflow-hidden  "
      style={{
        backgroundImage: `url(${hbg})`,
        boxShadow: "none", // Remove bottom shadow
      }}
      draggable="false"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center">
          {/* Left Side */}
          <div className="flex flex-col items-center md:items-start gap-3 mt-24 sm:mt-20 md:mt-12 md:ml-8 lg:ml-24 ">
            {/* Trusted by users tag */}
            <div className="bg-[#97C0FF]  rounded-full px-5 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2">
              <div className="flex -space-x-4 sm:-space-x-6">
                <img
                  src={avatars}
                  alt="Avatars"
                  className="w-16 sm:w-20 h-8 sm:h-10 rounded-full object-cover"
                  draggable="false"
                />
              </div>

              <span className="text-[#012760] font-medium text-xs sm:text-sm">
                Trusted by more than <span className="text-[#0350C6] font-extrabold">100k+ users</span>
              </span>
            </div>

            {/* Headings with better responsive sizing */}
            <div className="text-center md:text-left w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-[#444444]">
                Find the <span className="text-[#012760]">right job</span>
              </h1>
              <h2 className="text-[#444444] text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mt-1 md:mt-2">
                Work without boarders
              </h2>
            </div>

            {/* Search bar */}
            <div className="w-full mt-4 sm:mt-6">
              <div className=" relative w-full md:w-[76vh] h-12 sm:h-14 md:h-16 bg-neutral-50 rounded-full shadow-lg overflow-hidden">
                {/* Search input fields container */}
                <div className="flex items-center h-full">
                  {/* Job search field */}
                  <div className="flex items-center gap-1 sm:gap-2 md:gap-3 px-3 flex-grow">
                    <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={jobQuery}
                      onChange={(e) => setJobQuery(e.target.value)}
                      placeholder="search jobs"
                      className="w-full sm:w-16 md:w-24 bg-transparent font-medium text-gray-500 text-xs sm:text-sm md:text-lg focus:outline-none"
                    />
                  </div>

                  {/* Divider */}
                  <div className="w-px h-6 md:h-8 bg-gray-300"></div>

                  {/* Location field */}
                  <div className="flex items-center gap-1 sm:gap-2 md:gap-3 px-2 md:px-4 flex-grow sm:flex-grow-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      placeholder="location"
                      className="w-full sm:w-16 md:w-24 bg-transparent font-medium text-gray-500 text-xs sm:text-sm md:text-lg focus:outline-none"
                    />
                  </div>

                  {/* Experience field - hidden on mobile */}
                  <div className="hidden sm:flex items-center gap-2 px-2 md:px-4">
                    <div className="w-px h-6 md:h-8 bg-gray-300 mr-1 sm:mr-2"></div>
                    <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-16 sm:w-20 md:w-24 bg-transparent font-medium text-gray-500 text-xs sm:text-sm md:text-lg focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="">experience</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                    </select>
                  </div>

                  {/* Search button with gradient background */}
                  <button
                    onClick={handleSearch}
                    className="ml-auto w-10 sm:w-12 md:w-16 lg:w-24 h-12 sm:h-14 md:h-16 flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 cursor-pointer"

                  >
                     <img
                      onClick={handleSearch}
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 cursor-pointer"
                      alt="Search"
                      src="https://c.animaapp.com/Bqbe6AXD/img/material-symbols-light-line-end-arrow.svg"
                      draggable="false"
                    />


                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Only shown on desktop */}
          {isDesktop && (
            <div className="hidden md:block relative h-full w-full ">
              {/* Main content area */}
              <div className="relative w-full h-full flex justify-center mt-6 md:mt-12">
                {/* Main image container */}
                <div className="relative flex justify-center items-center w-full h-full mt-[8vh]">
                  <img
                    src={bp}
                    alt="Three professional business people"
                    className="h-auto max-h-64 md:max-h-80 lg:max-h-96 w-auto object-contain z-10"
                    draggable="false"
                  />

                  {/* Message bubbles layout */}
                  <div className="absolute w-full flex flex-col items-center top-3 md:top-0 pointer-events-none">
                    {/* Center message bubble (on top) */}
                    <div className="mb-4 md:mb-6 mt-[-2vh] md:mt-[-1vh]">
                      <div className="inline-flex items-center justify-center px-3 py-2 md:px-5 md:py-3 bg-white rounded-full shadow-lg">
                        <p className="font-sans text-xs md:text-sm text-center whitespace-nowrap">
                          <span className="font-medium text-gray-700">
                            Helping in connect with the{" "}
                          </span>
                          <span className="font-semibold text-red-500">
                            top companies
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Bottom bubbles (left and right) */}
                    <div className="flex justify-center items-center gap-x-4 md:gap-x-16">
                      {/* Left message */}
                      <div className="inline-flex items-center justify-center px-3 py-2 md:px-5 md:py-3 bg-white rounded-full shadow-lg">
                        <p className="font-sans text-xs md:text-sm text-center whitespace-nowrap">
                          <span className="font-medium text-gray-700">
                            One stop solution for your{" "}
                          </span>
                          <span className="font-semibold text-orange-400">
                            job hunt
                          </span>
                        </p>
                      </div>

                      {/* Right message */}
                      <div className="inline-flex items-center justify-center px-3 py-2 md:px-5 md:py-3 bg-white rounded-full shadow-lg">
                        <p className="font-sans text-xs md:text-sm text-center whitespace-nowrap">
                          <span className="font-medium text-gray-700">
                            Empowering you to{" "}
                          </span>
                          <span className="font-semibold text-blue-500">
                            grow faster
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}