// import React, { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   MapPin,
//   Building2,
//   Globe,
//   Briefcase,
//   Search,
//   MapPinned,
//   X,
// } from "lucide-react";
// import Navbar from "./shared/Navbar";
// import { useNavigate } from "react-router-dom";

// const Company = () => {
//   const nav = useNavigate();
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     location: "",
//     search: "",
//     isHiring: false,
//   });

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   useEffect(() => {
//     filterCompanies();
//   }, [companies, filters]);

//   const fetchCompanies = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/v1/company/companyinfo"
//       );
//       const data = await response.json();
//       if (data.status) {
//         setCompanies(data.companies);
//         setFilteredCompanies(data.companies);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterCompanies = () => {
//     let filtered = [...companies];
//     if (filters.search) {
//       const searchTerm = filters.search.toLowerCase();
//       filtered = filtered.filter(
//         (company) =>
//           company.CompanyName.toLowerCase().includes(searchTerm) ||
//           company.description?.toLowerCase().includes(searchTerm)
//       );
//     }
//     if (filters.location) {
//       filtered = filtered.filter((company) =>
//         company.location.toLowerCase().includes(filters.location.toLowerCase())
//       );
//     }
//     if (filters.isHiring) {
//       filtered = filtered.filter((company) => company.jobCount > 0);
//     }
//     setFilteredCompanies(filtered);
//   };

//   const CompanyCard = ({ company }) => (
//     <div className="group relative p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 hover:shadow-lg hover:shadow-blue-50">
//       <div className="absolute top-4 right-4"></div>

//       <div className="flex items-center space-x-4 mb-6">
//         <div className="h-16 w-16 rounded-xl bg-gray-50 flex items-center justify-center p-2 group-hover:bg-blue-50 transition-colors">
//           {company.logo ? (
//             <img
//               src={company.logo}
//               alt={`${company.CompanyName} logo`}
//               className="w-full h-full object-contain"
//             />
//           ) : (
//             <Building2 className="w-8 h-8 text-gray-400 group-hover:text-blue-400" />
//           )}
//         </div>
//         <div>
//           <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//             {company.CompanyName}
//           </h3>
//           <div className="flex items-center text-gray-600 mt-1">
//             <MapPin className="w-4 h-4 mr-1" />
//             <span className="text-sm">{company.location}</span>
//           </div>
//         </div>
//       </div>

//       {company.website && (
//         <div className="flex items-center text-gray-600 mb-4">
//           <Globe className="w-4 h-4 mr-1" />
//           <a
//             href={company.website}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-sm text-blue-600 hover:text-blue-700 hover:underline truncate"
//           >
//             {company.website.replace(/(^\w+:|^)\/\//, "")}
//           </a>
//         </div>
//       )}

//       <p className="text-gray-600 text-sm mb-6 line-clamp-2">
//         {company.description}
//       </p>

//       <button
//         onClick={() => nav(`/jobs/${company.companyId}`)}
//         className="w-full py-3 px-4 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium
//                  hover:bg-blue-600 hover:text-white transition-all duration-300
//                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//       >
//         View Jobs ({company.jobCount})
//       </button>
//     </div>
//   );

//   return (
//     <div>
//       <Navbar></Navbar>
//       <div className="min-h-screen bg-gray-50/50">
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             <div className="px-8 py-10 bg-gradient-to-br from-blue-50 to-white border-b">
//               <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">
//                 Browse Companies
//               </h1>
//               <p className="text-gray-600 text-center mb-8">
//                 Discover your next career opportunity
//               </p>

//               <div className="flex flex-col lg:flex-row gap-4">
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search companies or descriptions"
//                     className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                     value={filters.search}
//                     onChange={(e) =>
//                       setFilters({ ...filters, search: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="flex flex-wrap gap-4">
//                   <div className="relative">
//                     <MapPinned className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Filter by location"
//                       className="pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       value={filters.location}
//                       onChange={(e) =>
//                         setFilters({ ...filters, location: e.target.value })
//                       }
//                     />
//                   </div>

//                   <button
//                     className={`px-6 py-3 border rounded-xl font-medium transition-all duration-300 ${
//                       filters.isHiring
//                         ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
//                         : "bg-white hover:bg-gray-50"
//                     }`}
//                     onClick={() =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         isHiring: !prev.isHiring,
//                       }))
//                     }
//                   >
//                     Currently Hiring
//                   </button>

//                   {(filters.search || filters.location || filters.isHiring) && (
//                     <button
//                       onClick={() =>
//                         setFilters({
//                           location: "",
//                           search: "",
//                           isHiring: false,
//                         })
//                       }
//                       className="px-6 py-3 text-gray-700 hover:text-gray-900 flex items-center space-x-2"
//                     >
//                       <X className="w-4 h-4" />
//                       <span>Clear all</span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="p-8">
//               <div className="mb-6 flex items-center justify-between">
//                 <span className="text-gray-900 font-medium">
//                   {filteredCompanies.length}{" "}
//                   {filteredCompanies.length === 1 ? "company" : "companies"}{" "}
//                   found
//                 </span>
//               </div>

//               {isLoading ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[...Array(6)].map((_, i) => (
//                     <div key={i} className="animate-pulse">
//                       <div className="h-64 bg-gray-100 rounded-xl"></div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredCompanies.length > 0 ? (
//                     filteredCompanies.map((company) => (
//                       <CompanyCard key={company.companyId} company={company} />
//                     ))
//                   ) : (
//                     <div className="col-span-3 text-center py-12">
//                       <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
//                         <Building2 className="w-12 h-12 text-gray-400" />
//                       </div>
//                       <h3 className="text-gray-900 font-medium mb-2">
//                         No companies found
//                       </h3>
//                       <p className="text-gray-600">
//                         Try adjusting your search filters
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Company;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Building2,
  Globe,
  X,
  MapPinned,
  BriefcaseIcon,
  ArrowUpRight,
  Filter
} from "lucide-react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";

// Card component for displaying company information
const CompanyCard = ({ company, onViewJobs }) => {
  const websiteWithoutProtocol = company.website?.replace(/(^\w+:|^)\/\//, "");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg overflow-hidden">
      {/* Company Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          {/* Logo and Company Info */}
          <div className="flex items-start gap-4 min-w-0">
            <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center p-2 border border-gray-100">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.CompanyName} logo`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building2 className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate">
                {company.CompanyName}
              </h3>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1 shrink-0" />
                <span className="text-sm truncate">{company.location}</span>
              </div>
            </div>
          </div>

          {/* Job Count Badge */}
          {company.jobCount > 0 && (
            <span className="shrink-0 px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full whitespace-nowrap">
              {company.jobCount} {company.jobCount === 1 ? 'job' : 'jobs'}
            </span>
          )}
        </div>

        {/* Website Link */}
        {company.website && (
          <div className="flex items-center text-gray-600">
            <Globe className="w-4 h-4 mr-1 shrink-0" />
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline truncate flex items-center"
            >
              {websiteWithoutProtocol}
              <ArrowUpRight className="w-3 h-3 ml-1 shrink-0" />
            </a>
          </div>
        )}

        {/* Company Description */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {company.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button
          onClick={() => onViewJobs(company.companyId)}
          className="w-full py-2.5 px-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-medium
                   hover:bg-blue-600 hover:text-white transition-all duration-300
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   flex items-center justify-center gap-2"
        >
          <BriefcaseIcon className="w-4 h-4" />
          <span>View Opportunities</span>
        </button>
      </div>
    </div>
  );
};

// Filter section component
const FilterSection = ({ filters, setFilters, showFilters }) => {
  if (!showFilters) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-4 max-w-4xl mx-auto">
      <div className="relative flex-1 min-w-[240px]">
        <MapPinned className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Filter by location"
          className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      <button
        className={`px-6 py-3.5 border-2 rounded-xl font-medium transition-all duration-300 min-w-[160px] ${
          filters.isHiring
            ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
            : "bg-white hover:bg-gray-50"
        }`}
        onClick={() => setFilters((prev) => ({ ...prev, isHiring: !prev.isHiring }))}
      >
        Currently Hiring
      </button>
    </div>
  );
};

// Main component
const Company = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    search: "",
    isHiring: false,
  });

  // Fetch companies on mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Filter companies when filters or companies change
  useEffect(() => {
    filterCompanies();
  }, [companies, filters]);

  // Fetch companies from API
  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/company/companyinfo");
      const data = await response.json();
      if (data.status) {
        setCompanies(data.companies);
        setFilteredCompanies(data.companies);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter companies based on search criteria
  const filterCompanies = () => {
    let filtered = [...companies];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (company) =>
          company.CompanyName.toLowerCase().includes(searchTerm) ||
          company.description?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.location) {
      filtered = filtered.filter((company) =>
        company.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.isHiring) {
      filtered = filtered.filter((company) => company.jobCount > 0);
    }

    setFilteredCompanies(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      location: "",
      search: "",
      isHiring: false,
    });
  };

  // Handle navigation to jobs page
  const handleViewJobs = (companyId) => {
    navigate(`/jobs/${companyId}`);
  };

  // Render loading skeleton
  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-72 bg-gray-100 rounded-2xl"></div>
        </div>
      ))}
    </div>
  );

  // Render empty state
  const renderEmptyState = () => (
    <div className="col-span-3 text-center py-16">
      <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <Building2 className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No companies found
      </h3>
      <p className="text-gray-600">
        Try adjusting your search criteria
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="px-8 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-white border-b">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">
              Discover Your Next Career Move
            </h1>
            <p className="text-gray-600 text-center mb-8 text-lg">
              Explore opportunities at innovative companies
            </p>

            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies or descriptions..."
                  className="w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-3.5 border-2 rounded-xl font-medium bg-white hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </button>

                {(filters.search || filters.location || filters.isHiring) && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-3.5 text-gray-700 hover:text-gray-900 flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filter Section */}
            <FilterSection
              filters={filters}
              setFilters={setFilters}
              showFilters={showFilters}
            />
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="mb-6">
              <span className="text-gray-900 font-medium">
                {filteredCompanies.length}{" "}
                {filteredCompanies.length === 1 ? "company" : "companies"} found
              </span>
            </div>

            {isLoading ? (
              renderLoadingSkeleton()
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <CompanyCard
                      key={company.companyId}
                      company={company}
                      onViewJobs={handleViewJobs}
                    />
                  ))
                ) : (
                  renderEmptyState()
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Company;