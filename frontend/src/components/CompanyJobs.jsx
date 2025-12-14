import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MapPin,
  Globe,
  Briefcase,
  LogIn,
  ArrowLeft,
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
import PropTypes from "prop-types";
import { JOB_API_END_POINT } from "@/utils/constant";

const CompanyJobs = () => {
  const { companyId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { error } = useGetCompanyById(companyId);
  const company = useSelector((state) => state.company.singleCompany);
  const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanyJobs();
  }, [companyId]);

  const fetchCompanyJobs = async () => {
    try {
      const response = await fetch(
        `${JOB_API_END_POINT}/getCompanyJobs/${companyId}`
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
    navigate(`/description/${jobId}`);
  };

  const JobCard = ({ job }) => (
    <div className="bg-white border border-gray-300 rounded-xl p-4 md:p-3 md:px-6 transition duration-300 hover:shadow-lg hover:border-blue-100 relative group">
      <div className="flex items-start md:items-center mb-4 space-x-3 md:space-x-4 mt-2">
        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 rounded-xl flex items-center justify-center">
          {company?.logo ? (
            <img
              src={company.logo}
              alt={`${company.CompanyName || "Company"} logo`}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">Logo</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2">
            <h2 className="text-sm md:text-sm font-semibold text-[#949494] truncate">
              {company?.CompanyName || "Company Name"}
            </h2>
          </div>
          <h1 className="text-base md:text-xl font-semibold text-gray-700">
            {job?.title || "Position not specified"}
          </h1>
          <div className="flex items-center space-x-1 p-2 rounded-lg">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#012760]" />
            <span className="text-xs text-gray-600 truncate">
              {job?.location || "Location not specified"}
            </span>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-300"></div>

      <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 mb-4 mt-3">
        <div className="flex items-center space-x-2 bg-[#97C0FF] bg-opacity-25 p-2 rounded-lg justify-center">
          <span className="text-xs text-[#444444] truncate">
            {job?.salary ? `${job.salary}` : "Salary not specified"}
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-[#97C0FF] bg-opacity-25 p-2 rounded-lg justify-center">
          <span className="text-xs text-[#444444] truncate">
            {job?.jobType || "Job type not specified"}
          </span>
        </div>
      </div>

      <div>
        <div className="flex gap-10">
          <div className="mb-4 w-1/2 text-[#444444]">
            {job?.description ? (
              <div className="text-sm text-[#747474] line-clamp-2">
                {job.description}
              </div>
            ) : (
              "No description available"
            )}
          </div>

          <div className="ml-56 mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => handleViewDetails(job.jobId)}
              className="text-m md:text-m w-full sm:w-auto underline text-[#012760]"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  JobCard.propTypes = {
    job: PropTypes.shape({
      jobId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string,
      jobType: PropTypes.string,
      salary: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#012760] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-red-600 text-center">Error loading company data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-6 md:py-12 px-4 mt-6">
        <div className="bg-white p-6 md:p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-9 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-m font-bold">Go back</span>
          </button>

          {/* Company Logo */}
          {company && (
            <div className="mb-4">
              <img
                src={company.logo || "https://via.placeholder.com/100"}
                alt={company.CompanyName || "Company Logo"}
                className="w-20 h-20 rounded-lg object-contain border border-gray-200"
              />
            </div>
          )}

          {/* Company Name and Details */}
          {company && (
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#444444] mb-2">
                {company.CompanyName}
              </h1>

              {/* Location and Website */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg">
                  <MapPin className="w-4 h-4 text-[#012760]" />
                  <span className="text-[#949494] text-m">{company.location}</span>
                </div>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-opacity-20 transition-all duration-300"
                  >
                    <Globe className="w-4 h-4 text-[#012760]" />
                    <span className="text-[#949494] text-m">{company.website}</span>
                  </a>
                )}
              </div>

              {/* Company Description */}
              <div className="text-[#747474] text-sm leading-relaxed">
                {company.description}
              </div>
            </div>
          )}

          <div className="h-px bg-gray-200 w-full my-10"></div>

          {/* Jobs Section */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-[#444444]">
              Jobs Posted ({jobs.length})
            </h2>
          </div>

          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.jobId} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-[#444444] font-medium mb-2 text-xl">
                No open positions
              </h3>
              <p className="text-[#747474] text-sm">
                This company currently has no job listings
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl font-semibold">
              Sign in Required
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Please sign in to view job details and save jobs to your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm text-gray-500">
              Create an account or sign in to access all features and apply to jobs.
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
              onClick={() => navigate('/login')}
            >
              Already have an account? Sign in
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyJobs;