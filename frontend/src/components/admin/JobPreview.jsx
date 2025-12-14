import React, { useState } from "react";
import {
  MapPin,
  DollarSign,
  Briefcase,
  BookmarkIcon,
  Clock,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const JobPreview = ({ job }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getDaysAgo = (date) => {
    if (!date) return "Date not available";
    const now = new Date();
    const postDate = new Date(date);

    if (isNaN(postDate.getTime())) return "Invalid date";

    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return `${salary}K`;
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Function to render formatted text while preserving whitespace
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
            overflow: "hidden"
          })
        }}
        className="text-gray-700"
      >
        {text}
      </div>
    );
  };

  // Function to render requirements as a list if they're formatted that way
  const renderRequirements = (requirements) => {
    if (!requirements) return "No requirements specified";

    return (
      <div
        style={{ whiteSpace: "pre-wrap" }}
        className="text-gray-700 space-y-2"
      >
        {requirements}
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs defaultValue="card" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="card">Card View</TabsTrigger>
          <TabsTrigger value="detailed">Detailed View</TabsTrigger>
        </TabsList>

        <TabsContent value="card">
          <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-100 relative group">
            <button
              onClick={handleBookmark}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <BookmarkIcon
                className={`w-6 h-6 ${isBookmarked ? 'text-blue-600 fill-current' : 'text-gray-400'} hover:text-blue-600`}
              />
            </button>

            <div className="flex items-center mb-4 space-x-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <Avatar>
                  <AvatarImage
                    src={job?.company?.logo || "/api/placeholder/150/150"}
                    alt={`${job?.company?.CompanyName || 'Company'} logo`}
                    className="w-10 h-10 object-cover"
                  />
                </Avatar>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {job?.company?.CompanyName || "Company Name"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {getDaysAgo(job?.createdAt)}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h1 className="text-lg font-semibold text-gray-700">
                {job?.title || "Position not specified"}
              </h1>
              <div className="mt-1">
                {renderFormattedText(job?.description, 2)}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="text-xs text-gray-600">
                  {job?.location || "Location not specified"}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="text-xs text-gray-600">
                  {formatSalary(job?.salary)}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-purple-500" />
                <span className="text-xs text-gray-600">
                  {job?.jobType || "Type not specified"}
                </span>
              </div>
            </div>

            <div className="mt-3 flex gap-3">
              <Button variant="outline" className="rounded-full">
                View Description
              </Button>
              <Button
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleBookmark}
              >
                {isBookmarked ? 'Saved' : 'Save for later'}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="detailed">
          <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-8 relative hover:shadow-xl transition-all duration-300">
            {!isApplied ? (
              <Button
                onClick={() => setIsApplied(true)}
                className="absolute top-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl group"
              >
                Apply Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Button>
            ) : (
              <div className="absolute top-6 right-6 text-green-600 font-medium flex items-center bg-green-50 px-4 py-2 rounded-xl">
                <CheckCircle2 className="mr-2 w-5 h-5" />
                Applied
              </div>
            )}

            <div className="mb-6">
              <h1 className="font-bold text-3xl text-gray-900 mb-4">
                {job?.title || "Position not specified"}
              </h1>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
                  <Clock className="w-4 h-4" />
                  {job?.jobType || "Type not specified"}
                </div>
                <div className="flex items-center gap-2 bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-sm">
                  <DollarSign className="w-4 h-4" />
                  {formatSalary(job?.salary)}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6 bg-gray-50 p-6 rounded-xl">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    <strong>Location:</strong> {job?.location || "Not specified"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">
                    <strong>Posted:</strong>{" "}
                    {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Date not available"}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">
                    <strong>Experience:</strong> {job?.experience ? `${job.experience} Yrs` : "Not specified"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">
                    <strong>Total Applicants:</strong>{" "}
                    {job?.applications?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
                Job Description
              </h2>
              {renderFormattedText(job?.description)}
            </div>

            <div className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold border-b pb-2 text-gray-800">
                Requirements
              </h2>
              {renderRequirements(job?.requirements)}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobPreview;