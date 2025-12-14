import  { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User,AlertCircle, CheckCircle, PieChart, Info, Search, CreditCard } from "lucide-react";
import { USER_API_END_POINT } from '@/utils/constant';
import bg from '../../assets/c1.svg'; 
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


// Import custom components
import ViewCreditsAlert from './ViewCreditsAlert';
import CandidateCard from './CandidateCard';
import FilterPanel from './FilterPanel';
import CompanyViewStats from './CompanyViewStats';
import Pagination from './Pagination';

// Main component that displays the candidates list
const CandidatesViewer = () => {
  const [students, setStudents] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: "",
    booleanSearchEnabled: false,
    location: "",
    visaStatus: "all",
    willingToRelocate: "all",
    jobTitle: "",
    skills: [],
    viewedStatus: "all",
    name: "",
    sortBy: "newest"
  });
  const [viewCounts, setViewCounts] = useState({
    companyViews: null,
    personalViews: null,
    recruiterName: ""
  });
  const [companyId, setCompanyId] = useState(null);
  const [activeTab, setActiveTab] = useState("candidates");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const visaOptions = [
    { value: "Citizen", label: "Citizen" },
    { value: "Permanent_Resident", label: "Permanent Resident" },
    { value: "Work_Visa", label: "Work Visa" },
    { value: "Student_Visa", label: "Student Visa" },
    { value: "Other", label: "Other" },
    { value: "US_Citizen", label: "US Citizen" },
    { value: "Green_Card_Holder", label: "Green Card Holder" },
    { value: "Employment_Authorization", label: "Employment Authorization" },
    { value: "Need_H1_Visa", label: "Need H-1 Visa" },
    { value: "Have_H1_Visa", label: "Have H-1 Visa" },
    { value: "TN_Permit_Holder", label: "TN Permit Holder" },
    { value: "Unspecified", label: "Unspecified" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get user info from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user ? user.email : null;

        if (!userId) {
          setError("Please log in to view candidates");
          setLoading(false);
          return;
        }

        // Get minimal student data
        const studentsResponse = await fetch(`${USER_API_END_POINT}/students-minimal`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: userId })
        });

        const studentsData = await studentsResponse.json();

        if (studentsData.success) {
          setStudents(studentsData.data);
        } else {
          throw new Error(studentsData.message || "Failed to fetch students");
        }

        // Get company data using user ID
        const companyResponse = await fetch(`${USER_API_END_POINT}/companies/user/${userId}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: userId })
        });

        const companyData = await companyResponse.json();

        if (companyData.success) {
          setViewCounts({
            companyViews: companyData.data.remainingViews || 0,
            personalViews: companyData.data.personalViewCount || 0,
            recruiterName: companyData.data.recruiterName || "Recruiter"
          });
          setCompanyId(companyData.data.companyId);
        } else {
          throw new Error(companyData.message || "Failed to fetch company data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Function to update view counts after viewing a profile
  const updateViewCounts = ({ companyViews, personalViews }) => {
    setViewCounts(prev => ({
      ...prev,
      companyViews,
      personalViews
    }));
  };

  // Function to parse boolean search query
  const parseBooleanSearch = (query, student) => {
    if (!query.trim()) return true;

    // Handle quotes for exact phrase matching
    const processedQuery = query.replace(/"([^"]+)"/g, (match, phrase) => {
      // Check if the exact phrase exists in student data
      const phraseExists =
        student.fullname?.toLowerCase().includes(phrase.toLowerCase()) ||
        student.email?.toLowerCase().includes(phrase.toLowerCase()) ||
        student.profile?.jobTitle?.toLowerCase().includes(phrase.toLowerCase()) ||
        student.profile?.skills?.some(skill =>
          typeof skill === 'string'
            ? skill.toLowerCase().includes(phrase.toLowerCase())
            : skill?.S?.toLowerCase().includes(phrase.toLowerCase())
        );
      return phraseExists ? "true" : "false";
    });

    // Replace AND/OR/NOT operators
    const normalizedQuery = processedQuery
      .replace(/\s+AND\s+/gi, " && ")
      .replace(/\s+OR\s+/gi, " || ")
      .replace(/NOT\s+/gi, "!");

    // Create search terms and check if they exist in student data
    const evaluatedQuery = normalizedQuery.replace(/\w+/g, (term) => {
      if (["true", "false", "&&", "||", "!"].includes(term)) return term;

      const termExists =
        student.fullname?.toLowerCase().includes(term.toLowerCase()) ||
        student.email?.toLowerCase().includes(term.toLowerCase()) ||
        student.profile?.jobTitle?.toLowerCase().includes(term.toLowerCase()) ||
        student.profile?.skills?.some(skill =>
          typeof skill === 'string'
            ? skill.toLowerCase().includes(term.toLowerCase())
            : skill?.S?.toLowerCase().includes(term.toLowerCase())
        );
      return termExists ? "true" : "false";
    });

    try {
      // Using Function constructor to evaluate boolean expression
      // Safe because we're only evaluating true/false/&&/||/! expressions
      return new Function(`return ${evaluatedQuery}`)();
    } catch (e) {
      console.error("Error parsing boolean search:", e);
      // Fallback to simple search if boolean parsing fails
      return student.fullname?.toLowerCase().includes(query.toLowerCase()) ||
             student.email?.toLowerCase().includes(query.toLowerCase()) ||
             student.profile?.jobTitle?.toLowerCase().includes(query.toLowerCase()) ||
             student.profile?.skills?.some(skill =>
               typeof skill === 'string'
                 ? skill.toLowerCase().includes(query.toLowerCase())
                 : skill?.S?.toLowerCase().includes(query.toLowerCase())
             );
    }
  };

  const filteredStudents = students.filter((student) => {
    // Search match - standard or boolean search based on setting
    const searchMatch = filters.booleanSearchEnabled
      ? parseBooleanSearch(filters.searchQuery, student)
      : !filters.searchQuery ||
        student.fullname?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        student.email?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        student.profile?.skills?.some((skill) =>
          typeof skill === 'string'
            ? skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
            : skill?.S?.toLowerCase().includes(filters.searchQuery.toLowerCase())
        ) ||
        student.profile?.jobTitle
          ?.toLowerCase()
          .includes(filters.searchQuery.toLowerCase());

    const locationMatch =
      !filters.location ||
      student.profile?.currentLocation
        ?.toLowerCase()
        .includes(filters.location.toLowerCase());

    const visaMatch =
      filters.visaStatus === "all" ||
      student.profile?.visaStatus === filters.visaStatus;

    const relocateMatch =
      filters.willingToRelocate === "all" ||
      (filters.willingToRelocate === "yes"
        ? student.profile?.willingToRelocate === true || student.profile?.willingToRelocate === "true"
        : student.profile?.willingToRelocate === false || student.profile?.willingToRelocate === "false");

    const jobTitleMatch =
      !filters.jobTitle ||
      student.profile?.jobTitle
        ?.toLowerCase()
        .includes(filters.jobTitle.toLowerCase());

    const viewedMatch =
      filters.viewedStatus === "all" ||
      (filters.viewedStatus === "viewed" ? student.viewedByMe : !student.viewedByMe);

    return (
      searchMatch &&
      locationMatch &&
      visaMatch &&
      relocateMatch &&
      jobTitleMatch &&
      viewedMatch
    );
  });

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      searchQuery: searchInput
    }));
  };

  // Handle toggling boolean search
  const toggleBooleanSearch = () => {
    setFilters(prev => ({
      ...prev,
      booleanSearchEnabled: !prev.booleanSearchEnabled
    }));
  };

  // Clear search
  const clearSearch = () => {
    setSearchInput("");
    setFilters(prev => ({
      ...prev,
      searchQuery: ""
    }));
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of content when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle page size change
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="min-h-screen ">
   

      {/* Main Content Area */}
    
      <div className="w-full">
        {/* Main Content */}
        <div className="w-full">
          <div className="flex items-center justify-end mb-4">
            {/* Mobile filter toggle */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="text-xs h-8 gap-1"
              >
                {showMobileFilters ? "Hide Filters" : "Filters"}
              </Button>
            </div>
          </div>

          {/* Filter Section with Background */}
          <div className="relative w-full overflow-hidden mb-6">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat w-screen"
              style={{ backgroundImage: `url(${bg})`}}
            >
            </div>
            
            <div className="relative p-8 md:p-12 ml-40">
              <h2 className="text-2xl md:text-5xl font-medium text-white mb-8">
                Find the Right Candidate
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4 items-end max-w-5xl">
                {/* Name Search */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Skills Search */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by skills..."
                    value={filters.skills}
                    onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-white backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Job Title Search */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by job title..."
                    value={filters.jobTitle}
                    onChange={(e) => setFilters(prev => ({ ...prev, jobTitle: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-white backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-[#012760] text-white rounded-lg hover:bg-[#012760]/90 transition-colors h-[46px] flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>

              {/* Boolean Search Option */}
              <div className="mt-6 flex items-center gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="booleanSearch"
                    checked={filters.booleanSearchEnabled}
                    onChange={toggleBooleanSearch}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="booleanSearch" className="ml-2 text-sm text-white">
                    Enable Boolean Search
                  </label>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="text-white/80 hover:text-white">
                        <Info className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">
                        Boolean search supports:<br />
                        • AND, OR, NOT operators<br />
                        • "Exact phrase" in quotes<br />
                        • Example: "full stack" AND (React OR Vue) NOT intern
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="md:hidden p-3 border rounded">
                <h3 className="font-medium text-sm mb-3">Filters</h3>
                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  visaOptions={visaOptions}
                />
              </div>
            )}
              <div className="max-w-5xl mx-auto flex gap-6">

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 p-4 border rounded self-start sticky top-16">
              <h3 className="font-medium text-sm mb-3">Filters</h3>
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                visaOptions={visaOptions}
              />
            </div>

            {/* Main Candidates List */}
            <div className="flex-1">
              <div className="bg-white p-4 mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-medium text-[#747474]">
                    Showing {filteredStudents.length} results
                  </h2>

                  <div className="flex items-center gap-4">
                    {viewCounts.companyViews !== null && (
                      <Badge variant="outline" className="flex items-center gap-1 text-xs">
                        <CreditCard className="h-3 w-3 text-blue-500" />
                        <span>Credits Left : {viewCounts.companyViews}</span>
                      </Badge>
                    )}
                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                      <CheckCircle className="h-3 w-3 text-blue-500" />
                      <span>Previously viewed</span>
                    </Badge>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8 bg-white border rounded shadow-sm">
                  <svg className="animate-spin h-5 w-5 text-blue-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-sm text-gray-500">Loading candidates...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {paginatedStudents.map((student) => (
                      <CandidateCard
                        key={student._id || student.email}
                        student={student}
                        onViewFullInfo={updateViewCounts}
                      />
                    ))}
                    {filteredStudents.length === 0 && !loading && !error && (
                      <div className="text-center py-8 bg-white border rounded shadow-sm">
                        <p className="text-sm text-gray-500">No candidates match your current filters</p>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {filteredStudents.length > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      pageSize={pageSize}
                      totalItems={filteredStudents.length}
                      onPageSizeChange={handlePageSizeChange}
                    />
                  )}
                </>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesViewer;