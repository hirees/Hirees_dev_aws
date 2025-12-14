import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  ListChecks,
  LogIn,
  Building2,
  Calendar,
  ExternalLink,
  ArrowLeft,
  Users,
  Globe,
  BookmarkIcon,
  ArrowRight,
} from "lucide-react";
import PropTypes from "prop-types";

import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT, COMPANY_API_END_POINT, SAVED_JOBS_API_END_POINT } from "@/utils/constant";
import { setLoading } from "@/redux/authSlice";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Footer from "./Footer";

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

MetadataBadge.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

function JobDescription() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [moreJobs, setMoreJobs] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const u = useSelector((state) => state.auth?.user);
  const isAuthenticated = !!u;

  const isInitiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?.id || false
  );
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

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

  // Check if job is saved when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      const checkSavedStatus = async () => {
        try {
          const response = await axios.get(
            `${SAVED_JOBS_API_END_POINT}/check/${jobId}`,
            { withCredentials: true }
          );
          setIsSaved(response.data.isSaved);
        } catch (error) {
          console.error("Error checking saved status:", error);
        }
      };
      checkSavedStatus();
    }
  }, [jobId, isAuthenticated]);

  const handleAction = (action) => {
    if (!isAuthenticated) {
      setLastAction(action);
      setShowAuthModal(true);
      return;
    }

    if (action === "save") {
      handleSaveJob();
    }
  };

  const handleSaveJob = async () => {
    try {
      setIsLoading(true);
      if (!isSaved) {
        await axios.post(
          `${SAVED_JOBS_API_END_POINT}/save`,
          { jobId },
          { withCredentials: true }
        );
        setIsSaved(true);
      } else {
        await axios.delete(
          `${SAVED_JOBS_API_END_POINT}/saved`,
          { data: { jobId }, withCredentials: true }
        );
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Error saving/unsaving job:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        // Fetch job details
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

          // Fetch company details
          if (res.data.job.companyId) {
            try {
              const companyRes = await axios.get(
                `${COMPANY_API_END_POINT}/get/${res.data.job.companyId}`
              );
              if (companyRes.data.status) {
                setCompanyDetails(companyRes.data.data);
              }
            } catch (companyErr) {
              console.error("Error fetching company details:", companyErr);
              toast.error("Error fetching company details");
            }
          }

          // Fetch latest jobs
          try {
            const latestJobsRes = await axios.get(
              `${JOB_API_END_POINT}/getlatest?limit=2&exclude=${jobId}`
            );
            if (latestJobsRes.data.status) {
              setMoreJobs(latestJobsRes.data.jobs);
            }
          } catch (latestJobsErr) {
            console.error("Error fetching latest jobs:", latestJobsErr);
            // Don't show error toast for latest jobs as it's not critical
          }
        } else {
          setError(new Error("Failed to fetch job details."));
          toast.error("Failed to fetch job details");
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setError(err);
        toast.error(err.response?.data?.message || "Error fetching job details");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const JobCard = ({ job }) => (
    <div className="bg-white border border-gray-300 rounded-xl p-4 md:p-3 md:px-6 transition duration-300 hover:shadow-lg hover:border-blue-100 relative group">
      <div className="flex items-start md:items-center mb-4 space-x-3 md:space-x-4 mt-2">
        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 rounded-xl flex items-center justify-center">
          {job?.company?.logo ? (
            <img
              src={job?.company?.logo}
              alt={`${job?.company?.name || "Company"} logo`}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <Building2 className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2">
            <h2 className="text-sm md:text-sm font-semibold text-[#949494] truncate">
              {job?.company?.CompanyName || "Company Name"}
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
            {renderFormattedText(job?.description || "No description available", 2)}
          </div>

          <div className="ml-56 mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => navigate(`/job/${job._id}`)}
              className="text-m md:text-m w-full sm:w-auto underline text-[#012760]"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-white">
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
          <div className="mb-4">
            <img
              src={companyDetails?.logo || "https://via.placeholder.com/100"}
              alt={companyDetails?.CompanyName || "Company Logo"}
              className="w-20 h-20 rounded-lg object-contain border border-gray-200"
            />
          </div>

          {/* Position and Apply Button Row */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-[#444444] mb-2">
                {singleJob?.title}
              </h1>
            </div>
            {user?.role !== "recruiter" && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAction("save")}
                  disabled={isLoading}
                  className="relative transition duration-300 disabled:cursor-not-allowed"
                >
                  <BookmarkIcon
                    className={`w-8 h-8 ${
                      isSaved
                        ? "text-[#012760] fill-current"
                        : "text-[#012760]"
                    }`}
                  />
                </button>
                {isApplied ? (
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-medium">
                    <CheckCircle2 className="w-5 h-5" />
                    Applied
                  </div>
                ) : (
                  <Button
                    onClick={applyJobHandler}
                    disabled={isApplying}
                    className="text-lg bg-gradient-to-r from-blue-700 to-blue-900 hover:opacity-90 transition-all duration-300 text-white rounded-lg px-7 py-5 font-semibold"
                  >
                    {isApplying ? "Applying..." : "Apply Now"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Company Location and Website */}
          <div className="flex items-center gap-2 mb-4 ">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg">
              <MapPin className="w-4 h-4 text-[#012760]" />
              <span className="text-[#949494] text-m">{singleJob?.location}</span>
            </div>
            {companyDetails?.website && (
              <a
                href={companyDetails.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2  px-3 py-1.5 rounded-lg hover:bg-opacity-20 transition-all duration-300"
              >
                <Globe className="w-4 h-4 text-[#012760]" />
                <span className="text-[#949494] text-m">{companyDetails.website}</span>
              </a>
            )}
          </div>

          {/* Tags and Posted Date Row */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-wrap gap-3">
              {singleJob?.jobType && (
                <div className="bg-[#97C0FF] bg-opacity-30 px-3 py-1.5 rounded-lg">
                  <span className="text-[#444444] text-sm">
                    {Array.isArray(singleJob.jobType) ? singleJob.jobType[0] : singleJob.jobType}
                  </span>
                </div>
              )}
              {singleJob?.salary && (
                <div className="bg-[#97C0FF] bg-opacity-30 px-3 py-1.5 rounded-lg">
                  <span className="text-[#444444] text-sm">
                    {singleJob.salary}
                  </span>
                </div>
              )}
              {singleJob?.experience && (
                <div className="bg-[#97C0FF] bg-opacity-30 px-3 py-1.5 rounded-lg">
                  <span className="text-[#444444] text-sm">
                    {`${singleJob.experience} years`}
                  </span>
                </div>
              )}
            </div>
            {singleJob?.createdAt && (
              <div className="text-[#949494] text-sm">
                Posted {(() => {
                  const today = new Date();
                  const jobDate = new Date(singleJob.createdAt);
                  const diffTime = today - jobDate;
                  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays === 0 ? 'today' : 
                         diffDays === 1 ? 'yesterday' : 
                         `${diffDays} days ago`;
                })()}
              </div>
            )}
          </div>

          

          <div className="h-px bg-gray-200 w-full my-10"></div>


          {/* Main Content Sections */}
          <div className="space-y-8 text-[#747474]">
            {/* Job Role Overview */}
            <section>
              <h2 className="text-3xl font-semibold text-[#444444] mb-4">
                Job Role Overview
              </h2>
              <div className="text-[#747474]">{renderFormattedText(singleJob?.description)}</div>
              
            </section>

            {/* Qualifications */}
            {requirements.length > 0 && (
              <section>
                <h2 className="text-3xl font-semibold text-[#444444] mb-4 flex items-center gap-2">
                  Qualifications
                </h2>
                <ul className="space-y-2 ml-5">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-gray-600 mt-2.5" />
                      <span className="text-[#747474]">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Key Responsibilities */}
            {singleJob?.responsibilities && (
              <section>
                <h2 className="text-3xl font-semibold text-[#444444] mb-4">
                  Key Responsibilities
                </h2>
                {renderFormattedText(singleJob.responsibilities)}
              </section>
            )}

            {/* Hiring Team */}
            {hiringTeam.length > 0 && (
              <section>
                <h2 className="text-3xl font-semibold text-[#444444] mb-4 flex items-center gap-2">
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
              </section>
            )}
            <div className="h-px bg-gray-200 w-full my-6"></div>
            {/* About Company */}
            {companyDetails && (
              <section>
                <div className="flex justify-between items-start">
                  <h2 className="text-5xl font-semibold text-[#444444] mb-4">
                    About Company
                  </h2>
                  {companyDetails.website && (
                    <a
                      href={companyDetails.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#012760] underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{companyDetails?.website}</span>
                    </a>
                  )}
                </div>
                <div className="rounded-lg mt-2 text-[#747474]">
                  {renderFormattedText(companyDetails.description)}
                </div>
              </section>
            )}

            {/* More Jobs Section */}
            {moreJobs.length > 0 && (
              <section>
                <div className="h-px bg-gray-200 w-full my-6"></div>
                <div className="flex justify-between items-center mb-14">
                  <h2 className="text-5xl font-bold text-[#444444]">
                    More Jobs
                  </h2>
                  <Button
                    onClick={() => navigate('/jobs')}
                    variant="outline"
                    className="text-[#012760] border-[#012760] hover:bg-[#012760] hover:text-white transition-all duration-300"
                  >
                    View All Jobs
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {moreJobs.slice(0, 2).map((job) => (
                    <Job key={job._id} job={job} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default JobDescription;
