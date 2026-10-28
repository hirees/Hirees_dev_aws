
// import React, { useState, useEffect } from "react";
// import { Search, MapPin, Briefcase } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import bp from "../assets/bp.svg";
// import hbg from "../assets/Group 7.svg";
// import avatars from "../assets/avatars.svg"

// export default function HeroSection() {
//   const navigate = useNavigate();
//   const [jobQuery, setJobQuery] = useState("");
//   const [locationQuery, setLocationQuery] = useState("");
//   const [experienceLevel, setExperienceLevel] = useState("");
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
 


//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsDesktop(window.innerWidth >= 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleSearch = (e) => {
//     if (e) e.preventDefault();
//     const trimmedJobQuery = jobQuery.trim();
//     const trimmedLocationQuery = locationQuery.trim();

//     const params = new URLSearchParams();
//     if (trimmedJobQuery) params.append("keyword", trimmedJobQuery);
//     if (trimmedLocationQuery) params.append("location", trimmedLocationQuery);
//     if (experienceLevel) params.append("experience", experienceLevel);

//     navigate({
//       pathname: "/browse",
//       search: params.toString(),
//     });
//   };

//   return (
//     <div
//       className="w-full min-h-[50vh] sm:min-h-[70vh] md:min-h-[73vh] lg:min-h-[66vh] lg:mt-7 bg-fit bg-center bg-no-repeat overflow-hidden  "
//       style={{
//         backgroundImage: `url(${hbg})`,
//         boxShadow: "none", // Remove bottom shadow
//       }}
//       draggable="false"
//     >
//       <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center">
//           {/* Left Side */}
//           <div className="flex flex-col items-center md:items-start gap-3 mt-24 sm:mt-20 md:mt-12 md:ml-8 lg:ml-24 ">
//             {/* Trusted by users tag */}
//             <div className="bg-[#97C0FF]  rounded-full px-5 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2">
//               <div className="flex -space-x-4 sm:-space-x-6">
//                 <img
//                   src={avatars}
//                   alt="Avatars"
//                   className="w-16 sm:w-20 h-8 sm:h-10 rounded-full object-cover"
//                   draggable="false"
//                 />
//               </div>

//               <span className="text-[#012760] font-medium text-xs sm:text-sm">
//               </span>
//             </div>

//             {/* Headings with better responsive sizing */}
//             <div className="text-center md:text-left w-full">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-[#444444]">
//                 Find the <span className="text-[#012760]">right job</span>
//               </h1>
//               <h2 className="text-[#444444] text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mt-1 md:mt-2">
//                 Work without boarders
//               </h2>
//             </div>

//             {/* Search bar */}
//             <div className="w-full mt-4 sm:mt-6">
//              <div className="relative w-full md:w-[85vh] lg:w-[90vh] h-12 sm:h-14 md:h-16 
// bg-neutral-50 border border-gray-300 rounded-full shadow-lg overflow-hidden 
// md:-ml-16 lg:-ml-24
// ">

//                 {/* Search input fields container */}
//                 <div className="flex items-center h-full">
//                   {/* Job search field */}
//                   <div className="flex items-center gap-1 sm:gap-2 md:gap-3 px-3 flex-grow">
//                     <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" />
//                     <input
//                       type="text"
//                       value={jobQuery}
//                       onChange={(e) => setJobQuery(e.target.value)}
//                       placeholder="search jobs"
//                       className="w-full sm:w-16 md:w-24 bg-transparent font-small text-gray-500 text-xs sm:text-sm md:text-lg focus:outline-none"
//                     />
//                   </div>

//                   {/* Divider */}
//                   <div className="w-px h-6 md:h-8 bg-gray-300"></div>

//                   {/* Location field */}
//                   <div className="flex items-center gap-1 sm:gap-2 md:gap-3 px-2 md:px-4 flex-grow sm:flex-grow-0">
//                     <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" />
//                     <input
//                       type="text"
//                       value={locationQuery}
//                       onChange={(e) => setLocationQuery(e.target.value)}
//                       placeholder="location"
//                       className="w-full sm:w-16 md:w-24 bg-transparent font-small text-gray-500 text-xs sm:text-sm md:text-lg focus:outline-none"
//                     />
//                   </div>

//                   {/* Experience field - hidden on mobile */}
//                   <div className="hidden sm:flex items-center gap-2 px-2 md:px-4">
//                     <div className="w-px h-6 md:h-8 bg-gray-300 mr-1 sm:mr-2"></div>
//                     <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
//                     <select
//                       value={experienceLevel}
//                       onChange={(e) => setExperienceLevel(e.target.value)}
//                       className="w-16 sm:w-20 md:w-24 bg-transparent font-small text-gray-500 text-xs sm:text-sm md:text-lg focus:outline-none appearance-none cursor-pointer"
//                     >
//                       <option value="">experience</option>
//                       <option value="entry">Entry Level</option>
//                       <option value="mid">Mid Level</option>
//                       <option value="senior">Senior Level</option>
//                     </select>
//                   </div>

//                   {/* Search button with gradient background */}
//                   <button
//                     onClick={handleSearch}
//                     className="ml-auto w-10 sm:w-12 md:w-16 lg:w-24 h-12 sm:h-14 md:h-16 flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 cursor-pointer"

//                   >
//                      <img
//                       onClick={handleSearch}
//                       className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 cursor-pointer"
//                       alt="Search"
//                       src="https://c.animaapp.com/Bqbe6AXD/img/material-symbols-light-line-end-arrow.svg"
//                       draggable="false"
//                     />


//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Only shown on desktop */}
//           {isDesktop && (
//             <div className="hidden md:block relative h-full w-full ">
//               {/* Main content area */}
//               <div className="relative w-full h-full flex justify-center mt-6 md:mt-12">
//                 {/* Main image container */}
//                 <div className="relative flex justify-center items-center w-full h-full mt-[8vh]">
//                   <img
//                     src={bp}
//                     alt="Three professional business people"
//                     className="h-auto max-h-64 md:max-h-80 lg:max-h-96 w-auto object-contain z-10"
//                     draggable="false"
//                   />

//                   {/* Message bubbles layout */}
//                   <div className="absolute w-full flex flex-col items-center top-3 md:top-0 pointer-events-none">
//                     {/* Center message bubble (on top) */}
//                     <div className="mb-4 md:mb-6 mt-[-2vh] md:mt-[-1vh]">
//                       <div className="inline-flex items-center justify-center px-3 py-2 md:px-5 md:py-3 bg-white rounded-full shadow-lg">
//                         <p className="font-sans text-xs md:text-sm text-center whitespace-nowrap">
//                           <span className="font-medium text-gray-700">
//                             Helping in connect with the{" "}
//                           </span>
//                           <span className="font-semibold text-red-500">
//                             top companies
//                           </span>
//                         </p>
//                       </div>
//                     </div>

//                     {/* Bottom bubbles (left and right) */}
//                     <div className="flex justify-center items-center gap-x-4 md:gap-x-16">
//                       {/* Left message */}
//                       <div className="inline-flex items-center justify-center px-3 py-2 md:px-5 md:py-3 bg-white rounded-full shadow-lg">
//                         <p className="font-sans text-xs md:text-sm text-center whitespace-nowrap">
//                           <span className="font-medium text-gray-700">
//                             One stop solution for your{" "}
//                           </span>
//                           <span className="font-semibold text-orange-400">
//                             job hunt
//                           </span>
//                         </p>
//                       </div>

//                       {/* Right message */}
//                       <div className="inline-flex items-center justify-center px-3 py-2 md:px-5 md:py-3 bg-white rounded-full shadow-lg">
//                         <p className="font-sans text-xs md:text-sm text-center whitespace-nowrap">
//                           <span className="font-medium text-gray-700">
//                             Empowering you to{" "}
//                           </span>
//                           <span className="font-semibold text-blue-500">
//                             grow faster
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bp from "../assets/bp.svg";
import hbg from "../assets/Group 7.svg";
import avatars from "../assets/avatars.svg";

export default function HeroSection() {
  const navigate = useNavigate();
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const popularSearches = ["UI Designer", "Developer", "Marketing", "Finance"];

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (jobQuery.trim()) params.append("keyword", jobQuery.trim());
    if (locationQuery.trim()) params.append("location", locationQuery.trim());
    if (experienceLevel) params.append("experience", experienceLevel);
    navigate({ pathname: "/browse", search: params.toString() });
  };

  const handlePopularSearch = (term) => {
    const params = new URLSearchParams();
    params.append("keyword", term);
    navigate({ pathname: "/browse", search: params.toString() });
  };

  return (
    <div
      className="w-full min-h-[50vh] sm:min-h-[70vh] md:min-h-[73vh] lg:min-h-[66vh] lg:mt-7 bg-fit bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${hbg})` }}
      draggable="false"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center">

          {/* ── Left Side ── */}
          <div className="flex flex-col items-center md:items-start gap-4 mt-24 sm:mt-20 md:mt-12 md:ml-8 lg:ml-24">

            {/* Trust badge */}
            <div className="bg-[#97C0FF] rounded-full px-5 py-2 flex items-center gap-2 shadow-sm">
              <div className="flex -space-x-4">
                <img
                  src={avatars}
                  alt="User avatars"
                  className="w-16 sm:w-20 h-8 sm:h-10 rounded-full object-cover"
                  draggable="false"
                />
              </div>
              <span className="text-[#012760] font-medium text-xs sm:text-sm">
                Free for candidates and employers
              </span>
            </div>

            {/* Headings */}
            <div className="text-center md:text-left w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-[#444444] leading-tight">
                Find the <span className="text-[#012760]">right job</span>
              </h1>
              <h2 className="text-[#444444] text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mt-1 md:mt-2 leading-tight">
                Work without borders
              </h2>
            </div>

            {/* Search bar */}
            <div className="w-full mt-2 sm:mt-4">
              <div
                className="relative flex items-center w-full md:w-[85vh] lg:w-[90vh] h-12 sm:h-14 md:h-[58px]
                  bg-white border border-gray-200 rounded-full overflow-hidden md:-ml-16 lg:-ml-24"
                style={{ boxShadow: "0 4px 24px rgba(3, 80, 198, 0.12)" }}
              >
                {/* Job field */}
                <div className="flex items-center gap-2 px-4 flex-grow min-w-0">
                  <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={jobQuery}
                    onChange={(e) => setJobQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="search jobs"
                    className="w-full bg-transparent text-gray-600 text-xs sm:text-sm md:text-base focus:outline-none placeholder-gray-400"
                  />
                </div>

                <div className="w-px h-6 md:h-8 bg-gray-200 flex-shrink-0" />

                {/* Location field */}
                <div className="flex items-center gap-2 px-3 md:px-4 flex-grow min-w-0">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="location"
                    className="w-full bg-transparent text-gray-600 text-xs sm:text-sm md:text-base focus:outline-none placeholder-gray-400"
                  />
                </div>

                {/* Experience field – hidden on mobile */}
                <div className="hidden sm:flex items-center gap-2 px-2 md:px-4 flex-shrink-0">
                  <div className="w-px h-6 md:h-8 bg-gray-200" />
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-20 md:w-28 bg-transparent text-gray-500 text-xs sm:text-sm md:text-base focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="">experience</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>
                </div>

                {/* Search button */}
                <button
                  onClick={handleSearch}
                  className="ml-auto flex-shrink-0 h-12 sm:h-14 md:h-[58px] w-12 sm:w-14 md:w-20 lg:w-24 flex items-center justify-center rounded-r-full cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
                  style={{ background: "linear-gradient(135deg, #ef4444, #f97316)" }}
                  aria-label="Search jobs"
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Popular searches */}
            <div className="flex items-center gap-2 flex-wrap md:-ml-16 lg:-ml-24 mt-1">
              <span className="text-xs text-gray-500 font-medium">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handlePopularSearch(term)}
                  className="text-xs text-[#0350C6] bg-blue-50 border border-blue-100 rounded-full px-3 py-1 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right Side – desktop only ── */}
          {isDesktop && (
            // KEY FIX: removed negative margins / absolute positioning on right column.
            // pt-10 ensures the top bubble never overlaps with the fixed navbar.
            <div className="hidden md:flex flex-col items-center justify-end relative h-full w-full pt-10">

              {/* Top bubble */}
              <div className="mb-4 self-center">
                <div
                  className="inline-flex items-center px-5 py-2.5 bg-white rounded-full text-sm"
                  style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.10)" }}
                >
                  <span className="text-gray-600 font-medium">Helping connect with the&nbsp;</span>
                  <span className="text-red-500 font-semibold">top companies</span>
                </div>
              </div>

              {/* Professional image */}
              <div className="flex justify-center items-end w-full">
                <img
                  src={bp}
                  alt="Three professional business people"
                  className="h-auto max-h-64 md:max-h-80 lg:max-h-[360px] w-auto object-contain z-10"
                  draggable="false"
                />
              </div>

              {/* Stats row */}
              <div className="flex gap-3 mt-4 z-10">
                {[
                  "Verified employers",
                  "Open to H1B transfer",
                  "Free to post",
                ].map((label) => (
                  <div
                    key={label}
                    className="bg-white rounded-2xl px-4 py-2.5 text-center"
                    style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.08)" }}
                  >
                    <p className="text-[#012760] font-semibold text-xs sm:text-sm leading-tight">{label}</p>
                  </div>
                ))}
              </div>

              {/* Bottom bubbles */}
              <div className="flex gap-3 mt-3 flex-wrap justify-center z-10 pb-4">
                <div
                  className="inline-flex items-center px-5 py-2.5 bg-white rounded-full text-sm"
                  style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.10)" }}
                >
                  <span className="text-gray-600 font-medium">One stop for your&nbsp;</span>
                  <span className="text-orange-400 font-semibold">job hunt</span>
                </div>
                <div
                  className="inline-flex items-center px-5 py-2.5 bg-white rounded-full text-sm"
                  style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.10)" }}
                >
                  <span className="text-gray-600 font-medium">Empowering you to&nbsp;</span>
                  <span className="text-blue-500 font-semibold">grow faster</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
