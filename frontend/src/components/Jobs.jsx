import React, { useState, useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import {
  Search,
  MapPin,
  CalendarDays,
  Clock,
  XCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  GraduationCap,
  BookOpen,
  DollarSign,
  Award,
  Zap,
} from "lucide-react";
import Footer from "./Footer";

const VALID_JOB_TYPES = [
  "Full-Time",
  "Part-Time",
  "Internship",
  "Freelance",
  "Contract",
  "Contract to Hire",
];

const EXPERIENCE_LEVELS = [
  "No Experience",
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "5+ years",
];

const SALARY_RANGES = [
  "Under $30k",
  "$30k - $50k",
  "$50k - $70k",
  "$70k - $90k",
  "$90k - $120k",
  "$120k+",
];

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

function Jobs() {
  const [jobState, setJobState] = useState({
    allJobs: [], // Store all jobs fetched from API
    displayedJobs: [], // Jobs to display on current page
    isLoading: false,
    error: null,
    searchInputs: {
      keyword: "",
      location: "",
    },
    filters: {
      timeRange: "",
      jobType: "",
      experienceLevel: "",
      salaryRange: "",
      skillLevel: "",
      entryLevel: false,
      remote: false,
      skillsRequired: [],
    },
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      pageSize: 10,
    },
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [commonSkills, setCommonSkills] = useState([
    "JavaScript",
    "Python",
    "React",
    "AWS",
    "SQL",
    "Java",
    "HTML/CSS",
    "Node.js",
    "Machine Learning",
    "Data Analysis",
  ]);

  const filterData = [
    {
      name: "Time Posted",
      options: [
        {
          label: "Today",
          value: "today",
          icon: <Clock className="w-4 h-4 text-[#012760]" />,
        },
        {
          label: "Last 3 Days",
          value: "last3days",
          icon: <Clock className="w-4 h-4 text-[#012760]" />,
        },
        {
          label: "Last 7 Days",
          value: "last7days",
          icon: <Clock className="w-4 h-4 text-[#012760]" />,
        },
        {
          label: "Last 14 Days",
          value: "last14days",
          icon: <Clock className="w-4 h-4 text-[#012760]" />,
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
          icon: <Briefcase className="w-4 h-4 text-[#012760]" />,
        },
        {
          label: "Part Time",
          value: "Part-Time",
          icon: <Briefcase className="w-4 h-4 text-[#012760]" />,
        },
        {
          label: "Internship",
          value: "Internship",
          icon: <GraduationCap className="w-4 h-4 text-[#012760]" />,
        },
        {
          label: "Freelance",
          value: "Freelance",
          icon: <Briefcase className="w-4 h-4 text-[#012760]" />,
        },
        {
          label: "Contract",
          value: "Contract",
          icon: <Briefcase className="w-4 h-4 text-[#012760]" />,
        },
        {
          label: "Contract to Hire",
          value: "Contract to Hire",
          icon: <Briefcase className="w-4 h-4 text-[#012760]" />,
        },
      ],
      filterKey: "jobType",
    },
    // {
    //   name: "Experience Level",
    //   options: [
    //     {
    //       label: "No Experience",
    //       value: "No Experience",
    //       icon: <GraduationCap className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "Less than 1 year",
    //       value: "Less than 1 year",
    //       icon: <BookOpen className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "1-2 years",
    //       value: "1-2 years",
    //       icon: <BookOpen className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "3-5 years",
    //       value: "3-5 years",
    //       icon: <Award className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "5+ years",
    //       value: "5+ years",
    //       icon: <Award className="w-4 h-4 text-blue-600" />,
    //     },
    //   ],
    //   filterKey: "experienceLevel",
    // },
    // {
    //   name: "Salary Range",
    //   options: [
    //     {
    //       label: "Under $30k",
    //       value: "Under $30k",
    //       icon: <DollarSign className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "$30k - $50k",
    //       value: "$30k - $50k",
    //       icon: <DollarSign className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "$50k - $70k",
    //       value: "$50k - $70k",
    //       icon: <DollarSign className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "$70k - $90k",
    //       value: "$70k - $90k",
    //       icon: <DollarSign className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "$90k - $120k",
    //       value: "$90k - $120k",
    //       icon: <DollarSign className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "$120k+",
    //       value: "$120k+",
    //       icon: <DollarSign className="w-4 h-4 text-blue-600" />,
    //     },
    //   ],
    //   filterKey: "salaryRange",
    // },
    // {
    //   name: "Skill Level",
    //   options: [
    //     {
    //       label: "Beginner",
    //       value: "Beginner",
    //       icon: <Zap className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "Intermediate",
    //       value: "Intermediate",
    //       icon: <Zap className="w-4 h-4 text-blue-600" />,
    //     },
    //     {
    //       label: "Advanced",
    //       value: "Advanced",
    //       icon: <Zap className="w-4 h-4 text-blue-600" />,
    //     },
    //   ],
    //   filterKey: "skillLevel",
    // },
  ];

  const fetchJobs = async () => {
    setJobState((prev) => ({ ...prev, isLoading: true }));
    try {
      const queryParams = new URLSearchParams();
      Object.entries(jobState.searchInputs).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      // Map complex filter objects to API parameters
      if (jobState.filters.jobType) {
        queryParams.append("jobType", jobState.filters.jobType);
      }

      if (jobState.filters.timeRange) {
        queryParams.append("timeRange", jobState.filters.timeRange);
      }

      if (jobState.filters.experienceLevel) {
        queryParams.append("experienceLevel", jobState.filters.experienceLevel);
      }

      if (jobState.filters.salaryRange) {
        queryParams.append("salaryRange", jobState.filters.salaryRange);
      }

      if (jobState.filters.remote) {
        queryParams.append("remote", "true");
      }

      if (jobState.filters.entryLevel) {
        queryParams.append("entryLevel", "true");
      }

      if (jobState.filters.skillsRequired.length > 0) {
        queryParams.append("skills", jobState.filters.skillsRequired.join(","));
      }

      const response = await axios.get(
        `${JOB_API_END_POINT}/get?${queryParams.toString()}`,
        {
          withCredentials: true,
        }
      );

      const fetchedJobs = response.data?.jobs || [];

      // Client-side filtering for filters not supported by the API
      let filteredJobs = fetchedJobs;

      // Additional client-side filtering if the API doesn't support all our filters
      if (jobState.filters.skillLevel) {
        // This is just a placeholder example of client-side filtering
        // You would need to implement the actual logic based on your data structure
        filteredJobs = filteredJobs.filter((job) => {
          // Example: Map experience to skill level
          const exp = parseInt(job.experience?.S || "0");
          if (jobState.filters.skillLevel === "Beginner" && exp <= 2)
            return true;
          if (
            jobState.filters.skillLevel === "Intermediate" &&
            exp > 2 &&
            exp <= 5
          )
            return true;
          if (jobState.filters.skillLevel === "Advanced" && exp > 5)
            return true;
          return false;
        });
      }

      const totalItems = filteredJobs.length;
      const totalPages =
        Math.ceil(totalItems / jobState.pagination.pageSize) || 1;

      // Update all jobs and calculate pagination
      setJobState((prev) => {
        const newState = {
          ...prev,
          allJobs: filteredJobs,
          pagination: {
            ...prev.pagination,
            totalPages: totalPages,
            totalItems: totalItems,
            // Make sure current page is valid
            currentPage: Math.min(prev.pagination.currentPage, totalPages),
          },
          error: null,
          isLoading: false,
        };

        // Update displayed jobs based on pagination
        newState.displayedJobs = paginateJobs(
          filteredJobs,
          newState.pagination.currentPage,
          newState.pagination.pageSize
        );

        return newState;
      });
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobState((prev) => ({
        ...prev,
        error: err.message,
        isLoading: false,
        allJobs: [],
        displayedJobs: [],
      }));
    }
  };

  // Function to handle client-side pagination
  const paginateJobs = (jobs, page, pageSize) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return jobs.slice(startIndex, endIndex);
  };

  // Extract common skills from job data to build skill filter options
  const extractSkillsFromJobs = (jobs) => {
    const skillsMap = new Map();

    jobs.forEach((job) => {
      // Extract skills from requirements
      const requirements = job.requirements?.L || [];
      requirements.forEach((req) => {
        const reqText = req.S || "";
        // Simple skill extraction (could be improved with NLP)
        const commonTechSkills = [
          "JavaScript",
          "Python",
          "Java",
          "React",
          "AWS",
          "SQL",
          "HTML",
          "CSS",
          "Node.js",
        ];

        commonTechSkills.forEach((skill) => {
          if (reqText.includes(skill)) {
            skillsMap.set(skill, (skillsMap.get(skill) || 0) + 1);
          }
        });
      });
    });

    // Convert to array and sort by frequency
    return Array.from(skillsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10) // Get top 10 skills
      .map((entry) => entry[0]);
  };

  // Update displayed jobs when pagination changes
  useEffect(() => {
    if (jobState.allJobs.length > 0) {
      setJobState((prev) => ({
        ...prev,
        displayedJobs: paginateJobs(
          prev.allJobs,
          prev.pagination.currentPage,
          prev.pagination.pageSize
        ),
      }));

      // Extract skills for the skill filter
      const extractedSkills = extractSkillsFromJobs(jobState.allJobs);
      if (extractedSkills.length > 0) {
        setCommonSkills(extractedSkills);
      }
    }
  }, [
    jobState.pagination.currentPage,
    jobState.pagination.pageSize,
    jobState.allJobs,
  ]);

  // Fetch jobs when filters change
  useEffect(() => {
    fetchJobs();
  }, [jobState.filters]);

  const handleSearchInputChange = (key, value) => {
    setJobState((prev) => ({
      ...prev,
      searchInputs: {
        ...prev.searchInputs,
        [key]: value,
      },
    }));
  };

  const handleFilterChange = (filterKey, value) => {
    if (filterKey === "jobType" && !VALID_JOB_TYPES.includes(value)) {
      console.warn(`Invalid job type selected: ${value}`);
      return;
    }

    setJobState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterKey]: value === prev.filters[filterKey] ? "" : value,
      },
      pagination: {
        ...prev.pagination,
        currentPage: 1, // Reset to first page when changing filters
      },
    }));
  };

  const handleToggleFilter = (filterKey) => {
    setJobState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterKey]: !prev.filters[filterKey],
      },
      pagination: {
        ...prev.pagination,
        currentPage: 1, // Reset to first page when changing filters
      },
    }));
  };

  const handleSkillToggle = (skill) => {
    setJobState((prev) => {
      const currentSkills = [...prev.filters.skillsRequired];
      const skillIndex = currentSkills.indexOf(skill);

      if (skillIndex === -1) {
        currentSkills.push(skill);
      } else {
        currentSkills.splice(skillIndex, 1);
      }

      return {
        ...prev,
        filters: {
          ...prev.filters,
          skillsRequired: currentSkills,
        },
        pagination: {
          ...prev.pagination,
          currentPage: 1, // Reset to first page when changing filters
        },
      };
    });
  };

  const handleClearFilters = (e) => {
    e.preventDefault();
    setJobState((prev) => ({
      ...prev,
      searchInputs: {
        keyword: "",
        location: "",
      },
      filters: {
        timeRange: "",
        jobType: "",
        experienceLevel: "",
        salaryRange: "",
        skillLevel: "",
        entryLevel: false,
        remote: false,
        skillsRequired: [],
      },
      pagination: {
        ...prev.pagination,
        currentPage: 1, // Reset to first page when clearing filters
      },
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > jobState.pagination.totalPages) return;

    setJobState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        currentPage: newPage,
      },
    }));
  };

  const handlePageSizeChange = (newSize) => {
    setJobState((prev) => {
      const newPageSize = parseInt(newSize);
      const newTotalPages = Math.ceil(prev.allJobs.length / newPageSize) || 1;

      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          pageSize: newPageSize,
          totalPages: newTotalPages,
          currentPage: 1, // Reset to first page when changing page size
        },
      };
    });
  };

  const handleSearch = () => {
    setJobState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        currentPage: 1, // Reset to first page when searching
      },
    }));
    fetchJobs();
  };

  const isAnyFilterApplied =
    Object.values(jobState.filters).some((value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "boolean") return value;
      return value !== "";
    }) || Object.values(jobState.searchInputs).some((value) => value !== "");

  const FiltersContent = () => (
    <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-[#012760]">All Filters</h1>
        {isAnyFilterApplied && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 group"
          >
            <XCircle className="w-4 h-4" />
            Reset all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Toggle Filters */}
        {/* <div>
          <h2 className="text-sm font-medium text-gray-700 mb-3">
            Quick Filters
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleToggleFilter("entryLevel")}
              className={`
                                px-3 py-2 rounded-full text-sm border transition-all
                                ${
                                  jobState.filters.entryLevel
                                    ? "bg-blue-50 border-blue-200 text-blue-700 font-medium"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/50"
                                }
                            `}
            >
              Entry-Level Friendly
            </button>
            <button
              onClick={() => handleToggleFilter("remote")}
              className={`
                                px-3 py-2 rounded-full text-sm border transition-all
                                ${
                                  jobState.filters.remote
                                    ? "bg-blue-50 border-blue-200 text-blue-700 font-medium"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/50"
                                }
                            `}
            >
              Remote
            </button>
          </div>
        </div> */}

        {/* Skills Filter */}
        {/* <div>
          <h2 className="text-sm font-medium text-gray-700 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {commonSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`
                                    px-3 py-2 rounded-full text-sm border transition-all
                                    ${
                                      jobState.filters.skillsRequired.includes(
                                        skill
                                      )
                                        ? "bg-blue-50 border-blue-200 text-blue-700 font-medium"
                                        : "bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/50"
                                    }
                                `}
              >
                {skill}
              </button>
            ))}
          </div>
        </div> */}

        {/* Standard Filters */}
        {filterData.map((filter) => (
          <div key={filter.name}>
            <h2 className="text-sm font-medium text-gray-700 mb-3">
              {filter.name}
            </h2>
            <div className="flex flex-col space-y-2">
              {filter.options.map((option) => {
                const isSelected =
                  jobState.filters[filter.filterKey] === option.value;
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
    const {
      currentPage,
      totalPages,
      pageSize,
      totalItems,
    } = jobState.pagination;
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
                {PAGE_SIZE_OPTIONS.map((size) => (
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
                                    ${
                                      currentPage === 1
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                    }
                                `}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="px-4 py-2 border-t border-b border-gray-200 flex items-center">
                <span className="text-sm font-medium text-gray-700">
                  {currentPage} <span className="text-gray-500">of</span>{" "}
                  {totalPages}
                </span>
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
                                    p-2 rounded-r-md border border-gray-200
                                    ${
                                      currentPage === totalPages
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                    }
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
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto mt-20">
        <div className="">
          <div className="fixed top-20 left-0 right-0 z-40 bg-[#DFECFF] h-48 flex flex-col items-start justify-start overflow-hidden">
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#012760] mt-2 md:mt-8 px-4 md:px-8 lg:ml-64">
              Find your dream job
            </span>

            {/* Search Section - Fixed for mobile */}
            <div className="w-full max-w-full px-4 py-2 lg:max-w-6xl lg:mx-auto lg:mr-36 lg:ml-14">
              <div className="w-full lg:w-2/3 lg:mx-auto p-0 md:p-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                  <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                    <input
                      type="text"
                      placeholder="Search jobs by title"
                      className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base box-border"
                      value={jobState.searchInputs.keyword}
                      onChange={(e) =>
                        handleSearchInputChange("keyword", e.target.value)
                      }
                    />
                  </div>
                  <div className="relative w-full md:w-1/2">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                    <input
                      type="text"
                      placeholder="Search by location"
                      className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base box-border"
                      value={jobState.searchInputs.location}
                      onChange={(e) =>
                        handleSearchInputChange("location", e.target.value)
                      }
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="w-full md:w-auto px-4 md:px-6 py-2 md:py-2.5 bg-[#012760] text-white rounded-lg transition-colors whitespace-nowrap font-medium text-sm md:text-base flex-shrink-0"
                  >
                    Search Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-72">
            {/* Mobile Filters Button */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-4 gap-4 md:gap-6">
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
                  <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-600 text-base md:text-lg">
                      No jobs match your search criteria
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {jobState.displayedJobs.map((job) => (
                        <div
                          key={job._id}
                          className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
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
      </div>
      <Footer />
    </div>
  );
}

export default Jobs;
