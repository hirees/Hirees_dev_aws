import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TopCompanies = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Using premium company icons with proper brand colors
  const companies = [
    { name: "Airbnb", icon: "🏠", color: "#FF5A5F" },
    { name: "Wrangler", icon: "W", color: "#000000" },
    { name: "Skype", icon: "S", color: "#00AFF0" },
    { name: "Facebook", icon: "f", color: "#1877F2" },
    { name: "HSBC", icon: "◊", color: "#DB0011" },
    { name: "eBay", icon: "e", color: "#E53238" },
    { name: "McDonald's", icon: "M", color: "#FFC72C" },
    { name: "Apple", icon: "", color: "#000000" },
    { name: "Google", icon: "G", color: "#4285F4" },
    { name: "Amazon", icon: "A", color: "#FF9900" },
    { name: "Netflix", icon: "N", color: "#E50914" },
    { name: "Spotify", icon: "♪", color: "#1DB954" }
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    // Update scroll button states after scroll completes
    setTimeout(() => {
      updateScrollButtons();
    }, 300);
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  const getCompanyIcon = (company) => {
    switch(company.name) {
      case 'Airbnb':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M12.017 11.986c-.512 0-.93-.421-.93-.947s.418-.947.93-.947.93.421.93.947-.418.947-.93.947zm0-1.531c-.323 0-.585.254-.585.584s.262.584.585.584.585-.254.585-.584-.262-.584-.585-.584z"/>
            <path d="M12.017 0C7.786 0 4.355 3.462 4.355 7.736c0 4.274 7.662 16.264 7.662 16.264s7.662-11.99 7.662-16.264C19.679 3.462 16.248 0 12.017 0zm0 11.456c-.861 0-1.56-.71-1.56-1.584s.699-1.584 1.56-1.584 1.56.71 1.56 1.584-.699 1.584-1.56 1.584z"/>
          </svg>
        );
      case 'Apple':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
            <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
          </svg>
        );
      case 'Facebook':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'Google':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        );

        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.71.002-22.95zM5.398 11.37V24c2.954-.086 5.864-.397 8.487-.602V9.63z"/>
          </svg>
        );
      default:
        return <span className="text-5xl font-bold">{company.icon}</span>;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-normal text-[#012760] mb-6 ml-12">Top Companies</h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all ${
            canScrollLeft
              ? 'hover:bg-gray-50 cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all ${
            canScrollRight
              ? 'hover:bg-gray-50 cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Companies Container */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex gap-10 overflow-x-auto scrollbar-hide px-12 py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-20 h-20 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center border border-gray-100 hover:scale-105"
              title={company.name}
            >
              <div style={{ color: company.color }} className="flex items-center justify-center">
                {getCompanyIcon(company)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TopCompanies;