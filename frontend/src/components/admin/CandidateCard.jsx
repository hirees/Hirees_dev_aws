import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  User,
  MapPin,
  Mail,
  Phone,
  FileText,
  Building2,
  Briefcase,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  GraduationCap
} from "lucide-react";
import { USER_API_END_POINT } from '@/utils/constant';
import { formatDistanceToNow } from 'date-fns';

const CandidateCard = ({ student, onViewFullInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fullInfo, setFullInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewError, setViewError] = useState(null);
  const [hasViewedBefore, setHasViewedBefore] = useState(student.viewedByMe || false);

  // Format dates for better display
  const formattedUpdatedAt = student.updatedAt ?
    formatDistanceToNow(new Date(student.updatedAt), { addSuffix: true }) :
    "unknown";

  // Function to handle the "View Full Info" button click
  const handleViewFullInfo = async () => {
    // If we already have full info, just toggle display
    if (fullInfo) {
      setIsExpanded(!isExpanded);
      return;
    }

    setLoading(true);
    setViewError(null);

    try {
      // Get user info from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user.email : null;

      if (!userId) {
        setViewError("User not logged in");
        setLoading(false);
        return;
      }

      // Call the API to get full student info with view tracking
      const response = await fetch(
        `${USER_API_END_POINT}/students/${student._id}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: userId, viewerId: userId })
        }
      );

      const data = await response.json();

      if (data.success) {
        setFullInfo(data.data);
        setIsExpanded(true);
        setHasViewedBefore(data.viewedBefore || student.viewedByMe);

        // Call the parent callback to update view counts in parent component
        onViewFullInfo({
          companyViews: data.remainingViews,
          personalViews: data.personalViewCount
        });
      } else {
        throw new Error(data.message || "Failed to load student details");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      setViewError(error.message || "Failed to load student details");
    } finally {
      setLoading(false);
    }
  };

  // Get visa status display name
  const getVisaStatusDisplay = (status) => {
    const statusMap = {
      "citizen": "Citizen",
      "permanent_resident": "Permanent Resident",
      "work_visa": "Work Visa",
      "student_visa": "Student Visa",
      "other": "Other Visa Status"
    };
    return statusMap[status] || status;
  };

  // Process skills for display
  const processSkills = (skills) => {
    if (!skills) return { displaySkills: [], count: 0 };

    // Extract string values from DynamoDB format if needed
    const processedSkills = Array.isArray(skills)
      ? skills.map(skill => typeof skill === 'object' && skill.S ? skill.S : skill)
      : [];

    // For preview, show only first 3 skills
    return {
      displaySkills: processedSkills.slice(0, 3),
      count: processedSkills.length,
      allSkills: processedSkills
    };
  };

  // Decide which data to use - either minimal or full
  const displayData = fullInfo || student;

  // Process skills for display
  const { displaySkills, count, allSkills } = processSkills(displayData.profile?.skills);

  return (
    <Card className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-xl p-4 md:p-3 md:px-6 transition duration-300 hover:shadow-lg hover:border-blue-100 relative group">
      <div className="flex items-start md:items-center mb-4 space-x-3 md:space-x-4 mt-2">
        {/* Profile Photo */}
        <div className="h-14 w-14 md:h-20 md:w-20 shrink-0 rounded-xl flex items-center justify-center">
          {hasViewedBefore && (
            <div className="absolute -top-1 -left-1 bg-blue-500 text-white rounded-full p-1 z-10">
              <CheckCircle className="w-3 h-3" />
            </div>
          )}

          {displayData.profile?.profilePhoto ? (
            <img
              src={displayData.profile.profilePhoto}
              alt={displayData.fullname}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
              <User className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2">
            <h2 className="text-sm md:text-sm font-semibold text-[#949494] truncate">
              {displayData.profile?.jobTitle || "No title"}
            </h2>
          </div>
          <h1 className="text-base md:text-xl font-semibold text-gray-700">
            {displayData.fullname}
          </h1>
          <div className="flex items-center space-x-1 p-2 rounded-lg">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#012760]" />
            <span className="text-xs text-gray-600 truncate">
              {displayData.profile?.currentLocation || "N/A"}
            </span>
          </div>
        </div>

        {/* <Button
          variant={hasViewedBefore ? "outline" : "secondary"}
          size="sm"
          onClick={handleViewFullInfo}
          disabled={loading}
          className="h-8 gap-1.5 text-xs font-medium"
        >
          <Eye className={`w-3.5 h-3.5 ${hasViewedBefore ? "text-blue-500" : ""}`} />
          {loading ? "Loading..." :
            fullInfo ? (isExpanded ? "Hide Details" : "Show Details") :
            hasViewedBefore ? "View Again" : "View Profile"}
        </Button> */}
      </div>

      <div className="h-px bg-gray-300"></div>

      <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 mb-4 mt-3">
        {displayData.profile?.jobDomain && (
          <div className="flex items-center space-x-2 bg-[#97C0FF] bg-opacity-25 p-2 rounded-lg justify-center">
            <GraduationCap className="w-4 h-4 text-[#012760]" />
            <span className="text-xs text-[#444444] truncate">
              {displayData.profile.jobDomain}
            </span>
          </div>
        )}
        {displayData.profile?.visaStatus && (
          <div className="flex items-center space-x-2 bg-[#97C0FF] bg-opacity-25 p-2 rounded-lg justify-center">
            <Building2 className="w-4 h-4 text-[#012760]" />
            <span className="text-xs text-[#444444] truncate">
              {getVisaStatusDisplay(displayData.profile.visaStatus)}
            </span>
          </div>
        )}
        {displayData.profile?.willingToRelocate !== undefined && (
          <div className="flex items-center space-x-2 bg-[#97C0FF] bg-opacity-25 p-2 rounded-lg justify-center">
            <Briefcase className="w-4 h-4 text-[#012760]" />
            <span className="text-xs text-[#444444] truncate">
              {displayData.profile.willingToRelocate === true ||
                displayData.profile.willingToRelocate === "true" ? "Willing to Relocate" : "Not Relocating"}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between items-end gap-4 mb-2">
        <div className="w-2/3 text-[#444444]">
          {displayData.profile?.bio && (
            <div className="text-sm text-gray-500 line-clamp-2">
              {displayData.profile.bio}
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          <button
            className="text-sm md:text-base font-medium text-[#012760] hover:text-[#012760]/80 transition-colors underline"
            onClick={handleViewFullInfo}
            disabled={loading}
          >
            {loading ? "Loading..." : 
              fullInfo ? (isExpanded ? "Hide Details" : "Show Details") :
              hasViewedBefore ? "View Again" : "View Profile"}
          </button>
        </div>
      </div>

      {/* View Error Message */}
      {viewError && (
        <div className="mt-4">
          <Alert variant="destructive" className="py-3 text-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-sm">Error</AlertTitle>
            <AlertDescription className="text-xs">{viewError}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Expanded Content */}
      {fullInfo && isExpanded && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            {fullInfo.phoneNumber && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{fullInfo.phoneNumber}</span>
              </div>
            )}
            {fullInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm truncate max-w-[180px]">{fullInfo.email}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {fullInfo.profile?.skills?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(fullInfo.profile.skills) ?
                  fullInfo.profile.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs py-0.5 px-2 h-6">
                      {typeof skill === 'object' && skill.S ? skill.S : skill}
                    </Badge>
                  )) :
                  <span className="text-xs text-gray-500">No skills listed</span>
                }
              </div>
            </div>
          )}

          {/* Resume */}
          {fullInfo.profile?.resume && (
            <div className="mt-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <a
                href={fullInfo.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline truncate"
              >
                Resume: {fullInfo.profile.resumeOriginalName || "Download Resume"}
              </a>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default CandidateCard;