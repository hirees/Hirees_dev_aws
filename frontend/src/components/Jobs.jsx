// // // // // import { useSelector } from "react-redux";
// // // // // import FilterCard from "./FilterCard";
// // // // // import Job from "./Job";
// // // // // import Navbar from "./shared/Navbar";
// // // // // import useGetAllJobs from "@/hooks/useGetAllJobs";

// // // // // function Jobs() {
// // // // //     const { error } = useGetAllJobs();
// // // // //     const { filteredJobs, searchQuery } = useSelector((state) => state.job);

// // // // //     return (
// // // // //         <div>
// // // // //             <Navbar />
// // // // //             <div className="max-w-7xl mx-auto mt-5">
// // // // //                 <div className="flex gap-5">
// // // // //                     <div className="w-1/5">
// // // // //                         <FilterCard />
// // // // //                     </div>
// // // // //                     <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
// // // // //                         {error ? (
// // // // //                             <div className="flex items-center justify-center h-full">
// // // // //                                 <span className="text-red-500">Error: {error.message}</span>
// // // // //                             </div>
// // // // //                         ) : filteredJobs.length === 0 ? (
// // // // //                             <div className="flex items-center justify-center h-full">
// // // // //                                 <span className="text-gray-500 text-lg">
// // // // //                                     {searchQuery ? "No jobs match your search criteria" : "No jobs found"}
// // // // //                                 </span>
// // // // //                             </div>
// // // // //                         ) : (
// // // // //                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // //                                 {filteredJobs.map((job) => (
// // // // //                                     <div key={job._id}>
// // // // //                                         <Job job={job} />
// // // // //                                     </div>
// // // // //                                 ))}
// // // // //                             </div>
// // // // //                         )}
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // export default Jobs;





// // // // // import React, { useState, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import { JOB_API_END_POINT } from "@/utils/constant";
// // // // // import FilterCard from "./FilterCard";
// // // // // import Job from "./Job";
// // // // // import Navbar from "./shared/Navbar";
// // // // // import { Search } from "lucide-react";

// // // // // class ErrorBoundary extends React.Component {
// // // // //     constructor(props) {
// // // // //         super(props);
// // // // //         this.state = { hasError: false, error: null };
// // // // //     }

// // // // //     static getDerivedStateFromError(error) {
// // // // //         return { hasError: true, error };
// // // // //     }

// // // // //     render() {
// // // // //         if (this.state.hasError) {
// // // // //             return (
// // // // //                 <div className="flex items-center justify-center min-h-screen bg-gray-50">
// // // // //                     <div className="text-center p-8 bg-white rounded-lg shadow-lg">
// // // // //                         <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
// // // // //                         <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
// // // // //                         <button
// // // // //                             onClick={() => window.location.reload()}
// // // // //                             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
// // // // //                         >
// // // // //                             Refresh Page
// // // // //                         </button>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             );
// // // // //         }
// // // // //         return this.props.children;
// // // // //     }
// // // // // }

// // // // // function Jobs() {
// // // // //   const [jobs, setJobs] = useState([]);
// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // //   const [locationQuery, setLocationQuery] = useState("");
// // // // //   const [activeFilters, setActiveFilters] = useState({
// // // // //       timeRange: "",
// // // // //       jobType: "",
// // // // //       salary: ""
// // // // //   });
// // // // //     useEffect(() => {
// // // // //         fetchJobs();
// // // // //     },  [searchQuery, locationQuery, activeFilters]);

// // // // //     const fetchJobs = async () => {
// // // // //       try {
// // // // //           setIsLoading(true);
// // // // //           // Build query parameters
// // // // //           const params = new URLSearchParams({
// // // // //               keyword: searchQuery,
// // // // //               location: locationQuery,
// // // // //               timeRange: activeFilters.timeRange,
// // // // //               jobType: activeFilters.jobType,
// // // // //               salary: activeFilters.salary
// // // // //           });

// // // // //           const res = await axios.get(`${JOB_API_END_POINT}/get?${params}`, {
// // // // //               withCredentials: true
// // // // //           });

// // // // //           const jobsData = Array.isArray(res.data) ? res.data : res.data.jobs || [];
// // // // //           setJobs(jobsData);
// // // // //       } catch (err) {
// // // // //           setError(err.message);
// // // // //       } finally {
// // // // //           setIsLoading(false);
// // // // //       }
// // // // //   };


// // // // //     const filterJobs = (filters) => {
// // // // //         setActiveFilters(filters);
// // // // //         let filtered = [...jobs];

// // // // //         if (searchQuery) {
// // // // //             filtered = filtered.filter(job =>
// // // // //                 job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // //                 job.description?.toLowerCase().includes(searchQuery.toLowerCase())
// // // // //             );
// // // // //         }

// // // // //         if (locationQuery) {
// // // // //             filtered = filtered.filter(job =>
// // // // //                 job.location?.toLowerCase().includes(locationQuery.toLowerCase())
// // // // //             );
// // // // //         }

// // // // //         if (filters.timeRange) {
// // // // //             const now = new Date();
// // // // //             filtered = filtered.filter(job => {
// // // // //                 const jobDate = new Date(job.createdAt);
// // // // //                 const daysDiff = (now - jobDate) / (1000 * 60 * 60 * 24);
// // // // //                 switch (filters.timeRange) {
// // // // //                     case "today": return daysDiff < 1;
// // // // //                     case "yesterday": return daysDiff >= 1 && daysDiff < 2;
// // // // //                     case "last3days": return daysDiff < 3;
// // // // //                     case "last7days": return daysDiff < 7;
// // // // //                     default: return true;
// // // // //                 }
// // // // //             });
// // // // //         }

// // // // //         if (filters.jobType) {
// // // // //             filtered = filtered.filter(job => job.jobType === filters.jobType);
// // // // //         }

// // // // //         if (filters.salary) {
// // // // //             const [min, max] = filters.salary.split("-").map(Number);
// // // // //             filtered = filtered.filter(job => {
// // // // //                 const salary = parseInt(job.salary);
// // // // //                 if (max) {
// // // // //                     return salary >= min * 1000 && salary <= max * 1000;
// // // // //                 }
// // // // //                 return salary >= min * 1000;
// // // // //             });
// // // // //         }

// // // // //         setFilteredJobs(filtered);
// // // // //     };

// // // // //     const handleSearch = (e) => {
// // // // //         setSearchQuery(e.target.value);
// // // // //         filterJobs(activeFilters);
// // // // //     };

// // // // //     const handleLocationSearch = (e) => {
// // // // //         setLocationQuery(e.target.value);
// // // // //         filterJobs(activeFilters);
// // // // //     };

// // // // //     if (isLoading) {
// // // // //         return (
// // // // //             <div className="flex items-center justify-center min-h-screen">
// // // // //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // // // //             </div>
// // // // //         );
// // // // //     }

// // // // //     return (
// // // // //         <ErrorBoundary>
// // // // //             <div className="min-h-screen bg-gray-50">
// // // // //                 <Navbar />
// // // // //                 <div className="max-w-7xl mx-auto px-4 py-8">
// // // // //                     <div className="grid gap-6">
// // // // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                             <div className="relative">
// // // // //                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // // // //                                 <input
// // // // //                                     type="text"
// // // // //                                     placeholder="Search jobs by title or description"
// // // // //                                     className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // // //                                     value={searchQuery}
// // // // //                                     onChange={handleSearch}
// // // // //                                 />
// // // // //                             </div>
// // // // //                             <div className="relative">
// // // // //                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // // // //                                 <input
// // // // //                                     type="text"
// // // // //                                     placeholder="Search by location"
// // // // //                                     className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // // //                                     value={locationQuery}
// // // // //                                     onChange={handleLocationSearch}
// // // // //                                 />
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         <div className="grid grid-cols-4 gap-6">
// // // // //                             <div className="col-span-1">
// // // // //                                 <FilterCard onFilterChange={filterJobs} />
// // // // //                             </div>
// // // // //                             <div className="col-span-3">
// // // // //                                 {error ? (
// // // // //                                     <div className="bg-red-50 p-4 rounded-lg">
// // // // //                                         <p className="text-red-600">Error: {error}</p>
// // // // //                                     </div>
// // // // //                                 ) : filteredJobs.length === 0 ? (
// // // // //                                     <div className="bg-white p-8 rounded-lg shadow text-center">
// // // // //                                         <p className="text-gray-500 text-lg">
// // // // //                                             No jobs match your search criteria
// // // // //                                         </p>
// // // // //                                     </div>
// // // // //                                 ) : (
// // // // //                                     <div className="space-y-4">
// // // // //                                         {filteredJobs.map((job) => (
// // // // //                                             <div key={job._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
// // // // //                                                 <Job job={job} />
// // // // //                                             </div>
// // // // //                                         ))}
// // // // //                                     </div>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </ErrorBoundary>
// // // // //     );
// // // // // }

// // // // // export default Jobs;
// // // // // import React, { useState, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import { JOB_API_END_POINT } from "@/utils/constant";
// // // // // import FilterCard from "./FilterCard";
// // // // // import Job from "./Job";
// // // // // import Navbar from "./shared/Navbar";
// // // // // import { Search } from "lucide-react";

// // // // // function Jobs() {
// // // // //     const [jobs, setJobs] = useState([]);
// // // // //     const [isLoading, setIsLoading] = useState(false);
// // // // //     const [error, setError] = useState(null);
// // // // //     const [searchQuery, setSearchQuery] = useState("");
// // // // //     const [locationQuery, setLocationQuery] = useState("");

// // // // //     const fetchJobs = async (filters = {}) => {
// // // // //         setIsLoading(true);
// // // // //         try {
// // // // //             const queryParams = new URLSearchParams();
// // // // //             if (searchQuery) queryParams.append('keyword', searchQuery);
// // // // //             if (locationQuery) queryParams.append('location', locationQuery);
// // // // //             if (filters.timeRange) queryParams.append('timeRange', filters.timeRange);
// // // // //             if (filters.jobType) queryParams.append('jobType', filters.jobType);
// // // // //             if (filters.salary) queryParams.append('salary', filters.salary);

// // // // //             const response = await axios.get(`${JOB_API_END_POINT}/get?${queryParams.toString()}`, {
// // // // //                 withCredentials: true
// // // // //             });

// // // // //             const jobsData = response.data?.jobs || [];
// // // // //             setJobs(jobsData);
// // // // //             setError(null);
// // // // //         } catch (err) {
// // // // //             console.error("Error fetching jobs:", err);
// // // // //             setError(err.message);
// // // // //         } finally {
// // // // //             setIsLoading(false);
// // // // //         }
// // // // //     };

// // // // //     // Initial fetch
// // // // //     useEffect(() => {
// // // // //         fetchJobs();
// // // // //     }, []);

// // // // //     const handleSearchChange = (e) => {
// // // // //         setSearchQuery(e.target.value);
// // // // //     };

// // // // //     const handleLocationChange = (e) => {
// // // // //         setLocationQuery(e.target.value);
// // // // //     };

// // // // //     // Debounced search effect
// // // // //     useEffect(() => {
// // // // //         const timer = setTimeout(() => {
// // // // //             fetchJobs();
// // // // //         }, 500);

// // // // //         return () => clearTimeout(timer);
// // // // //     }, [searchQuery, locationQuery]);

// // // // //     const handleFilterChange = (newFilters) => {
// // // // //         fetchJobs(newFilters);
// // // // //     };

// // // // //     return (
// // // // //         <div className="min-h-screen bg-gray-50">
// // // // //             <Navbar />
// // // // //             <div className="max-w-7xl mx-auto px-4 py-8">
// // // // //                 <div className="grid gap-6">
// // // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                         <div className="relative">
// // // // //                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // // // //                             <input
// // // // //                                 type="text"
// // // // //                                 placeholder="Search jobs by title or description"
// // // // //                                 className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // // //                                 value={searchQuery}
// // // // //                                 onChange={handleSearchChange}
// // // // //                             />
// // // // //                         </div>
// // // // //                         <div className="relative">
// // // // //                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // // // //                             <input
// // // // //                                 type="text"
// // // // //                                 placeholder="Search by location"
// // // // //                                 className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // // //                                 value={locationQuery}
// // // // //                                 onChange={handleLocationChange}
// // // // //                             />
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     <div className="grid grid-cols-4 gap-6">
// // // // //                         <div className="col-span-1">
// // // // //                             <FilterCard onFilterChange={handleFilterChange} />
// // // // //                         </div>
// // // // //                         <div className="col-span-3">
// // // // //                             {isLoading ? (
// // // // //                                 <div className="flex justify-center items-center h-48">
// // // // //                                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // // // //                                 </div>
// // // // //                             ) : error ? (
// // // // //                                 <div className="bg-red-50 p-4 rounded-lg">
// // // // //                                     <p className="text-red-600">Error: {error}</p>
// // // // //                                 </div>
// // // // //                             ) : jobs.length === 0 ? (
// // // // //                                 <div className="bg-white p-8 rounded-lg shadow text-center">
// // // // //                                     <p className="text-gray-500 text-lg">
// // // // //                                         No jobs match your search criteria
// // // // //                                     </p>
// // // // //                                 </div>
// // // // //                             ) : (
// // // // //                                 <div className="space-y-4">
// // // // //                                     {jobs.map((job) => (
// // // // //                                         <div key={job._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
// // // // //                                             <Job job={job} />
// // // // //                                         </div>
// // // // //                                     ))}
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // export default Jobs;

// // // // // // FilterCard.js - Updated to prevent form submission
// // // // // function FilterCard({ onFilterChange }) {
// // // // //     const [filters, setFilters] = useState({
// // // // //         timeRange: "",
// // // // //         jobType: "",
// // // // //         salary: "",
// // // // //     });

// // // // //     const handleChange = (filterKey, value) => {
// // // // //         const updatedFilters = {
// // // // //             ...filters,
// // // // //             [filterKey]: filters[filterKey] === value ? "" : value,
// // // // //         };
// // // // //         setFilters(updatedFilters);
// // // // //         onFilterChange(updatedFilters);
// // // // //     };

// // // // //     const handleClearAll = (e) => {
// // // // //         e.preventDefault(); // Prevent form submission
// // // // //         const clearedFilters = { timeRange: "", jobType: "", salary: "" };
// // // // //         setFilters(clearedFilters);
// // // // //         onFilterChange(clearedFilters);
// // // // //     };

// // // // //     return (
// // // // //         <div className="w-full bg-white shadow-md rounded-lg p-6">
// // // // //             <div className="flex justify-between items-center mb-4">
// // // // //                 <h1 className="text-xl font-bold text-gray-800">Filter Jobs</h1>
// // // // //                 <button
// // // // //                     type="button" // Explicitly set button type
// // // // //                     onClick={handleClearAll}
// // // // //                     className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
// // // // //                 >
// // // // //                     <XCircle className="w-4 h-4" />
// // // // //                     Clear All
// // // // //                 </button>
// // // // //             </div>
// // // // //             {/* Rest of the FilterCard component remains the same */}
// // // // //         </div>
// // // // //     );
// // // // // }
// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import { JOB_API_END_POINT } from "@/utils/constant";
// // // // import FilterCard from "./FilterCard";
// // // // import Job from "./Job";
// // // // import Navbar from "./shared/Navbar";
// // // // import { Search } from "lucide-react";

// // // // function Jobs() {
// // // //     const [jobs, setJobs] = useState([]);
// // // //     const [isLoading, setIsLoading] = useState(false);
// // // //     const [error, setError] = useState(null);
// // // //     const [searchQuery, setSearchQuery] = useState("");
// // // //     const [locationQuery, setLocationQuery] = useState("");

// // // //     const fetchJobs = async (filters = {}) => {
// // // //         setIsLoading(true);
// // // //         try {
// // // //             const queryParams = new URLSearchParams();
// // // //             if (searchQuery) queryParams.append('keyword', searchQuery);
// // // //             if (locationQuery) queryParams.append('location', locationQuery);
// // // //             if (filters.timeRange) queryParams.append('timeRange', filters.timeRange);
// // // //             if (filters.jobType) queryParams.append('jobType', filters.jobType);
// // // //             if (filters.salary) queryParams.append('salary', filters.salary);

// // // //             const response = await axios.get(`${JOB_API_END_POINT}/get?${queryParams.toString()}`, {
// // // //                 withCredentials: true
// // // //             });

// // // //             const jobsData = response.data?.jobs || [];
// // // //             setJobs(jobsData);
// // // //             setError(null);
// // // //         } catch (err) {
// // // //             console.error("Error fetching jobs:", err);
// // // //             setError(err.message);
// // // //         } finally {
// // // //             setIsLoading(false);
// // // //         }
// // // //     };

// // // //     // Initial fetch
// // // //     useEffect(() => {
// // // //         fetchJobs();
// // // //     }, []);

// // // //     const handleSearchChange = (e) => {
// // // //         setSearchQuery(e.target.value);
// // // //     };

// // // //     const handleLocationChange = (e) => {
// // // //         setLocationQuery(e.target.value);
// // // //     };

// // // //     // Debounced search effect
// // // //     useEffect(() => {
// // // //         const timer = setTimeout(() => {
// // // //             fetchJobs();
// // // //         }, 500);

// // // //         return () => clearTimeout(timer);
// // // //     }, [searchQuery, locationQuery]);

// // // //     const handleFilterChange = (newFilters) => {
// // // //         fetchJobs(newFilters);
// // // //     };

// // // //     return (
// // // //         <div className="min-h-screen bg-gray-50">
// // // //             <Navbar />
// // // //             <div className="max-w-7xl mx-auto px-4 py-8">
// // // //                 <div className="grid gap-6">
// // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                         <div className="relative">
// // // //                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // // //                             <input
// // // //                                 type="text"
// // // //                                 placeholder="Search jobs by title or description"
// // // //                                 className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //                                 value={searchQuery}
// // // //                                 onChange={handleSearchChange}
// // // //                             />
// // // //                         </div>
// // // //                         <div className="relative">
// // // //                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // // //                             <input
// // // //                                 type="text"
// // // //                                 placeholder="Search by location"
// // // //                                 className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //                                 value={locationQuery}
// // // //                                 onChange={handleLocationChange}
// // // //                             />
// // // //                         </div>
// // // //                     </div>

// // // //                     <div className="grid grid-cols-4 gap-6">
// // // //                         <div className="col-span-1">
// // // //                             <FilterCard onFilterChange={handleFilterChange} />
// // // //                         </div>
// // // //                         <div className="col-span-3">
// // // //                             {isLoading ? (
// // // //                                 <div className="flex justify-center items-center h-48">
// // // //                                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // // //                                 </div>
// // // //                             ) : error ? (
// // // //                                 <div className="bg-red-50 p-4 rounded-lg">
// // // //                                     <p className="text-red-600">Error: {error}</p>
// // // //                                 </div>
// // // //                             ) : jobs.length === 0 ? (
// // // //                                 <div className="bg-white p-8 rounded-lg shadow text-center">
// // // //                                     <p className="text-gray-500 text-lg">
// // // //                                         No jobs match your search criteria
// // // //                                     </p>
// // // //                                 </div>
// // // //                             ) : (
// // // //                                 <div className="space-y-4">
// // // //                                     {jobs.map((job) => (
// // // //                                         <div key={job._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
// // // //                                             <Job job={job} />
// // // //                                         </div>
// // // //                                     ))}
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default Jobs;
// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import { JOB_API_END_POINT } from "@/utils/constant";
// // // // import FilterCard from "./FilterCard";
// // // // import Job from "./Job";
// // // // import Navbar from "./shared/Navbar";
// // // // import { Search } from "lucide-react";

// // // // function Jobs() {
// // // //     const [jobs, setJobs] = useState([]);
// // // //     const [isLoading, setIsLoading] = useState(false);
// // // //     const [error, setError] = useState(null);
// // // //     const [searchQuery, setSearchQuery] = useState("");
// // // //     const [locationQuery, setLocationQuery] = useState("");
// // // //     const [filters, setFilters] = useState({});

// // // //     const fetchJobs = async () => {
// // // //         setIsLoading(true);
// // // //         try {
// // // //             const queryParams = new URLSearchParams();
// // // //             if (searchQuery) queryParams.append('keyword', searchQuery);
// // // //             if (locationQuery) queryParams.append('location', locationQuery);
// // // //             if (filters.timeRange) queryParams.append('timeRange', filters.timeRange);
// // // //             if (filters.jobType) queryParams.append('jobType', filters.jobType);
// // // //             if (filters.salary) queryParams.append('salary', filters.salary);

// // // //             const response = await axios.get(`${JOB_API_END_POINT}/get?${queryParams.toString()}`, {
// // // //                 withCredentials: true
// // // //             });

// // // //             const jobsData = response.data?.jobs || [];
// // // //             setJobs(jobsData);
// // // //             setError(null);
// // // //         } catch (err) {
// // // //             console.error("Error fetching jobs:", err);
// // // //             setError(err.message);
// // // //         } finally {
// // // //             setIsLoading(false);
// // // //         }
// // // //     };

// // // //     // Initial fetch
// // // //     useEffect(() => {
// // // //         fetchJobs();
// // // //     }, []);

// // // //     const handleSearchChange = (e) => {
// // // //         setSearchQuery(e.target.value);
// // // //     };

// // // //     const handleLocationChange = (e) => {
// // // //         setLocationQuery(e.target.value);
// // // //     };

// // // //     const handleFilterChange = (newFilters) => {
// // // //         setFilters(newFilters);
// // // //         fetchJobs();
// // // //     };

// // // //     const handleSearchClick = () => {
// // // //         fetchJobs();
// // // //     };

// // // //     return (
// // // //         <div className="min-h-screen bg-gray-50">
// // // //             <Navbar />
// // // //             <div className="max-w-7xl mx-auto px-4 py-8">
// // // //                 <div className="grid gap-6">
// // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                         <div className="relative">
// // // //                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // // //                             <input
// // // //                                 type="text"
// // // //                                 placeholder="Search jobs by title or description"
// // // //                                 className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //                                 value={searchQuery}
// // // //                                 onChange={handleSearchChange}
// // // //                             />
// // // //                         </div>
// // // //                         <div className="relative">
// // // //                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // // //                             <input
// // // //                                 type="text"
// // // //                                 placeholder="Search by location"
// // // //                                 className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // // //                                 value={locationQuery}
// // // //                                 onChange={handleLocationChange}
// // // //                             />
// // // //                         </div>
// // // //                     </div>

// // // //                     <div className="flex justify-end">
// // // //                         <button
// // // //                             onClick={handleSearchClick}
// // // //                             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// // // //                         >
// // // //                             Search Jobs
// // // //                         </button>
// // // //                     </div>

// // // //                     <div className="grid grid-cols-4 gap-6">
// // // //                         <div className="col-span-1">
// // // //                             <FilterCard onFilterChange={handleFilterChange} />
// // // //                         </div>
// // // //                         <div className="col-span-3">
// // // //                             {isLoading ? (
// // // //                                 <div className="flex justify-center items-center h-48">
// // // //                                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // // //                                 </div>
// // // //                             ) : error ? (
// // // //                                 <div className="bg-red-50 p-4 rounded-lg">
// // // //                                     <p className="text-red-600">Error: {error}</p>
// // // //                                 </div>
// // // //                             ) : jobs.length === 0 ? (
// // // //                                 <div className="bg-white p-8 rounded-lg shadow text-center">
// // // //                                     <p className="text-gray-500 text-lg">
// // // //                                         No jobs match your search criteria
// // // //                                     </p>
// // // //                                 </div>
// // // //                             ) : (
// // // //                                 <div className="space-y-4">
// // // //                                     {jobs.map((job) => (
// // // //                                         <div key={job._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
// // // //                                             <Job job={job} />
// // // //                                         </div>
// // // //                                     ))}
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default Jobs;
// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { JOB_API_END_POINT } from "@/utils/constant";
// // // import FilterCard from "./FilterCard";
// // // import Job from "./Job";
// // // import Navbar from "./shared/Navbar";
// // // import { Search, MapPin } from "lucide-react";

// // // function Jobs() {
// // //     const [jobs, setJobs] = useState([]);
// // //     const [isLoading, setIsLoading] = useState(false);
// // //     const [error, setError] = useState(null);
// // //     const [searchQuery, setSearchQuery] = useState("");
// // //     const [locationQuery, setLocationQuery] = useState("");
// // //     const [filters, setFilters] = useState({});

// // //     const fetchJobs = async () => {
// // //         setIsLoading(true);
// // //         try {
// // //             const queryParams = new URLSearchParams();
// // //             if (searchQuery) queryParams.append('keyword', searchQuery);
// // //             if (locationQuery) queryParams.append('location', locationQuery);
// // //             if (filters.timeRange) queryParams.append('timeRange', filters.timeRange);
// // //             if (filters.jobType) queryParams.append('jobType', filters.jobType);

// // //             const response = await axios.get(`${JOB_API_END_POINT}/get?${queryParams.toString()}`, {
// // //                 withCredentials: true
// // //             });

// // //             const jobsData = response.data?.jobs || [];
// // //             setJobs(jobsData);
// // //             setError(null);
// // //         } catch (err) {
// // //             console.error("Error fetching jobs:", err);
// // //             setError(err.message);
// // //         } finally {
// // //             setIsLoading(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         fetchJobs();
// // //     }, []);

// // //     const handleSearchChange = (e) => setSearchQuery(e.target.value);
// // //     const handleLocationChange = (e) => setLocationQuery(e.target.value);
// // //     const handleFilterChange = (newFilters) => {
// // //         setFilters(newFilters);
// // //         fetchJobs();
// // //     };

// // //     return (
// // //         <div className="min-h-screen bg-gray-50">
// // //             <Navbar />
// // //             <div className="max-w-7xl mx-auto px-4 py-8">
// // //                 <div className="space-y-6">
// // //                     {/* Search Section */}
// // //                     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
// // //                         <div className="flex gap-3 items-center">
// // //                             <div className="relative flex-1">
// // //                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // //                                 <input
// // //                                     type="text"
// // //                                     placeholder="Search jobs by title or description"
// // //                                     className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                                     value={searchQuery}
// // //                                     onChange={handleSearchChange}
// // //                                 />
// // //                             </div>
// // //                             <div className="relative flex-1">
// // //                                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // //                                 <input
// // //                                     type="text"
// // //                                     placeholder="Search by location"
// // //                                     className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                                     value={locationQuery}
// // //                                     onChange={handleLocationChange}
// // //                                 />
// // //                             </div>
// // //                             <button
// // //                                 onClick={fetchJobs}
// // //                                 className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap font-medium"
// // //                             >
// // //                                 Search Jobs
// // //                             </button>
// // //                         </div>
// // //                     </div>

// // //                     {/* Content Grid */}
// // //                     <div className="grid grid-cols-4 gap-6">
// // //                         {/* Filters */}
// // //                         <div className="col-span-1">
// // //                             <FilterCard onFilterChange={handleFilterChange} />
// // //                         </div>

// // //                         {/* Jobs List */}
// // //                         <div className="col-span-3">
// // //                             {isLoading ? (
// // //                                 <div className="flex justify-center items-center h-48">
// // //                                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // //                                 </div>
// // //                             ) : error ? (
// // //                                 <div className="bg-white p-4 rounded-lg border border-red-100">
// // //                                     <p className="text-red-600">Error: {error}</p>
// // //                                 </div>
// // //                             ) : jobs.length === 0 ? (
// // //                                 <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
// // //                                     <p className="text-gray-600 text-lg">
// // //                                         No jobs match your search criteria
// // //                                     </p>
// // //                                 </div>
// // //                             ) : (
// // //                                 <div className="space-y-4">
// // //                                     {jobs.map((job) => (
// // //                                         <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
// // //                                             <Job job={job} />
// // //                                         </div>
// // //                                     ))}
// // //                                 </div>
// // //                             )}
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default Jobs;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { JOB_API_END_POINT } from "@/utils/constant";
// // import Job from "./Job";
// // import Navbar from "./shared/Navbar";
// // import { Search, MapPin, CalendarDays, Clock, XCircle } from "lucide-react";

// // const VALID_JOB_TYPES = [
// //     "Full-Time",
// //     "Part-Time",
// //     "Internship",
// //     "Freelance",
// //     "Contract",
// //     "Contract to Hire",
// // ];

// // function Jobs() {
// //     const [jobState, setJobState] = useState({
// //         jobs: [],
// //         isLoading: false,
// //         error: null,
// //         searchInputs: {
// //             keyword: "",
// //             location: ""
// //         },
// //         filters: {
// //             timeRange: "",
// //             jobType: ""
// //         }
// //     });

// //     const filterData = [
// //         {
// //             name: "Time Range",
// //             options: [
// //                 {
// //                     label: "Today",
// //                     value: "today",
// //                     icon: <Clock className="w-4 h-4 text-blue-600" />,
// //                 },
// //                 {
// //                     label: "Last 3 Days",
// //                     value: "last3days",
// //                     icon: <Clock className="w-4 h-4 text-blue-600" />,
// //                 },
// //                 {
// //                     label: "Last 7 Days",
// //                     value: "last7days",
// //                     icon: <Clock className="w-4 h-4 text-blue-600" />,
// //                 },
// //             ],
// //             filterKey: "timeRange",
// //         },
// //         {
// //             name: "Job Type",
// //             options: [
// //                 {
// //                     label: "Full Time",
// //                     value: "Full-Time",
// //                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
// //                 },
// //                 {
// //                     label: "Contract",
// //                     value: "Contract",
// //                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
// //                 },
// //                 {
// //                     label: "Contract to Hire",
// //                     value: "Contract to Hire",
// //                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
// //                 },
// //                 {
// //                     label: "Part Time",
// //                     value: "Part-Time",
// //                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
// //                 },
// //                 {
// //                     label: "Internship",
// //                     value: "Internship",
// //                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
// //                 },
// //                 {
// //                     label: "Freelance",
// //                     value: "Freelance",
// //                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
// //                 },
// //             ],
// //             filterKey: "jobType",
// //         },
// //     ];

// //     const fetchJobs = async () => {
// //         setJobState(prev => ({ ...prev, isLoading: true }));
// //         try {
// //             const queryParams = new URLSearchParams();

// //             // Add search inputs
// //             Object.entries(jobState.searchInputs).forEach(([key, value]) => {
// //                 if (value) queryParams.append(key, value);
// //             });

// //             // Add filters
// //             Object.entries(jobState.filters).forEach(([key, value]) => {
// //                 if (value) queryParams.append(key, value);
// //             });

// //             const response = await axios.get(`${JOB_API_END_POINT}/get?${queryParams.toString()}`, {
// //                 withCredentials: true
// //             });

// //             setJobState(prev => ({
// //                 ...prev,
// //                 jobs: response.data?.jobs || [],
// //                 error: null,
// //                 isLoading: false
// //             }));
// //         } catch (err) {
// //             console.error("Error fetching jobs:", err);
// //             setJobState(prev => ({
// //                 ...prev,
// //                 error: err.message,
// //                 isLoading: false
// //             }));
// //         }
// //     };

// //     // Effect to fetch jobs when sidebar filters change
// //     useEffect(() => {
// //         fetchJobs();
// //     }, [jobState.filters]);

// //     const handleSearchInputChange = (key, value) => {
// //         setJobState(prev => ({
// //             ...prev,
// //             searchInputs: {
// //                 ...prev.searchInputs,
// //                 [key]: value
// //             }
// //         }));
// //     };

// //     const handleFilterChange = (filterKey, value) => {
// //         if (filterKey === "jobType" && !VALID_JOB_TYPES.includes(value)) {
// //             console.warn(`Invalid job type selected: ${value}`);
// //             return;
// //         }

// //         setJobState(prev => ({
// //             ...prev,
// //             filters: {
// //                 ...prev.filters,
// //                 [filterKey]: value === prev.filters[filterKey] ? "" : value
// //             }
// //         }));
// //     };

// //     const handleClearFilters = (e) => {
// //         e.preventDefault();
// //         setJobState(prev => ({
// //             ...prev,
// //             searchInputs: {
// //                 keyword: "",
// //                 location: ""
// //             },
// //             filters: {
// //                 timeRange: "",
// //                 jobType: ""
// //             }
// //         }));
// //     };

// //     const isAnyFilterApplied = Object.values(jobState.filters).some(value => value !== "") ||
// //                               Object.values(jobState.searchInputs).some(value => value !== "");

// //     return (
// //         <div className="min-h-screen bg-gray-50">
// //             <Navbar />
// //             <div className="max-w-7xl mx-auto px-4 py-8">
// //                 <div className="space-y-6">
// //                     {/* Search Section */}
// //                     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
// //                         <div className="flex gap-3 items-center">
// //                             <div className="relative flex-1">
// //                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Search jobs by title or description"
// //                                     className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                                     value={jobState.searchInputs.keyword}
// //                                     onChange={(e) => handleSearchInputChange('keyword', e.target.value)}
// //                                 />
// //                             </div>
// //                             <div className="relative flex-1">
// //                                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Search by location"
// //                                     className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                                     value={jobState.searchInputs.location}
// //                                     onChange={(e) => handleSearchInputChange('location', e.target.value)}
// //                                 />
// //                             </div>
// //                             <button
// //                                 onClick={fetchJobs}
// //                                 className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap font-medium"
// //                             >
// //                                 Search Jobs
// //                             </button>
// //                         </div>
// //                     </div>

// //                     {/* Content Grid */}
// //                     <div className="grid grid-cols-4 gap-6">
// //                         {/* Filters */}
// //                         <div className="col-span-1">
// //                             <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //                                 <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
// //                                     <h1 className="text-lg font-semibold text-gray-900">Filters</h1>
// //                                     {isAnyFilterApplied && (
// //                                         <button
// //                                             onClick={handleClearFilters}
// //                                             className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 group"
// //                                         >
// //                                             <XCircle className="w-4 h-4" />
// //                                             Clear filters
// //                                         </button>
// //                                     )}
// //                                 </div>

// //                                 <div className="space-y-6">
// //                                     {filterData.map((filter) => (
// //                                         <div key={filter.name}>
// //                                             <h2 className="text-sm font-medium text-gray-700 mb-3">
// //                                                 {filter.name}
// //                                             </h2>
// //                                             <div className="flex flex-col space-y-2">
// //                                                 {filter.options.map((option) => {
// //                                                     const isSelected = jobState.filters[filter.filterKey] === option.value;
// //                                                     return (
// //                                                         <button
// //                                                             key={option.value}
// //                                                             onClick={() => handleFilterChange(filter.filterKey, option.value)}
// //                                                             className={`
// //                                                                 flex items-center gap-2 px-3 py-2 rounded-md text-sm
// //                                                                 transition-all duration-200 border w-full justify-start
// //                                                                 ${
// //                                                                     isSelected
// //                                                                         ? "bg-blue-50 border-blue-200 text-blue-700 font-medium"
// //                                                                         : "bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/50"
// //                                                                 }
// //                                                             `}
// //                                                         >
// //                                                             {option.icon}
// //                                                             {option.label}
// //                                                         </button>
// //                                                     );
// //                                                 })}
// //                                             </div>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         {/* Jobs List */}
// //                         <div className="col-span-3">
// //                             {jobState.isLoading ? (
// //                                 <div className="flex justify-center items-center h-48">
// //                                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //                                 </div>
// //                             ) : jobState.error ? (
// //                                 <div className="bg-white p-4 rounded-lg border border-red-100">
// //                                     <p className="text-red-600">Error: {jobState.error}</p>
// //                                 </div>
// //                             ) : jobState.jobs.length === 0 ? (
// //                                 <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
// //                                     <p className="text-gray-600 text-lg">
// //                                         No jobs match your search criteria
// //                                     </p>
// //                                 </div>
// //                             ) : (
// //                                 <div className="space-y-4">
// //                                     {jobState.jobs.map((job) => (
// //                                         <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
// //                                             <Job job={job} />
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Jobs;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { JOB_API_END_POINT } from "@/utils/constant";
// import Job from "./Job";
// import Navbar from "./shared/Navbar";
// import { Search, MapPin, CalendarDays, Clock, XCircle, Filter } from "lucide-react";

// const VALID_JOB_TYPES = [
//     "Full-Time",
//     "Part-Time",
//     "Internship",
//     "Freelance",
//     "Contract",
//     "Contract to Hire",
// ];

// function Jobs() {
//     const [jobState, setJobState] = useState({
//         jobs: [],
//         isLoading: false,
//         error: null,
//         searchInputs: {
//             keyword: "",
//             location: ""
//         },
//         filters: {
//             timeRange: "",
//             jobType: ""
//         }
//     });

//     const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

//     const filterData = [
//         {
//             name: "Time Range",
//             options: [
//                 {
//                     label: "Today",
//                     value: "today",
//                     icon: <Clock className="w-4 h-4 text-blue-600" />,
//                 },
//                 {
//                     label: "Last 3 Days",
//                     value: "last3days",
//                     icon: <Clock className="w-4 h-4 text-blue-600" />,
//                 },
//                 {
//                     label: "Last 7 Days",
//                     value: "last7days",
//                     icon: <Clock className="w-4 h-4 text-blue-600" />,
//                 },
//             ],
//             filterKey: "timeRange",
//         },
//         {
//             name: "Job Type",
//             options: [
//                 {
//                     label: "Full Time",
//                     value: "Full-Time",
//                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
//                 },
//                 {
//                     label: "Contract",
//                     value: "Contract",
//                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
//                 },
//                 {
//                     label: "Contract to Hire",
//                     value: "Contract to Hire",
//                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
//                 },
//                 {
//                     label: "Part Time",
//                     value: "Part-Time",
//                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
//                 },
//                 {
//                     label: "Internship",
//                     value: "Internship",
//                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
//                 },
//                 {
//                     label: "Freelance",
//                     value: "Freelance",
//                     icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
//                 },
//             ],
//             filterKey: "jobType",
//         },
//     ];

//     const fetchJobs = async () => {
//         setJobState(prev => ({ ...prev, isLoading: true }));
//         try {
//             const queryParams = new URLSearchParams();
//             Object.entries(jobState.searchInputs).forEach(([key, value]) => {
//                 if (value) queryParams.append(key, value);
//             });
//             Object.entries(jobState.filters).forEach(([key, value]) => {
//                 if (value) queryParams.append(key, value);
//             });

//             const response = await axios.get(`${JOB_API_END_POINT}/get?${queryParams.toString()}`, {
//                 withCredentials: true
//             });

//             setJobState(prev => ({
//                 ...prev,
//                 jobs: response.data?.jobs || [],
//                 error: null,
//                 isLoading: false
//             }));
//         } catch (err) {
//             console.error("Error fetching jobs:", err);
//             setJobState(prev => ({
//                 ...prev,
//                 error: err.message,
//                 isLoading: false
//             }));
//         }
//     };

//     useEffect(() => {
//         fetchJobs();
//     }, [jobState.filters]);

//     const handleSearchInputChange = (key, value) => {
//         setJobState(prev => ({
//             ...prev,
//             searchInputs: {
//                 ...prev.searchInputs,
//                 [key]: value
//             }
//         }));
//     };

//     const handleFilterChange = (filterKey, value) => {
//         if (filterKey === "jobType" && !VALID_JOB_TYPES.includes(value)) {
//             console.warn(`Invalid job type selected: ${value}`);
//             return;
//         }

//         setJobState(prev => ({
//             ...prev,
//             filters: {
//                 ...prev.filters,
//                 [filterKey]: value === prev.filters[filterKey] ? "" : value
//             }
//         }));
//     };

//     const handleClearFilters = (e) => {
//         e.preventDefault();
//         setJobState(prev => ({
//             ...prev,
//             searchInputs: {
//                 keyword: "",
//                 location: ""
//             },
//             filters: {
//                 timeRange: "",
//                 jobType: ""
//             }
//         }));
//     };

//     const isAnyFilterApplied = Object.values(jobState.filters).some(value => value !== "") ||
//                               Object.values(jobState.searchInputs).some(value => value !== "");

//     const FiltersContent = () => (
//         <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//             <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
//                 <h1 className="text-lg font-semibold text-gray-900">Filters</h1>
//                 {isAnyFilterApplied && (
//                     <button
//                         onClick={handleClearFilters}
//                         className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 group"
//                     >
//                         <XCircle className="w-4 h-4" />
//                         Clear filters
//                     </button>
//                 )}
//             </div>

//             <div className="space-y-6">
//                 {filterData.map((filter) => (
//                     <div key={filter.name}>
//                         <h2 className="text-sm font-medium text-gray-700 mb-3">
//                             {filter.name}
//                         </h2>
//                         <div className="flex flex-col space-y-2">
//                             {filter.options.map((option) => {
//                                 const isSelected = jobState.filters[filter.filterKey] === option.value;
//                                 return (
//                                     <button
//                                         key={option.value}
//                                         onClick={() => {
//                                             handleFilterChange(filter.filterKey, option.value);
//                                             setIsMobileFiltersOpen(false);
//                                         }}
//                                         className={`
//                                             flex items-center gap-2 px-3 py-2 rounded-md text-sm
//                                             transition-all duration-200 border w-full justify-start
//                                             ${
//                                                 isSelected
//                                                     ? "bg-blue-50 border-blue-200 text-blue-700 font-medium"
//                                                     : "bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/50"
//                                             }
//                                         `}
//                                     >
//                                         {option.icon}
//                                         {option.label}
//                                     </button>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Navbar />
//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 <div className="space-y-6">
//                     {/* Search Section */}
//                     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
//                         <div className="flex flex-col md:flex-row gap-3">
//                             <div className="relative flex-1">
//                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search jobs by title or description"
//                                     className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     value={jobState.searchInputs.keyword}
//                                     onChange={(e) => handleSearchInputChange('keyword', e.target.value)}
//                                 />
//                             </div>
//                             <div className="relative flex-1">
//                                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search by location"
//                                     className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     value={jobState.searchInputs.location}
//                                     onChange={(e) => handleSearchInputChange('location', e.target.value)}
//                                 />
//                             </div>
//                             <button
//                                 onClick={fetchJobs}
//                                 className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap font-medium"
//                             >
//                                 Search Jobs
//                             </button>
//                         </div>
//                     </div>

//                     {/* Mobile Filters Button */}
//                     <div className="md:hidden">
//                         <button
//                             onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
//                             className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium"
//                         >
//                             <Filter className="w-5 h-5" />
//                             Filters
//                         </button>
//                     </div>

//                     {/* Content Grid */}
//                     <div className="grid md:grid-cols-4 gap-6">
//                         {/* Filters - Desktop */}
//                         <div className="hidden md:block col-span-1">
//                             <FiltersContent />
//                         </div>

//                         {/* Filters - Mobile */}
//                         {isMobileFiltersOpen && (
//                             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 md:hidden">
//                                 <div className="fixed inset-y-0 right-0 max-w-full w-full bg-white shadow-xl">
//                                     <div className="h-full flex flex-col">
//                                         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//                                             <h2 className="text-lg font-semibold">Filters</h2>
//                                             <button
//                                                 onClick={() => setIsMobileFiltersOpen(false)}
//                                                 className="p-2 text-gray-500 hover:text-gray-700"
//                                             >
//                                                 <XCircle className="w-6 h-6" />
//                                             </button>
//                                         </div>
//                                         <div className="flex-1 overflow-y-auto p-4">
//                                             <FiltersContent />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Jobs List */}
//                         <div className="md:col-span-3">
//                             {jobState.isLoading ? (
//                                 <div className="flex justify-center items-center h-48">
//                                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//                                 </div>
//                             ) : jobState.error ? (
//                                 <div className="bg-white p-4 rounded-lg border border-red-100">
//                                     <p className="text-red-600">Error: {jobState.error}</p>
//                                 </div>
//                             ) : jobState.jobs.length === 0 ? (
//                                 <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
//                                     <p className="text-gray-600 text-lg">
//                                         No jobs match your search criteria
//                                     </p>
//                                 </div>
//                             ) : (
//                                 <div className="space-y-4">
//                                     {jobState.jobs.map((job) => (
//                                         <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//                                             <Job job={job} />
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Jobs;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { Search, MapPin, CalendarDays, Clock, XCircle, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "./Footer";

const VALID_JOB_TYPES = [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Freelance",
    "Contract",
    "Contract to Hire",
];

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

function Jobs() {
    const [jobState, setJobState] = useState({
        allJobs: [], // Store all jobs fetched from API
        displayedJobs: [], // Jobs to display on current page
        isLoading: false,
        error: null,
        searchInputs: {
            keyword: "",
            location: ""
        },
        filters: {
            timeRange: "",
            jobType: ""
        },
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            pageSize: 10
        }
    });

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const filterData = [
        {
            name: "Time Range",
            options: [
                {
                    label: "Today",
                    value: "today",
                    icon: <Clock className="w-4 h-4 text-blue-600" />,
                },
                {
                    label: "Last 3 Days",
                    value: "last3days",
                    icon: <Clock className="w-4 h-4 text-blue-600" />,
                },
                {
                    label: "Last 7 Days",
                    value: "last7days",
                    icon: <Clock className="w-4 h-4 text-blue-600" />,
                },
            ],
            filterKey: "timeRange",
        },
        {
            name: "Job Type",
            options: [
                {
                    label: "Full Time",
                    value: "Full-Time",
                    icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
                },
                {
                    label: "Contract",
                    value: "Contract",
                    icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
                },
                {
                    label: "Contract to Hire",
                    value: "Contract to Hire",
                    icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
                },
                {
                    label: "Part Time",
                    value: "Part-Time",
                    icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
                },
                {
                    label: "Internship",
                    value: "Internship",
                    icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
                },
                {
                    label: "Freelance",
                    value: "Freelance",
                    icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
                },
            ],
            filterKey: "jobType",
        },
    ];

    const fetchJobs = async () => {
        setJobState(prev => ({ ...prev, isLoading: true }));
        try {
            const queryParams = new URLSearchParams();
            Object.entries(jobState.searchInputs).forEach(([key, value]) => {
                if (value) queryParams.append(key, value);
            });
            Object.entries(jobState.filters).forEach(([key, value]) => {
                if (value) queryParams.append(key, value);
            });

            // Don't send pagination parameters to API since it doesn't support it
            // Instead, we'll handle pagination client-side

            const response = await axios.get(`${JOB_API_END_POINT}/get?${queryParams.toString()}`, {
                withCredentials: true
            });

            const fetchedJobs = response.data?.jobs || [];
            const totalItems = fetchedJobs.length;
            const totalPages = Math.ceil(totalItems / jobState.pagination.pageSize) || 1;

            // Update all jobs and calculate pagination
            setJobState(prev => {
                const newState = {
                    ...prev,
                    allJobs: fetchedJobs,
                    pagination: {
                        ...prev.pagination,
                        totalPages: totalPages,
                        totalItems: totalItems,
                        // Make sure current page is valid
                        currentPage: Math.min(prev.pagination.currentPage, totalPages)
                    },
                    error: null,
                    isLoading: false
                };

                // Update displayed jobs based on pagination
                newState.displayedJobs = paginateJobs(
                    fetchedJobs,
                    newState.pagination.currentPage,
                    newState.pagination.pageSize
                );

                return newState;
            });
        } catch (err) {
            console.error("Error fetching jobs:", err);
            setJobState(prev => ({
                ...prev,
                error: err.message,
                isLoading: false,
                allJobs: [],
                displayedJobs: []
            }));
        }
    };

    // Function to handle client-side pagination
    const paginateJobs = (jobs, page, pageSize) => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return jobs.slice(startIndex, endIndex);
    };

    // Update displayed jobs when pagination changes
    useEffect(() => {
        if (jobState.allJobs.length > 0) {
            setJobState(prev => ({
                ...prev,
                displayedJobs: paginateJobs(
                    prev.allJobs,
                    prev.pagination.currentPage,
                    prev.pagination.pageSize
                )
            }));
        }
    }, [jobState.pagination.currentPage, jobState.pagination.pageSize]);

    // Fetch jobs when filters change
    useEffect(() => {
        fetchJobs();
    }, [jobState.filters]);

    const handleSearchInputChange = (key, value) => {
        setJobState(prev => ({
            ...prev,
            searchInputs: {
                ...prev.searchInputs,
                [key]: value
            }
        }));
    };

    const handleFilterChange = (filterKey, value) => {
        if (filterKey === "jobType" && !VALID_JOB_TYPES.includes(value)) {
            console.warn(`Invalid job type selected: ${value}`);
            return;
        }

        setJobState(prev => ({
            ...prev,
            filters: {
                ...prev.filters,
                [filterKey]: value === prev.filters[filterKey] ? "" : value
            },
            pagination: {
                ...prev.pagination,
                currentPage: 1 // Reset to first page when changing filters
            }
        }));
    };

    const handleClearFilters = (e) => {
        e.preventDefault();
        setJobState(prev => ({
            ...prev,
            searchInputs: {
                keyword: "",
                location: ""
            },
            filters: {
                timeRange: "",
                jobType: ""
            },
            pagination: {
                ...prev.pagination,
                currentPage: 1 // Reset to first page when clearing filters
            }
        }));
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > jobState.pagination.totalPages) return;

        setJobState(prev => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                currentPage: newPage
            }
        }));
    };

    const handlePageSizeChange = (newSize) => {
        setJobState(prev => {
            const newPageSize = parseInt(newSize);
            const newTotalPages = Math.ceil(prev.allJobs.length / newPageSize) || 1;

            return {
                ...prev,
                pagination: {
                    ...prev.pagination,
                    pageSize: newPageSize,
                    totalPages: newTotalPages,
                    currentPage: 1 // Reset to first page when changing page size
                }
            };
        });
    };

    const handleSearch = () => {
        setJobState(prev => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                currentPage: 1 // Reset to first page when searching
            }
        }));
        fetchJobs();
    };

    const isAnyFilterApplied = Object.values(jobState.filters).some(value => value !== "") ||
                              Object.values(jobState.searchInputs).some(value => value !== "");

    const FiltersContent = () => (
        <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h1 className="text-lg font-semibold text-gray-900">Filters</h1>
                {isAnyFilterApplied && (
                    <button
                        onClick={handleClearFilters}
                        className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 group"
                    >
                        <XCircle className="w-4 h-4" />
                        Clear filters
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {filterData.map((filter) => (
                    <div key={filter.name}>
                        <h2 className="text-sm font-medium text-gray-700 mb-3">
                            {filter.name}
                        </h2>
                        <div className="flex flex-col space-y-2">
                            {filter.options.map((option) => {
                                const isSelected = jobState.filters[filter.filterKey] === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            handleFilterChange(filter.filterKey, option.value);
                                            setIsMobileFiltersOpen(false);
                                        }}
                                        className={`
                                            flex items-center gap-2 px-3 py-2 rounded-md text-sm
                                            transition-all duration-200 border w-full justify-start
                                            ${
                                                isSelected
                                                    ? "bg-blue-50 border-blue-200 text-blue-700 font-medium"
                                                    : "bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/50"
                                            }
                                        `}
                                    >
                                        {option.icon}
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Pagination component
    const Pagination = () => {
        const { currentPage, totalPages, pageSize, totalItems } = jobState.pagination;
        const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
        const endItem = Math.min(currentPage * pageSize, totalItems);

        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mt-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-600">
                        Showing <span className="font-medium">{startItem}</span> to{" "}
                        <span className="font-medium">{endItem}</span> of{" "}
                        <span className="font-medium">{totalItems}</span> results
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Page size selector */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="pageSize" className="text-sm text-gray-600">
                                Show:
                            </label>
                            <select
                                id="pageSize"
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(e.target.value)}
                                className="border border-gray-200 rounded-md text-sm p-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {PAGE_SIZE_OPTIONS.map(size => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Page navigation buttons */}
                        <div className="flex items-center">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`
                                    p-2 rounded-l-md border border-gray-200
                                    ${currentPage === 1
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-white text-gray-700 hover:bg-gray-50"}
                                `}
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="px-4 py-2 border-t border-b border-gray-200 flex items-center">
                                <span className="text-sm font-medium text-gray-700">
                                    {currentPage} <span className="text-gray-500">of</span> {totalPages}
                                </span>
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`
                                    p-2 rounded-r-md border border-gray-200
                                    ${currentPage === totalPages
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-white text-gray-700 hover:bg-gray-50"}
                                `}
                                aria-label="Next page"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Search Section */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search jobs by title or description"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={jobState.searchInputs.keyword}
                                    onChange={(e) => handleSearchInputChange('keyword', e.target.value)}
                                />
                            </div>
                            <div className="relative flex-1">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by location"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={jobState.searchInputs.location}
                                    onChange={(e) => handleSearchInputChange('location', e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap font-medium"
                            >
                                Search Jobs
                            </button>
                        </div>
                    </div>

                    {/* Mobile Filters Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium"
                        >
                            <Filter className="w-5 h-5" />
                            Filters
                        </button>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-4 gap-6">
                        {/* Filters - Desktop */}
                        <div className="hidden md:block col-span-1">
                            <FiltersContent />
                        </div>

                        {/* Filters - Mobile */}
                        {isMobileFiltersOpen && (
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 md:hidden">
                                <div className="fixed inset-y-0 right-0 max-w-full w-full bg-white shadow-xl">
                                    <div className="h-full flex flex-col">
                                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                            <h2 className="text-lg font-semibold">Filters</h2>
                                            <button
                                                onClick={() => setIsMobileFiltersOpen(false)}
                                                className="p-2 text-gray-500 hover:text-gray-700"
                                            >
                                                <XCircle className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-4">
                                            <FiltersContent />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Jobs List */}
                        <div className="md:col-span-3">
                            {jobState.isLoading ? (
                                <div className="flex justify-center items-center h-48">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                </div>
                            ) : jobState.error ? (
                                <div className="bg-white p-4 rounded-lg border border-red-100">
                                    <p className="text-red-600">Error: {jobState.error}</p>
                                </div>
                            ) : jobState.displayedJobs.length === 0 ? (
                                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                                    <p className="text-gray-600 text-lg">
                                        No jobs match your search criteria
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        {jobState.displayedJobs.map((job) => (
                                            <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                                <Job job={job} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination controls */}
                                    {jobState.allJobs.length > 0 && <Pagination />}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Jobs;