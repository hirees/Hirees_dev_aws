// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import Navbar from "../shared/Navbar";
// // // import { Input } from "../ui/input";
// // // import { Label } from "../ui/label";
// // // import {
// // //   Select,
// // //   SelectTrigger,
// // //   SelectValue,
// // //   SelectContent,
// // //   SelectItem,
// // // } from "../ui/select";
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogHeader,
// // //   DialogTitle,
// // //   DialogTrigger,
// // // } from "@/components/ui/dialog";
// // // import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
// // // import { toast } from "sonner";
// // // import { useNavigate } from "react-router-dom";

// // // import JobPreview from "./JobPreview";
// // // import { Button } from "../ui/button";
// // // import { ArrowLeft } from "lucide-react";

// // // function PostJob() {
// // //   const navigate = useNavigate();
// // //   const [input, setInput] = useState({
// // //     title: "",
// // //     description: "",
// // //     requirements: "",
// // //     location: "",
// // //     jobType: "",
// // //     experience: "",
// // //     salary: "",
// // //     company: "",
// // //   });

// // //   const [companies, setCompanies] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedCompany, setSelectedCompany] = useState(null);

// // //   const jobTypes = [
// // //     "Full-Time",
// // //     "Part-Time",
// // //     "Contract to Hire",
// // //     "Internship",
// // //     "Freelance",
// // //     "Contract",
// // //   ];

// // //   // Fetch companies when component loads
// // //   useEffect(() => {
// // //     const fetchCompanies = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
// // //           withCredentials: true,
// // //         });

// // //         if (response.data.status && response.data.companies.length > 0) {
// // //           const fetchedCompanies = response.data.companies;
// // //           console.log(response.data.companies);
// // //           setCompanies(fetchedCompanies);
// // //           setSelectedCompany(fetchedCompanies);
// // //           console.log(fetchedCompanies[0]);
// // //           setInput((prev) => ({
// // //             ...prev,
// // //             company: fetchedCompanies[0].companyId,
// // //           }));
// // //         } else {
// // //           toast.error("No companies found. Please create a company first.");
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching companies:", error);
// // //         toast.error("Failed to fetch companies. Please try again.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchCompanies();
// // //   }, []);

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setInput((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!input.company) {
// // //       toast.error("Please create a company first");
// // //       return;
// // //     }

// // //     try {
// // //       const response = await axios.post(`${JOB_API_END_POINT}/postjob`, input, {
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         withCredentials: true,
// // //       });

// // //       if (response.status) {
// // //         navigate("/admin/jobs");
// // //         toast.success("Job posted successfully!");
// // //       }
// // //     } catch (error) {
// // //       console.error("Network error:", error);
// // //       toast.error("An error occurred. Please try again.");
// // //     }
// // //   };

// // //   // Create a preview job object that matches the Job component's expected structure
// // //   const previewJob = {
// // //     ...input,
// // //     company: selectedCompany,
// // //     createdAt: new Date().toISOString(),
// // //   };

// // //   return (
// // //     <div className="">
// // //       <Navbar />
// // //       <div className="flex justify-center items-center py-10 px-4">
// // //         <form
// // //           onSubmit={handleSubmit}
// // //           className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200 transform transition-transform hover:shadow-2xl hover:scale-101"
// // //         >
// // //           <Button
// // //             onClick={() => navigate("/admin/jobs")}
// // //             className="flex items-center gap-2 text-white font-semibold bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 rounded-2xl px-4 py-2"
// // //           >
// // //             <ArrowLeft />
// // //             <span>Back</span>
// // //           </Button>
// // //           <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-6">
// // //             Post Job
// // //           </h2>

// // //           {loading ? (
// // //             <p className="text-center text-blue-500">Loading companies...</p>
// // //           ) : (
// // //             <>
// // //               {companies.length === 0 ? (
// // //                 <div className="text-center text-red-500">
// // //                   No companies found. Please create a company first.
// // //                 </div>
// // //               ) : (
// // //                 <>
// // //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
// // //                     {/* Existing form fields... */}
// // //                     <div>
// // //                       {" "}
// // //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// // //                         Job Title{" "}
// // //                       </Label>{" "}
// // //                       <Input
// // //                         type="text"
// // //                         name="title"
// // //                         value={input.title}
// // //                         onChange={handleChange}
// // //                         placeholder="Enter job title"
// // //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// // //                         Location
// // //                       </Label>
// // //                       <Input
// // //                         type="text"
// // //                         name="location"
// // //                         value={input.location}
// // //                         onChange={handleChange}
// // //                         placeholder="Enter job location"
// // //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// // //                       />
// // //                     </div>

// // //                     {/* Description with larger text area */}

// // //                     <div className="sm:col-span-2">
// // //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// // //                         Job Description
// // //                       </Label>
// // //                       <textarea
// // //                         name="description"
// // //                         value={input.description}
// // //                         onChange={handleChange}
// // //                         placeholder="Enter detailed job description"
// // //                         rows="6"
// // //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base"
// // //                       />
// // //                     </div>

// // //                     {/* Other fields */}
// // //                     <div className="sm:col-span-2">
// // //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// // //                         Requirements
// // //                       </Label>
// // //                       <textarea
// // //                         name="requirements"
// // //                         value={input.requirements}
// // //                         onChange={handleChange}
// // //                         placeholder="Enter requirements (comma-separated)"
// // //                         rows="3"
// // //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base"
// // //                       />
// // //                     </div>

// // //                     {/* <div className="">
// // //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// // //                         Requirements
// // //                       </Label>
// // //                       <Input
// // //                         type="text"
// // //                         name="requirements"
// // //                         value={input.requirements}
// // //                         onChange={handleChange}
// // //                         placeholder="Enter requirements (comma-separated)"
// // //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// // //                       />
// // //                     </div> */}
// // //                     <div>
// // //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// // //                         Job Type
// // //                       </Label>
// // //                       <Select
// // //                         onValueChange={(value) =>
// // //                           setInput((prev) => ({ ...prev, jobType: value }))
// // //                         }
// // //                       >
// // //                         <SelectTrigger className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150">
// // //                           <SelectValue placeholder="Select a Job Type" />
// // //                         </SelectTrigger>
// // //                         <SelectContent className="bg-white rounded-lg shadow-md">
// // //                           {jobTypes.map((type) => (
// // //                             <SelectItem key={type} value={type}>
// // //                               {type}
// // //                             </SelectItem>
// // //                           ))}
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>
// // //                     <div>
// // //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// // //                         Experience
// // //                       </Label>
// // //                       <Input
// // //                         type="text"
// // //                         name="experience"
// // //                         value={input.experience}
// // //                         onChange={handleChange}
// // //                         placeholder="Enter required experience"
// // //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// // //                         Salary
// // //                       </Label>
// // //                       <Input
// // //                         type="text"
// // //                         name="salary"
// // //                         value={input.salary}
// // //                         onChange={handleChange}
// // //                         placeholder="Enter salary "
// // //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// // //                       />
// // //                     </div>

// // //                     {/* ... */}

// // //                     {/* Preview Dialog */}
// // //                     <div className="sm:col-span-2 flex justify-center gap-4">
// // //                       <Dialog>
// // //                         <DialogTrigger className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
// // //                           Preview
// // //                         </DialogTrigger>
// // //                         <DialogContent className="max-w-4xl">
// // //                           <DialogHeader>
// // //                             <DialogTitle>Job Post Preview</DialogTitle>
// // //                           </DialogHeader>
// // //                           <div className="mt-4">
// // //                             <JobPreview job={previewJob} />
// // //                           </div>
// // //                         </DialogContent>
// // //                       </Dialog>
// // //                       <button
// // //                         type="submit"
// // //                         className="rounded-2xl w-full max-w-xs bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-6 shadow-lg hover:bg-gradient-to-l hover:scale-110 transition-all transform"
// // //                       >
// // //                         Post Job
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </>
// // //               )}
// // //             </>
// // //           )}
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default PostJob;
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import Navbar from "../shared/Navbar";
// // import { Input } from "../ui/input";
// // import { Label } from "../ui/label";
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectValue,
// //   SelectContent,
// //   SelectItem,
// // } from "../ui/select";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
// // import { toast } from "sonner";
// // import { useNavigate } from "react-router-dom";
// // import JobPreview from "./JobPreview";
// // import { Button } from "../ui/button";
// // import { ArrowLeft } from "lucide-react";

// // function PostJob() {
// //   const navigate = useNavigate();
// //   const [input, setInput] = useState({
// //     title: "",
// //     description: "",
// //     requirements: "",
// //     location: "",
// //     jobType: "",
// //     experience: "",
// //     salary: "",
// //     company: "",
// //   });

// //   const [companies, setCompanies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedCompany, setSelectedCompany] = useState(null);

// //   const jobTypes = [
// //     "Full-Time",
// //     "Part-Time",
// //     "Contract to Hire",
// //     "Internship",
// //     "Freelance",
// //     "Contract",
// //   ];

// //   useEffect(() => {
// //     const fetchCompanies = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
// //           withCredentials: true,
// //         });

// //         if (response.data.status && response.data.companies.length > 0) {
// //           const fetchedCompanies = response.data.companies;
// //           setCompanies(fetchedCompanies);
// //           setSelectedCompany(fetchedCompanies[0]);
// //           setInput((prev) => ({
// //             ...prev,
// //             company: fetchedCompanies[0].companyId,
// //           }));
// //         } else {
// //           toast.error("No companies found. Please create a company first.");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching companies:", error);
// //         toast.error("Failed to fetch companies. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCompanies();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     // Preserve exact input formatting without any modifications
// //     setInput((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!input.company) {
// //       toast.error("Please create a company first");
// //       return;
// //     }

// //     // Create payload with preserved formatting
// //     const payload = {
// //       ...input,
// //       // Ensure description and requirements preserve whitespace and line breaks
// //       description: input.description,
// //       requirements: input.requirements,
// //     };

// //     try {
// //       const response = await axios.post(`${JOB_API_END_POINT}/postjob`, payload, {
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         withCredentials: true,
// //       });

// //       if (response.status) {
// //         navigate("/admin/jobs");
// //         toast.success("Job posted successfully!");
// //       }
// //     } catch (error) {
// //       console.error("Network error:", error);
// //       toast.error("An error occurred. Please try again.");
// //     }
// //   };

// //   const previewJob = {
// //     ...input,
// //     company: selectedCompany,
// //     createdAt: new Date().toISOString(),
// //   };

// //   return (
// //     <div className="">
// //       <Navbar />
// //       <div className="flex justify-center items-center py-10 px-4">
// //         <form
// //           onSubmit={handleSubmit}
// //           className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200 transform transition-transform hover:shadow-2xl hover:scale-101"
// //         >
// //           <Button
// //             onClick={() => navigate("/admin/jobs")}
// //             className="flex items-center gap-2 text-white font-semibold bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 rounded-2xl px-4 py-2"
// //           >
// //             <ArrowLeft />
// //             <span>Back</span>
// //           </Button>
// //           <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-6">
// //             Post Job
// //           </h2>

// //           {loading ? (
// //             <p className="text-center text-blue-500">Loading companies...</p>
// //           ) : (
// //             <>
// //               {companies.length === 0 ? (
// //                 <div className="text-center text-red-500">
// //                   No companies found. Please create a company first.
// //                 </div>
// //               ) : (
// //                 <>
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
// //                     <div>
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Job Title
// //                       </Label>
// //                       <Input
// //                         type="text"
// //                         name="title"
// //                         value={input.title}
// //                         onChange={handleChange}
// //                         placeholder="Enter job title"
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Location
// //                       </Label>
// //                       <Input
// //                         type="text"
// //                         name="location"
// //                         value={input.location}
// //                         onChange={handleChange}
// //                         placeholder="Enter job location"
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// //                       />
// //                     </div>

// //                     <div className="sm:col-span-2">
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Job Description
// //                       </Label>
// //                       <textarea
// //                         name="description"
// //                         value={input.description}
// //                         onChange={handleChange}
// //                         placeholder="Enter detailed job description"
// //                         rows="6"
// //                         // Add white-space: pre-wrap to preserve formatting
// //                         style={{ whiteSpace: "pre-wrap" }}
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base"
// //                       />
// //                     </div>

// //                     <div className="sm:col-span-2">
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Requirements
// //                       </Label>
// //                       <textarea
// //                         name="requirements"
// //                         value={input.requirements}
// //                         onChange={handleChange}
// //                         placeholder="Enter requirements"
// //                         rows="3"
// //                         // Add white-space: pre-wrap to preserve formatting
// //                         style={{ whiteSpace: "pre-wrap" }}
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base"
// //                       />
// //                     </div>

// //                     <div>
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Job Type
// //                       </Label>
// //                       <Select
// //                         onValueChange={(value) =>
// //                           setInput((prev) => ({ ...prev, jobType: value }))
// //                         }
// //                       >
// //                         <SelectTrigger className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150">
// //                           <SelectValue placeholder="Select a Job Type" />
// //                         </SelectTrigger>
// //                         <SelectContent className="bg-white rounded-lg shadow-md">
// //                           {jobTypes.map((type) => (
// //                             <SelectItem key={type} value={type}>
// //                               {type}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
// //                     <div>
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Experience
// //                       </Label>
// //                       <Input
// //                         type="text"
// //                         name="experience"
// //                         value={input.experience}
// //                         onChange={handleChange}
// //                         placeholder="Enter required experience"
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Salary
// //                       </Label>
// //                       <Input
// //                         type="text"
// //                         name="salary"
// //                         value={input.salary}
// //                         onChange={handleChange}
// //                         placeholder="Enter salary"
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// //                       />
// //                     </div>

// //                     <div className="sm:col-span-2 flex justify-center gap-4">
// //                       <Dialog>
// //                         <DialogTrigger className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
// //                           Preview
// //                         </DialogTrigger>
// //                         <DialogContent className="max-w-4xl">
// //                           <DialogHeader>
// //                             <DialogTitle>Job Post Preview</DialogTitle>
// //                           </DialogHeader>
// //                           <div className="mt-4">
// //                             <JobPreview job={previewJob} />
// //                           </div>
// //                         </DialogContent>
// //                       </Dialog>
// //                       <button
// //                         type="submit"
// //                         className="rounded-2xl w-full max-w-xs bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-6 shadow-lg hover:bg-gradient-to-l hover:scale-110 transition-all transform"
// //                       >
// //                         Post Job
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </>
// //               )}
// //             </>
// //           )}
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default PostJob;
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import Navbar from "../shared/Navbar";
// // import { Input } from "../ui/input";
// // import { Label } from "../ui/label";
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectValue,
// //   SelectContent,
// //   SelectItem,
// // } from "../ui/select";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
// // import { toast } from "sonner";
// // import { useNavigate } from "react-router-dom";
// // import JobPreview from "./JobPreview";
// // import { Button } from "../ui/button";
// // import { ArrowLeft, Plus, X } from "lucide-react";

// // function PostJob() {
// //   const navigate = useNavigate();
// //   const [input, setInput] = useState({
// //     title: "",
// //     description: "",
// //     requirements: "",
// //     location: "",
// //     jobType: "",
// //     experience: "",
// //     salary: "",
// //     company: "",
// //   });

// //   const [companies, setCompanies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedCompany, setSelectedCompany] = useState(null);
// //   const [hiringTeam, setHiringTeam] = useState([]);

// //   const jobTypes = [
// //     "Full-Time",
// //     "Part-Time",
// //     "Contract to Hire",
// //     "Internship",
// //     "Freelance",
// //     "Contract",
// //   ];

// //   useEffect(() => {
// //     const fetchCompanies = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
// //           withCredentials: true,
// //         });

// //         if (response.data.status && response.data.companies.length > 0) {
// //           const fetchedCompanies = response.data.companies;
// //           setCompanies(fetchedCompanies);
// //           setSelectedCompany(fetchedCompanies[0]);
// //           setInput((prev) => ({
// //             ...prev,
// //             company: fetchedCompanies[0].companyId,
// //           }));
// //         } else {
// //           toast.error("No companies found. Please create a company first.");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching companies:", error);
// //         toast.error("Failed to fetch companies. Please try again.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCompanies();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setInput((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const addTeamMember = () => {
// //     setHiringTeam([...hiringTeam, { name: "", email: "", position: "", displayInJob: true }]);
// //   };

// //   const removeTeamMember = (index) => {
// //     const newTeam = hiringTeam.filter((_, i) => i !== index);
// //     setHiringTeam(newTeam);
// //   };

// //   const updateTeamMember = (index, field, value) => {
// //     const newTeam = [...hiringTeam];
// //     newTeam[index] = { ...newTeam[index], [field]: value };
// //     setHiringTeam(newTeam);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!input.company) {
// //       toast.error("Please create a company first");
// //       return;
// //     }

// //     const payload = {
// //       ...input,
// //       description: input.description,
// //       requirements: input.requirements,
// //       hiringTeam: JSON.stringify(hiringTeam)
// //     };

// //     try {
// //       const response = await axios.post(`${JOB_API_END_POINT}/postjob`, payload, {
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         withCredentials: true,
// //       });

// //       if (response.status) {
// //         navigate("/admin/jobs");
// //         toast.success("Job posted successfully!");
// //       }
// //     } catch (error) {
// //       console.error("Network error:", error);
// //       toast.error("An error occurred. Please try again.");
// //     }
// //   };

// //   const previewJob = {
// //     ...input,
// //     company: selectedCompany,
// //     hiringTeam,
// //     createdAt: new Date().toISOString(),
// //   };

// //   return (
// //     <div className="">
// //       <Navbar />
// //       <div className="flex justify-center items-center py-10 px-4">
// //         <form
// //           onSubmit={handleSubmit}
// //           className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200 transform transition-transform hover:shadow-2xl hover:scale-101"
// //         >
// //           <Button
// //             onClick={() => navigate("/admin/jobs")}
// //             className="flex items-center gap-2 text-white font-semibold bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 rounded-2xl px-4 py-2"
// //           >
// //             <ArrowLeft />
// //             <span>Back</span>
// //           </Button>
// //           <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-6">
// //             Post Job
// //           </h2>

// //           {loading ? (
// //             <p className="text-center text-blue-500">Loading companies...</p>
// //           ) : (
// //             <>
// //               {companies.length === 0 ? (
// //                 <div className="text-center text-red-500">
// //                   No companies found. Please create a company first.
// //                 </div>
// //               ) : (
// //                 <>
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
// //                   <form
// //           onSubmit={handleSubmit}
// //           className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200 transform transition-transform hover:shadow-2xl hover:scale-101"
// //         >
// //           <Button
// //             onClick={() => navigate("/admin/jobs")}
// //             className="flex items-center gap-2 text-white font-semibold bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 rounded-2xl px-4 py-2"
// //           >
// //             <ArrowLeft />
// //             <span>Back</span>
// //           </Button>
// //           <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-6">
// //             Post Job
// //           </h2>

// //           {loading ? (
// //             <p className="text-center text-blue-500">Loading companies...</p>
// //           ) : (
// //             <>
// //               {companies.length === 0 ? (
// //                 <div className="text-center text-red-500">
// //                   No companies found. Please create a company first.
// //                 </div>
// //               ) : (
// //                 <>
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
// //                     <div>
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Job Title
// //                       </Label>
// //                       <Input
// //                         type="text"
// //                         name="title"
// //                         value={input.title}
// //                         onChange={handleChange}
// //                         placeholder="Enter job title"
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Location
// //                       </Label>
// //                       <Input
// //                         type="text"
// //                         name="location"
// //                         value={input.location}
// //                         onChange={handleChange}
// //                         placeholder="Enter job location"
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// //                       />
// //                     </div>

// //                     <div className="sm:col-span-2">
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Job Description
// //                       </Label>
// //                       <textarea
// //                         name="description"
// //                         value={input.description}
// //                         onChange={handleChange}
// //                         placeholder="Enter detailed job description"
// //                         rows="6"
// //                         // Add white-space: pre-wrap to preserve formatting
// //                         style={{ whiteSpace: "pre-wrap" }}
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base"
// //                       />
// //                     </div>

// //                     <div className="sm:col-span-2">
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Requirements
// //                       </Label>
// //                       <textarea
// //                         name="requirements"
// //                         value={input.requirements}
// //                         onChange={handleChange}
// //                         placeholder="Enter requirements"
// //                         rows="3"
// //                         // Add white-space: pre-wrap to preserve formatting
// //                         style={{ whiteSpace: "pre-wrap" }}
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base"
// //                       />
// //                     </div>

// //                     <div>
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Job Type
// //                       </Label>
// //                       <Select
// //                         onValueChange={(value) =>
// //                           setInput((prev) => ({ ...prev, jobType: value }))
// //                         }
// //                       >
// //                         <SelectTrigger className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150">
// //                           <SelectValue placeholder="Select a Job Type" />
// //                         </SelectTrigger>
// //                         <SelectContent className="bg-white rounded-lg shadow-md">
// //                           {jobTypes.map((type) => (
// //                             <SelectItem key={type} value={type}>
// //                               {type}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
// //                     <div>
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Experience
// //                       </Label>
// //                       <Input
// //                         type="text"
// //                         name="experience"
// //                         value={input.experience}
// //                         onChange={handleChange}
// //                         placeholder="Enter required experience"
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// //                       />
// //                     </div>
// //                     <div>
// //                       <Label className="block text-sm font-semibold text-blue-600 mb-2">
// //                         Salary
// //                       </Label>
// //                       <Input
// //                         type="text"
// //                         name="salary"
// //                         value={input.salary}
// //                         onChange={handleChange}
// //                         placeholder="Enter salary"
// //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
// //                       />
// //                     </div>

// //                     <div className="sm:col-span-2 flex justify-center gap-4">
// //                       <Dialog>
// //                         <DialogTrigger className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
// //                           Preview
// //                         </DialogTrigger>
// //                         <DialogContent className="max-w-4xl">
// //                           <DialogHeader>
// //                             <DialogTitle>Job Post Preview</DialogTitle>
// //                           </DialogHeader>
// //                           <div className="mt-4">
// //                             <JobPreview job={previewJob} />
// //                           </div>
// //                         </DialogContent>
// //                       </Dialog>
// //                       <button
// //                         type="submit"
// //                         className="rounded-2xl w-full max-w-xs bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-6 shadow-lg hover:bg-gradient-to-l hover:scale-110 transition-all transform"
// //                       >
// //                         Post Job
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </>
// //               )}
// //             </>
// //           )}
// //         </form>
// //                     {/* Existing form fields */}
// //                     {/* ... [Previous input fields remain the same until salary] ... */}

// //                     {/* New Hiring Team Section */}
// //                     <div className="sm:col-span-2">
// //                       <div className="flex justify-between items-center mb-4">
// //                         <Label className="text-sm font-semibold text-blue-600">
// //                           Hiring Team
// //                         </Label>
// //                         <Button
// //                           type="button"
// //                           onClick={addTeamMember}
// //                           className="flex items-center gap-2 bg-blue-500 text-white rounded-lg px-3 py-1 hover:bg-blue-600"
// //                         >
// //                           <Plus size={16} />
// //                           Add Member
// //                         </Button>
// //                       </div>

// //                       {hiringTeam.map((member, index) => (
// //                         <div key={index} className="relative bg-gray-50 p-4 rounded-lg mb-4">
// //                           <button
// //                             type="button"
// //                             onClick={() => removeTeamMember(index)}
// //                             className="absolute right-2 top-2 text-gray-500 hover:text-red-500"
// //                           >
// //                             <X size={18} />
// //                           </button>

// //                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //                             <div>
// //                               <Label className="text-sm text-gray-600">Name</Label>
// //                               <Input
// //                                 type="text"
// //                                 value={member.name}
// //                                 onChange={(e) => updateTeamMember(index, "name", e.target.value)}
// //                                 className="mt-1"
// //                                 placeholder="Member's name"
// //                               />
// //                             </div>
// //                             <div>
// //                               <Label className="text-sm text-gray-600">Email</Label>
// //                               <Input
// //                                 type="email"
// //                                 value={member.email}
// //                                 onChange={(e) => updateTeamMember(index, "email", e.target.value)}
// //                                 className="mt-1"
// //                                 placeholder="Email address"
// //                               />
// //                             </div>
// //                             <div>
// //                               <Label className="text-sm text-gray-600">Position</Label>
// //                               <Input
// //                                 type="text"
// //                                 value={member.position}
// //                                 onChange={(e) => updateTeamMember(index, "position", e.target.value)}
// //                                 className="mt-1"
// //                                 placeholder="Job position"
// //                               />
// //                             </div>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>

// //                     <div className="sm:col-span-2 flex justify-center gap-4">
// //                       <Dialog>
// //                         <DialogTrigger className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
// //                           Preview
// //                         </DialogTrigger>
// //                         <DialogContent className="max-w-4xl">
// //                           <DialogHeader>
// //                             <DialogTitle>Job Post Preview</DialogTitle>
// //                           </DialogHeader>
// //                           <div className="mt-4">
// //                             <JobPreview job={previewJob} />
// //                           </div>
// //                         </DialogContent>
// //                       </Dialog>
// //                       <button
// //                         type="submit"
// //                         className="rounded-2xl w-full max-w-xs bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-6 shadow-lg hover:bg-gradient-to-l hover:scale-110 transition-all transform"
// //                       >
// //                         Post Job
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </>
// //               )}
// //             </>
// //           )}
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default PostJob;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, Plus, X } from "lucide-react";
// import { toast } from "sonner";

// import Navbar from "../shared/Navbar";
// import JobPreview from "./JobPreview";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "../ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";

// const jobTypes = [
//   "Full-Time",
//   "Part-Time",
//   "Contract to Hire",
//   "Internship",
//   "Freelance",
//   "Contract",
// ];

// function PostJob() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [hiringTeam, setHiringTeam] = useState([]);
//   const [input, setInput] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     location: "",
//     jobType: "",
//     experience: "",
//     salary: "",
//     company: "",
//   });

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
//           withCredentials: true,
//         });

//         if (response.data.status && response.data.companies.length > 0) {
//           const fetchedCompanies = response.data.companies;
//           setCompanies(fetchedCompanies);
//           setSelectedCompany(fetchedCompanies[0]);
//           setInput(prev => ({ ...prev, company: fetchedCompanies[0].companyId }));
//         } else {
//           toast.error("No companies found. Please create a company first.");
//         }
//       } catch (error) {
//         console.error("Error fetching companies:", error);
//         toast.error("Failed to fetch companies. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInput(prev => ({ ...prev, [name]: value }));
//   };

//   const addTeamMember = () => {
//     setHiringTeam([...hiringTeam, { name: "", email: "", position: "", displayInJob: true }]);
//   };

//   const removeTeamMember = (index) => {
//     setHiringTeam(hiringTeam.filter((_, i) => i !== index));
//   };

//   const updateTeamMember = (index, field, value) => {
//     const newTeam = [...hiringTeam];
//     newTeam[index] = { ...newTeam[index], [field]: value };
//     setHiringTeam(newTeam);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!input.company) {
//       toast.error("Please create a company first");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${JOB_API_END_POINT}/postjob`,
//         {
//           ...input,
//           description: input.description,
//           requirements: input.requirements,
//           hiringTeam: JSON.stringify(hiringTeam)
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       if (response.status) {
//         navigate("/admin/jobs");
//         toast.success("Job posted successfully!");
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   const TextAreaField = ({ label, name, value, onChange, rows = 4 }) => (
//     <div className="space-y-2">
//       <Label className="text-sm font-semibold text-blue-600">{label}</Label>
//       <textarea
//         name={name}
//         value={value}
//         onChange={onChange}
//         rows={rows}
//         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base resize-none"
//         style={{ whiteSpace: "pre-wrap" }}
//       />
//     </div>
//   );

//   const InputField = ({ label, name, type = "text", value, onChange, placeholder }) => (
//     <div className="space-y-2">
//       <Label className="text-sm font-semibold text-blue-600">{label}</Label>
//       <Input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//       />
//     </div>
//   );

//   const previewJob = {
//     ...input,
//     company: selectedCompany,
//     hiringTeam,
//     createdAt: new Date().toISOString(),
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex justify-center items-center h-96">
//           <p className="text-lg text-blue-500">Loading companies...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-4xl mx-auto px-4 py-10">
//         <Button
//           onClick={() => navigate("/admin/jobs")}
//           className="mb-6 flex items-center gap-2 text-white bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 rounded-xl"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to Jobs</span>
//         </Button>

//         {companies.length === 0 ? (
//           <div className="text-center p-8 bg-white rounded-xl shadow">
//             <p className="text-lg text-red-500">No companies found. Please create a company first.</p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6">
//             <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
//               Post New Job
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <InputField
//                 label="Job Title"
//                 name="title"
//                 value={input.title}
//                 onChange={handleChange}
//                 placeholder="Enter job title"
//               />
//               <InputField
//                 label="Location"
//                 name="location"
//                 value={input.location}
//                 onChange={handleChange}
//                 placeholder="Enter job location"
//               />
//             </div>

//             <TextAreaField
//               label="Job Description"
//               name="description"
//               value={input.description}
//               onChange={handleChange}
//               rows={6}
//             />

//             <TextAreaField
//               label="Requirements"
//               name="requirements"
//               value={input.requirements}
//               onChange={handleChange}
//               rows={4}
//             />

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="space-y-2">
//                 <Label className="text-sm font-semibold text-blue-600">Job Type</Label>
//                 <Select
//                   onValueChange={(value) =>
//                     setInput((prev) => ({ ...prev, jobType: value }))
//                   }
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select a Job Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {jobTypes.map((type) => (
//                       <SelectItem key={type} value={type}>
//                         {type}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <InputField
//                 label="Experience"
//                 name="experience"
//                 value={input.experience}
//                 onChange={handleChange}
//                 placeholder="Enter required experience"
//               />

//               <InputField
//                 label="Salary"
//                 name="salary"
//                 value={input.salary}
//                 onChange={handleChange}
//                 placeholder="Enter salary range"
//               />
//             </div>

//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <Label className="text-lg font-semibold text-blue-600">
//                   Hiring Team
//                 </Label>
//                 <Button
//                   type="button"
//                   onClick={addTeamMember}
//                   className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Team Member
//                 </Button>
//               </div>

//               <div className="space-y-4">
//                 {hiringTeam.map((member, index) => (
//                   <div key={index} className="relative bg-gray-50 p-6 rounded-lg">
//                     <button
//                       type="button"
//                       onClick={() => removeTeamMember(index)}
//                       className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <InputField
//                         label="Name"
//                         value={member.name}
//                         onChange={(e) => updateTeamMember(index, "name", e.target.value)}
//                         placeholder="Team member's name"
//                       />
//                       <InputField
//                         label="Email"
//                         type="email"
//                         value={member.email}
//                         onChange={(e) => updateTeamMember(index, "email", e.target.value)}
//                         placeholder="Email address"
//                       />
//                       <InputField
//                         label="Position"
//                         value={member.position}
//                         onChange={(e) => updateTeamMember(index, "position", e.target.value)}
//                         placeholder="Job position"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-center gap-4 pt-6">
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button variant="outline" className="w-32">
//                     Preview
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-4xl">
//                   <DialogHeader>
//                     <DialogTitle>Job Post Preview</DialogTitle>
//                   </DialogHeader>
//                   <div className="mt-4">
//                     <JobPreview job={previewJob} />
//                   </div>
//                 </DialogContent>
//               </Dialog>

//               <Button
//                 type="submit"
//                 className="w-48 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
//               >
//                 Post Job
//               </Button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PostJob;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "sonner";

import Navbar from "../shared/Navbar";
import JobPreview from "./JobPreview";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";

const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Contract to Hire",
  "Internship",
  "Freelance",
  "Contract",
];

function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [hiringTeam, setHiringTeam] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    company: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (response.data.status && response.data.companies.length > 0) {
          const fetchedCompanies = response.data.companies;
          setCompanies(fetchedCompanies);
          setSelectedCompany(fetchedCompanies[0]);
          setInput(prev => ({ ...prev, company: fetchedCompanies[0].companyId }));
        } else {
          toast.error("No companies found. Please create a company first.");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("Failed to fetch companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const addTeamMember = () => {
    setHiringTeam([...hiringTeam, { name: "", email: "", position: "", displayInJob: true }]);
  };

  const removeTeamMember = (index) => {
    setHiringTeam(hiringTeam.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index, field, value) => {
    const newTeam = [...hiringTeam];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setHiringTeam(newTeam);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.company) {
      toast.error("Please create a company first");
      return;
    }

    try {
      const response = await axios.post(
        `${JOB_API_END_POINT}/postjob`,
        {
          ...input,
          description: input.description,
          requirements: input.requirements,
          hiringTeam: JSON.stringify(hiringTeam)
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status) {
        navigate("/admin/jobs");
        toast.success("Job posted successfully!");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const previewJob = {
    ...input,
    company: selectedCompany,
    hiringTeam,
    createdAt: new Date().toISOString(),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-blue-500">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="mb-6 flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </button>

        {companies.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl shadow">
            <p className="text-lg text-red-500">No companies found. Please create a company first.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
              Post New Job
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title - Using standard HTML input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-600">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>

              {/* Location - Using standard HTML input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-600">Location</label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={handleChange}
                  placeholder="Enter job location"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>
            </div>

            {/* Job Description - Using standard HTML textarea */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-blue-600">Job Description</label>
              <textarea
                name="description"
                value={input.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base resize-none"
                style={{ whiteSpace: "pre-wrap" }}
              ></textarea>
            </div>

            {/* Requirements - Using standard HTML textarea */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-blue-600">Requirements</label>
              <textarea
                name="requirements"
                value={input.requirements}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base resize-none"
                style={{ whiteSpace: "pre-wrap" }}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Job Type - Using the original Select component */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-blue-600">Job Type</Label>
                <Select
                  onValueChange={(value) =>
                    setInput((prev) => ({ ...prev, jobType: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience - Using standard HTML input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-600">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={handleChange}
                  placeholder="Enter required experience"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>

              {/* Salary - Using standard HTML input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-600">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={handleChange}
                  placeholder="Enter salary range"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-lg font-semibold text-blue-600">
                  Hiring Team
                </label>
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Team Member
                </button>
              </div>

              <div className="space-y-4">
                {hiringTeam.map((member, index) => (
                  <div key={index} className="relative bg-gray-50 p-6 rounded-lg">
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Name - Using standard HTML input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-blue-600">Name</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                          placeholder="Team member's name"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                      </div>

                      {/* Email - Using standard HTML input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-blue-600">Email</label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                          placeholder="Email address"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                      </div>

                      {/* Position - Using standard HTML input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-blue-600">Position</label>
                        <input
                          type="text"
                          value={member.position}
                          onChange={(e) => updateTeamMember(index, "position", e.target.value)}
                          placeholder="Job position"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="w-32 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
                  >
                    Preview
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Job Post Preview</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <JobPreview job={previewJob} />
                  </div>
                </DialogContent>
              </Dialog>

              <button
                type="submit"
                className="w-48 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg"
              >
                Post Job
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PostJob;