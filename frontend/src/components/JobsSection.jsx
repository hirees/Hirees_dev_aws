import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, MoreVertical, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { APPLICATION_API_END_POINT, SAVED_JOBS_API_END_POINT } from "@/utils/constant";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PropTypes from 'prop-types';

const StatusBadge = ({ children, status }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`
        px-2.5 py-0.5
        rounded-full
        text-xs
        font-medium
        border
        ${getStatusStyle(status)}
      `}
    >
      {children}
    </span>
  );
};

StatusBadge.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired
};

function JobsSection() {
  const [activeTab, setActiveTab] = useState("applied");
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "applied") {
      fetchAppliedJobs();
    } else if (activeTab === "saved") {
      fetchSavedJobs();
    }
  }, [activeTab]);

  const fetchAppliedJobs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
        withCredentials: true,
      });

      if (res.data.status) {
        const jobs = res.data.applications?.map((application) => ({
          id: application?.id,
          date: new Date(application?.createdAt)?.toLocaleDateString() || "N/A",
          role: application?.job?.title || "Not Specified",
          company: application?.job?.company?.CompanyName || "Unknown",
          status: application?.status || "Pending",
          location: application?.job?.location || "Remote",
          companyLogo: application?.job?.company?.logo || "/default-company-logo.png",
          salary: application?.job?.salary || "Not Disclosed",
          jobType: Array.isArray(application?.job?.jobType)
            ? application?.job?.jobType
            : [],
          experience: application?.job?.experience || "Not Mentioned",
        }));

        setAllAppliedJobs(jobs);
      }
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${SAVED_JOBS_API_END_POINT}/saved`, {
        withCredentials: true,
      });
      setSavedJobs(res.data.savedJobs || []);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const handleRemoveSavedJob = async (jobId) => {
    try {
      await axios.delete(`${SAVED_JOBS_API_END_POINT}/saved`, {
        data: { jobId },
        withCredentials: true,
      });
      setSavedJobs(prev => prev.filter(job => job.savedJobId !== jobId));
    } catch (error) {
      console.error("Error removing saved job:", error);
    }
   };
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = activeTab === "applied"
    ? allAppliedJobs?.slice(indexOfFirstJob, indexOfLastJob)
    : savedJobs?.slice(indexOfFirstJob, indexOfLastJob);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading jobs: {error.message}
      </div>
    );
  }

  const renderJobTable = () => {
    if (activeTab === "applied") {
      return (
        <Table>
          <TableCaption>
            {allAppliedJobs.length} applied jobs
          </TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[200px]">Job</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="hidden md:table-cell">Date Applied</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-6">
                      <img
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{job.role}</div>
                        <div className="text-sm text-gray-500">
                          {job.location} {job.salary ? `• ${job.salary}` : ""}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {job.date}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {job.jobType?.join(", ")}
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={job.status}>{job.status}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center py-4">
                  No applied jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    } else {
      return (
        <Table>
          <TableCaption>
            {savedJobs.length} saved jobs
          </TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[200px]">Company</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Experience</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <TableRow key={job.savedJobId} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <img
                        src={job.jobDetails.company?.logo || "/default-company-logo.png"}
                        alt={`${job.jobDetails.company?.CompanyName || "Company"} logo`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium">{job.jobDetails.company?.CompanyName || "Unknown Company"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{job.jobDetails.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{job.jobDetails.location}</TableCell>
                  <TableCell className="hidden md:table-cell">{job.jobDetails.experience} years</TableCell>
                  <TableCell>${job.jobDetails.salary}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Job Details</h4>
                            <p className="text-sm text-gray-500">
                              {job.jobDetails.description}
                            </p>
                            <div className="mt-2">
                              <h5 className="text-sm font-medium">Requirements:</h5>
                              <ul className="list-disc pl-4 text-sm text-gray-500">
                                {job.jobDetails.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="text-sm text-gray-500">
                              Type: {job.jobDetails.jobType.join(", ")}
                            </div>
                            <Button
                              className="w-full mt-2"
                              onClick={() => navigate(`/description/${job.jobId}`)}
                            >
                              View Full Details
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSavedJob(job.jobId) }
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center py-4">
                  No saved jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeTab === "applied" ? "default" : "outline"}
          onClick={() => {
            setActiveTab("applied");
            setCurrentPage(1);
          }}
          className={`flex-1 ${activeTab === "applied" ? "bg-[#012760] hover:bg-[#012760]/90" : "border-[#012760] text-[#012760] hover:bg-[#012760]/10"}`}
        >
          Applied Jobs
        </Button>
        <Button
          variant={activeTab === "saved" ? "default" : "outline"}
          onClick={() => {
            setActiveTab("saved");
            setCurrentPage(1);
          }}
          className={`flex-1 ${activeTab === "saved" ? "bg-[#012760] hover:bg-[#012760]/90" : "border-[#012760] text-[#012760] hover:bg-[#012760]/10"}`}
        >
          Saved Jobs
        </Button>
      </div>

      <div className="bg-white rounded-lg">
        {renderJobTable()}

        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstJob + 1} to {Math.min(indexOfLastJob, activeTab === "applied" ? allAppliedJobs.length : savedJobs.length)} of {activeTab === "applied" ? allAppliedJobs.length : savedJobs.length} jobs
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
              className="border-[#012760] text-[#012760] hover:bg-[#012760]/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={indexOfLastJob >= (activeTab === "applied" ? allAppliedJobs.length : savedJobs.length)}
              className="border-[#012760] text-[#012760] hover:bg-[#012760]/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsSection;