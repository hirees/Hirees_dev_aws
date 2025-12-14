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
  Filter,
} from "lucide-react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import TopCompanies from "./TopCompanies";
import { COMPANY_API_END_POINT } from "@/utils/constant";

// Card component for displaying company information
const CompanyCard = ({ company, onViewJobs }) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-[#979696] hover:shadow-lg overflow-hidden flex flex-col justify-between h-full">
      {/* Content Section */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 rounded-lg sm:rounded-xl flex items-center justify-center p-1.5 sm:p-2 bg-gray-50">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.CompanyName} logo`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              )}
            </div>
          </div>

          {/* Job Count Badge */}
          {company.jobCount > 0 && (
            <span className="mt-2 sm:mt-3 shrink-0 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-[#DFECFF] text-[#292929] text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap">
              {company.jobCount} {company.jobCount === 1 ? "Job posted" : "Jobs posted"}
            </span>
          )}
        </div>

        {/* Company Name and Location */}
        <div className="min-w-0 ml-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate">
            {company.CompanyName}
          </h3>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 shrink-0" />
            <span className="text-xs sm:text-sm truncate">{company.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
          {company.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-auto px-4 sm:px-6 pb-3 sm:pb-4 flex justify-end">
        <button
          onClick={() => onViewJobs(company.companyId)}
          className="w-full sm:w-40 py-2 sm:py-2.5 px-3 bg-white border-2 border-[#012760] text-[#012760] rounded-lg font-medium
                   hover:bg-[#012760] hover:text-white transition-all duration-300
                   focus:ring-2 focus:ring-[#012760] focus:ring-offset-2
                   flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};


// Filter section component
const FilterSection = ({ filters, setFilters, showFilters }) => {
  if (!showFilters) return null;

  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-4xl mx-auto">
      <div className="relative flex-1 min-w-0">
        <MapPinned className="absolute left-3 sm:left-4 top-3 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Filter by location"
          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      <button
        className={`px-4 sm:px-6 py-2.5 sm:py-3.5 border-2 rounded-lg sm:rounded-xl font-medium transition-all duration-300 min-w-[140px] sm:min-w-[160px] text-sm sm:text-base ${
          filters.isHiring
            ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
            : "bg-white hover:bg-gray-50"
        }`}
        onClick={() =>
          setFilters((prev) => ({ ...prev, isHiring: !prev.isHiring }))
        }
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
      const response = await fetch(
        `${COMPANY_API_END_POINT}/companyinfo`
      );
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
      <p className="text-gray-600">Try adjusting your search criteria</p>
    </div>
  );

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="mx-auto mt-20 sm:mt-20">
        <div className="mx-auto">
          {/* Header Section */}
          <div className="px-4 sm:px-8 md:px-36 py-6 sm:py-8 md:py-12 bg-[#DFECFF] w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-left text-[#012760] mb-4 sm:mb-6 md:mb-10">
              Join your dream team.
            </h1>
            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 max-w-3xl mx-auto lg:ml-0">
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-4 top-3 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies or descriptions..."
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 text-sm sm:text-base"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3 sm:px-4 py-2.5 sm:py-3.5 border-2 rounded-lg sm:rounded-xl font-medium bg-[#012760] flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                >
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span className="text-white">Filters</span>
                </button>

                {(filters.search || filters.location || filters.isHiring) && (
                  <button
                    onClick={resetFilters}
                    className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-gray-700 hover:text-gray-900 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
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

          <div>
            <TopCompanies />
          </div>
          <div className="bg-gray-300 h-px w-full"></div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 md:p-8 md:ml-14">
            <div className="mb-4 sm:mb-6">
              <span className="text-gray-800 font-medium text-sm sm:text-base">
                Showing {filteredCompanies.length}{" "}
                {filteredCompanies.length === 1 ? "Result" : "Results"}
              </span>
            </div>

            {isLoading ? (
              renderLoadingSkeleton()
            ) : (
              <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 ">
                {filteredCompanies.length > 0
                  ? filteredCompanies.map((company) => (
                      <CompanyCard
                        key={company.companyId}
                        company={company}
                        onViewJobs={handleViewJobs}
                      />
                    ))
                  : renderEmptyState()}
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
