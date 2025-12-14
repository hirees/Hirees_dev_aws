import rightSideGrid from "../assets/right-side-grid.svg";

const CareerPaths = () => {
  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center items-center py-2 px-4 sm:py-6 sm:px-6 sm:mb-010">
      <div className="max-w-5xl w-full mx-auto">
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Text and CTA */}
          <div className="flex flex-col w-full lg:w-1/2 items-start gap-3 sm:gap-8 mb-4 sm:mb-10 lg:mb-0">
            <div className="flex flex-col items-start gap-2 sm:gap-4 relative w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-700 leading-tight">
                Build your<br className="hidden sm:block"/> dream team <br className="hidden sm:block"/>today.
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-400 leading-normal mt-2 sm:mt-4">
                Unlock success with our <br className="hidden sm:block"/>handpicked dream team of experts
              </p>
            </div>

            <button className="flex w-full sm:w-48 items-center justify-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300">
              <span className="font-semibold text-white text-base sm:text-lg">
                Hire Now!
              </span>
            </button>
          </div>

          {/* Right Section - Image */}
          <div className="w-full lg:w-4/6 mt-4 lg:mt-0">
            <img
              src={rightSideGrid}
              alt="Team experts grid"
              className="w-full h-auto rounded-lg object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPaths;