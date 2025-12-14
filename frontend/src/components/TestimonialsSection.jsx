import React from "react";
import {
  SiGoogle,
  SiApple,
  SiFacebook,
  SiAirbnb,
  SiAmazon,
  SiLinkedin,
  SiUber
} from "react-icons/si";

export default function TestimonialsSection() {
  const companies = [
    { name: "Google", Icon: SiGoogle, color: "#4285F4" },
    { name: "Apple", Icon: SiApple, color: "#000000" },
    { name: "Facebook", Icon: SiFacebook, color: "#1877F2" },
    { name: "Airbnb", Icon: SiAirbnb, color: "#FF5A5F" },
    { name: "LinkedIn", Icon: SiLinkedin, color: "#0A66C2" },
    { name: "Amazon", Icon:SiAmazon, color:"#FF9900"},
    { name: "Slack", Icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <g fill="none">
          <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.31 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.832 24a2.528 2.528 0 0 1-2.522-2.522v-6.313z"/>
          <path fill="#36C5F0" d="M8.832 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.832 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.832zM8.832 6.31a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521h-6.31a2.528 2.528 0 0 1-2.522-2.521A2.528 2.528 0 0 1 2.522 6.31h6.31z"/>
          <path fill="#2EB67D" d="M18.956 8.832a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.832a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.832zM17.688 8.832a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521v-6.31A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.31z"/>
          <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
        </g>
      </svg>
    ), color: "#4A154B" },
    { name: "Uber", Icon: SiUber, color: "#000000" }
  ];

  return (
    <div className="w-full py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6E6E6E] text-center mb-10 sm:mb-12">
          Trusted by companies:
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-16">
          {companies.map((company, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-2 sm:p-3 hover:scale-105 transition-transform duration-200"
            >
              <company.Icon 
                size={32} 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" 
                color={company.color} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}