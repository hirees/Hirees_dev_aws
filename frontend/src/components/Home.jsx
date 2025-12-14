import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import all components directly
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import TestimonialsSection from "./TestimonialsSection";
import AnimatedResumeBanner from "./AnimatedResumeBanner";
import PathSection from "./PathSection";
import StuPath from "./StuPath";
import Latestjob from "./Latestjob";
import Compan from "./Compan";
import MarqueeReviews from "./MarqueeReviews";
import CallToActionSection from "./CallToActionSection";
import Footer from "./Footer";
import DuoCards from "./DuoCards";
import TestimonialsSlider from "./TestimonialsSlider";

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  // Uncomment if you need the redirect for recruiters
  // useEffect(() => {
  //   if (user?.role === 'recruiter') {
  //     navigate("/admin/companies");
  //   }
  // }, [user?.role, navigate]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <AnimatedResumeBanner /> */}
      <TestimonialsSection />
      <DuoCards />
      {/* <StuPath /> */}
      <Latestjob />
      {/* <Compan /> */}
      <PathSection />
      {/* <MarqueeReviews /> */}
      <TestimonialsSlider/>
      <CallToActionSection />
      <Footer />
    </div>
  );
}

export default Home;
