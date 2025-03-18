// // // // import useGetAllJobs from "@/hooks/useGetAllJobs";
// // // // import CategoryCarousel from "./CategoryCarousel";
// // // // import Footer from "./Footer";
// // // // import HeroSection from "./HeroSection";
// // // // import Latestjob from "./Latestjob";
// // // // import Navbar from "./shared/Navbar";
// // // // import { useSelector } from "react-redux";
// // // // import { useEffect } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import Compan from "./Compan";
// // // // import JobApplicationSteps from "./JobApplicationSteps";
// // // // import ReviewsSection from "./ReviewsSection";

// // // // function Home() {
// // // //   useGetAllJobs();
// // // //   const navigate = useNavigate();
// // // //   const {user}= useSelector(store=>store.auth);
// // // //   useEffect(()=>{
// // // //     if(user?.role==='recruiter'){
// // // //       navigate("/admin/companies")
// // // //     }

// // // //   },[]);
// // // //   return <div >
// // // //     <Navbar></Navbar>
// // // //     <HeroSection></HeroSection>
// // // //     {/* <CategoryCarousel></CategoryCarousel> */}
// // // //     <JobApplicationSteps></JobApplicationSteps>
// // // //     <Latestjob></Latestjob>
// // // //     <Compan className=""></Compan>
// // // //     <ReviewsSection></ReviewsSection>
// // // //     <Footer></Footer>
// // // //   </div>;
// // // // }
// // // // export default Home;
// // // // import { lazy, Suspense, useState, useEffect } from 'react';
// // // // import { useSelector } from "react-redux";
// // // // import { useNavigate } from "react-router-dom";
// // // // import useGetAllJobs from "@/hooks/useGetAllJobs";

// // // // // Lazy load all components
// // // // const Navbar = lazy(() => import('./shared/Navbar'));
// // // // const HeroSection = lazy(() => import('./HeroSection'));
// // // // const CategoryCarousel = lazy(() => import('./CategoryCarousel'));
// // // // const Latestjob = lazy(() => import('./Latestjob'));
// // // // const Compan = lazy(() => import('./Compan'));
// // // // const JobApplicationSteps = lazy(() => import('./JobApplicationSteps'));
// // // // const ReviewsSection = lazy(() => import('./ReviewsSection'));
// // // // const Footer = lazy(() => import('./Footer'));

// // // // // Loading component with progress bar
// // // // const PageLoader = () => {
// // // //   const [progress, setProgress] = useState(0);

// // // //   useEffect(() => {
// // // //     const timer = setTimeout(() => {
// // // //       if (progress < 100) {
// // // //         setProgress(prev => Math.min(prev + 15, 100));
// // // //       }
// // // //     }, 300);

// // // //     return () => clearTimeout(timer);
// // // //   }, [progress]);

// // // //   return (
// // // //     <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
// // // //       {/* Spinner */}
// // // //       <div className="w-16 h-16 mb-8">
// // // //         <div className="w-full h-full border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
// // // //       </div>

// // // //       {/* Progress bar */}
// // // //       <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
// // // //         <div
// // // //           className="h-full bg-blue-500 transition-all duration-300 ease-out"
// // // //           style={{ width: `${progress}%` }}
// // // //         ></div>
// // // //       </div>

// // // //       {/* Loading text */}
// // // //       <p className="mt-4 text-gray-600">Loading... {progress}%</p>
// // // //     </div>
// // // //   );
// // // // };

// // // // function Home() {
// // // //   useGetAllJobs();
// // // //   const navigate = useNavigate();
// // // //   const { user } = useSelector(store => store.auth);
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     if (user?.role === 'recruiter') {
// // // //       navigate("/admin/companies");
// // // //     }
// // // //   }, []);

// // // //   // Simulate checking if all components are loaded
// // // //   useEffect(() => {
// // // //     const timer = setTimeout(() => {
// // // //       setIsLoading(false);
// // // //     }, 2000); // Adjust this time based on your needs

// // // //     return () => clearTimeout(timer);
// // // //   }, []);

// // // //   if (isLoading) {
// // // //     return <PageLoader />;
// // // //   }

// // // //   return (
// // // //     <div>
// // // //       <Suspense fallback={<PageLoader />}>
// // // //         <Navbar />
// // // //         <HeroSection />
// // // //         {/* <CategoryCarousel /> */}
// // // //         <JobApplicationSteps />
// // // //         <Latestjob />
// // // //         <Compan />
// // // //         <ReviewsSection />
// // // //         <Footer />
// // // //       </Suspense>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Home;
// // // // Critical imports - keep these
// // // // import { Suspense, lazy, useState, useEffect } from 'react';
// // // // import { useSelector } from "react-redux";
// // // // import { useNavigate } from "react-router-dom";
// // // // import useGetAllJobs from "@/hooks/useGetAllJobs";

// // // // // Only Navbar and HeroSection are critical - import directly
// // // // import Navbar from './shared/Navbar';
// // // // import HeroSection from './HeroSection';

// // // // // Lazy load non-critical components
// // // // const Latestjob = lazy(() => import('./Latestjob'));
// // // // const Compan = lazy(() => import('./Compan'));
// // // // const JobApplicationSteps = lazy(() => import('./JobApplicationSteps'));
// // // // const ReviewsSection = lazy(() => import('./ReviewsSection'));
// // // // const Footer = lazy(() => import('./Footer'));

// // // // // Simple loading spinner
// // // // const LoadingSpinner = () => (
// // // //   <div className="fixed inset-0 bg-white/80 flex items-center justify-center">
// // // //     <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
// // // //   </div>
// // // // );

// // // // function Home() {
// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const navigate = useNavigate();
// // // //   const { user } = useSelector(store => store.auth);

// // // //   // Prefetch critical data
// // // //   const { isLoading: jobsLoading, data: jobsData } = useGetAllJobs();

// // // //   useEffect(() => {
// // // //     if (user?.role === 'recruiter') {
// // // //       navigate("/admin/companies");
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     // Only show loading state if data is actually loading
// // // //     setIsLoading(jobsLoading);
// // // //   }, [jobsLoading]);

// // // //   if (isLoading) {
// // // //     return <LoadingSpinner />;
// // // //   }

// // // //   return (
// // // //     <div>
// // // //       {/* Critical components loaded immediately */}
// // // //       <Navbar />
// // // //       <HeroSection />

// // // //       {/* Non-critical components lazy loaded */}
// // // //       <Suspense fallback={<LoadingSpinner />}>
// // // //         <JobApplicationSteps />
// // // //         <Latestjob />
// // // //         <Compan />
// // // //         <ReviewsSection />
// // // //         <Footer />
// // // //       </Suspense>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Home;
// // // import { Suspense, lazy, useState, useEffect } from 'react';
// // // import { useSelector } from "react-redux";
// // // import { useNavigate } from "react-router-dom";
// // // import useGetAllJobs from "@/hooks/useGetAllJobs";

// // // // Only Navbar and HeroSection are critical - import directly
// // // import Navbar from './shared/Navbar';
// // // import HeroSection from './HeroSection';
// // // import TestimonialsSection from './TestimonialsSection';
// // // import AnimatedResumeBanner from './AnimatedResumeBanner';
// // // import CareerPaths from './PathSection';
// // // import StuPath from './StuPath'


// // // // Lazy load non-critical components
// // // const Latestjob = lazy(() => import('./Latestjob'));
// // // const Compan = lazy(() => import('./Compan'));
// // // const JobApplicationSteps = lazy(() => import('./JobApplicationSteps'));
// // // const ReviewsSection = lazy(() => import('./ReviewsSection'));
// // // const Footer = lazy(() => import('./Footer'));

// // // // Simple loading spinner
// // // const LoadingSpinner = () => (
// // //   <div className="fixed inset-0 bg-white/80 flex items-center justify-center">
// // //     <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
// // //   </div>
// // // );

// // // function Home() {
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const navigate = useNavigate();
// // //   const { user } = useSelector(store => store.auth);

// // //   // Prefetch critical data
// // //   const { isLoading: jobsLoading, data: jobsData } = useGetAllJobs();

// // //   useEffect(() => {
// // //     if (user?.role === 'recruiter') {
// // //       navigate("/admin/companies");
// // //     }
// // //   }, [user?.role, navigate]);

// // //   useEffect(() => {
// // //     // Only show loading state if data is actually loading
// // //     setIsLoading(jobsLoading);
// // //   }, [jobsLoading]);

// // //   if (isLoading) {
// // //     return <LoadingSpinner />;
// // //   }

// // //   return (
// // //     <div>
// // //       {/* Critical components loaded immediately */}
// // //       <Navbar  />
// // //       <HeroSection />
// // //       <AnimatedResumeBanner></AnimatedResumeBanner>
// // //       <TestimonialsSection></TestimonialsSection>

// // //       {/* Non-critical components lazy loaded */}
// // //       {/* <Suspense fallback={<LoadingSpinner />}>
// // //         <JobApplicationSteps />
// // //       </Suspense> */}
// // //          <Suspense fallback={<LoadingSpinner />}>
// // //         <StuPath></StuPath>

// // //       </Suspense>

// // //       {/* Lazy load Latestjob, Compan, ReviewsSection, and Footer after a delay */}
// // //       <Suspense fallback={<LoadingSpinner />}>
// // //         <Latestjob />
// // //       </Suspense>

// // //       <Suspense fallback={<LoadingSpinner />}>
// // //         <Compan />
// // //       </Suspense>

// // //       <Suspense fallback={<LoadingSpinner />}>
// // //        <CareerPaths></CareerPaths>
// // //       </Suspense>

// // //       <Suspense fallback={<LoadingSpinner />}>
// // //         <ReviewsSection />
// // //       </Suspense>
// // //       <AnimatedResumeBanner></AnimatedResumeBanner>
// // //       <Suspense fallback={<LoadingSpinner />}>
// // //         <Footer />
// // //       </Suspense>
// // //     </div>
// // //   );
// // // }

// // // export default Home;
// // import { Suspense, lazy, useState, useEffect, startTransition } from 'react';
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";


// // // Critical components
// // import Navbar from './shared/Navbar';
// // import HeroSection from './HeroSection';

// // // Lazy load non-critical components with route-based chunking
// // const TestimonialsSection = lazy(() => import(
// //   /* webpackChunkName: "testimonials" */
// //   './TestimonialsSection'
// // ));
// // const AnimatedResumeBanner = lazy(() => import(
// //   /* webpackChunkName: "resume-banner" */
// //   './AnimatedResumeBanner'
// // ));
// // const CareerPaths = lazy(() => import(
// //   /* webpackChunkName: "career-paths" */
// //   './PathSection'
// // ));
// // const StuPath = lazy(() => import(
// //   /* webpackChunkName: "student-path" */
// //   './StuPath'
// // ));
// // const Latestjob = lazy(() => import(
// //   /* webpackChunkName: "latest-jobs" */
// //   './Latestjob'
// // ));
// // const Compan = lazy(() => import(
// //   /* webpackChunkName: "companies" */
// //   './Compan'
// // ));
// // const ReviewsSection = lazy(() => import(
// //   /* webpackChunkName: "reviews" */
// //   './ReviewsSection'
// // ));
// // const Footer = lazy(() => import(
// //   /* webpackChunkName: "footer" */
// //   './Footer'
// // ));

// // // Optimized loading spinner with minimal DOM
// // const LoadingSpinner = () => (
// //   <div className="fixed inset-0 bg-white/80 flex items-center justify-center">
// //     <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
// //   </div>
// // );

// // // Custom hook for component visibility
// // const useIntersectionObserver = (ref, options = {}) => {
// //   const [isVisible, setIsVisible] = useState(false);

// //   useEffect(() => {
// //     if (!ref.current) return;

// //     const observer = new IntersectionObserver(([entry]) => {
// //       setIsVisible(entry.isIntersecting);
// //     }, options);

// //     observer.observe(ref.current);
// //     return () => observer.disconnect();
// //   }, [ref, options]);

// //   return isVisible;
// // };

// // function Home() {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const navigate = useNavigate();
// //   const { user } = useSelector(store => store.auth);

// //   // Prefetch critical data with error handling


// //   useEffect(() => {
// //     if (user?.role === 'recruiter') {
// //       startTransition(() => {
// //         navigate("/admin/companies");
// //       });
// //     }
// //   }, [user?.role, navigate]);




// //   // Preload critical assets
// //   useEffect(() => {
// //     const preloadAssets = async () => {
// //       const criticalImages = [
// //         '/path/to/hero-image.jpg',
// //         '/path/to/logo.png'
// //       ];

// //       criticalImages.forEach(src => {
// //         const img = new Image();
// //         img.src = src;
// //       });
// //     };

// //     preloadAssets();
// //   }, []);



// //   return (
// //     <div>
// //       {/* Critical render path components */}
// //       <Navbar />
// //       <HeroSection />

// //       {/* Progressive loading of non-critical components */}
// //       <Suspense fallback={null}>
// //         <AnimatedResumeBanner />
// //       </Suspense>
// //       <Suspense fallback={null}>
// //         <TestimonialsSection />
// //       </Suspense>



// //       <Suspense fallback={null}>
// //         <StuPath />
// //       </Suspense>

// //       {/* Defer loading of below-the-fold components */}
// //       <Suspense fallback={null}>
// //         <Latestjob />
// //       </Suspense>

// //       <Suspense fallback={null}>
// //         <Compan />
// //       </Suspense>

// //       <Suspense fallback={null}>
// //         <CareerPaths />
// //       </Suspense>

// //       <Suspense fallback={null}>
// //         <ReviewsSection />
// //       </Suspense>

// //       <Suspense fallback={null}>
// //         <AnimatedResumeBanner />
// //       </Suspense>

// //       <Suspense fallback={null}>
// //         <Footer />
// //       </Suspense>
// //     </div>
// //   );
// // }

// // export default Home;
// import { Suspense, lazy, useState, useEffect, startTransition } from 'react';
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// // Only import critical components eagerly
// import Navbar from './shared/Navbar';
// import HeroSection from './HeroSection';

// // Lazy load all other components with improved chunking
// const LazyComponents = {
//   TestimonialsSection: lazy(() => import(
//     /* webpackChunkName: "testimonials" */
//     './TestimonialsSection'
//   ).then(module => ({
//     default: module.default,
//     __esModule: true,
//   })).catch(() => ({
//     default: () => null
//   }))),

//   AnimatedResumeBanner: lazy(() => import(
//     /* webpackChunkName: "resume-banner" */
//     './AnimatedResumeBanner'
//   ).then(module => ({
//     default: module.default,
//     __esModule: true,
//   })).catch(() => ({
//     default: () => null
//   }))),

//   CareerPaths: lazy(() => import(
//     /* webpackChunkName: "career-paths" */
//     './PathSection'
//   )),

//   StuPath: lazy(() => import(
//     /* webpackChunkName: "student-path" */
//     './StuPath'
//   )),

//   Latestjob: lazy(() => import(
//     /* webpackChunkName: "latest-jobs" */
//     './Latestjob'
//   )),

//   Compan: lazy(() => import(
//     /* webpackChunkName: "companies" */
//     './Compan'
//   )),

//   MarqueeReviews: lazy(() => import(
//     /* webpackChunkName: "marquee-reviews" */
//     './MarqueeReviews'
//   )),

//   Footer: lazy(() => import(
//     /* webpackChunkName: "footer" */
//     './Footer'
//   ))
// };

// // Optimized loading spinner
// const LoadingSpinner = () => (
//   <div className="fixed inset-0 bg-white/80 flex items-center justify-center">
//     <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
//   </div>
// );

// // Custom hook for intersection observer
// const useIntersectionObserver = (ref, options = {}) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     if (!ref.current) return;

//     const observer = new IntersectionObserver(([entry]) => {
//       setIsVisible(entry.isIntersecting);
//     }, options);

//     observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [ref, options]);

//   return isVisible;
// };

// function Home() {
//   const navigate = useNavigate();
//   const { user } = useSelector(store => store.auth);
//   const [sectionsToLoad, setSectionsToLoad] = useState(['Navbar', 'HeroSection']);

//   // Handle user role navigation
//   useEffect(() => {
//     if (user?.role === 'recruiter') {
//       startTransition(() => {
//         navigate("/admin/companies");
//       });
//     }
//   }, [user?.role, navigate]);

//   // Progressive loading strategy
//   useEffect(() => {
//     // Load critical assets first
//     const preloadCriticalAssets = async () => {
//       const criticalImages = ['/path/to/hero-image.jpg', '/path/to/logo.png'];

//       criticalImages.forEach(src => {
//         const img = new Image();
//         img.src = src;
//       });
//     };

//     preloadCriticalAssets();

//     // Set up intersection observer for lazy loading
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             setSectionsToLoad(prev => [...new Set([...prev, entry.target.dataset.section])]);
//           }
//         });
//       },
//       { rootMargin: '100px' }
//     );

//     // Start observing sections
//     document.querySelectorAll('[data-section]').forEach(section => {
//       observer.observe(section);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div>
//       {/* Critical path components */}
//       <Navbar />
//       <HeroSection />

//       {/* Progressively loaded components */}
//       <div data-section="above-fold">
//         <Suspense fallback={null}>
//           <LazyComponents.AnimatedResumeBanner />
//           <LazyComponents.TestimonialsSection />
//         </Suspense>
//       </div>

//       {/* Below fold components with intersection observer */}
//       <div data-section="below-fold">
//         <Suspense fallback={null}>
//           <LazyComponents.StuPath />
//           <LazyComponents.Latestjob />
//           <LazyComponents.Compan />
//           <LazyComponents.CareerPaths />

//           {/* <LazyComponents.ReviewsSection /> */}
//         </Suspense>
//       </div>

//       {/* Footer loaded last */}
//       <div data-section="footer">
//         <Suspense fallback={null}>
//           <LazyComponents.Footer />
//         </Suspense>
//       </div>
//     </div>
//   );
// }

// export default Home;
import { Suspense, lazy, useState, useEffect, startTransition } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Critical components
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';

// Lazy components
const LazyComponents = {
  TestimonialsSection: lazy(() => import(
    /* webpackChunkName: "testimonials" */
    './TestimonialsSection'
  ).then(module => ({
    default: module.default,
    __esModule: true,
  })).catch(() => ({
    default: () => null
  }))),

  AnimatedResumeBanner: lazy(() => import(
    /* webpackChunkName: "resume-banner" */
    './AnimatedResumeBanner'
  ).then(module => ({
    default: module.default,
    __esModule: true,
  })).catch(() => ({
    default: () => null
  }))),

  CareerPaths: lazy(() => import(
    /* webpackChunkName: "career-paths" */
    './PathSection'
  )),

  StuPath: lazy(() => import(
    /* webpackChunkName: "student-path" */
    './StuPath'
  )),

  Latestjob: lazy(() => import(
    /* webpackChunkName: "latest-jobs" */
    './Latestjob'
  )),

  Compan: lazy(() => import(
    /* webpackChunkName: "companies" */
    './Compan'
  )),

  MarqueeReviews: lazy(() => import(
    /* webpackChunkName: "marquee-reviews" */
    './MarqueeReviews'
  )),

  Footer: lazy(() => import(
    /* webpackChunkName: "footer" */
    './Footer'
  ))
};

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white/80 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

const useIntersectionObserver = (ref, options = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
};

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const [sectionsToLoad, setSectionsToLoad] = useState(['Navbar', 'HeroSection']);

  // useEffect(() => {
  //   if (user?.role === 'recruiter') {
  //     startTransition(() => {
  //       navigate("/admin/companies");
  //     });
  //   }
  // }, [user?.role, navigate]);

  useEffect(() => {
    const preloadCriticalAssets = async () => {
      const criticalImages = ['/path/to/hero-image.jpg', '/path/to/logo.png'];
      criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadCriticalAssets();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setSectionsToLoad(prev => [...new Set([...prev, entry.target.dataset.section])]);
          }
        });
      },
      { rootMargin: '100px' }
    );

    document.querySelectorAll('[data-section]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />

      <div data-section="above-fold">
        <Suspense fallback={null}>
          <LazyComponents.AnimatedResumeBanner />
          <LazyComponents.TestimonialsSection />
        </Suspense>
      </div>

      <div data-section="below-fold">
        <Suspense fallback={null}>
          <LazyComponents.StuPath />
          <LazyComponents.Latestjob />
          <LazyComponents.Compan />
          <LazyComponents.CareerPaths />
          <LazyComponents.MarqueeReviews />
          <LazyComponents.AnimatedResumeBanner />
        </Suspense>
      </div>

      <div data-section="footer">
        <Suspense fallback={null}>

          <LazyComponents.Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;