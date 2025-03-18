// // import { Badge } from "./ui/badge";
// // import { Button } from "./ui/button";
// // import {
// //   Briefcase,
// //   CheckCircle2,
// //   Clock,
// //   MapPin,
// //   DollarSign,
// //   CalendarDays,
// // } from "lucide-react";
// // import Navbar from "./shared/Navbar";
// // import { useParams } from "react-router-dom";
// // import useGetSingleJob from "@/hooks/useGetSingleJobs";
// // import { setLoading } from "@/redux/authSlice";
// // import { setAllJobs, setSingleJob } from "@/redux/jobSlice";
// // import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import store from "@/redux/store";
// // import { toast } from "sonner";

// // function JobDescription() {
// //   const [error, setError] = useState(null);
// //   const dispatch = useDispatch();

// //   const params = useParams();
// //   console.log(params);
// //   const jobId = params.id;
// //   console.log(jobId);
// //   const { singleJob } = useSelector((store) => store.job);
// //   const { user } = useSelector((store) => store.auth);
// //   const isInitiallyApplied = singleJob?.applications?.some(
// //     (application) => application.applicant === user?.id || false
// //   );
// //   const [isApplied, setIsApplied] = useState(isInitiallyApplied);

// //   const applyJobHandler = async () => {
// //     dispatch(setLoading(true));
// //     try {
// //       const res = await axios.get(
// //         `${APPLICATION_API_END_POINT}/apply/${jobId}`,
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       if (res.data.status) {
// //         toast.success(res.data.messaage || "Applied Successfully");
// //         setIsApplied(true);
// //         const updateSingleJob = {
// //           ...singleJob,
// //           applications: [...singleJob.applications, { applicant: user?._id }],
// //         };
// //         dispatch(setSingleJob(updateSingleJob));
// //         setError(null);
// //       }
// //     } catch (err) {
// //       toast.error("Already Applied");
// //       console.error("Error applying for job:", err);
// //       setError(err);
// //     } finally {
// //       dispatch(setLoading(false));
// //     }
// //   };

// //   useEffect(() => {
// //     if (!jobId) {
// //       console.log("Job ID is undefined");
// //       return;
// //     }

// //     const fetchSingleJob = async () => {
// //       dispatch(setLoading(true));
// //       try {
// //         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
// //           withCredentials: true,
// //         });

// //         if (res.data.status) {
// //           dispatch(setSingleJob(res.data.job));
// //           setIsApplied(
// //             res.data.job.applications.some(
// //               (application) => application.applicant === user?._id
// //             )
// //           );
// //           setError(null);
// //         } else {
// //           setError(new Error("Failed to fetch jobs. Status not true."));
// //         }
// //       } catch (err) {
// //         toast.error(err.messaage);
// //         console.error("Error fetching jobs:", err);
// //         setError(err);
// //       } finally {
// //         dispatch(setLoading(false));
// //       }
// //     };

// //     fetchSingleJob();
// //   }, [jobId, dispatch, user?._id]);

// //   return (
// //     <div className="bg-gray-50 min-h-screen">
// //       <Navbar />

// //       <div className="max-w-4xl mx-auto my-14 px-6">
// //         <div
// //           className="bg-white shadow-lg border border-gray-100 rounded-2xl p-8 relative
// //           hover:shadow-xl transition-all duration-300"
// //         >
// //           {/* Apply Button / Applied Status */}
// //           {!isApplied ? (
// //             <Button
// //               onClick={isApplied ? null : applyJobHandler}
// //               className="absolute top-6 right-6 bg-blue-600 text-white rounded-xl
// //               px-6 py-2 hover:bg-blue-700 transition-colors group"
// //             >
// //               Apply Now
// //               <span className="ml-2 group-hover:translate-x-1 transition-transform">
// //                 →
// //               </span>
// //             </Button>
// //           ) : (
// //             <div
// //               className="absolute top-6 right-6 text-green-600 font-medium flex items-center
// //               bg-green-50 px-4 py-2 rounded-xl"
// //             >
// //               <CheckCircle2 className="mr-2 w-5 h-5" />
// //               Applied
// //             </div>
// //           )}

// //           {/* Job Header */}
// //           <div className="mb-6">
// //             <h1 className="font-bold text-3xl text-gray-900 mb-4">
// //               {singleJob?.title}
// //             </h1>

// //             {/* Job Metadata */}
// //             <div className="flex items-center gap-4 flex-wrap">
// //               {/* <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
// //                 <Briefcase className="w-4 h-4" />
// //                 {singleJob?.position} Position
// //               </div> */}
// //               <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
// //                 <Clock className="w-4 h-4" />
// //                 {singleJob?.jobType}
// //               </div>
// //               <div className="flex items-center gap-2 bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-sm">
// //                 <DollarSign className="w-4 h-4" />
// //                 {singleJob?.salary} K
// //               </div>
// //             </div>
// //           </div>

// //           {/* Detailed Job Information */}
// //           <div className="grid md:grid-cols-2 gap-6 mb-6 bg-gray-50 p-6 rounded-xl">
// //             <div className="space-y-3">
// //               <div className="flex items-center gap-3">
// //                 <MapPin className="w-5 h-5 text-blue-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Location:</strong> {singleJob?.location}
// //                 </span>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <CalendarDays className="w-5 h-5 text-green-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Posted Date:</strong>{" "}
// //                   {singleJob?.createdAt.split("T")[0]}
// //                 </span>
// //               </div>
// //             </div>
// //             <div className="space-y-3">
// //               <div className="flex items-center gap-3">
// //                 <Briefcase className="w-5 h-5 text-purple-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Experience:</strong> {singleJob?.experience} Yrs
// //                 </span>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <CheckCircle2 className="w-5 h-5 text-green-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Total Applicants:</strong>{" "}
// //                   {singleJob?.applications?.length}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Job Description */}
// //           <div className="space-y-4">
// //             <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
// //               Job Description
// //             </h2>
// //             <p className="text-gray-700 leading-relaxed">
// //               {singleJob?.description}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default JobDescription;
// // import { Badge } from "./ui/badge";
// // import { Button } from "./ui/button";
// // import {
// //   Briefcase,
// //   CheckCircle2,
// //   Clock,
// //   MapPin,
// //   DollarSign,
// //   CalendarDays,
// //   ListChecks,
// // } from "lucide-react";
// // import Navbar from "./shared/Navbar";
// // import { useParams } from "react-router-dom";
// // import useGetSingleJob from "@/hooks/useGetSingleJobs";
// // import { setLoading } from "@/redux/authSlice";
// // import { setAllJobs, setSingleJob } from "@/redux/jobSlice";
// // import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import store from "@/redux/store";
// // import { toast } from "sonner";

// // function JobDescription() {
// //   const [error, setError] = useState(null);
// //   const [isApplying, setIsApplying] = useState(false);
// //   const dispatch = useDispatch();

// //   const params = useParams();
// //   const jobId = params.id;
// //   const { singleJob } = useSelector((store) => store.job);
// //   const { user } = useSelector((store) => store.auth);
// //   const isInitiallyApplied = singleJob?.applications?.some(
// //     (application) => application.applicant === user?.id || false
// //   );
// //   const [isApplied, setIsApplied] = useState(isInitiallyApplied);

// //   const applyJobHandler = async () => {
// //     setIsApplying(true);
// //     dispatch(setLoading(true));
// //     try {
// //       const res = await axios.get(
// //         `${APPLICATION_API_END_POINT}/apply/${jobId}`,
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       if (res.data.status) {
// //         toast.success(res.data.messaage || "Applied Successfully");
// //         setIsApplied(true);
// //         const updateSingleJob = {
// //           ...singleJob,
// //           applications: [...singleJob.applications, { applicant: user?._id }],
// //         };
// //         dispatch(setSingleJob(updateSingleJob));
// //         setError(null);
// //       }
// //     } catch (err) {
// //       toast.error("Already Applied");
// //       console.error("Error applying for job:", err);
// //       setError(err);
// //     } finally {
// //       setIsApplying(false);
// //       dispatch(setLoading(false));
// //     }
// //   };

// //   useEffect(() => {
// //     if (!jobId) {
// //       console.log("Job ID is undefined");
// //       return;
// //     }

// //     const fetchSingleJob = async () => {
// //       dispatch(setLoading(true));
// //       try {
// //         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
// //           withCredentials: true,
// //         });

// //         if (res.data.status) {
// //           dispatch(setSingleJob(res.data.job));
// //           setIsApplied(
// //             res.data.job.applications.some(
// //               (application) => application.applicant === user?._id
// //             )
// //           );
// //           setError(null);
// //         } else {
// //           setError(new Error("Failed to fetch jobs. Status not true."));
// //         }
// //       } catch (err) {
// //         toast.error(err.messaage);
// //         console.error("Error fetching jobs:", err);
// //         setError(err);
// //       } finally {
// //         dispatch(setLoading(false));
// //       }
// //     };

// //     fetchSingleJob();
// //   }, [jobId, dispatch, user?._id]);

// //   return (
// //     <div className="bg-gray-50 min-h-screen">
// //       <Navbar />

// //       <div className="max-w-4xl mx-auto my-14 px-6">
// //         <div
// //           className="bg-white shadow-lg border border-gray-100 rounded-2xl p-8 relative
// //           hover:shadow-xl transition-all duration-300"
// //         >
// //           {/* Apply Button / Applied Status */}
// //           {!isApplied ? (
// //             <Button
// //               onClick={isApplied ? null : applyJobHandler}
// //               disabled={isApplying}
// //               className="absolute top-6 right-6 bg-blue-600 text-white rounded-xl
// //               px-6 py-2 hover:bg-blue-700 transition-colors group disabled:opacity-70"
// //             >
// //               {isApplying ? "Applying..." : "Apply Now"}
// //               {!isApplying && (
// //                 <span className="ml-2 group-hover:translate-x-1 transition-transform">
// //                   →
// //                 </span>
// //               )}
// //             </Button>
// //           ) : (
// //             <div
// //               className="absolute top-6 right-6 text-green-600 font-medium flex items-center
// //               bg-green-50 px-4 py-2 rounded-xl"
// //             >
// //               <CheckCircle2 className="mr-2 w-5 h-5" />
// //               Applied
// //             </div>
// //           )}

// //           {/* Job Header */}
// //           <div className="mb-6">
// //             <h1 className="font-bold text-3xl text-gray-900 mb-4">
// //               {singleJob?.title}
// //             </h1>

// //             {/* Job Metadata */}
// //             <div className="flex items-center gap-4 flex-wrap">
// //               <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
// //                 <Clock className="w-4 h-4" />
// //                 {Array.isArray(singleJob?.jobType)
// //                   ? singleJob?.jobType[0]
// //                   : singleJob?.jobType}
// //               </div>
// //               <div className="flex items-center gap-2 bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-sm">
// //                 <DollarSign className="w-4 h-4" />
// //                 {singleJob?.salary} K
// //               </div>
// //             </div>
// //           </div>

// //           {/* Detailed Job Information */}
// //           <div className="grid md:grid-cols-2 gap-6 mb-6 bg-gray-50 p-6 rounded-xl">
// //             <div className="space-y-3">
// //               <div className="flex items-center gap-3">
// //                 <MapPin className="w-5 h-5 text-blue-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Location:</strong> {singleJob?.location}
// //                 </span>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <CalendarDays className="w-5 h-5 text-green-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Posted Date:</strong>{" "}
// //                   {singleJob?.createdAt.split("T")[0]}
// //                 </span>
// //               </div>
// //             </div>
// //             <div className="space-y-3">
// //               <div className="flex items-center gap-3">
// //                 <Briefcase className="w-5 h-5 text-purple-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Experience:</strong> {singleJob?.experience} Yrs
// //                 </span>
// //               </div>
// //               {/* <div className="flex items-center gap-3">
// //                 <CheckCircle2 className="w-5 h-5 text-green-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Total Applicants:</strong>{" "}
// //                   {singleJob?.applications?.length}
// //                 </span>
// //               </div> */}
// //             </div>
// //           </div>

// //           {/* Job Description */}
// //           <div className="space-y-4 mb-8">
// //             <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
// //               Job Description
// //             </h2>
// //             <p className="text-gray-700 leading-relaxed">
// //               {singleJob?.description}
// //             </p>
// //           </div>

// //           {/* Requirements Section */}
// //           <div className="space-y-4">
// //             <h2 className="text-xl font-semibold border-b pb-2 text-gray-800 flex items-center gap-2">
// //               <ListChecks className="w-6 h-6 text-blue-600" />
// //               Requirements
// //             </h2>
// //             <ul className="list-disc pl-6 space-y-2">
// //               {singleJob?.requirements?.map((requirement, index) => (
// //                 <li key={index} className="text-gray-700">
// //                   {requirement}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default JobDescription;
// // import { Badge } from "./ui/badge";
// // import { Button } from "./ui/button";
// // import {
// //   Briefcase,
// //   CheckCircle2,
// //   Clock,
// //   MapPin,
// //   DollarSign,
// //   CalendarDays,
// //   ListChecks,
// //   LogIn,
// // } from "lucide-react";
// // import Navbar from "./shared/Navbar";
// // import { useParams } from "react-router-dom";
// // import useGetSingleJob from "@/hooks/useGetSingleJobs";
// // import { setLoading } from "@/redux/authSlice";
// // import { setAllJobs, setSingleJob } from "@/redux/jobSlice";
// // import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import store from "@/redux/store";
// // import { toast } from "sonner";
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
// // import Login from "./auth/Login";

// // const renderFormattedText = (text, lineClamp = 0) => {
// //   return (
// //     <div
// //       className={`whitespace-pre-wrap ${
// //         lineClamp > 0 ? `line-clamp-${lineClamp}` : ""
// //       } text-gray-700 leading-relaxed`}
// //     >
// //       {text}
// //     </div>
// //   );
// // };

// // function JobDescription() {
// //   const [error, setError] = useState(null);
// //   const [showAuthModal, setShowAuthModal] = useState(false);
// //   const [isApplying, setIsApplying] = useState(false);
// //   const dispatch = useDispatch();

// //   const params = useParams();
// //   const jobId = params.id;
// //   const { singleJob } = useSelector((store) => store.job);
// //   const { user } = useSelector((store) => store.auth);
// //   const u = useSelector((state) => state.auth?.user);
// //   const isAuthenticated = !!u;

// //   const isInitiallyApplied = singleJob?.applications?.some(
// //     (application) => application.applicant === user?.id || false
// //   );
// //   const [isApplied, setIsApplied] = useState(isInitiallyApplied);

// //   const applyJobHandler = async () => {
// //      if (!isAuthenticated) {
// //       setShowAuthModal(true);
// //       return;
// //     }
// //     setIsApplying(true);
// //     dispatch(setLoading(true));

// //     try {
// //       const res = await axios.get(
// //         `${APPLICATION_API_END_POINT}/apply/${jobId}`,
// //         { withCredentials: true }
// //       );

// //       if (res.data.status) {
// //         toast.success(res.data.messaage || "Applied Successfully");
// //         setIsApplied(true);
// //         const updateSingleJob = {
// //           ...singleJob,
// //           applications: [...singleJob.applications, { applicant: user?._id }],
// //         };
// //         dispatch(setSingleJob(updateSingleJob));
// //         setError(null);
// //       }
// //     } catch (err) {
// //       toast.error("Already Applied");
// //       console.error("Error applying for job:", err);
// //       setError(err);
// //     } finally {
// //       setIsApplying(false);
// //       dispatch(setLoading(false));
// //     }
// //   };

// //   useEffect(() => {
// //     if (!jobId) {
// //       console.log("Job ID is undefined");
// //       return;
// //     }

// //     const fetchSingleJob = async () => {
// //       dispatch(setLoading(true));

// //       try {
// //         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
// //           withCredentials: true,
// //         });

// //         if (res.data.status) {
// //           dispatch(setSingleJob(res.data.job));
// //           setIsApplied(
// //             res.data.job.applications.some(
// //               (application) => application.applicant === user?._id
// //             )
// //           );
// //           setError(null);
// //         } else {
// //           setError(new Error("Failed to fetch jobs. Status not true."));
// //         }
// //       } catch (err) {
// //         toast.error(err.messaage);
// //         console.error("Error fetching jobs:", err);
// //         setError(err);
// //       } finally {
// //         dispatch(setLoading(false));
// //       }
// //     };

// //     fetchSingleJob();
// //   }, [jobId, dispatch, user?._id]);

// //   return (
// //     <div className="bg-gray-50 min-h-screen">
// //       <Navbar />
// //       {!isAuthenticated && (
// //         <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
// //           <DialogContent className="sm:max-w-md">
// //             <DialogHeader>
// //               <DialogTitle>Sign in Required</DialogTitle>
// //               <DialogDescription>
// //                 Please sign in to view job details and save jobs to your profile.
// //               </DialogDescription>
// //             </DialogHeader>
// //             <div className="flex flex-col gap-4 py-4">
// //               <p className="text-sm text-gray-500">
// //                 Create an account or sign in to access all features and apply to
// //                 jobs.
// //               </p>
// //               <div className="flex justify-end gap-3">
// //                 <Button variant="outline" onClick={() => setShowAuthModal(false)}>
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   className="bg-blue-600 hover:bg-blue-700 text-white"
// //                   onClick={() => {
// //                     setShowAuthModal(false);
// //                     navigate("/signup/candidate");
// //                   }}
// //                 >
// //                   <LogIn className="w-4 h-4 mr-2" />
// //                   Sign Up
// //                 </Button>
// //               </div>
// //             </div>
// //             <a
// //               className="cursor-pointer hover:text-blue-700 hover:underline text-right mr-2"
// //               onClick={() => navigate('/login')}
// //             >
// //               <div className="text-xs">Already Registered?</div>
// //             </a>
// //           </DialogContent>
// //         </Dialog>
// //       )}

// //       <div className="max-w-4xl mx-auto my-14 px-6">
// //         <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-8 relative hover:shadow-xl transition-all duration-300">
// //           {/* Apply Button / Applied Status */}
// //           {!isApplied ? (
// //             <Button
// //               onClick={isApplied ? null : applyJobHandler}
// //               disabled={isApplying}
// //               className="absolute top-6 right-6 bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700 transition-colors group disabled:opacity-70"
// //             >
// //               {isApplying ? "Applying..." : "Apply Now"}
// //               {!isApplying && (
// //                 <span className="ml-2 group-hover:translate-x-1 transition-transform">
// //                   →
// //                 </span>
// //               )}
// //             </Button>
// //           ) : (
// //             <div className="absolute top-6 right-6 text-green-600 font-medium flex items-center bg-green-50 px-4 py-2 rounded-xl">
// //               <CheckCircle2 className="mr-2 w-5 h-5" />
// //               Applied
// //             </div>
// //           )}

// //           {/* Job Header */}
// //           <div className="mb-6">
// //             <h1 className="font-bold text-3xl text-gray-900 mb-4">
// //               {singleJob?.title}
// //             </h1>

// //             {/* Job Metadata */}
// //             <div className="flex items-center gap-4 flex-wrap">
// //               <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
// //                 <Clock className="w-4 h-4" />
// //                 {Array.isArray(singleJob?.jobType)
// //                   ? singleJob?.jobType[0]
// //                   : singleJob?.jobType}
// //               </div>
// //               {singleJob?.salary && singleJob.salary !== "" && (
// //                 <div className="flex items-center gap-2 bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-sm">
// //                   <DollarSign className="w-4 h-4" />
// //                   {singleJob.salary} K
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Detailed Job Information */}
// //           <div className="grid md:grid-cols-2 gap-6 mb-6 bg-gray-50 p-6 rounded-xl">
// //             <div className="space-y-3">
// //               <div className="flex items-center gap-3">
// //                 <MapPin className="w-5 h-5 text-blue-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Location:</strong> {singleJob?.location}
// //                 </span>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <CalendarDays className="w-5 h-5 text-green-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Posted Date:</strong>{" "}
// //                   {singleJob?.createdAt.split("T")[0]}
// //                 </span>
// //               </div>
// //             </div>
// //             <div className="space-y-3">
// //               <div className="flex items-center gap-3">
// //                 <Briefcase className="w-5 h-5 text-purple-600" />
// //                 <span className="text-gray-700">
// //                   <strong>Experience:</strong> {singleJob?.experience} Yrs
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Job Description */}
// //           <div className="space-y-4 mb-8">
// //             <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
// //               Job Description
// //             </h2>
// //             {renderFormattedText(singleJob?.description)}
// //           </div>

// //           {/* Requirements Section */}
// //           <div className="space-y-4">
// //             <h2 className="text-xl font-semibold border-b pb-2 text-gray-800 flex items-center gap-2">
// //               <ListChecks className="w-6 h-6 text-blue-600" />
// //               Requirements
// //             </h2>
// //             <ul className="list-disc pl-6 space-y-2">
// //               {singleJob?.requirements?.map((requirement, index) => (
// //                 <li key={index} className="text-gray-700">
// //                   {renderFormattedText(requirement)}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default JobDescription;
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import {
//   Briefcase,
//   CheckCircle2,
//   Clock,
//   MapPin,
//   DollarSign,
//   CalendarDays,
//   ListChecks,
//   LogIn,
//   Building2,
//   Users,
// } from "lucide-react";

// import { Button } from "./ui/button";
// import Navbar from "./shared/Navbar";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog";
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
// import { setLoading } from "@/redux/authSlice";
// import { setSingleJob } from "@/redux/jobSlice";
// import { toast } from "sonner";

// const renderFormattedText = (text, lineClamp = 0) => (
//   <div
//     className={`whitespace-pre-wrap ${
//       lineClamp > 0 ? `line-clamp-${lineClamp}` : ""
//     } text-gray-600 leading-relaxed`}
//   >
//     {text}
//   </div>
// );

// const MetadataBadge = ({ icon: Icon, text, color }) => (
//   <div
//     className={`flex items-center gap-2 bg-${color}-50 text-${color}-700 px-3 py-1.5 rounded-lg text-sm font-medium`}
//   >
//     <Icon className="w-4 h-4" />
//     {text}
//   </div>
// );

// function JobDescription() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const params = useParams();
//   const jobId = params.id;

//   const [error, setError] = useState(null);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);

//   const { singleJob } = useSelector((store) => store.job);
//   const { user } = useSelector((store) => store.auth);
//   const u = useSelector((state) => state.auth?.user);
//   const isAuthenticated = !!u;

//   const isInitiallyApplied = singleJob?.applications?.some(
//     (application) => application.applicant === user?.id || false
//   );
//   const [isApplied, setIsApplied] = useState(isInitiallyApplied);

//   // Parse hiring team data safely
//   const hiringTeam = (() => {
//     try {
//       return typeof singleJob?.hiringTeam === "string"
//         ? JSON.parse(singleJob.hiringTeam)
//         : Array.isArray(singleJob?.hiringTeam)
//         ? singleJob.hiringTeam
//         : [];
//     } catch (e) {
//       console.error("Error parsing hiring team:", e);
//       return [];
//     }
//   })();

//   // Parse requirements safely
//   const requirements = (() => {
//     try {
//       return typeof singleJob?.requirements === "string"
//         ? singleJob.requirements.split("\n").filter(Boolean)
//         : Array.isArray(singleJob?.requirements)
//         ? singleJob.requirements
//         : [];
//     } catch (e) {
//       console.error("Error parsing requirements:", e);
//       return [];
//     }
//   })();

//   const applyJobHandler = async () => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       return;
//     }

//     setIsApplying(true);
//     dispatch(setLoading(true));

//     try {
//       const res = await axios.get(
//         `${APPLICATION_API_END_POINT}/apply/${jobId}`,
//         { withCredentials: true }
//       );

//       if (res.data.status) {
//         toast.success(res.data.message || "Applied Successfully");
//         setIsApplied(true);
//         dispatch(
//           setSingleJob({
//             ...singleJob,
//             applications: [
//               ...(singleJob.applications || []),
//               { applicant: user?._id },
//             ],
//           })
//         );
//       }
//     } catch (err) {
//       toast.error("Already Applied");
//       console.error("Error applying for job:", err);
//       setError(err);
//     } finally {
//       setIsApplying(false);
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     if (!jobId) return;

//     const fetchSingleJob = async () => {
//       dispatch(setLoading(true));

//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
//           withCredentials: true,
//         });

//         if (res.data.status) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(
//             res.data.job.applications?.some(
//               (application) => application.applicant === user?._id
//             ) || false
//           );
//         } else {
//           setError(new Error("Failed to fetch job details."));
//         }
//       } catch (err) {
//         toast.error(err.message || "Error fetching job details");
//         console.error("Error fetching job:", err);
//         setError(err);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">
//             Error Loading Job
//           </h2>
//           <p className="text-gray-600 mb-4">
//             {error.message || "Failed to load job details"}
//           </p>
//           <Button onClick={() => window.location.reload()} className="w-full">
//             Try Again
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <Dialog
//         open={showAuthModal && !isAuthenticated}
//         onOpenChange={setShowAuthModal}
//       >
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-semibold">
//               Sign in Required
//             </DialogTitle>
//             <DialogDescription className="text-gray-600 mt-2">
//               Please sign in to apply for jobs and access all features.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex flex-col gap-4 py-4">
//             <p className="text-sm text-gray-500">
//               Create an account or sign in to apply for jobs and track your
//               applications.
//             </p>
//             <div className="flex justify-end gap-3">
//               <Button variant="outline" onClick={() => setShowAuthModal(false)}>
//                 Cancel
//               </Button>
//               <Button
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
//                 onClick={() => {
//                   setShowAuthModal(false);
//                   navigate("/signup/candidate");
//                 }}
//               >
//                 <LogIn className="w-4 h-4 mr-2" />
//                 Sign Up
//               </Button>
//             </div>
//             <button
//               className="text-sm text-gray-600 hover:text-blue-600 hover:underline text-right"
//               onClick={() => navigate("/login")}
//             >
//               Already have an account? Sign in
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <div className="max-w-4xl mx-auto py-12 px-4">
//         <div className="bg-white shadow-lg rounded-2xl p-8 transition-all duration-300 hover:shadow-xl border border-gray-100">
//           {/* Header Section */}
//           <div className="mb-8">
//             <div className="flex justify-between items-start mb-6">
//               <div className="flex-1">
//                 {/* Company Info */}
//                 {singleJob?.company?.name && (
//                   <div className="flex items-center gap-3 mb-4">
//                     <Building2 className="w-5 h-5 text-blue-600" />
//                     <span className="text-lg font-medium text-gray-700">
//                       {singleJob.company.name}
//                     </span>
//                   </div>
//                 )}

//                 {/* Job Title */}
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   {singleJob?.title}
//                 </h1>
//               </div>

//               {/* Action Button */}
//               <div className="ml-4">
//                 {isApplied ? (
//                   <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-medium">
//                     <CheckCircle2 className="w-5 h-5" />
//                     Applied Successfully
//                   </div>
//                 ) : (
//                   <Button
//                     onClick={applyJobHandler}
//                     disabled={isApplying}
//                     className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 py-2.5 font-medium transition-all"
//                   >
//                     {isApplying ? (
//                       "Applying..."
//                     ) : (
//                       <>
//                         Apply Now
//                         <span className="ml-2 group-hover:translate-x-1 transition-transform">
//                           →
//                         </span>
//                       </>
//                     )}
//                   </Button>
//                 )}
//               </div>
//             </div>

//             {/* Job Metadata */}
//             <div className="flex flex-wrap gap-3 mt-6">
//               {singleJob?.jobType && (
//                 <MetadataBadge
//                   icon={Clock}
//                   text={
//                     Array.isArray(singleJob.jobType)
//                       ? singleJob.jobType[0]
//                       : singleJob.jobType
//                   }
//                   color="green"
//                 />
//               )}
//               {singleJob?.salary && (
//                 <MetadataBadge
//                   icon={DollarSign}
//                   text={`${singleJob.salary}K`}
//                   color="purple"
//                 />
//               )}
//               {singleJob?.location && (
//                 <MetadataBadge
//                   icon={MapPin}
//                   text={singleJob.location}
//                   color="blue"
//                 />
//               )}
//               {singleJob?.experience && (
//                 <MetadataBadge
//                   icon={Briefcase}
//                   text={`${singleJob.experience} years`}
//                   color="indigo"
//                 />
//               )}
//             </div>
//           </div>

//           {/* Hiring Team Section */}
//           {hiringTeam.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Users className="w-6 h-6 text-blue-600" />
//                 Hiring Team
//               </h2>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {hiringTeam.map((member, index) => (
//                   <div
//                     key={index}
//                     className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-all"
//                   >
//                     <h3 className="font-medium text-gray-900">{member.name}</h3>
//                     <p className="text-sm text-gray-600">{member.position}</p>
//                     {member.email && (
//                       <p className="text-sm text-blue-600 mt-1">
//                         {member.email}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Description Section */}
//           {singleJob?.description && (
//             <div className="space-y-6 mb-8">
//               <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
//                 Job Description
//               </h2>
//               {renderFormattedText(singleJob.description)}
//             </div>
//           )}

//           {/* Requirements Section */}
//           {requirements.length > 0 && (
//             <div className="space-y-6">
//               <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
//                 <ListChecks className="w-6 h-6 text-blue-600" />
//                 Requirements
//               </h2>
//               <ul className="space-y-3">
//                 {requirements.map((requirement, index) => (
//                   <li key={index} className="flex items-start gap-3">
//                     <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5" />
//                     <span className="text-gray-700">{requirement}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobDescription;
import { useEffect, useState, startTransition } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  CalendarDays,
  ListChecks,
  LogIn,
  Building2,
  Users,
} from "lucide-react";

import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setLoading } from "@/redux/authSlice";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const renderFormattedText = (text, lineClamp = 0) => (
  <div
    className={`whitespace-pre-wrap ${
      lineClamp > 0 ? `line-clamp-${lineClamp}` : ""
    } text-gray-600 leading-relaxed`}
  >
    {text}
  </div>
);

const MetadataBadge = ({ icon: Icon, text, color }) => (
  <div
    className={`flex items-center gap-2 bg-${color}-50 text-${color}-700 px-3 py-1.5 rounded-lg text-sm font-medium`}
  >
    <Icon className="w-4 h-4" />
    <span className="break-words">{text}</span>
  </div>
);

function JobDescription() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const u = useSelector((state) => state.auth?.user);
  const isAuthenticated = !!u;

  const isInitiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?.id || false
  );
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  //  useEffect(() => {
  //   if (user?.role === 'recruiter') {
  //     startTransition(() => {
  //       navigate("/admin/companies");
  //     });
  //   }
  // }, [user?.role, navigate]);

  // Parse hiring team data safely
  const hiringTeam = (() => {
    try {
      return typeof singleJob?.hiringTeam === "string"
        ? JSON.parse(singleJob.hiringTeam)
        : Array.isArray(singleJob?.hiringTeam)
        ? singleJob.hiringTeam
        : [];
    } catch (e) {
      console.error("Error parsing hiring team:", e);
      return [];
    }
  })();

  // Parse requirements safely
  const requirements = (() => {
    try {
      return typeof singleJob?.requirements === "string"
        ? singleJob.requirements.split("\n").filter(Boolean)
        : Array.isArray(singleJob?.requirements)
        ? singleJob.requirements
        : [];
    } catch (e) {
      console.error("Error parsing requirements:", e);
      return [];
    }
  })();

  const applyJobHandler = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setIsApplying(true);
    dispatch(setLoading(true));

    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.status) {
        toast.success(res.data.message || "Applied Successfully");
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...(singleJob.applications || []),
              { applicant: user?._id },
            ],
          })
        );
      }
    } catch (err) {
      toast.error("Already Applied");
      console.error("Error applying for job:", err);
      setError(err);
    } finally {
      setIsApplying(false);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!jobId) return;

    const fetchSingleJob = async () => {
      dispatch(setLoading(true));

      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant === user?._id
            ) || false
          );
        } else {
          setError(new Error("Failed to fetch job details."));
        }
      } catch (err) {
        toast.error(err.message || "Error fetching job details");
        console.error("Error fetching job:", err);
        setError(err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4">
            Error Loading Job
          </h2>
          <p className="text-gray-600 mb-4">
            {error.message || "Failed to load job details"}
          </p>
          <Button onClick={() => window.location.reload()} className="w-full">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Dialog
        open={showAuthModal && !isAuthenticated}
        onOpenChange={setShowAuthModal}
      >
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl font-semibold">
              Sign in Required
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Please sign in to apply for jobs and access all features.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm text-gray-500">
              Create an account or sign in to apply for jobs and track your
              applications.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAuthModal(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                onClick={() => {
                  setShowAuthModal(false);
                  navigate("/signup/candidate");
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </div>
            <button
              className="text-sm text-gray-600 hover:text-blue-600 hover:underline text-center sm:text-right"
              onClick={() => navigate("/login")}
            >
              Already have an account? Sign in
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-4xl mx-auto py-6 md:py-12 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-4 md:p-8 transition-all duration-300 hover:shadow-xl border border-gray-100">
          {/* Top Section with Fixed Apply Button */}
          <div className="flex justify-between items-start gap-4 mb-6">
            <div className="flex-1 min-w-0">
              {/* Company Info */}
              {singleJob?.company?.name && (
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-5 h-5 flex-shrink-0 text-blue-600" />
                  <span className="text-base md:text-lg font-medium text-gray-700 truncate">
                    {singleJob.company.name}
                  </span>
                </div>
              )}

              {/* Job Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
                {singleJob?.title}
              </h1>
            </div>

            {/* Fixed Apply Button */}
            {user?.role === "recruiter" ? (
              <></>
            ) : (
              <div className="flex-shrink-0">
                {isApplied ? (
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-medium whitespace-nowrap">
                    <CheckCircle2 className="w-5 h-5" />
                    Applied
                  </div>
                ) : (
                  <Button
                    onClick={applyJobHandler}
                    disabled={isApplying}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 py-2.5 font-medium transition-all whitespace-nowrap"
                  >
                    {isApplying ? (
                      "Applying..."
                    ) : (
                      <>
                        Apply Now
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Job Metadata */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
            {singleJob?.jobType && (
              <MetadataBadge
                icon={Clock}
                text={
                  Array.isArray(singleJob.jobType)
                    ? singleJob.jobType[0]
                    : singleJob.jobType
                }
                color="green"
              />
            )}
            {singleJob?.salary && (
              <MetadataBadge
                icon={DollarSign}
                text={`${singleJob.salary}`}
                color="purple"
              />
            )}
            {singleJob?.location && (
              <MetadataBadge
                icon={MapPin}
                text={singleJob.location}
                color="blue"
              />
            )}
            {singleJob?.experience && (
              <MetadataBadge
                icon={Briefcase}
                text={`${singleJob.experience} years`}
                color="indigo"
              />
            )}
          </div>
          {hiringTeam.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Hiring Team
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {hiringTeam.map((member, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-all"
                  >
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.position}</p>
                    {member.email && (
                      <p className="text-sm text-blue-600 mt-1 break-all">
                        {member.email}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description Section */}
          {singleJob?.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h2>
              {renderFormattedText(singleJob.description)}
            </div>
          )}

          {/* Requirements Section */}
          {requirements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ListChecks className="w-6 h-6 text-blue-600" />
                Requirements
              </h2>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hiring Team Section */}
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
