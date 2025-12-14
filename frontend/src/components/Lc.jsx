
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   Briefcase,
//   MapPin,
//   DollarSign,
//   BookmarkIcon,
//   LogIn,
//   Building2,
// } from "lucide-react";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import axios from "axios";

// function Lc({ job }) {
//   const navigate = useNavigate();
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const user = useSelector((state) => state.auth?.user);
//   const isAuthenticated = !!user;
//   const [isSaved, setIsSaved] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const checkSavedStatus = async () => {
//       if (!isAuthenticated) return;

//       try {
//         const response = await axios.get(
//           `http://3.232.10.54/api/savedjobs/check/${job.jobId}`,
//           { withCredentials: true }
//         );
//         setIsSaved(response.data.isSaved);
//       } catch (error) {
//         console.error('Error checking saved status:', error);
//       }
//     };

//     checkSavedStatus();
//   }, [job.jobId, isAuthenticated]);

//   const daysAgoFunction = (mongodbTime) => {
//     const today = new Date();
//     const jobDate = new Date(mongodbTime);
//     today.setHours(0, 0, 0, 0);
//     jobDate.setHours(0, 0, 0, 0);
//     const diffTime = today - jobDate;
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   const handleSaveJob = async () => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       return;
//     }

//     try {
//       setIsLoading(true);

//       if (!isSaved) {
//         await axios.post(
//           'http://3.232.10.54/api/savedjobs/save',
//           { jobId: job.jobId },
//           { withCredentials: true }
//         );
//         setIsSaved(true);
//       } else {
//         await axios.delete(
//           `http://3.232.10.54/api/savedjobs/unsave/${job.jobId}`,
//           { withCredentials: true }
//         );
//         setIsSaved(false);
//       }
//     } catch (error) {
//       console.error('Error saving/unsaving job:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleViewDescription = () => {
//     navigate(`/description/${job?.jobId}`);
//   };

//   return (
//     <>
//       <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-6 transition duration-300 hover:shadow-lg hover:border-blue-100 relative group">
//         <button
//           onClick={handleSaveJob}
//           disabled={isLoading}
//           className={`absolute top-4 right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 ${
//             isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
//           }`}
//         >
//           <BookmarkIcon
//             className={`w-5 h-5 md:w-6 md:h-6 ${
//               isSaved
//                 ? 'text-blue-600 fill-current'
//                 : 'text-gray-400 hover:text-blue-600'
//             }`}
//           />
//         </button>

//         <div className="flex items-center mb-4 space-x-3 md:space-x-4">
//           <div className="h-12 w-12 md:h-16 md:w-16 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center p-2 border border-gray-100">
//             {job?.company?.logo ? (
//               <img
//                 src={job?.company?.logo}
//                 alt={`${job?.company?.name || "Company"} logo`}
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <Building2 className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
//             )}
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
//               <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate">
//                 {job?.company?.name || "Company Name"}
//               </h2>
//               {job?.createdAt && (
//                 <span className="text-gray-500 text-xs md:text-sm whitespace-nowrap">
//                   {daysAgoFunction(job.createdAt) <= 0
//                     ? "Today"
//                     : `${daysAgoFunction(job.createdAt)} days ago`}
//                 </span>
//               )}
//             </div>
//             <p className="text-gray-500 text-xs md:text-sm line-clamp-2">
//               {job?.company?.description || "Software Company"}
//             </p>
//           </div>
//         </div>

//         <div className="mb-4">
//           <h1 className="text-base md:text-lg font-semibold text-gray-700">
//             {job?.title || "Job Title"}
//           </h1>
//           <p className="text-gray-500 text-xs md:text-sm mt-1 line-clamp-2">
//             {job?.description || "Job description details..."}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
//           <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
//             <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
//             <span className="text-xs text-gray-600">
//               {job?.location || "Remote"}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
//             <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
//             <span className="text-xs text-gray-600">
//               {job?.salary ? `${job.salary}` : "Salary not specified"}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
//             <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
//             <span className="text-xs text-gray-600">
//               {job?.jobType || "Full-time"}
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//           <Button
//             variant="outline"
//             className="w-full sm:w-auto rounded-full text-sm"
//             onClick={handleViewDescription}
//           >
//             Description
//           </Button>
//           <Button
//             onClick={handleSaveJob}
//             disabled={isLoading}
//             className={`w-full sm:w-auto rounded-full text-sm ${
//               isSaved
//                 ? 'bg-gray-100 text-blue-600 hover:bg-gray-200'
//                 : 'bg-blue-600 hover:bg-blue-700 text-white'
//             }`}
//           >
//             {isLoading ? 'Saving...' : isSaved ? 'Saved' : 'Save for later'}
//           </Button>
//         </div>
//       </div>

//       {!isAuthenticated && (
//         <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
//           <DialogContent className="sm:max-w-md">
//             <DialogHeader>
//               <DialogTitle>Sign in Required</DialogTitle>
//               <DialogDescription>
//                 Please sign in to view job details and save jobs to your profile.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="flex flex-col gap-4 py-4">
//               <p className="text-sm text-gray-500">
//                 Create an account or sign in to access all features and apply to
//                 jobs.
//               </p>
//               <div className="flex flex-col sm:flex-row justify-end gap-3">
//                 <Button
//                   variant="outline"
//                   className="w-full sm:w-auto"
//                   onClick={() => setShowAuthModal(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
//                   onClick={() => {
//                     setShowAuthModal(false);
//                     navigate("/signup/candidate");
//                   }}
//                 >
//                   <LogIn className="w-4 h-4 mr-2" />
//                   Sign Up
//                 </Button>
//               </div>
//             </div>
//             <div className="text-right mr-2">
//               <a
//                 className="text-xs cursor-pointer hover:text-blue-700 hover:underline"
//                 onClick={() => navigate('/login')}
//               >
//                 Already Registered?
//               </a>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}
//     </>
//   );
// }

// export default Lc;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BookmarkIcon,
  LogIn,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

function Lc({ job }) {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = !!user;
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await axios.get(
          `http://3.232.10.54/api/savedjobs/check/${job.jobId}`,
          { withCredentials: true }
        );
        setIsSaved(response.data.isSaved);
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };

    checkSavedStatus();
  }, [job.jobId, isAuthenticated]);

  const handleSaveJob = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      setIsLoading(true);

      if (!isSaved) {
        await axios.post(
          'http://3.232.10.54/api/savedjobs/save',
          { jobId: job.jobId },
          { withCredentials: true }
        );
        setIsSaved(true);
      } else {
        await axios.delete(
          `http://3.232.10.54/api/savedjobs/unsave/${job.jobId}`,
          { withCredentials: true }
        );
        setIsSaved(false);
      }
    } catch (error) {
      console.error('Error saving/unsaving job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDescription = () => {
    navigate(`/description/${job?.jobId}`);
  };

  return (
    <>
      <div
        className="bg-white rounded-xl  border-gray-300 border-2 p-4 sm:p-6 shadow-sm hover:shadow-2xl transition-shadow cursor-pointer"
        onClick={handleViewDescription}
      >
        {/* Top section: Logo, Title, Bookmark */}
        <div className="flex justify-between items-start mb-4 sm:mb-5">
          <div className="flex items-start gap-2 sm:gap-4">
            {/* Company Logo */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
              {job?.company?.logo ? (
                <img
                  src={job?.company?.logo}
                  alt={`${job?.company?.name || "Company"} logo`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              )}
            </div>

            {/* Company & Title */}
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm sm:text-base mb-0.5 sm:mb-1">{job?.company?.CompanyName || "Company Name"}</span>
              <h3 className="text-gray-800 text-lg sm:text-xl font-medium">{job?.title || "Job Title"}</h3>
              {/* Location */}
              <div className="flex items-center mt-1 sm:mt-2 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 mr-1">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs sm:text-sm">{job?.location || "Seattle"}</span>
              </div>
            </div>
          </div>

          {/* Bookmark Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSaveJob();
            }}
            disabled={isLoading}
            className={`text-blue-600 ${isLoading ? 'opacity-50' : ''}`}
            aria-label={isSaved ? "Remove bookmark" : "Bookmark job"}
          >
            <BookmarkIcon
              className={`w-5 h-5 sm:w-6 sm:h-6 ${isSaved ? 'text-blue-600 fill-blue-600' : 'text-blue-600'}`}
            />
          </button>
        </div>

        {/* Divider */}
        <hr className="my-3 sm:my-5 border-gray-200" />

        {/* Job Details Tags - Responsive */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-5">
          <span className="bg-blue-50 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">{job?.experience}</span>
          <span className="bg-blue-50 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">{job?.jobType}</span>
          <span className="bg-blue-50 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">{job?.salary}</span>
        </div>

        {/* Job Description - Responsive */}
        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
          {job?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
        </p>
      </div>

      {/* Auth Modal - Keep unchanged but make sure it's mobile friendly */}
      {!isAuthenticated && (
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="w-[90%] max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle>Sign in Required</DialogTitle>
              <DialogDescription>
                Please sign in to view job details and save jobs to your profile.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <p className="text-sm text-gray-500">
                Create an account or sign in to access all features and apply to
                jobs.
              </p>
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setShowAuthModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate("/signup/candidate");
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="text-right mr-2">
              <a
                className="text-xs cursor-pointer hover:text-blue-700 hover:underline"
                onClick={() => navigate('/login')}
              >
                Already Registered?
              </a>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Lc;