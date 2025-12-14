import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useState, useEffect } from "react";
import Lc from "./Lc";
import homebackground from "../assets/homebackground.svg";

const JobsNavigation = ({ activeTab, setActiveTab, onTabChange }) => {
  const tabs = [
    "All",
    "Developer",
    "Product Management",
    "Marketing",
    "Customer Service",
  ];

  const handleClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="flex flex-wrap border-b w-full left-0">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-3 sm:px-10 py-2 text-sm sm:text-lg ${
            activeTab === tab
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-400"
          }`}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const CategoryFilter = ({
  activeCategory,
  setActiveCategory,
  onCategoryChange,
}) => {
  const categories = [
    "All Jobs",
    "Full-Time",
    "Contract to Hire",
    "Internship",
    "Part-Time",
    "Contract",
    "Remote"
  ];

  const handleClick = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) onCategoryChange(category);
  };

  return (
    <div className="flex flex-wrap gap-2 my-4 mb-8 sm:mb-14 mt-4 sm:mt-8">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm border-[#97C0FF] border ${
            activeCategory === category
              ? "bg-blue-50 text-blue-600"
              : "bg-gray-50 text-gray-700"
          }`}
          onClick={() => handleClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const LatestJob = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All Jobs");
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const url = `${JOB_API_END_POINT}/getlatest`;
      const res = await axios.get(url, { withCredentials: true });

      if (res.data && res.data.jobs) {
        setAllJobs(res.data.jobs);
        setJobs(res.data.jobs);
      } else {
        setAllJobs([]);
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err);
      setAllJobs([]);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = (tabFilter = activeTab, categoryFilter = activeCategory) => {
    let filteredJobs = [...allJobs];

    if (tabFilter && tabFilter !== "All") {
      filteredJobs = filteredJobs.filter(job =>
        job.title && job.title.toLowerCase().includes(tabFilter.toLowerCase())
      );
    }

    if (categoryFilter && categoryFilter !== "All Jobs") {
      filteredJobs = filteredJobs.filter(job =>
        job.jobType &&
        Array.isArray(job.jobType) &&
        job.jobType.some(type => type === categoryFilter)
      );
    }

    setJobs(filteredJobs);
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterJobs(tab, activeCategory);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    filterJobs(activeTab, category);
  };

  const handleRefresh = () => {
    fetchAllJobs();
    setActiveTab("All");
    setActiveCategory("All Jobs");
  };

  const jobsToDisplay = Array.isArray(jobs) ? jobs.slice(0, 4) : [];

  return (
    <div className="px-4 py-6 sm:p-6 min-h-screen bg-no-repeat bg-cover bg-center relative">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${homebackground})` }}
      ></div>
      <div className="relative z-10 px-2 sm:px-4 py-4 sm:py-6 max-w-6xl mx-auto my-2 sm:my-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-4 sm:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-5xl font-medium text-center sm:text-left text-[#444444]">
            <span className="text-[#0350C6]">Latest</span> Job Opportunity
          </h1>
          <button
            onClick={handleRefresh}
            className="w-full sm:w-auto border-2 border-[#0350C6] text-[#0350C6] px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-gradient-to-r from-blue-600 to-blue-900 hover:text-white transition-colors text-sm sm:text-base"
          >
            View all jobs
          </button>
        </div>

        <JobsNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onTabChange={handleTabChange}
        />
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          Active filters: {activeTab} | {activeCategory} | Showing {jobsToDisplay.length} of {jobs.length} jobs
        </div>

        {loading ? (
          <div className="text-center py-6 sm:py-12">Loading jobs...</div>
        ) : error ? (
          <div className="text-red-500 text-center p-3 sm:p-4">
            Error loading jobs. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
            {jobsToDisplay.length > 0 ? (
              jobsToDisplay.map((job) => (
                <Lc key={job.jobId} job={job} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-6 sm:py-12">
                No Jobs Available for selected filters
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestJob;