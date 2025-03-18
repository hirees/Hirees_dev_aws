// import React, { useState } from 'react';
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   User,
//   MapPin,
//   Mail,
//   Phone,
//   FileText,
//   Building2,
//   Briefcase,
//   Eye,
//   AlertCircle,
//   CheckCircle
// } from "lucide-react";
// import { USER_API_END_POINT } from '@/utils/constant';

// const CandidateCard = ({ student, onViewFullInfo }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [fullInfo, setFullInfo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [viewError, setViewError] = useState(null);
//   const [hasViewedBefore, setHasViewedBefore] = useState(student.viewedByMe || false);

//   // Function to handle the "View Full Info" button click
//   const handleViewFullInfo = async () => {
//     // If we already have full info, just toggle display
//     if (fullInfo) {
//       setIsExpanded(!isExpanded);
//       return;
//     }

//     setLoading(true);
//     setViewError(null);

//     try {
//       // Get user info from localStorage
//       const user = JSON.parse(localStorage.getItem("user"));
//       const userId = user ? user.email : null;

//       if (!userId) {
//         setViewError("User not logged in");
//         setLoading(false);
//         return;
//       }

//       // Call the API to get full student info with view tracking
//       const response = await fetch(
//         `${USER_API_END_POINT}/students/${student.email}`,
//         {
//           method: 'POST',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ email: userId, viewerId: userId })
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         setFullInfo(data.data);
//         setIsExpanded(true);
//         setHasViewedBefore(data.viewedBefore || student.viewedByMe);

//         // Call the parent callback to update view counts in parent component
//         onViewFullInfo({
//           companyViews: data.remainingViews,
//           personalViews: data.personalViewCount
//         });
//       } else {
//         throw new Error(data.message || "Failed to load student details");
//       }
//     } catch (error) {
//       console.error("Error fetching student details:", error);
//       setViewError(error.message || "Failed to load student details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Decide which data to use - either minimal or full
//   const displayData = fullInfo || student;

//   return (
//     <Card className={`border ${hasViewedBefore ? 'border-l-4 border-l-blue-500' : ''} hover:shadow-sm transition-shadow`}>
//       <div className="p-4">
//         <div className="flex gap-3">
//           {/* Profile Photo */}
//           <div className="relative flex-shrink-0">
//             {hasViewedBefore && (
//               <div className="absolute -top-1 -left-1 bg-blue-500 text-white rounded-full p-1 z-10">
//                 <CheckCircle className="w-3 h-3" />
//               </div>
//             )}

//             {displayData.profile?.profilePhoto ? (
//               <img
//                 src={displayData.profile.profilePhoto}
//                 alt={displayData.fullname}
//                 className="w-14 h-14 rounded-full object-cover"
//               />
//             ) : (
//               <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
//                 <User className="w-6 h-6 text-gray-400" />
//               </div>
//             )}
//           </div>

//           {/* Basic Info */}
//           <div className="flex-1">
//             <div className="flex justify-between">
//               <div>
//                 <h3 className="text-base font-medium">{displayData.fullname}</h3>
//                 <p className="text-sm text-gray-600">{displayData.profile?.jobTitle || "No title"}</p>
//               </div>

//               <Button
//                 variant={hasViewedBefore ? "outline" : "secondary"}
//                 size="sm"
//                 onClick={handleViewFullInfo}
//                 disabled={loading}
//                 className="h-8 gap-1 text-xs"
//               >
//                 <Eye className={`w-3 h-3 ${hasViewedBefore ? "text-blue-500" : ""}`} />
//                 {loading ? "Loading..." :
//                   fullInfo ? (isExpanded ? "Hide" : "Show") :
//                   hasViewedBefore ? "View Again" : "View Profile"}
//               </Button>
//             </div>

//             <div className="mt-2 flex items-center gap-4 text-xs text-gray-600">
//               <div className="flex items-center gap-1">
//                 <Mail className="w-3 h-3" />
//                 <span className="truncate max-w-[180px]">{displayData.email}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <MapPin className="w-3 h-3" />
//                 <span>{displayData.profile?.currentLocation || "N/A"}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* View Error Message */}
//         {viewError && (
//           <div className="mt-3">
//             <Alert variant="destructive" className="py-2 text-sm">
//               <AlertCircle className="h-3 w-3" />
//               <AlertTitle className="text-sm">Error</AlertTitle>
//               <AlertDescription className="text-xs">{viewError}</AlertDescription>
//             </Alert>
//           </div>
//         )}

//         {/* Expanded Content - Only shown when full info is available and expanded */}
//         {fullInfo && isExpanded && (
//           <div className="mt-4 pt-3 border-t text-sm">
//             <div className="grid grid-cols-2 gap-2">
//               <div className="flex items-center gap-1">
//                 <Phone className="w-3 h-3 text-gray-400" />
//                 <span>{fullInfo.phoneNumber || "N/A"}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Building2 className="w-3 h-3 text-gray-400" />
//                 <span>Visa: {fullInfo.profile?.visaStatus?.replace("_", " ") || "N/A"}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Briefcase className="w-3 h-3 text-gray-400" />
//                 <span>Relocate: {fullInfo.profile?.willingToRelocate ? "Yes" : "No"}</span>
//               </div>
//             </div>

//             {/* Bio */}
//             {fullInfo.profile?.bio && (
//               <div className="mt-3">
//                 <h4 className="font-medium text-xs text-gray-700 mb-1">About</h4>
//                 <p className="text-xs text-gray-600">{fullInfo.profile.bio}</p>
//               </div>
//             )}

//             {/* Skills */}
//             {fullInfo.profile?.skills?.length > 0 && (
//               <div className="mt-3">
//                 <h4 className="font-medium text-xs text-gray-700 mb-1">Skills</h4>
//                 <div className="flex flex-wrap gap-1">
//                   {fullInfo.profile.skills.map((skill, index) => (
//                     <Badge key={index} variant="outline" className="text-xs py-0 h-5">
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Resume */}
//             {fullInfo.profile?.resume && (
//               <div className="mt-3 flex items-center gap-1">
//                 <FileText className="w-3 h-3 text-blue-600" />
//                 <a
//                   href={fullInfo.profile.resume}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-xs text-blue-600 hover:underline truncate"
//                 >
//                   Resume: {fullInfo.profile.resumeOriginalName || "Download Resume"}
//                 </a>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// };

// // export default CandidateCard;
// import React, { useState } from 'react';
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   User,
//   MapPin,
//   Mail,
//   Phone,
//   FileText,
//   Building2,
//   Briefcase,
//   Eye,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   GraduationCap
// } from "lucide-react";
// import { USER_API_END_POINT } from '@/utils/constant';
// import { formatDistanceToNow } from 'date-fns';

// const CandidateCard = ({ student, onViewFullInfo }) => {
//   console.log(student)
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [fullInfo, setFullInfo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [viewError, setViewError] = useState(null);
//   const [hasViewedBefore, setHasViewedBefore] = useState(student.viewedByMe || false);

//   // Format dates for better display
//   const formattedUpdatedAt = student.updatedAt ?
//     formatDistanceToNow(new Date(student.updatedAt), { addSuffix: true }) :
//     "unknown";

//   // Function to handle the "View Full Info" button click
//   const handleViewFullInfo = async () => {
//     // If we already have full info, just toggle display
//     if (fullInfo) {
//       setIsExpanded(!isExpanded);
//       return;
//     }

//     setLoading(true);
//     setViewError(null);

//     try {
//       // Get user info from localStorage
//       const user = JSON.parse(localStorage.getItem("user"));
//       const userId = user ? user.email : null;

//       if (!userId) {
//         setViewError("User not logged in");
//         setLoading(false);
//         return;
//       }
// console.log(student)
//       // Call the API to get full student info with view tracking
//       const response = await fetch(
//         `${USER_API_END_POINT}/students/${student._id}`,
//         {
//           method: 'POST',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ email: userId, viewerId: userId })
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         setFullInfo(data.data);
//         setIsExpanded(true);
//         setHasViewedBefore(data.viewedBefore || student.viewedByMe);

//         // Call the parent callback to update view counts in parent component
//         onViewFullInfo({
//           companyViews: data.remainingViews,
//           personalViews: data.personalViewCount
//         });
//       } else {
//         throw new Error(data.message || "Failed to load student details");
//       }
//     } catch (error) {
//       console.error("Error fetching student details:", error);
//       setViewError(error.message || "Failed to load student details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get visa status display name
//   const getVisaStatusDisplay = (status) => {
//     const statusMap = {
//       "citizen": "Citizen",
//       "permanent_resident": "Permanent Resident",
//       "work_visa": "Work Visa",
//       "student_visa": "Student Visa",
//       "other": "Other Visa Status"
//     };
//     return statusMap[status] || status;
//   };

//   // Process skills for display
//   const processSkills = (skills) => {
//     if (!skills) return { displaySkills: [], count: 0 };

//     // Extract string values from DynamoDB format if needed
//     const processedSkills = Array.isArray(skills)
//       ? skills.map(skill => typeof skill === 'object' && skill.S ? skill.S : skill)
//       : [];

//     // For preview, show only first 3 skills
//     return {
//       displaySkills: processedSkills.slice(0, 3),
//       count: processedSkills.length,
//       allSkills: processedSkills
//     };
//   };

//   // Decide which data to use - either minimal or full
//   const displayData = fullInfo || student;

//   // Process skills for display
//   const { displaySkills, count, allSkills } = processSkills(displayData.profile?.skills);

//   return (
//     <Card className={`border ${hasViewedBefore ? 'border-l-4 border-l-blue-500' : ''} hover:shadow-md transition-shadow`}>
//       <div className="p-5">
//         <div className="flex gap-4">
//           {/* Profile Photo */}
//           <div className="relative flex-shrink-0">
//             {hasViewedBefore && (
//               <div className="absolute -top-1 -left-1 bg-blue-500 text-white rounded-full p-1 z-10">
//                 <CheckCircle className="w-3 h-3" />
//               </div>
//             )}

//             {displayData.profile?.profilePhoto ? (
//               <img
//                 src={displayData.profile.profilePhoto}
//                 alt={displayData.fullname}
//                 className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
//               />
//             ) : (
//               <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
//                 <User className="w-7 h-7 text-gray-400" />
//               </div>
//             )}
//           </div>

//           {/* Basic Info */}
//           <div className="flex-1">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-lg font-medium text-gray-800">{displayData.fullname}</h3>
//                 <p className="text-sm text-gray-600 mt-1">{displayData.profile?.jobTitle || "No title"}</p>
//               </div>

//               <Button
//                 variant={hasViewedBefore ? "outline" : "secondary"}
//                 size="sm"
//                 onClick={handleViewFullInfo}
//                 disabled={loading}
//                 className="h-8 gap-1.5 text-xs font-medium"
//               >
//                 <Eye className={`w-3.5 h-3.5 ${hasViewedBefore ? "text-blue-500" : ""}`} />
//                 {loading ? "Loading..." :
//                   fullInfo ? (isExpanded ? "Hide Details" : "Show Details") :
//                   hasViewedBefore ? "View Again" : "View Profile"}
//               </Button>
//             </div>

//             <div className="mt-3 flex flex-wrap items-center gap-5 text-xs text-gray-600">
//               {displayData.email && (
//                 <div className="flex items-center gap-1.5">
//                   <Mail className="w-3.5 h-3.5" />
//                   <span className="truncate max-w-[180px]">{displayData.email}</span>
//                 </div>
//               )}
//               <div className="flex items-center gap-1.5">
//                 <MapPin className="w-3.5 h-3.5" />
//                 <span>{displayData.profile?.currentLocation || "N/A"}</span>
//               </div>
//               {displayData.profile?.jobDomain && (
//                 <div className="flex items-center gap-1.5">
//                   <GraduationCap className="w-3.5 h-3.5" />
//                   <span>{displayData.profile.jobDomain}</span>
//                 </div>
//               )}
//               {displayData.updatedAt && (
//                 <div className="flex items-center gap-1.5">
//                   <Clock className="w-3.5 h-3.5" />
//                   <span>Updated {formattedUpdatedAt}</span>
//                 </div>
//               )}
//             </div>

//             {/* Show skill preview in minimal view */}
//             {displaySkills.length > 0 && (
//               <div className="mt-3">
//                 <div className="flex flex-wrap gap-1.5">
//                   {displaySkills.map((skill, index) => (
//                     <Badge key={index} variant="outline" className="text-xs py-0.5 px-2 h-6">
//                       {skill}
//                     </Badge>
//                   ))}
//                   {count > displaySkills.length && (
//                     <Badge variant="outline" className="text-xs py-0.5 px-2 h-6 bg-gray-50">
//                       +{count - displaySkills.length} more
//                     </Badge>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Bio preview in minimal view */}
//             {displayData.profile?.bio && (
//               <div className="mt-3">
//                 <p className="text-xs text-gray-600 line-clamp-2">{displayData.profile.bio}</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* View Error Message */}
//         {viewError && (
//           <div className="mt-4">
//             <Alert variant="destructive" className="py-3 text-sm">
//               <AlertCircle className="h-4 w-4" />
//               <AlertTitle className="text-sm">Error</AlertTitle>
//               <AlertDescription className="text-xs">{viewError}</AlertDescription>
//             </Alert>
//           </div>
//         )}

//         {/* Expanded Content - Only shown when full info is available and expanded */}
//         {fullInfo && isExpanded && (
//           <div className="mt-5 pt-4 border-t border-gray-100">
//             <div className="grid grid-cols-2 gap-3">
//               <div className="flex items-center gap-2">
//                 <Phone className="w-4 h-4 text-gray-500" />
//                 <span className="text-sm">{fullInfo.phoneNumber || "N/A"}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Building2 className="w-4 h-4 text-gray-500" />
//                 <span className="text-sm">Visa: {getVisaStatusDisplay(fullInfo.profile?.visaStatus) || "N/A"}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Briefcase className="w-4 h-4 text-gray-500" />
//                 <span className="text-sm">Relocate: {fullInfo.profile?.willingToRelocate === true || fullInfo.profile?.willingToRelocate === "true" ? "Yes" : "No"}</span>
//               </div>
//             </div>

//             {/* Bio */}
//             {fullInfo.profile?.bio && (
//               <div className="mt-4">
//                 <h4 className="font-medium text-sm text-gray-700 mb-2">About</h4>
//                 <p className="text-sm text-gray-600 leading-relaxed">{fullInfo.profile.bio}</p>
//               </div>
//             )}

//             {/* Skills */}
//             {fullInfo.profile?.skills?.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="font-medium text-sm text-gray-700 mb-2">Skills</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {Array.isArray(fullInfo.profile.skills) ?
//                     fullInfo.profile.skills.map((skill, index) => (
//                       <Badge key={index} variant="outline" className="text-xs py-0.5 px-2 h-6">
//                         {typeof skill === 'object' && skill.S ? skill.S : skill}
//                       </Badge>
//                     )) :
//                     <span className="text-xs text-gray-500">No skills listed</span>
//                   }
//                 </div>
//               </div>
//             )}

//             {/* Resume */}
//             {fullInfo.profile?.resume && (
//               <div className="mt-4 flex items-center gap-2">
//                 <FileText className="w-4 h-4 text-blue-600" />
//                 <a
//                   href={fullInfo.profile.resume}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm text-blue-600 hover:underline truncate"
//                 >
//                   Resume: {fullInfo.profile.resumeOriginalName || "Download Resume"}
//                 </a>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// };

// export default CandidateCard;
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
    <Card className={`border ${hasViewedBefore ? 'border-l-4 border-l-blue-500' : ''} hover:shadow-md transition-shadow`}>
      <div className="p-5">
        <div className="flex gap-4">
          {/* Profile Photo */}
          <div className="relative flex-shrink-0">
            {hasViewedBefore && (
              <div className="absolute -top-1 -left-1 bg-blue-500 text-white rounded-full p-1 z-10">
                <CheckCircle className="w-3 h-3" />
              </div>
            )}

            {displayData.profile?.profilePhoto ? (
              <img
                src={displayData.profile.profilePhoto}
                alt={displayData.fullname}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-7 h-7 text-gray-400" />
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{displayData.fullname}</h3>
                <p className="text-sm text-gray-600 mt-1">{displayData.profile?.jobTitle || "No title"}</p>
              </div>

              <Button
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
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-5 text-xs text-gray-600">
              {/* Only show location and domain in minimal view - no email */}
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{displayData.profile?.currentLocation || "N/A"}</span>
              </div>
              {displayData.profile?.jobDomain && (
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{displayData.profile.jobDomain}</span>
                </div>
              )}
              {displayData.updatedAt && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated {formattedUpdatedAt}</span>
                </div>
              )}
              {/* Added visa status in minimal view */}
              {displayData.profile?.visaStatus && (
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Visa: {getVisaStatusDisplay(displayData.profile.visaStatus)}</span>
                </div>
              )}
              {/* Added relocation info in minimal view */}
              {displayData.profile?.willingToRelocate !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Relocate: {displayData.profile.willingToRelocate === true ||
                    displayData.profile.willingToRelocate === "true" ? "Yes" : "No"}</span>
                </div>
              )}
            </div>

            {/* Show skill preview in minimal view */}
            {displaySkills.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-1.5">
                  {displaySkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs py-0.5 px-2 h-6">
                      {skill}
                    </Badge>
                  ))}
                  {count > displaySkills.length && (
                    <Badge variant="outline" className="text-xs py-0.5 px-2 h-6 bg-gray-50">
                      +{count - displaySkills.length} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Bio preview in minimal view */}
            {displayData.profile?.bio && (
              <div className="mt-3">
                <p className="text-xs text-gray-600 line-clamp-2">{displayData.profile.bio}</p>
              </div>
            )}
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

        {/* Expanded Content - Only shown when full info is available and expanded */}
        {fullInfo && isExpanded && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              {/* Phone number only shown in expanded view */}
              {fullInfo.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{fullInfo.phoneNumber}</span>
                </div>
              )}
              {/* Email shown in expanded view */}
              {fullInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm truncate max-w-[180px]">{fullInfo.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Visa: {getVisaStatusDisplay(fullInfo.profile?.visaStatus) || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Relocate: {fullInfo.profile?.willingToRelocate === true ||
                  fullInfo.profile?.willingToRelocate === "true" ? "Yes" : "No"}</span>
              </div>
            </div>

            {/* Bio */}
            {fullInfo.profile?.bio && (
              <div className="mt-4">
                <h4 className="font-medium text-sm text-gray-700 mb-2">About</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{fullInfo.profile.bio}</p>
              </div>
            )}

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

            {/* Resume - only shown in expanded view */}
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
      </div>
    </Card>
  );
};

export default CandidateCard;