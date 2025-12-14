import React, { memo } from "react";
import { Upload } from "lucide-react";

// Memoized Component for Repeating Banner Content
const BannerItem = memo(() => {
  return (
    <div className="flex items-center space-x-8 mx-8 whitespace-nowrap">
      <div className="flex items-center">
        <Upload className="w-5 h-5 text-white mr-2" />
        <span className="text-white font-semibold">Upload Your Resume</span>
      </div>
      <span className="text-blue-200">•</span>
      <span className="text-white">Get Matched with Top Companies</span>
      <span className="text-blue-200">•</span>
      <span className="text-white">Land Your Dream Job</span>
      <span className="text-blue-200">•</span>
      <div className="flex items-center">
        <span className="text-white bg-blue-500 px-2 py-1 rounded-full text-sm font-bold">
          Hiring Now!
        </span>
      </div>
    </div>
  );
});

const AnimatedResumeBanner = () => {
  return (
    <div className="relative w-full bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
      <div className="flex items-center py-3 animate-[slideLeft_20s_linear_infinite]">
        {/* Repeating the BannerItem */}
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <BannerItem />
          </div>
        ))}
      </div>

      {/* Add gradient overlays for smooth fade effect */}
      <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-blue-600 to-transparent"></div>
      <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-blue-800 to-transparent"></div>

      <style>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedResumeBanner;
