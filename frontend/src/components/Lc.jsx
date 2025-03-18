// // import React, { useEffect, useState } from "react";
// // import {
// //   Briefcase,
// //   MapPin,
// //   DollarSign,
// //   BookmarkIcon,
// //   ClockIcon,
// // } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import { Avatar } from "@radix-ui/react-avatar";
// // import { AvatarImage } from "./ui/avatar";
// // import axios from "axios"; // Make sure axios is imported

// // function Lc({ job }) {
// //   const navigate = useNavigate();
// //   const { company } = useSelector((store) => store.company);
// //   const [isSaved, setIsSaved] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     const checkSavedStatus = async () => {
// //       try {
// //         const response = await axios.get(
// //           `http://3.232.10.54bs/check/${job.jobId}`,
// //           { withCredentials: true }
// //         );
// //         setIsSaved(response.data.isSaved);
// //       } catch (error) {
// //         console.error('Error checking saved status:', error);
// //       }
// //     };

// //     checkSavedStatus();
// //   }, [job.jobId]);

// //   const daysAgoFunction = (mongodbTime) => {
// //     const today = new Date();
// //     const jobDate = new Date(mongodbTime);

// //     // Normalize both dates to midnight to ignore the time part
// //     today.setHours(0, 0, 0, 0);
// //     jobDate.setHours(0, 0, 0, 0);

// //     const diffTime = today - jobDate;
// //     const diffDays = diffTime / (1000 * 60 * 60 * 24);

// //     return Math.floor(diffDays);
// //   };

// //   const daysAgo = job?.createdAt ? daysAgoFunction(job.createdAt) : null;

// //   const handleSaveJob = async () => {
// //     try {
// //       setIsLoading(true);

// //       if (!isSaved) {
// //         // Save the job
// //         await axios.post('http://3.232.10.54bs/save', { jobId: job.jobId }, { withCredentials: true });
// //         setIsSaved(true);
// //       } else {
// //         // Unsave the job
// //         await axios.delete(`/api/jobs/saved/${job.jobId}`);
// //         setIsSaved(false);
// //       }
// //     } catch (error) {
// //       console.error('Error saving/unsaving job:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div
// //       className="bg-white border border-gray-100 rounded-xl p-6
// //       transition duration-300 hover:shadow-lg hover:border-blue-100
// //       relative group"
// //     >
// //       {/* Bookmark Icon */}
// //       <button
// //         onClick={handleSaveJob}
// //         disabled={isLoading}
// //         className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100
// //         transition duration-300 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
// //       >
// //         <BookmarkIcon
// //           className={`w-6 h-6 ${
// //             isSaved
// //               ? 'text-blue-600 fill-current'
// //               : 'text-gray-400 hover:text-blue-600'
// //           }`}
// //         />
// //       </button>

// //       {/* Company Logo Placeholder */}
// //       <div className="flex items-center mb-4 space-x-4">
// //         <div className="bg-blue-50 p-3 rounded-full">
// //           <Avatar className="">
// //             <AvatarImage
// //               className="w-7"
// //               src={job?.company?.logo}
// //               alt={company?.name}
// //             />
// //           </Avatar>
// //         </div>
// //         <div className="flex-1">
// //           <div className="flex justify-between items-center">
// //             <h2 className="text-xl font-bold text-gray-800">
// //               {job?.company?.name || "Company Name"}
// //             </h2>
// //             <div className="">
// //               {daysAgo !== null && (
// //                 <div className="flex items-center space-x-1 text-gray-500 text-xs">
// //                   <span className="justify-center">
// //                     {daysAgo <= 0 ? "Today" : `${daysAgo} days ago`}
// //                   </span>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //           <p className="text-gray-500 text-sm">
// //             {job?.company?.description || "Software Company"}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Job Title */}
// //       <div className="mb-4">
// //         <h1 className="text-lg font-semibold text-gray-700">
// //           {job?.title || "Job Title"}
// //         </h1>
// //         <p className="text-gray-500 text-sm mt-1 line-clamp-2">
// //           {job?.description || "Job description details..."}
// //         </p>
// //       </div>

// //       {/* Job Details */}
// //       <div className="grid grid-cols-3 gap-2 mb-4">
// //         <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
// //           <MapPin className="w-5 h-5 text-blue-500" />
// //           <span className="text-xs text-gray-600">
// //             {job?.location || "Remote"}
// //           </span>
// //         </div>
// //         <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
// //           <DollarSign className="w-5 h-5 text-green-500" />
// //           <span className="text-xs text-gray-600">
// //             {job?.salary || "80-100"}K
// //           </span>
// //         </div>
// //         <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
// //           <Briefcase className="w-5 h-5 text-purple-500" />
// //           <span className="text-xs text-gray-600">
// //             {job?.jobType || "Full-time"}
// //           </span>
// //         </div>
// //       </div>

// //       {/* Actions */}
// //       <div className="mt-3">
// //         <button
// //           className="bg-white text-black border border-black-1px px-4 py-2 rounded-full mr-3
// //           text-sm hover:bg-gray-50 transition"
// //           onClick={() => navigate(`/description/${job?.jobId}`)}
// //         >
// //           Description
// //         </button>

// //         <button
// //           onClick={handleSaveJob}
// //           disabled={isLoading}
// //           className={`px-4 py-2 rounded-full text-sm transition
// //             ${isSaved
// //               ? 'bg-gray-100 text-blue-600 hover:bg-gray-200'
// //               : 'bg-blue-600 text-white hover:bg-blue-700'
// //             } ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
// //         >
// //           {isLoading
// //             ? 'Saving...'
// //             : isSaved
// //               ? 'Saved'
// //               : 'Save for later'}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Lc;






// // import React, { useState } from "react";
// // import {
// //   Briefcase,
// //   MapPin,
// //   DollarSign,
// //   BookmarkIcon,
// //   LogIn,
// // } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import { Avatar, AvatarImage } from "@/components/ui/avatar";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";

// // function Lc({ job }) {
// //   const navigate = useNavigate();
// //   const [showAuthModal, setShowAuthModal] = useState(false);


// //   const daysAgoFunction = (mongodbTime) => {
// //     const today = new Date();
// //     const jobDate = new Date(mongodbTime);
// //     today.setHours(0, 0, 0, 0);
// //     jobDate.setHours(0, 0, 0, 0);
// //     const diffTime = today - jobDate;
// //     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
// //     return diffDays;
// //   };

// //   const handleAction = (action) => {
// //     setShowAuthModal(true);
// //   };

// //   // Function to render formatted text with line clamping
// //   const renderFormattedText = (text, maxLines = null) => {
// //     if (!text) return "Not specified";
// //     return (
// //       <div
// //         style={{
// //           whiteSpace: "pre-wrap",
// //           ...(maxLines && {
// //             display: "-webkit-box",
// //             WebkitLineClamp: maxLines,
// //             WebkitBoxOrient: "vertical",
// //             overflow: "hidden",
// //           }),
// //         }}
// //         className="text-gray-500 text-sm"
// //       >
// //         {text}
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <div className="bg-white border border-gray-100 rounded-xl p-6 transition duration-300 hover:shadow-lg hover:border-blue-100 relative group">
// //         <button
// //           onClick={() => handleAction("save")}
// //           className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300"
// //         >
// //           <BookmarkIcon className="w-6 h-6 text-gray-400 hover:text-blue-600" />
// //         </button>

// //         <div className="flex items-center mb-4 space-x-4">
// //           <div className="bg-blue-50 p-3 rounded-full">
// //             <Avatar>
// //               <AvatarImage
// //                 src={job?.company?.logo || "/api/placeholder/150/150"}
// //                 alt={`${job?.company?.CompanyName || "Company"} logo`}
// //                 className="w-10 h-10 object-cover"
// //               />
// //             </Avatar>
// //           </div>
// //           <div className="flex-1">
// //             <div className="flex justify-between items-center">
// //               <h2 className="text-xl font-bold text-gray-800">
// //                 {job?.company?.CompanyName || "Not specified"}
// //               </h2>
// //               {job?.createdAt && (
// //                 <span className="text-gray-500 text-sm">
// //                   {daysAgoFunction(job.createdAt) <= 0
// //                     ? "Today"
// //                     : `${daysAgoFunction(job.createdAt)} days ago`}
// //                 </span>
// //               )}
// //             </div>
// //             {renderFormattedText(
// //               job?.company?.description || "Company description not specified",
// //               2
// //             )}
// //           </div>
// //         </div>

// //         <div className="mb-4">
// //           <h1 className="text-lg font-semibold text-gray-700">
// //             {job?.title || "Position not specified"}
// //           </h1>
// //           {renderFormattedText(
// //             job?.description || "Description not specified",
// //             2
// //           )}
// //         </div>

// //         <div className="grid grid-cols-3 gap-2 mb-4">
// //           <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
// //             <MapPin className="w-5 h-5 text-blue-500" />
// //             <span className="text-xs text-gray-600">
// //               {job?.location || "Location not specified"}
// //             </span>
// //           </div>
// //           <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
// //             <DollarSign className="w-5 h-5 text-green-500" />
// //             <span className="text-xs text-gray-600">
// //               {job?.salary ? `${job.salary}K` : "Salary not specified"}
// //             </span>
// //           </div>
// //           <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
// //             <Briefcase className="w-5 h-5 text-purple-500" />
// //             <span className="text-xs text-gray-600">
// //               {job?.jobType || "Job type not specified"}
// //             </span>
// //           </div>
// //         </div>

// //         <div className="mt-3 flex gap-3">
// //           <Button
// //             variant="outline"
// //             className="rounded-full"
// //             onClick={() => handleAction("description")}
// //           >
// //             View Description
// //           </Button>
// //           <Button
// //             className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
// //             onClick={() => handleAction("save")}
// //           >
// //             Save for later
// //           </Button>
// //         </div>
// //       </div>

// //       <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
// //         <DialogContent className="sm:max-w-md">
// //           <DialogHeader>
// //             <DialogTitle>Sign in Required</DialogTitle>
// //             <DialogDescription>
// //               Please sign in to view job details and save jobs to your profile.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <div className="flex flex-col gap-4 py-4">
// //             <p className="text-sm text-gray-500">
// //               Create an account or sign in to access all features and apply to
// //               jobs.
// //             </p>
// //             <div className="flex justify-end gap-3">
// //               <Button variant="outline" onClick={() => setShowAuthModal(false)}>
// //                 Cancel
// //               </Button>
// //               <Button
// //                 className="bg-blue-600 hover:bg-blue-700 text-white"
// //                 onClick={() => {
// //                   setShowAuthModal(false);
// //                   navigate("/signup/candidate");
// //                 }}
// //               >
// //                 <LogIn className="w-4 h-4 mr-2" />
// //                 Sign Up
// //               </Button>
// //             </div>
// //           </div>
// //           <a className="cursor-pointer hover:text-blue-700 hover:underline text-right mr-2" onClick={()=>navigate('/login')}>
// //             <div className="text-xs">Already Registered ?</div>
// //           </a>
// //         </DialogContent>
// //       </Dialog>
// //     </>
// //   );
// // }

// // export default Lc;
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
//           `http://3.232.10.54bs/check/${job.jobId}`,
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
//           'http://3.232.10.54bs/save',
//           { jobId: job.jobId },
//           { withCredentials: true }
//         );
//         setIsSaved(true);
//       } else {
//         await axios.delete(
//           `/api/jobs/saved/${job.jobId}`,
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
//     // if (!isAuthenticated) {
//     //   setShowAuthModal(true);
//     //   return;
//     // }
//     navigate(`/description/${job?.jobId}`);
//   };

//   return (
//     <>
//       <div className="bg-white border border-gray-100 rounded-xl p-6 transition duration-300 hover:shadow-lg hover:border-blue-100 relative group">
//         <button
//           onClick={handleSaveJob}
//           disabled={isLoading}
//           className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 ${
//             isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
//           }`}
//         >
//           <BookmarkIcon
//             className={`w-6 h-6 ${
//               isSaved
//                 ? 'text-blue-600 fill-current'
//                 : 'text-gray-400 hover:text-blue-600'
//             }`}
//           />
//         </button>

//         <div className="flex items-center mb-4 space-x-4">
//         <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center p-2 border border-gray-100">
//               {job?.company?.logo  ? (
//                 <img
//                   src={job?.company?.logo }
//                   alt={`${job?.company?.name || "Company"} logo`}
//                   className="w-full h-full object-contain"
//                 />
//               ) : (
//                 <Building2 className="w-8 h-8 text-gray-400" />
//               )}
//             </div>
//          <div className="flex-1">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {job?.company?.name || "Company Name"}
//               </h2>
//               {job?.createdAt && (
//                 <span className="text-gray-500 text-sm">
//                   {daysAgoFunction(job.createdAt) <= 0
//                     ? "Today"
//                     : `${daysAgoFunction(job.createdAt)} days ago`}
//                 </span>
//               )}
//             </div>
//             <p className="text-gray-500 text-sm line-clamp-2">
//               {job?.company?.description || "Software Company"}
//             </p>
//           </div>
//         </div>

//         <div className="mb-4">
//           <h1 className="text-lg font-semibold text-gray-700">
//             {job?.title || "Job Title"}
//           </h1>
//           <p className="text-gray-500 text-sm mt-1 line-clamp-2">
//             {job?.description || "Job description details..."}
//           </p>
//         </div>

//         <div className="grid grid-cols-3 gap-2 mb-4">
//           <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
//             <MapPin className="w-5 h-5 text-blue-500" />
//             <span className="text-xs text-gray-600">
//               {job?.location || "Remote"}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
//             <DollarSign className="w-5 h-5 text-green-500" />
//             <span className="text-xs text-gray-600">
//               {job?.salary ? `${job.salary}K` : "Salary not specified"}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
//             <Briefcase className="w-5 h-5 text-purple-500" />
//             <span className="text-xs text-gray-600">
//               {job?.jobType || "Full-time"}
//             </span>
//           </div>
//         </div>

//         <div className="mt-3">
//           <Button
//             variant="outline"
//             className="rounded-full mr-3"
//             onClick={handleViewDescription}
//           >
//             Description
//           </Button>
//           <Button
//             onClick={handleSaveJob}
//             disabled={isLoading}
//             className={`rounded-full ${
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
//               <div className="flex justify-end gap-3">
//                 <Button variant="outline" onClick={() => setShowAuthModal(false)}>
//                   Cancel
//                 </Button>
//                 <Button
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
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
//             <a
//               className="cursor-pointer hover:text-blue-700 hover:underline text-right mr-2"
//               onClick={() => navigate('/login')}
//             >
//               <div className="text-xs">Already Registered?</div>
//             </a>
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
  Briefcase,
  MapPin,
  DollarSign,
  BookmarkIcon,
  LogIn,
  Building2,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

  const daysAgoFunction = (mongodbTime) => {
    const today = new Date();
    const jobDate = new Date(mongodbTime);
    today.setHours(0, 0, 0, 0);
    jobDate.setHours(0, 0, 0, 0);
    const diffTime = today - jobDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
      <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-6 transition duration-300 hover:shadow-lg hover:border-blue-100 relative group">
        <button
          onClick={handleSaveJob}
          disabled={isLoading}
          className={`absolute top-4 right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 ${
            isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <BookmarkIcon
            className={`w-5 h-5 md:w-6 md:h-6 ${
              isSaved
                ? 'text-blue-600 fill-current'
                : 'text-gray-400 hover:text-blue-600'
            }`}
          />
        </button>

        <div className="flex items-center mb-4 space-x-3 md:space-x-4">
          <div className="h-12 w-12 md:h-16 md:w-16 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center p-2 border border-gray-100">
            {job?.company?.logo ? (
              <img
                src={job?.company?.logo}
                alt={`${job?.company?.name || "Company"} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <Building2 className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate">
                {job?.company?.name || "Company Name"}
              </h2>
              {job?.createdAt && (
                <span className="text-gray-500 text-xs md:text-sm whitespace-nowrap">
                  {daysAgoFunction(job.createdAt) <= 0
                    ? "Today"
                    : `${daysAgoFunction(job.createdAt)} days ago`}
                </span>
              )}
            </div>
            <p className="text-gray-500 text-xs md:text-sm line-clamp-2">
              {job?.company?.description || "Software Company"}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-base md:text-lg font-semibold text-gray-700">
            {job?.title || "Job Title"}
          </h1>
          <p className="text-gray-500 text-xs md:text-sm mt-1 line-clamp-2">
            {job?.description || "Job description details..."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            <span className="text-xs text-gray-600">
              {job?.location || "Remote"}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
            <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
            <span className="text-xs text-gray-600">
              {job?.salary ? `${job.salary}` : "Salary not specified"}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
            <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
            <span className="text-xs text-gray-600">
              {job?.jobType || "Full-time"}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="w-full sm:w-auto rounded-full text-sm"
            onClick={handleViewDescription}
          >
            Description
          </Button>
          <Button
            onClick={handleSaveJob}
            disabled={isLoading}
            className={`w-full sm:w-auto rounded-full text-sm ${
              isSaved
                ? 'bg-gray-100 text-blue-600 hover:bg-gray-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? 'Saving...' : isSaved ? 'Saved' : 'Save for later'}
          </Button>
        </div>
      </div>

      {!isAuthenticated && (
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="sm:max-w-md">
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