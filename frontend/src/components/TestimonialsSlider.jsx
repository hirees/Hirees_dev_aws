import React, { useState } from "react";
import homebackground from "../assets/homebackground.svg";

export default function TestimonialsSlider() {
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      text: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. velit interdum, ac aliquet odio mattis. ac aliquet odio mattis.Nunc vulputate libero et velit interdum, ac aliquet odio mattis. velit interdum,",
      name: "SIMMPY MANSON",
      position: "Head of Design",
      avatar: "https://c.animaapp.com/4IBi8fBt/img/frame-114@2x.png"
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our team has experienced remarkable improvements in workflow efficiency and collaboration since implementing this solution.",
      name: "ALEX JOHNSON",
      position: "Product Manager",
      avatar: "https://c.animaapp.com/4IBi8fBt/img/frame-115@2x.png"
    },
    {
      id: 3,
      text: "The platform has transformed how our team operates. Communication is streamlined, projects are completed ahead of schedule, and the interface is incredibly intuitive to use.",
      name: "MARIA GARCIA",
      position: "Senior Developer",
      avatar: "https://c.animaapp.com/4IBi8fBt/img/frame-116@2x.png"
    },
    {
      id: 4,
      text: "We've seen a 40% increase in productivity since adopting this tool. The customer support team has been responsive and helpful throughout our onboarding process.",
      name: "DAVID CHEN",
      position: "Operations Director",
      avatar: "https://c.animaapp.com/4IBi8fBt/img/frame-117@2x.png"
    },
    {
      id: 5,
      text: "This solution has exceeded our expectations. The customizable features allow us to tailor the platform to our specific needs while maintaining ease of use.",
      name: "SARAH WILLIAMS",
      position: "CTO",
      avatar: "https://c.animaapp.com/4IBi8fBt/img/frame-118@2x.png"
    }
  ];

  // State to track current testimonial index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to determine avatar size and opacity based on position
  const getAvatarStyles = (index) => {
    if (index === 2) {
      return "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 opacity-100";
    } else if (index === 1 || index === 3) {
      return "w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-80";
    } else {
      return "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-60";
    }
  };

  return (
    <div className="flex w-full min-h-[90vh] sm:h-[90vh] bg-no-repeat bg-cover bg-center relative mb-6"
         style={{ backgroundImage: `url(${homebackground})` }}>

      <div className="absolute inset-0 bg-white opacity-85 "></div>
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto rounded-lg overflow-hidden relative z-10 my-8 sm:my-20 px-4 sm:px-0">
        {/* Left Panel - Reduced size and gradient background */}
        <div className="w-full md:w-2/3 text-white p-4 sm:p-8 rounded-br-[60px] sm:rounded-br-[120px] relative min-h-[40vh] sm:h-[70vh]"
             style={{ background: 'linear-gradient(180deg, rgba(3,80,198,1) 0%, rgba(1,39,96,1) 100%)' }}>
          <div className="text-6xl sm:text-9xl font-bold absolute top-8 sm:top-20 left-4 sm:left-6 text-white opacity-100 font-serif">"</div>
          <div className="mt-16 sm:mt-32 space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              What our<br/>
              customer<br/>
              says
            </h2>
            <p className="text-base sm:text-xl font-medium">
              <span>Joined by </span>
              <span className="text-blue-300">1000+</span>
              <span> satisfied<br/> professionals advising their carrer</span>
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-2/3 p-4 sm:p-8 flex flex-col justify-between mt-4">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-gray-500 mb-4 sm:mb-6">
              Help us improve our productivity
            </h3>

            <div className="mt-4 sm:mt-6 max-w-md mx-auto">
              <p className="text-gray-500 text-center mb-8 sm:mb-12 text-xs sm:text-sm leading-relaxed">
                {testimonials[currentIndex].text}
              </p>
            </div>

            {/* Testimonial Avatars */}
            <div className="flex justify-center items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              {testimonials.map((testimonial, index) => {
                let displayPosition = (currentIndex - 2 + index) % testimonials.length;
                if (displayPosition < 0) displayPosition += testimonials.length;

                return (
                  <div
                    key={testimonial.id}
                    className={`${getAvatarStyles(index)} rounded-full bg-cover bg-center transition-all duration-300 ${index === 2 ? 'border-2 border-pink-300' : ''}`}
                    style={{ backgroundImage: `url(${testimonials[displayPosition].avatar})` }}
                  />
                );
              })}
            </div>

            {/* Testimonial Author */}
            <div className="mb-4">
              <h4 className="text-base sm:text-lg font-bold text-blue-600">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                {testimonials[currentIndex].position}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-3 mb-8 sm:mb-56">
            <button
              onClick={handlePrev}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-blue-600 flex items-center justify-center text-blue-600 focus:outline-none transition-colors hover:bg-blue-50"
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-5">
                <path d="M15 19L9 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-blue-600 flex items-center justify-center text-blue-600 focus:outline-none transition-colors hover:bg-blue-50"
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-5">
                <path d="M9 19L15 12L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}