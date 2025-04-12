// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import {
// //   Building2,
// //   MapPin,
// //   Globe,
// //   Users,
// //   Clock,
// //   Briefcase,
// //   DollarSign,
// // } from "lucide-react";
// // import Navbar from "./shared/Navbar";
// // import useGetCompanyById from "@/hooks/useGetCompanyById";

// // const CompanyJobs = () => {
// //   const { companyId } = useParams();
// //   const [jobs, setJobs] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const { error } = useGetCompanyById(companyId);
// //   const company = useSelector((state) => state.company.singleCompany);
// //   const nav = useNavigate();

// //   useEffect(() => {
// //     fetchCompanyJobs();
// //   }, [companyId]);

// //   const fetchCompanyJobs = async () => {
// //     try {
// //       const response = await fetch(
// //         `http://3.232.10.54/api/v1/job/getCompanyJobs/${companyId}`
// //       );
// //       const data = await response.json();
// //       if (data.success) {
// //         setJobs(data.data);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching jobs:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const JobCard = ({ job }) => (
// //     <div className="bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 p-6">
// //       <div className="flex justify-between items-start mb-4">
// //         <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
// //         <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
// //           {job.jobType || "Not specified"}
// //         </span>
// //       </div>

// //       <div className="grid grid-cols-2 gap-4 mb-4">
// //         <div className="flex items-center text-gray-600">
// //           <DollarSign className="w-4 h-4 mr-2" />
// //           <span>{job.salary || "Not specified"}</span>
// //         </div>
// //         <div className="flex items-center text-gray-600">
// //           <MapPin className="w-4 h-4 mr-2" />
// //           <span>{job.location || "Not specified"}</span>
// //         </div>
// //         <div className="flex items-center text-gray-600">
// //           <Briefcase className="w-4 h-4 mr-2" />
// //           <span>{job.experience || "Not specified"}</span>
// //         </div>
// //         <div className="flex items-center text-gray-600">
// //           <Clock className="w-4 h-4 mr-2" />
// //           <span>
// //             {job.createdAt
// //               ? new Date(job.createdAt).toLocaleDateString()
// //               : "Not specified"}
// //           </span>
// //         </div>
// //       </div>

// //       <p className="text-gray-600 mb-6 line-clamp-2">
// //         {job.description || "No description available"}
// //       </p>

// //       <button
// //         onClick={() =>nav(`/description/${job.jobId}`)}
// //         className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium
// //                  hover:bg-blue-700 transition-all duration-300
// //                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
// //                  active:transform active:scale-95"
// //       >
// //         View Details
// //       </button>
// //     </div>
// //   );
// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
// //         <div className="text-red-600">Error loading company data</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="min-h-screen bg-gray-50/50">
// //         <div className="max-w-7xl mx-auto px-4 py-12">
// //           {company && (
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 p-8">
// //               <div className="flex items-center space-x-6 mb-6">
// //                 <div className="h-24 w-24 rounded-xl bg-gray-50 flex items-center justify-center p-2">
// //                   {company.logo ? (
// //                     <img
// //                       src={company.logo}
// //                       alt={`${company.CompanyName} logo`}
// //                       className="w-full h-full object-contain"
// //                     />
// //                   ) : (
// //                     <Building2 className="w-12 h-12 text-gray-400" />
// //                   )}
// //                 </div>
// //                 <div>
// //                   <h1 className="text-3xl font-bold text-gray-900 mb-2">
// //                     {company.CompanyName}
// //                   </h1>
// //                   <div className="flex items-center space-x-4">
// //                     <div className="flex items-center text-gray-600">
// //                       <MapPin className="w-4 h-4 mr-1" />
// //                       <span>{company.location}</span>
// //                     </div>
// //                     {company.website && (
// //                       <div className="flex items-center text-gray-600">
// //                         <Globe className="w-4 h-4 mr-1" />
// //                         <a
// //                           href={company.website}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="text-blue-600 hover:underline"
// //                         >
// //                           {company.website.replace(/(^\w+:|^)\/\//, "")}
// //                         </a>
// //                       </div>
// //                     )}
// //                     <div className="flex items-center text-gray-600">
// //                       <Users className="w-4 h-4 mr-1" />
// //                       <span>{company.size || "Not specified"}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <p className="text-gray-600 mb-6">{company.description}</p>
// //             </div>
// //           )}

// //           <div className="mb-6">
// //             <h2 className="text-2xl font-bold text-gray-900">
// //               Open Positions ({jobs.length})
// //             </h2>
// //           </div>

// //           {jobs.length > 0 ? (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {jobs.map((job) => (
// //                 <JobCard key={job.jobId} job={job} />
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
// //               <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //               <h3 className="text-gray-900 font-medium mb-2">
// //                 No open positions
// //               </h3>
// //               <p className="text-gray-600">
// //                 This company currently has no job listings
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CompanyJobs;
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   Building2,
//   MapPin,
//   Globe,
//   Users,
//   Clock,
//   Briefcase,
//   DollarSign,
//   LogIn,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import Navbar from "./shared/Navbar";
// import useGetCompanyById from "@/hooks/useGetCompanyById";

// const CompanyJobs = () => {
//   const { companyId } = useParams();
//   const [jobs, setJobs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const { error } = useGetCompanyById(companyId);
//   const company = useSelector((state) => state.company.singleCompany);
//   const user = useSelector((state) => state.auth?.user);
//   const isAuthenticated = !!user;
//   const nav = useNavigate();

//   useEffect(() => {
//     fetchCompanyJobs();
//   }, [companyId]);

//   const fetchCompanyJobs = async () => {
//     try {
//       const response = await fetch(
//         `http://3.232.10.54/api/v1/job/getCompanyJobs/${companyId}`
//       );
//       const data = await response.json();
//       if (data.success) {
//         setJobs(data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleViewDetails = (jobId) => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       return;
//     }
//     nav(`/description/${jobId}`);
//   };

//   const JobCard = ({ job }) => (
//     <div className="bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 p-6">
//       <div className="flex justify-between items-start mb-4">
//         <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
//         <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
//           {job.jobType || "Not specified"}
//         </span>
//       </div>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div className="flex items-center text-gray-600">
//           <DollarSign className="w-4 h-4 mr-2" />
//           <span>{job.salary || "Not specified"}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <MapPin className="w-4 h-4 mr-2" />
//           <span>{job.location || "Not specified"}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <Briefcase className="w-4 h-4 mr-2" />
//           <span>{job.experience || "Not specified"}</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <Clock className="w-4 h-4 mr-2" />
//           <span>
//             {job.createdAt
//               ? new Date(job.createdAt).toLocaleDateString()
//               : "Not specified"}
//           </span>
//         </div>
//       </div>

//       <p className="text-gray-600 mb-6 line-clamp-2">
//         {job.description || "No description available"}
//       </p>

//       <button
//         onClick={() => handleViewDetails(job.jobId)}
//         className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium
//                  hover:bg-blue-700 transition-all duration-300
//                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                  active:transform active:scale-95"
//       >
//         View Details
//       </button>
//     </div>
//   );

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
//         <div className="text-red-600">Error loading company data</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50/50">
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           {company && (
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 p-8">
//               {/* Company header section remains the same */}
//               <div className="flex items-center space-x-6 mb-6">
//                 <div className="h-24 w-24 rounded-xl bg-gray-50 flex items-center justify-center p-2">
//                   {company.logo ? (
//                     <img
//                       src={company.logo}
//                       alt={`${company.CompanyName} logo`}
//                       className="w-full h-full object-contain"
//                     />
//                   ) : (
//                     <Building2 className="w-12 h-12 text-gray-400" />
//                   )}
//                 </div>
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                     {company.CompanyName}
//                   </h1>
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center text-gray-600">
//                       <MapPin className="w-4 h-4 mr-1" />
//                       <span>{company.location}</span>
//                     </div>
//                     {company.website && (
//                       <div className="flex items-center text-gray-600">
//                         <Globe className="w-4 h-4 mr-1" />
//                         <a
//                           href={company.website}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline"
//                         >
//                           {company.website.replace(/(^\w+:|^)\/\//, "")}
//                         </a>
//                       </div>
//                     )}
//                     <div className="flex items-center text-gray-600">
//                       <Users className="w-4 h-4 mr-1" />
//                       <span>{company.size || "Not specified"}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-gray-600 mb-6">{company.description}</p>
//             </div>
//           )}

//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">
//               Open Positions ({jobs.length})
//             </h2>
//           </div>

//           {jobs.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {jobs.map((job) => (
//                 <JobCard key={job.jobId} job={job} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
//               <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-gray-900 font-medium mb-2">
//                 No open positions
//               </h3>
//               <p className="text-gray-600">
//                 This company currently has no job listings
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Sign in Required</DialogTitle>
//             <DialogDescription>
//               Please sign in to view job details and save jobs to your profile.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex flex-col gap-4 py-4">
//             <p className="text-sm text-gray-500">
//               Create an account or sign in to access all features and apply to
//               jobs.
//             </p>
//             <div className="flex justify-end gap-3">
//               <Button variant="outline" onClick={() => setShowAuthModal(false)}>
//                 Cancel
//               </Button>
//               <Button
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//                 onClick={() => {
//                   setShowAuthModal(false);
//                   nav("/signup/candidate");
//                 }}
//               >
//                 <LogIn className="w-4 h-4 mr-2" />
//                 Sign Up
//               </Button>
//             </div>
//           </div>
//           <a
//             className="cursor-pointer hover:text-blue-700 hover:underline text-right mr-2"
//             onClick={() => nav('/login')}
//           >
//             <div className="text-xs">Already Registered?</div>
//           </a>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CompanyJobs;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Clock,
  Briefcase,
  DollarSign,
  LogIn,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Navbar from "./shared/Navbar";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanyJobs = () => {
  const { companyId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { error } = useGetCompanyById(companyId);
  const company = useSelector((state) => state.company.singleCompany);
  const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = !!user;
  const nav = useNavigate();

  useEffect(() => {
    fetchCompanyJobs();
  }, [companyId]);

  const fetchCompanyJobs = async () => {
    try {
      const response = await fetch(
        `http://3.232.10.54/api/v1/job/getCompanyJobs/${companyId}`
      );
      const data = await response.json();
      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (jobId) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    nav(`/description/${jobId}`);
  };

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{job.title}</h3>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
          {job.jobType || "Not specified"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center text-gray-600 text-sm sm:text-base">
          <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{job.salary || "Not specified"}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm sm:text-base">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{job.location || "Not specified"}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm sm:text-base">
          <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{job.experience || "Not specified"}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm sm:text-base">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">
            {job.createdAt
              ? new Date(job.createdAt).toLocaleDateString()
              : "Not specified"}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-2">
        {job.description || "No description available"}
      </p>

      <button
        onClick={() => handleViewDetails(job.jobId)}
        className="w-full py-2 sm:py-3 px-4 bg-blue-600 text-white rounded-lg font-medium
                 hover:bg-blue-700 transition-all duration-300
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 active:transform active:scale-95 text-sm sm:text-base"
      >
        View Details
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
        <div className="text-red-600 text-center">Error loading company data</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
          {company && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 sm:mb-8 p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-xl bg-gray-50 flex items-center justify-center p-2">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.CompanyName} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                  )}
                </div>
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {company.CompanyName}
                  </h1>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <div className="flex items-center text-gray-600 text-sm sm:text-base">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{company.location}</span>
                    </div>
                    {company.website && (
                      <div className="flex items-center text-gray-600 text-sm sm:text-base">
                        <Globe className="w-4 h-4 mr-1 flex-shrink-0" />
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate"
                        >
                          {company.website.replace(/(^\w+:|^)\/\//, "")}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center text-gray-600 text-sm sm:text-base">
                      <Users className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{company.userIds.length || "Not specified"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">{company.description}</p>
            </div>
          )}

          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Open Positions ({jobs.length})
            </h2>
          </div>

          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {jobs.map((job) => (
                <JobCard key={job.jobId} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 bg-white rounded-xl border border-gray-100">
              <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 font-medium mb-2 text-lg sm:text-xl">
                No open positions
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                This company currently has no job listings
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md m-4 sm:m-0">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Sign in Required</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Please sign in to view job details and save jobs to your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm sm:text-base text-gray-500">
              Create an account or sign in to access all features and apply to jobs.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAuthModal(false)}>
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setShowAuthModal(false);
                  nav("/signup/candidate");
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </div>
          <div
            className="cursor-pointer hover:text-blue-700 hover:underline text-right mr-2"
            onClick={() => nav('/login')}
          >
            <div className="text-xs sm:text-sm">Already Registered?</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyJobs;