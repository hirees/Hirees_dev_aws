import React, { useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  BookmarkIcon,
  X,
  LogIn,
  Building2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { SAVED_JOBS_API_END_POINT } from "@/utils/constant";

function Job({ job }) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (isAuthenticated) {
      const checkSavedStatus = async () => {
        try {
          const response = await axios.get(
            `${SAVED_JOBS_API_END_POINT}/check/${job.jobId}`,
            { withCredentials: true }
          );
          setIsSaved(response.data.isSaved);
        } catch (error) {
          console.error("Error checking saved status:", error);
        }
      };
      checkSavedStatus();
    }
  }, [job.jobId, isAuthenticated]);

  const handleAction = (action) => {
    if (action === "description") {
      navigate(`/description/${job?.jobId}`);
      return;
    }

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
          { jobId: job.jobId },
          { withCredentials: true }
        );
        setIsSaved(true);
      } else {
        await axios.delete(
          `${SAVED_JOBS_API_END_POINT}/saved`,
          { data: { jobId: job.jobId }, withCredentials: true }
        );
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Error saving/unsaving job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const today = new Date();
    const jobDate = new Date(mongodbTime);
    today.setHours(0, 0, 0, 0);
    jobDate.setHours(0, 0, 0, 0);
    const diffTime = today - jobDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysAgo = job?.createdAt ? daysAgoFunction(job.createdAt) : null;

  const renderFormattedText = (text, maxLines = null) => {
    if (!text) return "Not specified";
    return (
      <div
        style={{
          whiteSpace: "pre-wrap",
          ...(maxLines && {
            display: "-webkit-box",
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }),
        }}
        className="text-gray-500 text-sm"
      >
        {text}
      </div>
    );
  };

  return (
    <>
      <div className=" bg-white border border-gray-300 rounded-xl p-4 md:p-3 md:px-6 transition duration-300 hover:shadow-lg hover:border-blue-100 relative group">
        <button
          onClick={() => handleAction("save")}
          disabled={isLoading}
          className="absolute top-2 md:top-4 right-2 md:right-4 md:opacity-100 md:group-hover:opacity-100 transition duration-300 disabled:cursor-not-allowed"
        >
          <BookmarkIcon
            className={`w-5 h-5 md:w-8 md:h-8 ${
              isSaved
                ? "text-[#012760] fill-current"
                : "text-[#012760]"
            }`}
          />
        </button>

        <div className="flex items-start md:items-center mb-4 space-x-3 md:space-x-4 mt-2">
          <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 rounded-xl flex items-center justify-center ">
            {job?.company?.logo ? (
              <img
                src={job?.company?.logo}
                alt={`${job?.company?.name || "Company"} logo`}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <Building2 className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0  ">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2">
              <h2 className="text-sm md:text-sm font-semibold text-[#949494] truncate">
                {job?.company?.CompanyName || "Company Name"}
              </h2>
            </div>
            <h1 className="text-base md:text-xl font-semibold text-gray-700">
              {job?.title || "Position not specified"}
            </h1>
            <div className="flex items-center space-x-1  p-2 rounded-lg ">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#012760] " />
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

        <div className="flex gap-10 ">

        <div className="mb-4 w-1/2 text-[#444444]  ">
          {renderFormattedText(
            job?.description || "No description available",
            2
          )}
        </div>


        <div className="ml-56 mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3  ">

          <Link
            className="text-m md:text-m w-full sm:w-auto underline text-[#012760] "
            onClick={() => handleAction("description")}
          >
            View Details
          </Link>

        </div>
        </div>
      </div>
      </div>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Sign in Required
              <Button
                variant="ghost"
                className="h-6 w-6 p-0 rounded-full"
                onClick={() => setShowAuthModal(false)}
              >
                {/* <X className="h-4 w-4" /> */}
              </Button>
            </DialogTitle>
            <DialogDescription>
              Please sign in to{" "}
              {lastAction === "save"
                ? "save jobs to your profile"
                : "apply to jobs"}
              .
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm text-gray-500">
              Create an account or sign in to access all features and save your
              favorite jobs.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setShowAuthModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setShowAuthModal(false);
                  navigate("/signup/candidate");
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </div>
          <div className="text-right">
            <a
              className="text-xs cursor-pointer hover:text-blue-700 hover:underline"
              onClick={() => {
                setShowAuthModal(false);
                navigate("/login");
              }}
            >
              Already Registered?
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Job;
