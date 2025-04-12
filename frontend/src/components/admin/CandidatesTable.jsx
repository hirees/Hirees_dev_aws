// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import axios from "axios";
// // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // import {
// // // // // //   Select,
// // // // // //   SelectContent,
// // // // // //   SelectItem,
// // // // // //   SelectTrigger,
// // // // // //   SelectValue,
// // // // // // } from "@/components/ui/select";
// // // // // // import {
// // // // // //   User,
// // // // // //   MapPin,
// // // // // //   Mail,
// // // // // //   Phone,
// // // // // //   FileText,
// // // // // //   Building2,
// // // // // //   Briefcase,
// // // // // // } from "lucide-react";
// // // // // // import { USER_API_END_POINT } from "@/utils/constant";

// // // // // // const CandidatesCards = () => {
// // // // // //   const [students, setStudents] = useState([]);
// // // // // //   const [filters, setFilters] = useState({
// // // // // //     searchQuery: "",
// // // // // //     location: "",
// // // // // //     visaStatus: "all",
// // // // // //     willingToRelocate: "all",
// // // // // //     jobTitle: "",
// // // // // //     skills: [],
// // // // // //   });

// // // // // //   const visaOptions = [
// // // // // //     { value: "citizen", label: "Citizen" },
// // // // // //     { value: "permanent_resident", label: "Permanent Resident" },
// // // // // //     { value: "work_visa", label: "Work Visa" },
// // // // // //     { value: "student_visa", label: "Student Visa" },
// // // // // //     { value: "other", label: "Other" },
// // // // // //   ];

// // // // // //   useEffect(() => {
// // // // // //     const fetchStudents = async () => {
// // // // // //       try {
// // // // // //         const response = await axios.get(`${USER_API_END_POINT}/students`);
// // // // // //         if (response.data.success) {
// // // // // //           setStudents(response.data.data);
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         console.error("Error fetching students:", error);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchStudents();
// // // // // //   }, []);

// // // // // //   const filteredStudents = students.filter((student) => {
// // // // // //     const searchMatch =
// // // // // //       student.fullname
// // // // // //         .toLowerCase()
// // // // // //         .includes(filters.searchQuery.toLowerCase()) ||
// // // // // //       student.email.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// // // // // //       student.profile?.skills?.some((skill) =>
// // // // // //         skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
// // // // // //       ) ||
// // // // // //       student.profile?.jobTitle
// // // // // //         ?.toLowerCase()
// // // // // //         .includes(filters.searchQuery.toLowerCase());

// // // // // //     const locationMatch =
// // // // // //       !filters.location ||
// // // // // //       student.profile?.currentLocation
// // // // // //         ?.toLowerCase()
// // // // // //         .includes(filters.location.toLowerCase());

// // // // // //     const visaMatch =
// // // // // //       filters.visaStatus === "all" ||
// // // // // //       student.profile?.visaStatus === filters.visaStatus;

// // // // // //     const relocateMatch =
// // // // // //       filters.willingToRelocate === "all" ||
// // // // // //       (filters.willingToRelocate === "yes"
// // // // // //         ? student.profile?.willingToRelocate
// // // // // //         : !student.profile?.willingToRelocate);

// // // // // //     const jobTitleMatch =
// // // // // //       !filters.jobTitle ||
// // // // // //       student.profile?.jobTitle
// // // // // //         ?.toLowerCase()
// // // // // //         .includes(filters.jobTitle.toLowerCase());

// // // // // //     return (
// // // // // //       searchMatch &&
// // // // // //       locationMatch &&
// // // // // //       visaMatch &&
// // // // // //       relocateMatch &&
// // // // // //       jobTitleMatch
// // // // // //     );
// // // // // //   });

// // // // // //   return (
// // // // // //     <div className="flex min-h-screen bg-gray-50">
// // // // // //       {/* Filter Panel */}
// // // // // //       <div className="w-80 p-6 bg-white border-r">
// // // // // //         <div className="sticky top-6 space-y-6">
// // // // // //           <h2 className="text-xl font-semibold">Filters</h2>

// // // // // //           <div className="space-y-6">
// // // // // //             <div className="space-y-2">
// // // // // //               <label className="text-sm font-medium">Search</label>
// // // // // //               <Input
// // // // // //                 placeholder="Search by name, email, skills..."
// // // // // //                 value={filters.searchQuery}
// // // // // //                 onChange={(e) =>
// // // // // //                   setFilters((prev) => ({
// // // // // //                     ...prev,
// // // // // //                     searchQuery: e.target.value,
// // // // // //                   }))
// // // // // //                 }
// // // // // //               />
// // // // // //             </div>

// // // // // //             <div className="space-y-2">
// // // // // //               <label className="text-sm font-medium">Location</label>
// // // // // //               <Input
// // // // // //                 placeholder="Filter by location"
// // // // // //                 value={filters.location}
// // // // // //                 onChange={(e) =>
// // // // // //                   setFilters((prev) => ({ ...prev, location: e.target.value }))
// // // // // //                 }
// // // // // //               />
// // // // // //             </div>

// // // // // //             <div className="space-y-2">
// // // // // //               <label className="text-sm font-medium">Visa Status</label>
// // // // // //               <Select
// // // // // //                 value={filters.visaStatus}
// // // // // //                 onValueChange={(value) =>
// // // // // //                   setFilters((prev) => ({ ...prev, visaStatus: value }))
// // // // // //                 }
// // // // // //               >
// // // // // //                 <SelectTrigger>
// // // // // //                   <SelectValue placeholder="Select visa status" />
// // // // // //                 </SelectTrigger>
// // // // // //                 <SelectContent>
// // // // // //                   <SelectItem value="all">All Visa Types</SelectItem>
// // // // // //                   {visaOptions.map((option) => (
// // // // // //                     <SelectItem key={option.value} value={option.value}>
// // // // // //                       {option.label}
// // // // // //                     </SelectItem>
// // // // // //                   ))}
// // // // // //                 </SelectContent>
// // // // // //               </Select>
// // // // // //             </div>

// // // // // //             <div className="space-y-2">
// // // // // //               <label className="text-sm font-medium">Willing to Relocate</label>
// // // // // //               <Select
// // // // // //                 value={filters.willingToRelocate}
// // // // // //                 onValueChange={(value) =>
// // // // // //                   setFilters((prev) => ({ ...prev, willingToRelocate: value }))
// // // // // //                 }
// // // // // //               >
// // // // // //                 <SelectTrigger>
// // // // // //                   <SelectValue placeholder="Select preference" />
// // // // // //                 </SelectTrigger>
// // // // // //                 <SelectContent>
// // // // // //                   <SelectItem value="all">All Preferences</SelectItem>
// // // // // //                   <SelectItem value="yes">Yes</SelectItem>
// // // // // //                   <SelectItem value="no">No</SelectItem>
// // // // // //                 </SelectContent>
// // // // // //               </Select>
// // // // // //             </div>

// // // // // //             <div className="space-y-2">
// // // // // //               <label className="text-sm font-medium">Job Title</label>
// // // // // //               <Input
// // // // // //                 placeholder="Filter by job title"
// // // // // //                 value={filters.jobTitle}
// // // // // //                 onChange={(e) =>
// // // // // //                   setFilters((prev) => ({ ...prev, jobTitle: e.target.value }))
// // // // // //                 }
// // // // // //               />
// // // // // //             </div>

// // // // // //             <Button
// // // // // //               variant="outline"
// // // // // //               onClick={() =>
// // // // // //                 setFilters({
// // // // // //                   searchQuery: "",
// // // // // //                   location: "",
// // // // // //                   visaStatus: "all",
// // // // // //                   willingToRelocate: "all",
// // // // // //                   jobTitle: "",
// // // // // //                   skills: [],
// // // // // //                 })
// // // // // //               }
// // // // // //               className="w-full"
// // // // // //             >
// // // // // //               Clear Filters
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Candidates List */}
// // // // // //       <div className="flex-1 p-6">
// // // // // //         <div className="max-w-4xl mx-auto">
// // // // // //           <h1 className="text-2xl font-bold mb-6">
// // // // // //             Candidates ({filteredStudents.length})
// // // // // //           </h1>

// // // // // //           <div className="space-y-6">
// // // // // //             {filteredStudents.map((student) => (
// // // // // //               <Card
// // // // // //                 key={student._id}
// // // // // //                 className="hover:shadow-lg transition-shadow"
// // // // // //               >
// // // // // //                 <div className="p-6">
// // // // // //                   <div className="flex items-start gap-6">
// // // // // //                     {/* Profile Photo */}
// // // // // //                     {student.profile?.profilePhoto ? (
// // // // // //                       <img
// // // // // //                         src={student.profile.profilePhoto}
// // // // // //                         alt={student.fullname}
// // // // // //                         className="w-24 h-24 rounded-full object-cover"
// // // // // //                       />
// // // // // //                     ) : (
// // // // // //                       <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
// // // // // //                         <User className="w-12 h-12 text-gray-400" />
// // // // // //                       </div>
// // // // // //                     )}

// // // // // //                     {/* Main Content */}
// // // // // //                     <div className="flex-1 space-y-4">
// // // // // //                       {/* Header */}
// // // // // //                       <div>
// // // // // //                         <h3 className="text-xl font-semibold">
// // // // // //                           {student.fullname}
// // // // // //                         </h3>
// // // // // //                         <p className="text-gray-600">
// // // // // //                           {student.profile?.jobTitle || "No title"}
// // // // // //                         </p>
// // // // // //                       </div>

// // // // // //                       {/* Contact Info */}
// // // // // //                       <div className="grid grid-cols-2 gap-4">
// // // // // //                         <div className="flex items-center gap-2">
// // // // // //                           <Mail className="w-4 h-4 text-gray-400" />
// // // // // //                           <span className="text-sm">{student.email}</span>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center gap-2">
// // // // // //                           <Phone className="w-4 h-4 text-gray-400" />
// // // // // //                           <span className="text-sm">{student.phoneNumber}</span>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center gap-2">
// // // // // //                           <MapPin className="w-4 h-4 text-gray-400" />
// // // // // //                           <span className="text-sm">
// // // // // //                             {student.profile?.currentLocation || "N/A"}
// // // // // //                           </span>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center gap-2">
// // // // // //                           <Building2 className="w-4 h-4 text-gray-400" />
// // // // // //                           <span className="text-sm">
// // // // // //                             Visa:{" "}
// // // // // //                             {student.profile?.visaStatus?.replace("_", " ") ||
// // // // // //                               "N/A"}
// // // // // //                           </span>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center gap-2">
// // // // // //                           <Briefcase className="w-4 h-4 text-gray-400" />
// // // // // //                           <span className="text-sm">
// // // // // //                             Relocate:{" "}
// // // // // //                             {student.profile?.willingToRelocate ? "Yes" : "No"}
// // // // // //                           </span>
// // // // // //                         </div>
// // // // // //                       </div>

// // // // // //                       {/* Bio */}
// // // // // //                       {student.profile?.bio && (
// // // // // //                         <p className="text-sm text-gray-600">
// // // // // //                           {student.profile.bio}
// // // // // //                         </p>
// // // // // //                       )}

// // // // // //                       {/* Skills */}
// // // // // //                       {student.profile?.skills?.length > 0 && (
// // // // // //                         <div className="flex flex-wrap gap-2">
// // // // // //                           {student.profile.skills.map((skill, index) => (
// // // // // //                             <Badge key={index} variant="secondary">
// // // // // //                               {skill}
// // // // // //                             </Badge>
// // // // // //                           ))}
// // // // // //                         </div>
// // // // // //                       )}

// // // // // //                       {/* Resume */}
// // // // // //                       {student.profile?.resume && (
// // // // // //                         <div className="flex items-center gap-2">
// // // // // //                           <FileText className="w-4 h-4 text-blue-600" />
// // // // // //                           <a
// // // // // //                             href={student.profile.resume}
// // // // // //                             target="_blank"
// // // // // //                             rel="noopener noreferrer"
// // // // // //                             className="text-sm text-blue-600 hover:underline"
// // // // // //                           >
// // // // // //                             View Resume: {student.profile.resumeOriginalName}
// // // // // //                           </a>
// // // // // //                         </div>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </Card>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default CandidatesCards;

// // // // // import React, { useState, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import { Card, CardContent } from "@/components/ui/card";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import {
// // // // //   Select,
// // // // //   SelectContent,
// // // // //   SelectItem,
// // // // //   SelectTrigger,
// // // // //   SelectValue,
// // // // // } from "@/components/ui/select";
// // // // // import {
// // // // //   User,
// // // // //   MapPin,
// // // // //   Mail,
// // // // //   Phone,
// // // // //   FileText,
// // // // //   Building2,
// // // // //   Briefcase,
// // // // //   ChevronDown,
// // // // //   ChevronUp,
// // // // // } from "lucide-react";
// // // // // import { USER_API_END_POINT } from "@/utils/constant";

// // // // // const CandidateCard = ({ student }) => {
// // // // //   const [isExpanded, setIsExpanded] = useState(false);

// // // // //   return (
// // // // //     <Card className="hover:shadow-lg transition-shadow">
// // // // //       <div className="p-6">
// // // // //         <div className="flex items-start gap-6">
// // // // //           {/* Profile Photo */}
// // // // //           {student.profile?.profilePhoto ? (
// // // // //             <img
// // // // //               src={student.profile.profilePhoto}
// // // // //               alt={student.fullname}
// // // // //               className="w-24 h-24 rounded-full object-cover"
// // // // //             />
// // // // //           ) : (
// // // // //             <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
// // // // //               <User className="w-12 h-12 text-gray-400" />
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Main Content */}
// // // // //           <div className="flex-1">
// // // // //             <div className="flex justify-between items-start">
// // // // //               <div>
// // // // //                 <h3 className="text-xl font-semibold">{student.fullname}</h3>
// // // // //                 <p className="text-gray-600">
// // // // //                   {student.profile?.jobTitle || "No title"}
// // // // //                 </p>
// // // // //               </div>
// // // // //               <Button
// // // // //                 variant="outline"
// // // // //                 size="sm"
// // // // //                 onClick={() => setIsExpanded(!isExpanded)}
// // // // //                 className="gap-2"
// // // // //               >
// // // // //                 {isExpanded ? (
// // // // //                   <>
// // // // //                     <ChevronUp className="w-4 h-4" />
// // // // //                     Less Info
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     <ChevronDown className="w-4 h-4" />
// // // // //                     More Info
// // // // //                   </>
// // // // //                 )}
// // // // //               </Button>
// // // // //             </div>

// // // // //             {/* Basic Info - Always visible */}
// // // // //             <div className="mt-4 grid grid-cols-2 gap-4">
// // // // //               <div className="flex items-center gap-2">
// // // // //                 <Mail className="w-4 h-4 text-gray-400" />
// // // // //                 <span className="text-sm">{student.email}</span>
// // // // //               </div>
// // // // //               <div className="flex items-center gap-2">
// // // // //                 <MapPin className="w-4 h-4 text-gray-400" />
// // // // //                 <span className="text-sm">
// // // // //                   {student.profile?.currentLocation || "N/A"}
// // // // //                 </span>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Expanded Content */}
// // // // //             {isExpanded && (
// // // // //               <div className="mt-6 space-y-6 border-t pt-6">
// // // // //                 {/* Contact Information */}
// // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <Phone className="w-4 h-4 text-gray-400" />
// // // // //                     <span className="text-sm">{student.phoneNumber}</span>
// // // // //                   </div>
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <Building2 className="w-4 h-4 text-gray-400" />
// // // // //                     <span className="text-sm">
// // // // //                       Visa: {student.profile?.visaStatus?.replace("_", " ") || "N/A"}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <Briefcase className="w-4 h-4 text-gray-400" />
// // // // //                     <span className="text-sm">
// // // // //                       Relocate: {student.profile?.willingToRelocate ? "Yes" : "No"}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* Bio */}
// // // // //                 {student.profile?.bio && (
// // // // //                   <div className="space-y-2">
// // // // //                     <h3 className="font-semibold">About</h3>
// // // // //                     <p className="text-sm text-gray-600">{student.profile.bio}</p>
// // // // //                   </div>
// // // // //                 )}

// // // // //                 {/* Skills */}
// // // // //                 {student.profile?.skills?.length > 0 && (
// // // // //                   <div className="space-y-2">
// // // // //                     <h3 className="font-semibold">Skills</h3>
// // // // //                     <div className="flex flex-wrap gap-2">
// // // // //                       {student.profile.skills.map((skill, index) => (
// // // // //                         <Badge key={index} variant="secondary">
// // // // //                           {skill}
// // // // //                         </Badge>
// // // // //                       ))}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 )}

// // // // //                 {/* Resume */}
// // // // //                 {student.profile?.resume && (
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <FileText className="w-4 h-4 text-blue-600" />
// // // // //                     <a
// // // // //                       href={student.profile.resume}
// // // // //                       target="_blank"
// // // // //                       rel="noopener noreferrer"
// // // // //                       className="text-sm text-blue-600 hover:underline"
// // // // //                     >
// // // // //                       View Resume: {student.profile.resumeOriginalName}
// // // // //                     </a>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </Card>
// // // // //   );
// // // // // };

// // // // // const CandidatesCards = () => {
// // // // //   const [students, setStudents] = useState([]);
// // // // //   const [filters, setFilters] = useState({
// // // // //     searchQuery: "",
// // // // //     location: "",
// // // // //     visaStatus: "all",
// // // // //     willingToRelocate: "all",
// // // // //     jobTitle: "",
// // // // //     skills: [],
// // // // //   });

// // // // //   const visaOptions = [
// // // // //     { value: "citizen", label: "Citizen" },
// // // // //     { value: "permanent_resident", label: "Permanent Resident" },
// // // // //     { value: "work_visa", label: "Work Visa" },
// // // // //     { value: "student_visa", label: "Student Visa" },
// // // // //     { value: "other", label: "Other" },
// // // // //   ];

// // // // //   useEffect(() => {
// // // // //     const fetchStudents = async () => {
// // // // //       try {
// // // // //         const response = await axios.get(`${USER_API_END_POINT}/students`);
// // // // //         if (response.data.success) {
// // // // //           setStudents(response.data.data);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching students:", error);
// // // // //       }
// // // // //     };

// // // // //     fetchStudents();
// // // // //   }, []);

// // // // //   // Filter logic remains the same
// // // // //   const filteredStudents = students.filter((student) => {
// // // // //     const searchMatch =
// // // // //       student.fullname
// // // // //         .toLowerCase()
// // // // //         .includes(filters.searchQuery.toLowerCase()) ||
// // // // //       student.email.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// // // // //       student.profile?.skills?.some((skill) =>
// // // // //         skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
// // // // //       ) ||
// // // // //       student.profile?.jobTitle
// // // // //         ?.toLowerCase()
// // // // //         .includes(filters.searchQuery.toLowerCase());

// // // // //     const locationMatch =
// // // // //       !filters.location ||
// // // // //       student.profile?.currentLocation
// // // // //         ?.toLowerCase()
// // // // //         .includes(filters.location.toLowerCase());

// // // // //     const visaMatch =
// // // // //       filters.visaStatus === "all" ||
// // // // //       student.profile?.visaStatus === filters.visaStatus;

// // // // //     const relocateMatch =
// // // // //       filters.willingToRelocate === "all" ||
// // // // //       (filters.willingToRelocate === "yes"
// // // // //         ? student.profile?.willingToRelocate
// // // // //         : !student.profile?.willingToRelocate);

// // // // //     const jobTitleMatch =
// // // // //       !filters.jobTitle ||
// // // // //       student.profile?.jobTitle
// // // // //         ?.toLowerCase()
// // // // //         .includes(filters.jobTitle.toLowerCase());

// // // // //     return (
// // // // //       searchMatch &&
// // // // //       locationMatch &&
// // // // //       visaMatch &&
// // // // //       relocateMatch &&
// // // // //       jobTitleMatch
// // // // //     );
// // // // //   });

// // // // //   return (
// // // // //     <div className="flex min-h-screen bg-gray-50">
// // // // //       {/* Filter Panel */}
// // // // //       <div className="w-80 p-6 bg-white border-r">
// // // // //         <div className="sticky top-6 space-y-6">
// // // // //           <h2 className="text-xl font-semibold">Filters</h2>

// // // // //           <div className="space-y-6">
// // // // //             <div className="space-y-2">
// // // // //               <label className="text-sm font-medium">Search</label>
// // // // //               <Input
// // // // //                 placeholder="Search by name, email, skills..."
// // // // //                 value={filters.searchQuery}
// // // // //                 onChange={(e) =>
// // // // //                   setFilters((prev) => ({
// // // // //                     ...prev,
// // // // //                     searchQuery: e.target.value,
// // // // //                   }))
// // // // //                 }
// // // // //               />
// // // // //             </div>

// // // // //             <div className="space-y-2">
// // // // //               <label className="text-sm font-medium">Location</label>
// // // // //               <Input
// // // // //                 placeholder="Filter by location"
// // // // //                 value={filters.location}
// // // // //                 onChange={(e) =>
// // // // //                   setFilters((prev) => ({ ...prev, location: e.target.value }))
// // // // //                 }
// // // // //               />
// // // // //             </div>

// // // // //             <div className="space-y-2">
// // // // //               <label className="text-sm font-medium">Visa Status</label>
// // // // //               <Select
// // // // //                 value={filters.visaStatus}
// // // // //                 onValueChange={(value) =>
// // // // //                   setFilters((prev) => ({ ...prev, visaStatus: value }))
// // // // //                 }
// // // // //               >
// // // // //                 <SelectTrigger>
// // // // //                   <SelectValue placeholder="Select visa status" />
// // // // //                 </SelectTrigger>
// // // // //                 <SelectContent>
// // // // //                   <SelectItem value="all">All Visa Types</SelectItem>
// // // // //                   {visaOptions.map((option) => (
// // // // //                     <SelectItem key={option.value} value={option.value}>
// // // // //                       {option.label}
// // // // //                     </SelectItem>
// // // // //                   ))}
// // // // //                 </SelectContent>
// // // // //               </Select>
// // // // //             </div>

// // // // //             <div className="space-y-2">
// // // // //               <label className="text-sm font-medium">Willing to Relocate</label>
// // // // //               <Select
// // // // //                 value={filters.willingToRelocate}
// // // // //                 onValueChange={(value) =>
// // // // //                   setFilters((prev) => ({ ...prev, willingToRelocate: value }))
// // // // //                 }
// // // // //               >
// // // // //                 <SelectTrigger>
// // // // //                   <SelectValue placeholder="Select preference" />
// // // // //                 </SelectTrigger>
// // // // //                 <SelectContent>
// // // // //                   <SelectItem value="all">All Preferences</SelectItem>
// // // // //                   <SelectItem value="yes">Yes</SelectItem>
// // // // //                   <SelectItem value="no">No</SelectItem>
// // // // //                 </SelectContent>
// // // // //               </Select>
// // // // //             </div>

// // // // //             <div className="space-y-2">
// // // // //               <label className="text-sm font-medium">Job Title</label>
// // // // //               <Input
// // // // //                 placeholder="Filter by job title"
// // // // //                 value={filters.jobTitle}
// // // // //                 onChange={(e) =>
// // // // //                   setFilters((prev) => ({ ...prev, jobTitle: e.target.value }))
// // // // //                 }
// // // // //               />
// // // // //             </div>

// // // // //             <Button
// // // // //               variant="outline"
// // // // //               onClick={() =>
// // // // //                 setFilters({
// // // // //                   searchQuery: "",
// // // // //                   location: "",
// // // // //                   visaStatus: "all",
// // // // //                   willingToRelocate: "all",
// // // // //                   jobTitle: "",
// // // // //                   skills: [],
// // // // //                 })
// // // // //               }
// // // // //               className="w-full"
// // // // //             >
// // // // //               Clear Filters
// // // // //             </Button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Candidates List */}
// // // // //       <div className="flex-1 p-6">
// // // // //         <div className="max-w-4xl mx-auto">
// // // // //           <h1 className="text-2xl font-bold mb-6">
// // // // //             Candidates ({filteredStudents.length})
// // // // //           </h1>

// // // // //           <div className="space-y-6">
// // // // //             {filteredStudents.map((student) => (
// // // // //               <CandidateCard key={student._id} student={student} />
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CandidatesCards;
// // // // // import React, { useState, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import { Card } from "@/components/ui/card";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import {
// // // // //   Select,
// // // // //   SelectContent,
// // // // //   SelectItem,
// // // // //   SelectTrigger,
// // // // //   SelectValue,
// // // // // } from "@/components/ui/select";
// // // // // import {
// // // // //   User,
// // // // //   MapPin,
// // // // //   Mail,
// // // // //   Phone,
// // // // //   FileText,
// // // // //   Building2,
// // // // //   Briefcase,
// // // // //   ChevronDown,
// // // // //   ChevronUp,
// // // // //   Filter,
// // // // //   X
// // // // // } from "lucide-react";
// // // // // import { USER_API_END_POINT } from "@/utils/constant";
// // // // // const CandidateCard = ({ student }) => {
// // // // //   const [isExpanded, setIsExpanded] = useState(false);

// // // // //   return (
// // // // //     <Card className="hover:shadow-lg transition-shadow">
// // // // //       <div className="p-4 sm:p-6">
// // // // //         <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
// // // // //           {/* Profile Photo */}
// // // // //           <div className="flex justify-center sm:block">
// // // // //             {student.profile?.profilePhoto ? (
// // // // //               <img
// // // // //                 src={student.profile.profilePhoto}
// // // // //                 alt={student.fullname}
// // // // //                 className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
// // // // //               />
// // // // //             ) : (
// // // // //               <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center">
// // // // //                 <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Main Content */}
// // // // //           <div className="flex-1">
// // // // //             <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0">
// // // // //               <div className="text-center sm:text-left">
// // // // //                 <h3 className="text-lg sm:text-xl font-semibold">{student.fullname}</h3>
// // // // //                 <p className="text-gray-600">
// // // // //                   {student.profile?.jobTitle || "No title"}
// // // // //                 </p>
// // // // //               </div>
// // // // //               <Button
// // // // //                 variant="outline"
// // // // //                 size="sm"
// // // // //                 onClick={() => setIsExpanded(!isExpanded)}
// // // // //                 className="gap-2"
// // // // //               >
// // // // //                 {isExpanded ? (
// // // // //                   <>
// // // // //                     <ChevronUp className="w-4 h-4" />
// // // // //                     Less Info
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     <ChevronDown className="w-4 h-4" />
// // // // //                     More Info
// // // // //                   </>
// // // // //                 )}
// // // // //               </Button>
// // // // //             </div>

// // // // //             {/* Basic Info - Always visible */}
// // // // //             <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // // //               <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // // //                 <Mail className="w-4 h-4 text-gray-400" />
// // // // //                 <span className="text-sm break-all">{student.email}</span>
// // // // //               </div>
// // // // //               <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // // //                 <MapPin className="w-4 h-4 text-gray-400" />
// // // // //                 <span className="text-sm">
// // // // //                   {student.profile?.currentLocation || "N/A"}
// // // // //                 </span>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Expanded Content */}
// // // // //             {isExpanded && (
// // // // //               <div className="mt-6 space-y-6 border-t pt-6">
// // // // //                 {/* Contact Information */}
// // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // // //                     <Phone className="w-4 h-4 text-gray-400" />
// // // // //                     <span className="text-sm">{student.phoneNumber}</span>
// // // // //                   </div>
// // // // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // // //                     <Building2 className="w-4 h-4 text-gray-400" />
// // // // //                     <span className="text-sm">
// // // // //                       Visa: {student.profile?.visaStatus?.replace("_", " ") || "N/A"}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // // //                     <Briefcase className="w-4 h-4 text-gray-400" />
// // // // //                     <span className="text-sm">
// // // // //                       Relocate: {student.profile?.willingToRelocate ? "Yes" : "No"}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* Bio */}
// // // // //                 {student.profile?.bio && (
// // // // //                   <div className="space-y-2">
// // // // //                     <h3 className="font-semibold text-center sm:text-left">About</h3>
// // // // //                     <p className="text-sm text-gray-600">{student.profile.bio}</p>
// // // // //                   </div>
// // // // //                 )}

// // // // //                 {/* Skills */}
// // // // //                 {student.profile?.skills?.length > 0 && (
// // // // //                   <div className="space-y-2">
// // // // //                     <h3 className="font-semibold text-center sm:text-left">Skills</h3>
// // // // //                     <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
// // // // //                       {student.profile.skills.map((skill, index) => (
// // // // //                         <Badge key={index} variant="secondary">
// // // // //                           {skill}
// // // // //                         </Badge>
// // // // //                       ))}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 )}

// // // // //                 {/* Resume */}
// // // // //                 {student.profile?.resume && (
// // // // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // // //                     <FileText className="w-4 h-4 text-blue-600" />
// // // // //                     <a
// // // // //                       href={student.profile.resume}
// // // // //                       target="_blank"
// // // // //                       rel="noopener noreferrer"
// // // // //                       className="text-sm text-blue-600 hover:underline break-all"
// // // // //                     >
// // // // //                       View Resume: {student.profile.resumeOriginalName}
// // // // //                     </a>
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </Card>
// // // // //   );
// // // // // };

// // // // // // ... CandidateCard component remains the same as your previous version ...

// // // // // const FilterPanel = ({ filters, setFilters, visaOptions }) => {
// // // // //   return (
// // // // //     <div className="space-y-6">
// // // // //       <div className="space-y-2">
// // // // //         <label className="text-sm font-medium">Search</label>
// // // // //         <Input
// // // // //           placeholder="Search by name, email, skills..."
// // // // //           value={filters.searchQuery}
// // // // //           onChange={(e) =>
// // // // //             setFilters((prev) => ({
// // // // //               ...prev,
// // // // //               searchQuery: e.target.value,
// // // // //             }))
// // // // //           }
// // // // //         />
// // // // //       </div>

// // // // //       <div className="space-y-2">
// // // // //         <label className="text-sm font-medium">Location</label>
// // // // //         <Input
// // // // //           placeholder="Filter by location"
// // // // //           value={filters.location}
// // // // //           onChange={(e) =>
// // // // //             setFilters((prev) => ({ ...prev, location: e.target.value }))
// // // // //           }
// // // // //         />
// // // // //       </div>

// // // // //       <div className="space-y-2">
// // // // //         <label className="text-sm font-medium">Visa Status</label>
// // // // //         <Select
// // // // //           value={filters.visaStatus}
// // // // //           onValueChange={(value) =>
// // // // //             setFilters((prev) => ({ ...prev, visaStatus: value }))
// // // // //           }
// // // // //         >
// // // // //           <SelectTrigger>
// // // // //             <SelectValue placeholder="Select visa status" />
// // // // //           </SelectTrigger>
// // // // //           <SelectContent>
// // // // //             <SelectItem value="all">All Visa Types</SelectItem>
// // // // //             {visaOptions.map((option) => (
// // // // //               <SelectItem key={option.value} value={option.value}>
// // // // //                 {option.label}
// // // // //               </SelectItem>
// // // // //             ))}
// // // // //           </SelectContent>
// // // // //         </Select>
// // // // //       </div>

// // // // //       <div className="space-y-2">
// // // // //         <label className="text-sm font-medium">Willing to Relocate</label>
// // // // //         <Select
// // // // //           value={filters.willingToRelocate}
// // // // //           onValueChange={(value) =>
// // // // //             setFilters((prev) => ({ ...prev, willingToRelocate: value }))
// // // // //           }
// // // // //         >
// // // // //           <SelectTrigger>
// // // // //             <SelectValue placeholder="Select preference" />
// // // // //           </SelectTrigger>
// // // // //           <SelectContent>
// // // // //             <SelectItem value="all">All Preferences</SelectItem>
// // // // //             <SelectItem value="yes">Yes</SelectItem>
// // // // //             <SelectItem value="no">No</SelectItem>
// // // // //           </SelectContent>
// // // // //         </Select>
// // // // //       </div>

// // // // //       <div className="space-y-2">
// // // // //         <label className="text-sm font-medium">Job Title</label>
// // // // //         <Input
// // // // //           placeholder="Filter by job title"
// // // // //           value={filters.jobTitle}
// // // // //           onChange={(e) =>
// // // // //             setFilters((prev) => ({ ...prev, jobTitle: e.target.value }))
// // // // //           }
// // // // //         />
// // // // //       </div>

// // // // //       <Button
// // // // //         variant="outline"
// // // // //         onClick={() =>
// // // // //           setFilters({
// // // // //             searchQuery: "",
// // // // //             location: "",
// // // // //             visaStatus: "all",
// // // // //             willingToRelocate: "all",
// // // // //             jobTitle: "",
// // // // //             skills: [],
// // // // //           })
// // // // //         }
// // // // //         className="w-full"
// // // // //       >
// // // // //         Clear All Filters
// // // // //       </Button>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const CandidatesCards = () => {
// // // // //   const [students, setStudents] = useState([]);
// // // // //   const [showMobileFilters, setShowMobileFilters] = useState(false);
// // // // //   const [filters, setFilters] = useState({
// // // // //     searchQuery: "",
// // // // //     location: "",
// // // // //     visaStatus: "all",
// // // // //     willingToRelocate: "all",
// // // // //     jobTitle: "",
// // // // //     skills: [],
// // // // //   });

// // // // //   const visaOptions = [
// // // // //     { value: "citizen", label: "Citizen" },
// // // // //     { value: "permanent_resident", label: "Permanent Resident" },
// // // // //     { value: "work_visa", label: "Work Visa" },
// // // // //     { value: "student_visa", label: "Student Visa" },
// // // // //     { value: "other", label: "Other" },
// // // // //   ];

// // // // //   useEffect(() => {
// // // // //     const fetchStudents = async () => {
// // // // //       try {
// // // // //         const response = await axios.get(`${USER_API_END_POINT}/students`);
// // // // //         if (response.data.success) {
// // // // //           setStudents(response.data.data);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching students:", error);
// // // // //       }
// // // // //     };

// // // // //     fetchStudents();
// // // // //   }, []);

// // // // //   const filteredStudents = students.filter((student) => {
// // // // //     const searchMatch =
// // // // //       student.fullname
// // // // //         .toLowerCase()
// // // // //         .includes(filters.searchQuery.toLowerCase()) ||
// // // // //       student.email.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// // // // //       student.profile?.skills?.some((skill) =>
// // // // //         skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
// // // // //       ) ||
// // // // //       student.profile?.jobTitle
// // // // //         ?.toLowerCase()
// // // // //         .includes(filters.searchQuery.toLowerCase());

// // // // //     const locationMatch =
// // // // //       !filters.location ||
// // // // //       student.profile?.currentLocation
// // // // //         ?.toLowerCase()
// // // // //         .includes(filters.location.toLowerCase());

// // // // //     const visaMatch =
// // // // //       filters.visaStatus === "all" ||
// // // // //       student.profile?.visaStatus === filters.visaStatus;

// // // // //     const relocateMatch =
// // // // //       filters.willingToRelocate === "all" ||
// // // // //       (filters.willingToRelocate === "yes"
// // // // //         ? student.profile?.willingToRelocate
// // // // //         : !student.profile?.willingToRelocate);

// // // // //     const jobTitleMatch =
// // // // //       !filters.jobTitle ||
// // // // //       student.profile?.jobTitle
// // // // //         ?.toLowerCase()
// // // // //         .includes(filters.jobTitle.toLowerCase());

// // // // //     return (
// // // // //       searchMatch &&
// // // // //       locationMatch &&
// // // // //       visaMatch &&
// // // // //       relocateMatch &&
// // // // //       jobTitleMatch
// // // // //     );
// // // // //   });

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50">
// // // // //       {/* Mobile Filter Toggle Button */}
// // // // //       <div className="lg:hidden sticky top-0 z-20 bg-white border-b p-4">
// // // // //         <Button
// // // // //           variant="outline"
// // // // //           onClick={() => setShowMobileFilters(!showMobileFilters)}
// // // // //           className="w-full gap-2"
// // // // //         >
// // // // //           {showMobileFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
// // // // //           {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
// // // // //         </Button>
// // // // //       </div>

// // // // //       {/* Mobile Filters - Shown as drawer on small screens */}
// // // // //       {showMobileFilters && (
// // // // //         <div className="lg:hidden fixed inset-0 z-10 bg-white p-4 mt-16 overflow-y-auto">
// // // // //           <FilterPanel
// // // // //             filters={filters}
// // // // //             setFilters={setFilters}
// // // // //             visaOptions={visaOptions}
// // // // //           />
// // // // //         </div>
// // // // //       )}

// // // // //       <div className="flex">
// // // // //         {/* Desktop Sidebar - Hidden on small screens */}
// // // // //         <div className="hidden lg:block w-80 p-6 bg-white border-r h-screen sticky top-0 overflow-y-auto">
// // // // //           <h2 className="text-xl font-semibold mb-6">Filters</h2>
// // // // //           <FilterPanel
// // // // //             filters={filters}
// // // // //             setFilters={setFilters}
// // // // //             visaOptions={visaOptions}
// // // // //           />
// // // // //         </div>

// // // // //         {/* Main Content */}
// // // // //         <div className="flex-1 p-4 lg:p-6">
// // // // //           <div className="max-w-4xl mx-auto">
// // // // //             <h1 className="text-xl lg:text-2xl font-bold mb-6">
// // // // //               Candidates ({filteredStudents.length})
// // // // //             </h1>

// // // // //             <div className="space-y-6">
// // // // //               {filteredStudents.map((student) => (
// // // // //                 <CandidateCard key={student._id} student={student} />
// // // // //               ))}
// // // // //               {filteredStudents.length === 0 && (
// // // // //                 <div className="text-center py-12 text-gray-500">
// // // // //                   No candidates found matching your filters
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CandidatesCards;
// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import { Card } from "@/components/ui/card";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import {
// // // //   Select,
// // // //   SelectContent,
// // // //   SelectItem,
// // // //   SelectTrigger,
// // // //   SelectValue,
// // // // } from "@/components/ui/select";
// // // // import {
// // // //   User,
// // // //   MapPin,
// // // //   Mail,
// // // //   Phone,
// // // //   FileText,
// // // //   Building2,
// // // //   Briefcase,
// // // //   ChevronDown,
// // // //   ChevronUp,
// // // //   Filter,
// // // //   X,
// // // //   Eye
// // // // } from "lucide-react";
// // // // import { USER_API_END_POINT } from "@/utils/constant";

// // // // const CandidateCard = ({ student, onViewFullInfo }) => {
// // // //   const [isExpanded, setIsExpanded] = useState(false);
// // // //   const [fullInfo, setFullInfo] = useState(null);

// // // //   // Function to handle the "View Full Info" button click
// // // //   const handleViewFullInfo = async () => {
// // // //     if (fullInfo) {
// // // //       // If we already have the full info, just toggle display
// // // //       setIsExpanded(!isExpanded);
// // // //     } else {
// // // //       // Call the parent component's function to get full student data
// // // //       const fullStudentData = await onViewFullInfo(student._id || student.email);
// // // //       if (fullStudentData) {
// // // //         setFullInfo(fullStudentData);
// // // //         setIsExpanded(true);
// // // //       }
// // // //     }
// // // //   };

// // // //   // Decide which data to use - either minimal or full
// // // //   const displayData = fullInfo || student;

// // // //   return (
// // // //     <Card className="hover:shadow-lg transition-shadow">
// // // //       <div className="p-4 sm:p-6">
// // // //         <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
// // // //           {/* Profile Photo */}
// // // //           <div className="flex justify-center sm:block">
// // // //             {displayData.profile?.profilePhoto ? (
// // // //               <img
// // // //                 src={displayData.profile.profilePhoto}
// // // //                 alt={displayData.fullname}
// // // //                 className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
// // // //               />
// // // //             ) : (
// // // //               <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center">
// // // //                 <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* Main Content */}
// // // //           <div className="flex-1">
// // // //             <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0">
// // // //               <div className="text-center sm:text-left">
// // // //                 <h3 className="text-lg sm:text-xl font-semibold">{displayData.fullname}</h3>
// // // //                 <p className="text-gray-600">
// // // //                   {displayData.profile?.jobTitle || "No title"}
// // // //                 </p>
// // // //               </div>

// // // //               {/* View Full Info Button */}
// // // //               <Button
// // // //                 variant="secondary"
// // // //                 size="sm"
// // // //                 onClick={handleViewFullInfo}
// // // //                 className="gap-2"
// // // //               >
// // // //                 <Eye className="w-4 h-4" />
// // // //                 {fullInfo ? (isExpanded ? "Hide Details" : "Show Details") : "View Full Info"}
// // // //               </Button>
// // // //             </div>

// // // //             {/* Basic Info - Always visible */}
// // // //             <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // //               <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // //                 <Mail className="w-4 h-4 text-gray-400" />
// // // //                 <span className="text-sm break-all">{displayData.email}</span>
// // // //               </div>
// // // //               <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // //                 <MapPin className="w-4 h-4 text-gray-400" />
// // // //                 <span className="text-sm">
// // // //                   {displayData.profile?.currentLocation || "N/A"}
// // // //                 </span>
// // // //               </div>
// // // //             </div>

// // // //             {/* Expanded Content - Only shown when full info is available and expanded */}
// // // //             {fullInfo && isExpanded && (
// // // //               <div className="mt-6 space-y-6 border-t pt-6">
// // // //                 {/* Contact Information */}
// // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // //                     <Phone className="w-4 h-4 text-gray-400" />
// // // //                     <span className="text-sm">{fullInfo.phoneNumber}</span>
// // // //                   </div>
// // // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // //                     <Building2 className="w-4 h-4 text-gray-400" />
// // // //                     <span className="text-sm">
// // // //                       Visa: {fullInfo.profile?.visaStatus?.replace("_", " ") || "N/A"}
// // // //                     </span>
// // // //                   </div>
// // // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // //                     <Briefcase className="w-4 h-4 text-gray-400" />
// // // //                     <span className="text-sm">
// // // //                       Relocate: {fullInfo.profile?.willingToRelocate ? "Yes" : "No"}
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Bio */}
// // // //                 {fullInfo.profile?.bio && (
// // // //                   <div className="space-y-2">
// // // //                     <h3 className="font-semibold text-center sm:text-left">About</h3>
// // // //                     <p className="text-sm text-gray-600">{fullInfo.profile.bio}</p>
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Skills */}
// // // //                 {fullInfo.profile?.skills?.length > 0 && (
// // // //                   <div className="space-y-2">
// // // //                     <h3 className="font-semibold text-center sm:text-left">Skills</h3>
// // // //                     <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
// // // //                       {fullInfo.profile.skills.map((skill, index) => (
// // // //                         <Badge key={index} variant="secondary">
// // // //                           {skill}
// // // //                         </Badge>
// // // //                       ))}
// // // //                     </div>
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Resume */}
// // // //                 {fullInfo.profile?.resume && (
// // // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // // //                     <FileText className="w-4 h-4 text-blue-600" />
// // // //                     <a
// // // //                       href={fullInfo.profile.resume}
// // // //                       target="_blank"
// // // //                       rel="noopener noreferrer"
// // // //                       className="text-sm text-blue-600 hover:underline break-all"
// // // //                     >
// // // //                       View Resume: {fullInfo.profile.resumeOriginalName}
// // // //                     </a>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </Card>
// // // //   );
// // // // };

// // // // // FilterPanel component stays the same
// // // // const FilterPanel = ({ filters, setFilters, visaOptions }) => {
// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <div className="space-y-2">
// // // //         <label className="text-sm font-medium">Search</label>
// // // //         <Input
// // // //           placeholder="Search by name, email, skills..."
// // // //           value={filters.searchQuery}
// // // //           onChange={(e) =>
// // // //             setFilters((prev) => ({
// // // //               ...prev,
// // // //               searchQuery: e.target.value,
// // // //             }))
// // // //           }
// // // //         />
// // // //       </div>

// // // //       <div className="space-y-2">
// // // //         <label className="text-sm font-medium">Location</label>
// // // //         <Input
// // // //           placeholder="Filter by location"
// // // //           value={filters.location}
// // // //           onChange={(e) =>
// // // //             setFilters((prev) => ({ ...prev, location: e.target.value }))
// // // //           }
// // // //         />
// // // //       </div>

// // // //       <div className="space-y-2">
// // // //         <label className="text-sm font-medium">Visa Status</label>
// // // //         <Select
// // // //           value={filters.visaStatus}
// // // //           onValueChange={(value) =>
// // // //             setFilters((prev) => ({ ...prev, visaStatus: value }))
// // // //           }
// // // //         >
// // // //           <SelectTrigger>
// // // //             <SelectValue placeholder="Select visa status" />
// // // //           </SelectTrigger>
// // // //           <SelectContent>
// // // //             <SelectItem value="all">All Visa Types</SelectItem>
// // // //             {visaOptions.map((option) => (
// // // //               <SelectItem key={option.value} value={option.value}>
// // // //                 {option.label}
// // // //               </SelectItem>
// // // //             ))}
// // // //           </SelectContent>
// // // //         </Select>
// // // //       </div>

// // // //       <div className="space-y-2">
// // // //         <label className="text-sm font-medium">Willing to Relocate</label>
// // // //         <Select
// // // //           value={filters.willingToRelocate}
// // // //           onValueChange={(value) =>
// // // //             setFilters((prev) => ({ ...prev, willingToRelocate: value }))
// // // //           }
// // // //         >
// // // //           <SelectTrigger>
// // // //             <SelectValue placeholder="Select preference" />
// // // //           </SelectTrigger>
// // // //           <SelectContent>
// // // //             <SelectItem value="all">All Preferences</SelectItem>
// // // //             <SelectItem value="yes">Yes</SelectItem>
// // // //             <SelectItem value="no">No</SelectItem>
// // // //           </SelectContent>
// // // //         </Select>
// // // //       </div>

// // // //       <div className="space-y-2">
// // // //         <label className="text-sm font-medium">Job Title</label>
// // // //         <Input
// // // //           placeholder="Filter by job title"
// // // //           value={filters.jobTitle}
// // // //           onChange={(e) =>
// // // //             setFilters((prev) => ({ ...prev, jobTitle: e.target.value }))
// // // //           }
// // // //         />
// // // //       </div>

// // // //       <Button
// // // //         variant="outline"
// // // //         onClick={() =>
// // // //           setFilters({
// // // //             searchQuery: "",
// // // //             location: "",
// // // //             visaStatus: "all",
// // // //             willingToRelocate: "all",
// // // //             jobTitle: "",
// // // //             skills: [],
// // // //           })
// // // //         }
// // // //         className="w-full"
// // // //       >
// // // //         Clear All Filters
// // // //       </Button>
// // // //     </div>
// // // //   );
// // // // };

// // // // const CandidatesCards = () => {
// // // //   const [students, setStudents] = useState([]);
// // // //   const [showMobileFilters, setShowMobileFilters] = useState(false);
// // // //   const [filters, setFilters] = useState({
// // // //     searchQuery: "",
// // // //     location: "",
// // // //     visaStatus: "all",
// // // //     willingToRelocate: "all",
// // // //     jobTitle: "",
// // // //     skills: [],
// // // //   });

// // // //   const visaOptions = [
// // // //     { value: "citizen", label: "Citizen" },
// // // //     { value: "permanent_resident", label: "Permanent Resident" },
// // // //     { value: "work_visa", label: "Work Visa" },
// // // //     { value: "student_visa", label: "Student Visa" },
// // // //     { value: "other", label: "Other" },
// // // //   ];

// // // //   useEffect(() => {
// // // //     const fetchMinimalStudents = async () => {
// // // //       try {
// // // //         const response = await axios.get(`${USER_API_END_POINT}/students-minimal`);
// // // //         if (response.data.success) {
// // // //           setStudents(response.data.data);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error fetching minimal students data:", error);
// // // //       }
// // // //     };

// // // //     fetchMinimalStudents();
// // // //   }, []);

// // // //   // Function to get full student information
// // // //   const getFullStudentInfo = async (studentId) => {
// // // //     try {
// // // //       // You can implement your view tracking logic here if needed
// // // //       const response = await axios.get(`${USER_API_END_POINT}/students/${studentId}`);
// // // //       if (response.data.success) {
// // // //         return response.data.data;
// // // //       }
// // // //       return null;
// // // //     } catch (error) {
// // // //       console.error("Error fetching full student info:", error);
// // // //       return null;
// // // //     }
// // // //   };

// // // //   const filteredStudents = students.filter((student) => {
// // // //     const searchMatch =
// // // //       student.fullname?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// // // //       student.email.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// // // //       student.profile?.skills?.some((skill) =>
// // // //         skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
// // // //       ) ||
// // // //       student.profile?.jobTitle
// // // //         ?.toLowerCase()
// // // //         .includes(filters.searchQuery.toLowerCase());

// // // //     const locationMatch =
// // // //       !filters.location ||
// // // //       student.profile?.currentLocation
// // // //         ?.toLowerCase()
// // // //         .includes(filters.location.toLowerCase());

// // // //     const visaMatch =
// // // //       filters.visaStatus === "all" ||
// // // //       student.profile?.visaStatus === filters.visaStatus;

// // // //     const relocateMatch =
// // // //       filters.willingToRelocate === "all" ||
// // // //       (filters.willingToRelocate === "yes"
// // // //         ? student.profile?.willingToRelocate
// // // //         : !student.profile?.willingToRelocate);

// // // //     const jobTitleMatch =
// // // //       !filters.jobTitle ||
// // // //       student.profile?.jobTitle
// // // //         ?.toLowerCase()
// // // //         .includes(filters.jobTitle.toLowerCase());

// // // //     return (
// // // //       searchMatch &&
// // // //       locationMatch &&
// // // //       visaMatch &&
// // // //       relocateMatch &&
// // // //       jobTitleMatch
// // // //     );
// // // //   });

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       {/* Mobile Filter Toggle Button */}
// // // //       <div className="lg:hidden sticky top-0 z-20 bg-white border-b p-4">
// // // //         <Button
// // // //           variant="outline"
// // // //           onClick={() => setShowMobileFilters(!showMobileFilters)}
// // // //           className="w-full gap-2"
// // // //         >
// // // //           {showMobileFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
// // // //           {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
// // // //         </Button>
// // // //       </div>

// // // //       {/* Mobile Filters - Shown as drawer on small screens */}
// // // //       {showMobileFilters && (
// // // //         <div className="lg:hidden fixed inset-0 z-10 bg-white p-4 mt-16 overflow-y-auto">
// // // //           <FilterPanel
// // // //             filters={filters}
// // // //             setFilters={setFilters}
// // // //             visaOptions={visaOptions}
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       <div className="flex">
// // // //         {/* Desktop Sidebar - Hidden on small screens */}
// // // //         <div className="hidden lg:block w-80 p-6 bg-white border-r h-screen sticky top-0 overflow-y-auto">
// // // //           <h2 className="text-xl font-semibold mb-6">Filters</h2>
// // // //           <FilterPanel
// // // //             filters={filters}
// // // //             setFilters={setFilters}
// // // //             visaOptions={visaOptions}
// // // //           />
// // // //         </div>

// // // //         {/* Main Content */}
// // // //         <div className="flex-1 p-4 lg:p-6">
// // // //           <div className="max-w-4xl mx-auto">
// // // //             <h1 className="text-xl lg:text-2xl font-bold mb-6">
// // // //               Candidates ({filteredStudents.length})
// // // //             </h1>

// // // //             <div className="space-y-6">
// // // //               {filteredStudents.map((student) => (
// // // //                 <CandidateCard
// // // //                   key={student._id || student.email}
// // // //                   student={student}
// // // //                   onViewFullInfo={getFullStudentInfo}
// // // //                 />
// // // //               ))}
// // // //               {filteredStudents.length === 0 && (
// // // //                 <div className="text-center py-12 text-gray-500">
// // // //                   No candidates found matching your filters
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CandidatesCards;
// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { Card } from "@/components/ui/card";
// // // import { Input } from "@/components/ui/input";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import {
// // //   User,
// // //   MapPin,
// // //   Mail,
// // //   Phone,
// // //   FileText,
// // //   Building2,
// // //   Briefcase,
// // //   ChevronDown,
// // //   ChevronUp,
// // //   Filter,
// // //   X,
// // //   Eye,
// // //   AlertCircle
// // // } from "lucide-react";
// // // import { USER_API_END_POINT } from "@/utils/constant";
// // // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// // // // Component to display remaining views
// // // const RemainingViewsAlert = ({ remainingViews }) => {
// // //   return (
// // //     <Alert className={remainingViews < 10 ? "bg-yellow-50" : "bg-green-50"}>
// // //       <AlertCircle className={remainingViews < 10 ? "text-yellow-500" : "text-green-500"} />
// // //       <AlertTitle>View Credits</AlertTitle>
// // //       <AlertDescription>
// // //         Your company has <strong>{remainingViews}</strong> profile views remaining
// // //       </AlertDescription>
// // //     </Alert>
// // //   );
// // // };

// // // const CandidateCard = ({ student, onViewFullInfo }) => {
// // //   const [isExpanded, setIsExpanded] = useState(false);
// // //   const [fullInfo, setFullInfo] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [viewError, setViewError] = useState(null);
// // //   const [hasViewedBefore, setHasViewedBefore] = useState(false);

// // //   // Function to handle the "View Full Info" button click
// // //   const handleViewFullInfo = async () => {
// // //     // If we already have full info, just toggle display
// // //     if (fullInfo) {
// // //       setIsExpanded(!isExpanded);
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setViewError(null);

// // //     try {
// // //       // Get user info from localStorage
// // //       const user = JSON.parse(localStorage.getItem("user"));
// // //       const userId = user ? user.email : null;

// // //       if (!userId) {
// // //         setViewError("User not logged in");
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       // Call the API to get full student info with view tracking
// // //       const response = await axios.get(
// // //         `${USER_API_END_POINT}/students/${student.email}`,
// // //         {
// // //           params: {
// // //             viewerId: userId
// // //           }
// // //         }
// // //       );

// // //       if (response.data.success) {
// // //         setFullInfo(response.data.data);
// // //         setIsExpanded(true);
// // //         setHasViewedBefore(response.data.viewedBefore);

// // //         // Call the parent callback to update remaining views in parent component
// // //         onViewFullInfo(response.data.remainingViews);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching student details:", error);
// // //       if (error.response?.data?.message) {
// // //         setViewError(error.response.data.message);
// // //       } else {
// // //         setViewError("Failed to load student details");
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Decide which data to use - either minimal or full
// // //   const displayData = fullInfo || student;

// // //   return (
// // //     <Card className="hover:shadow-lg transition-shadow">
// // //       <div className="p-4 sm:p-6">
// // //         <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
// // //           {/* Profile Photo */}
// // //           <div className="flex justify-center sm:block">
// // //             {displayData.profile?.profilePhoto ? (
// // //               <img
// // //                 src={displayData.profile.profilePhoto}
// // //                 alt={displayData.fullname}
// // //                 className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
// // //               />
// // //             ) : (
// // //               <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center">
// // //                 <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Main Content */}
// // //           <div className="flex-1">
// // //             <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0">
// // //               <div className="text-center sm:text-left">
// // //                 <h3 className="text-lg sm:text-xl font-semibold">{displayData.fullname}</h3>
// // //                 <p className="text-gray-600">
// // //                   {displayData.profile?.jobTitle || "No title"}
// // //                 </p>
// // //               </div>

// // //               {/* View Full Info Button */}
// // //               <Button
// // //                 variant="secondary"
// // //                 size="sm"
// // //                 onClick={handleViewFullInfo}
// // //                 disabled={loading}
// // //                 className="gap-2"
// // //               >
// // //                 <Eye className="w-4 h-4" />
// // //                 {loading ? "Loading..." :
// // //                   fullInfo ? (isExpanded ? "Hide Details" : "Show Details") :
// // //                   hasViewedBefore ? "View Details (Free)" : "View Full Profile"}
// // //               </Button>
// // //             </div>

// // //             {/* Basic Info - Always visible */}
// // //             <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //               <div className="flex items-center gap-2 justify-center sm:justify-start">
// // //                 <Mail className="w-4 h-4 text-gray-400" />
// // //                 <span className="text-sm break-all">{displayData.email}</span>
// // //               </div>
// // //               <div className="flex items-center gap-2 justify-center sm:justify-start">
// // //                 <MapPin className="w-4 h-4 text-gray-400" />
// // //                 <span className="text-sm">
// // //                   {displayData.profile?.currentLocation || "N/A"}
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             {/* View Error Message */}
// // //             {viewError && (
// // //               <div className="mt-4">
// // //                 <Alert variant="destructive">
// // //                   <AlertCircle className="h-4 w-4" />
// // //                   <AlertTitle>Error</AlertTitle>
// // //                   <AlertDescription>{viewError}</AlertDescription>
// // //                 </Alert>
// // //               </div>
// // //             )}

// // //             {/* Expanded Content - Only shown when full info is available and expanded */}
// // //             {fullInfo && isExpanded && (
// // //               <div className="mt-6 space-y-6 border-t pt-6">
// // //                 {/* Contact Information */}
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // //                     <Phone className="w-4 h-4 text-gray-400" />
// // //                     <span className="text-sm">{fullInfo.phoneNumber}</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // //                     <Building2 className="w-4 h-4 text-gray-400" />
// // //                     <span className="text-sm">
// // //                       Visa: {fullInfo.profile?.visaStatus?.replace("_", " ") || "N/A"}
// // //                     </span>
// // //                   </div>
// // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // //                     <Briefcase className="w-4 h-4 text-gray-400" />
// // //                     <span className="text-sm">
// // //                       Relocate: {fullInfo.profile?.willingToRelocate ? "Yes" : "No"}
// // //                     </span>
// // //                   </div>
// // //                 </div>

// // //                 {/* Bio */}
// // //                 {fullInfo.profile?.bio && (
// // //                   <div className="space-y-2">
// // //                     <h3 className="font-semibold text-center sm:text-left">About</h3>
// // //                     <p className="text-sm text-gray-600">{fullInfo.profile.bio}</p>
// // //                   </div>
// // //                 )}

// // //                 {/* Skills */}
// // //                 {fullInfo.profile?.skills?.length > 0 && (
// // //                   <div className="space-y-2">
// // //                     <h3 className="font-semibold text-center sm:text-left">Skills</h3>
// // //                     <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
// // //                       {fullInfo.profile.skills.map((skill, index) => (
// // //                         <Badge key={index} variant="secondary">
// // //                           {skill}
// // //                         </Badge>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 {/* Resume */}
// // //                 {fullInfo.profile?.resume && (
// // //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// // //                     <FileText className="w-4 h-4 text-blue-600" />
// // //                     <a
// // //                       href={fullInfo.profile.resume}
// // //                       target="_blank"
// // //                       rel="noopener noreferrer"
// // //                       className="text-sm text-blue-600 hover:underline break-all"
// // //                     >
// // //                       View Resume: {fullInfo.profile.resumeOriginalName}
// // //                     </a>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </Card>
// // //   );
// // // };

// // // // FilterPanel component stays the same
// // // const FilterPanel = ({ filters, setFilters, visaOptions }) => {
// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="space-y-2">
// // //         <label className="text-sm font-medium">Search</label>
// // //         <Input
// // //           placeholder="Search by name, email, skills..."
// // //           value={filters.searchQuery}
// // //           onChange={(e) =>
// // //             setFilters((prev) => ({
// // //               ...prev,
// // //               searchQuery: e.target.value,
// // //             }))
// // //           }
// // //         />
// // //       </div>

// // //       <div className="space-y-2">
// // //         <label className="text-sm font-medium">Location</label>
// // //         <Input
// // //           placeholder="Filter by location"
// // //           value={filters.location}
// // //           onChange={(e) =>
// // //             setFilters((prev) => ({ ...prev, location: e.target.value }))
// // //           }
// // //         />
// // //       </div>

// // //       <div className="space-y-2">
// // //         <label className="text-sm font-medium">Visa Status</label>
// // //         <Select
// // //           value={filters.visaStatus}
// // //           onValueChange={(value) =>
// // //             setFilters((prev) => ({ ...prev, visaStatus: value }))
// // //           }
// // //         >
// // //           <SelectTrigger>
// // //             <SelectValue placeholder="Select visa status" />
// // //           </SelectTrigger>
// // //           <SelectContent>
// // //             <SelectItem value="all">All Visa Types</SelectItem>
// // //             {visaOptions.map((option) => (
// // //               <SelectItem key={option.value} value={option.value}>
// // //                 {option.label}
// // //               </SelectItem>
// // //             ))}
// // //           </SelectContent>
// // //         </Select>
// // //       </div>

// // //       <div className="space-y-2">
// // //         <label className="text-sm font-medium">Willing to Relocate</label>
// // //         <Select
// // //           value={filters.willingToRelocate}
// // //           onValueChange={(value) =>
// // //             setFilters((prev) => ({ ...prev, willingToRelocate: value }))
// // //           }
// // //         >
// // //           <SelectTrigger>
// // //             <SelectValue placeholder="Select preference" />
// // //           </SelectTrigger>
// // //           <SelectContent>
// // //             <SelectItem value="all">All Preferences</SelectItem>
// // //             <SelectItem value="yes">Yes</SelectItem>
// // //             <SelectItem value="no">No</SelectItem>
// // //           </SelectContent>
// // //         </Select>
// // //       </div>

// // //       <div className="space-y-2">
// // //         <label className="text-sm font-medium">Job Title</label>
// // //         <Input
// // //           placeholder="Filter by job title"
// // //           value={filters.jobTitle}
// // //           onChange={(e) =>
// // //             setFilters((prev) => ({ ...prev, jobTitle: e.target.value }))
// // //           }
// // //         />
// // //       </div>

// // //       <Button
// // //         variant="outline"
// // //         onClick={() =>
// // //           setFilters({
// // //             searchQuery: "",
// // //             location: "",
// // //             visaStatus: "all",
// // //             willingToRelocate: "all",
// // //             jobTitle: "",
// // //             skills: [],
// // //           })
// // //         }
// // //         className="w-full"
// // //       >
// // //         Clear All Filters
// // //       </Button>
// // //     </div>
// // //   );
// // // };

// // // const CandidatesCards = () => {
// // //   const [students, setStudents] = useState([]);
// // //   const [showMobileFilters, setShowMobileFilters] = useState(false);
// // //   const [filters, setFilters] = useState({
// // //     searchQuery: "",
// // //     location: "",
// // //     visaStatus: "all",
// // //     willingToRelocate: "all",
// // //     jobTitle: "",
// // //     skills: [],
// // //   });
// // //   const [remainingViews, setRemainingViews] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   const visaOptions = [
// // //     { value: "citizen", label: "Citizen" },
// // //     { value: "permanent_resident", label: "Permanent Resident" },
// // //     { value: "work_visa", label: "Work Visa" },
// // //     { value: "student_visa", label: "Student Visa" },
// // //     { value: "other", label: "Other" },
// // //   ];

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       setLoading(true);
// // //       setError(null);

// // //       try {
// // //         // Get user info from localStorage
// // //         const user = JSON.parse(localStorage.getItem("user"));
// // //         const userId = user ? user.email : null;

// // //         if (!userId) {
// // //           setError("Please log in to view candidates");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         // Get minimal student data
// // //         const studentsResponse = await axios.get(`${USER_API_END_POINT}/students-minimal`);

// // //         if (studentsResponse.data.success) {
// // //           setStudents(studentsResponse.data.data);
// // //         } else {
// // //           throw new Error(studentsResponse.data.message || "Failed to fetch students");
// // //         }

// // //         // Get company data using user ID
// // //         const companyResponse = await axios.get(`${USER_API_END_POINT}/companies/user/${userId}`);

// // //         if (companyResponse.data.success) {
// // //           setRemainingViews(companyResponse.data.data.remainingViews || 0);
// // //         } else {
// // //           throw new Error(companyResponse.data.message || "Failed to fetch company data");
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching data:", error);
// // //         setError(error.response?.data?.message || error.message || "Failed to load data");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   // Function to update remaining views after viewing a profile
// // //   const updateRemainingViews = (newRemainingViews) => {
// // //     setRemainingViews(newRemainingViews);
// // //   };

// // //   const filteredStudents = students.filter((student) => {
// // //     const searchMatch =
// // //       student.fullname?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// // //       student.email.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// // //       student.profile?.skills?.some((skill) =>
// // //         skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
// // //       ) ||
// // //       student.profile?.jobTitle
// // //         ?.toLowerCase()
// // //         .includes(filters.searchQuery.toLowerCase());

// // //     const locationMatch =
// // //       !filters.location ||
// // //       student.profile?.currentLocation
// // //         ?.toLowerCase()
// // //         .includes(filters.location.toLowerCase());

// // //     const visaMatch =
// // //       filters.visaStatus === "all" ||
// // //       student.profile?.visaStatus === filters.visaStatus;

// // //     const relocateMatch =
// // //       filters.willingToRelocate === "all" ||
// // //       (filters.willingToRelocate === "yes"
// // //         ? student.profile?.willingToRelocate
// // //         : !student.profile?.willingToRelocate);

// // //     const jobTitleMatch =
// // //       !filters.jobTitle ||
// // //       student.profile?.jobTitle
// // //         ?.toLowerCase()
// // //         .includes(filters.jobTitle.toLowerCase());

// // //     return (
// // //       searchMatch &&
// // //       locationMatch &&
// // //       visaMatch &&
// // //       relocateMatch &&
// // //       jobTitleMatch
// // //     );
// // //   });

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       {/* View Credits Display */}
// // //       {remainingViews !== null && (
// // //         <div className="p-4 sticky top-0 z-30 bg-white border-b">
// // //           <RemainingViewsAlert remainingViews={remainingViews} />
// // //         </div>
// // //       )}

// // //       {/* Error Message */}
// // //       {error && (
// // //         <div className="p-4">
// // //           <Alert variant="destructive">
// // //             <AlertCircle className="h-4 w-4" />
// // //             <AlertTitle>Error</AlertTitle>
// // //             <AlertDescription>{error}</AlertDescription>
// // //           </Alert>
// // //         </div>
// // //       )}

// // //       {/* Mobile Filter Toggle Button */}
// // //       <div className="lg:hidden sticky top-0 z-20 bg-white border-b p-4">
// // //         <Button
// // //           variant="outline"
// // //           onClick={() => setShowMobileFilters(!showMobileFilters)}
// // //           className="w-full gap-2"
// // //         >
// // //           {showMobileFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
// // //           {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
// // //         </Button>
// // //       </div>

// // //       {/* Mobile Filters - Shown as drawer on small screens */}
// // //       {showMobileFilters && (
// // //         <div className="lg:hidden fixed inset-0 z-10 bg-white p-4 mt-16 overflow-y-auto">
// // //           <FilterPanel
// // //             filters={filters}
// // //             setFilters={setFilters}
// // //             visaOptions={visaOptions}
// // //           />
// // //         </div>
// // //       )}

// // //       <div className="flex">
// // //         {/* Desktop Sidebar - Hidden on small screens */}
// // //         <div className="hidden lg:block w-80 p-6 bg-white border-r h-screen sticky top-0 overflow-y-auto">
// // //           <h2 className="text-xl font-semibold mb-6">Filters</h2>
// // //           <FilterPanel
// // //             filters={filters}
// // //             setFilters={setFilters}
// // //             visaOptions={visaOptions}
// // //           />
// // //         </div>

// // //         {/* Main Content */}
// // //         <div className="flex-1 p-4 lg:p-6">
// // //           <div className="max-w-4xl mx-auto">
// // //             <h1 className="text-xl lg:text-2xl font-bold mb-6">
// // //               Candidates ({filteredStudents.length})
// // //             </h1>

// // //             {loading ? (
// // //               <div className="text-center py-12">
// // //                 <p className="text-gray-500">Loading candidates...</p>
// // //               </div>
// // //             ) : (
// // //               <div className="space-y-6">
// // //                 {filteredStudents.map((student) => (
// // //                   <CandidateCard
// // //                     key={student._id || student.email}
// // //                     student={student}
// // //                     onViewFullInfo={updateRemainingViews}
// // //                   />
// // //                 ))}
// // //                 {filteredStudents.length === 0 && !loading && !error && (
// // //                   <div className="text-center py-12 text-gray-500">
// // //                     No candidates found matching your filters
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CandidatesCards;
// // import React, { useState, useEffect } from 'react';
// // import { Card } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import {
// //   User,
// //   MapPin,
// //   Mail,
// //   Phone,
// //   FileText,
// //   Building2,
// //   Briefcase,
// //   Filter,
// //   X,
// //   Eye,
// //   AlertCircle,
// //   CheckCircle,
// //   PieChart
// // } from "lucide-react";
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { USER_API_END_POINT } from '@/utils/constant';

// // // Component to display view credits with both company and personal counts
// // const ViewCreditsAlert = ({ companyViews, personalViews, recruiterName }) => {
// //   return (
// //     <div className="space-y-4">
// //       <Alert className={companyViews < 10 ? "bg-yellow-50" : "bg-green-50"}>
// //         <AlertCircle className={companyViews < 10 ? "text-yellow-500" : "text-green-500"} />
// //         <AlertTitle>Company View Credits</AlertTitle>
// //         <AlertDescription>
// //           Your company has <strong>{companyViews}</strong> profile views remaining
// //         </AlertDescription>
// //       </Alert>

// //       <Alert className="bg-blue-50">
// //         <Eye className="text-blue-500" />
// //         <AlertTitle>Your View Activity</AlertTitle>
// //         <AlertDescription>
// //           <strong>{recruiterName}</strong> has viewed <strong>{personalViews}</strong> candidate profiles
// //         </AlertDescription>
// //       </Alert>
// //     </div>
// //   );
// // };

// // // Enhanced Candidate Card Component
// // const CandidateCard = ({ student, onViewFullInfo }) => {
// //   const [isExpanded, setIsExpanded] = useState(false);
// //   const [fullInfo, setFullInfo] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [viewError, setViewError] = useState(null);
// //   const [hasViewedBefore, setHasViewedBefore] = useState(student.viewedByMe || false);

// //   // Function to handle the "View Full Info" button click
// //   const handleViewFullInfo = async () => {
// //     // If we already have full info, just toggle display
// //     if (fullInfo) {
// //       setIsExpanded(!isExpanded);
// //       return;
// //     }

// //     setLoading(true);
// //     setViewError(null);

// //     try {
// //       // Get user info from localStorage
// //       const user = JSON.parse(localStorage.getItem("user"));
// //       const userId = user ? user.email : null;

// //       if (!userId) {
// //         setViewError("User not logged in");
// //         setLoading(false);
// //         return;
// //       }

// //       // Call the API to get full student info with view tracking
// //       const response = await fetch(
// //         `${USER_API_END_POINT}/students/${student.email}`,
// //         {
// //           method: 'POST',
// //           credentials: 'include',
// //           headers: {
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({ email: userId, viewerId: userId })
// //         }
// //       );

// //       const data = await response.json();

// //       if (data.success) {
// //         setFullInfo(data.data);
// //         setIsExpanded(true);
// //         setHasViewedBefore(data.viewedBefore || student.viewedByMe);

// //         // Call the parent callback to update view counts in parent component
// //         onViewFullInfo({
// //           companyViews: data.remainingViews,
// //           personalViews: data.personalViewCount
// //         });
// //       } else {
// //         throw new Error(data.message || "Failed to load student details");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching student details:", error);
// //       setViewError(error.message || "Failed to load student details");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Decide which data to use - either minimal or full
// //   const displayData = fullInfo || student;

// //   return (
// //     <Card className={`hover:shadow-lg transition-shadow ${hasViewedBefore ? 'border-l-4 border-l-blue-500' : ''}`}>
// //       <div className="p-4 sm:p-6">
// //         <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
// //           {/* Profile Photo */}
// //           <div className="flex justify-center sm:block relative">
// //             {hasViewedBefore && (
// //               <div className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full p-1 z-10">
// //                 <CheckCircle className="w-4 h-4" />
// //               </div>
// //             )}

// //             {displayData.profile?.profilePhoto ? (
// //               <img
// //                 src={displayData.profile.profilePhoto}
// //                 alt={displayData.fullname}
// //                 className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
// //               />
// //             ) : (
// //               <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center">
// //                 <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
// //               </div>
// //             )}
// //           </div>

// //           {/* Main Content */}
// //           <div className="flex-1">
// //             <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0">
// //               <div className="text-center sm:text-left">
// //                 <h3 className="text-lg sm:text-xl font-semibold">{displayData.fullname}</h3>
// //                 <p className="text-gray-600">
// //                   {displayData.profile?.jobTitle || "No title"}
// //                 </p>
// //               </div>

// //               {/* View Full Info Button */}
// //               <Button
// //                 variant={hasViewedBefore ? "outline" : "secondary"}
// //                 size="sm"
// //                 onClick={handleViewFullInfo}
// //                 disabled={loading}
// //                 className="gap-2"
// //               >
// //                 <Eye className={`w-4 h-4 ${hasViewedBefore ? "text-blue-500" : ""}`} />
// //                 {loading ? "Loading..." :
// //                   fullInfo ? (isExpanded ? "Hide Details" : "Show Details") :
// //                   hasViewedBefore ? "View Again (Free)" : "View Full Profile"}
// //               </Button>
// //             </div>

// //             {/* Basic Info - Always visible */}
// //             <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <div className="flex items-center gap-2 justify-center sm:justify-start">
// //                 <Mail className="w-4 h-4 text-gray-400" />
// //                 <span className="text-sm break-all">{displayData.email}</span>
// //               </div>
// //               <div className="flex items-center gap-2 justify-center sm:justify-start">
// //                 <MapPin className="w-4 h-4 text-gray-400" />
// //                 <span className="text-sm">
// //                   {displayData.profile?.currentLocation || "N/A"}
// //                 </span>
// //               </div>
// //             </div>

// //             {/* View Error Message */}
// //             {viewError && (
// //               <div className="mt-4">
// //                 <Alert variant="destructive">
// //                   <AlertCircle className="h-4 w-4" />
// //                   <AlertTitle>Error</AlertTitle>
// //                   <AlertDescription>{viewError}</AlertDescription>
// //                 </Alert>
// //               </div>
// //             )}

// //             {/* Expanded Content - Only shown when full info is available and expanded */}
// //             {fullInfo && isExpanded && (
// //               <div className="mt-6 space-y-6 border-t pt-6">
// //                 {/* Contact Information */}
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// //                     <Phone className="w-4 h-4 text-gray-400" />
// //                     <span className="text-sm">{fullInfo.phoneNumber || "N/A"}</span>
// //                   </div>
// //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// //                     <Building2 className="w-4 h-4 text-gray-400" />
// //                     <span className="text-sm">
// //                       Visa: {fullInfo.profile?.visaStatus?.replace("_", " ") || "N/A"}
// //                     </span>
// //                   </div>
// //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// //                     <Briefcase className="w-4 h-4 text-gray-400" />
// //                     <span className="text-sm">
// //                       Relocate: {fullInfo.profile?.willingToRelocate ? "Yes" : "No"}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* Bio */}
// //                 {fullInfo.profile?.bio && (
// //                   <div className="space-y-2">
// //                     <h3 className="font-semibold text-center sm:text-left">About</h3>
// //                     <p className="text-sm text-gray-600">{fullInfo.profile.bio}</p>
// //                   </div>
// //                 )}

// //                 {/* Skills */}
// //                 {fullInfo.profile?.skills?.length > 0 && (
// //                   <div className="space-y-2">
// //                     <h3 className="font-semibold text-center sm:text-left">Skills</h3>
// //                     <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
// //                       {fullInfo.profile.skills.map((skill, index) => (
// //                         <Badge key={index} variant="secondary">
// //                           {skill}
// //                         </Badge>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Resume */}
// //                 {fullInfo.profile?.resume && (
// //                   <div className="flex items-center gap-2 justify-center sm:justify-start">
// //                     <FileText className="w-4 h-4 text-blue-600" />
// //                     <a
// //                       href={fullInfo.profile.resume}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="text-sm text-blue-600 hover:underline break-all"
// //                     >
// //                       View Resume: {fullInfo.profile.resumeOriginalName || "Download Resume"}
// //                     </a>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // };

// // // Enhanced FilterPanel Component with viewed status filter
// // const FilterPanel = ({ filters, setFilters, visaOptions }) => {
// //   return (
// //     <div className="space-y-6">
// //       <div className="space-y-2">
// //         <label className="text-sm font-medium">Search</label>
// //         <Input
// //           placeholder="Search by name, email, skills..."
// //           value={filters.searchQuery}
// //           onChange={(e) =>
// //             setFilters((prev) => ({
// //               ...prev,
// //               searchQuery: e.target.value,
// //             }))
// //           }
// //         />
// //       </div>

// //       <div className="space-y-2">
// //         <label className="text-sm font-medium">Viewed Status</label>
// //         <Select
// //           value={filters.viewedStatus}
// //           onValueChange={(value) =>
// //             setFilters((prev) => ({ ...prev, viewedStatus: value }))
// //           }
// //         >
// //           <SelectTrigger>
// //             <SelectValue placeholder="Filter by viewed status" />
// //           </SelectTrigger>
// //           <SelectContent>
// //             <SelectItem value="all">All Candidates</SelectItem>
// //             <SelectItem value="viewed">Previously Viewed</SelectItem>
// //             <SelectItem value="not-viewed">Not Yet Viewed</SelectItem>
// //           </SelectContent>
// //         </Select>
// //       </div>

// //       <div className="space-y-2">
// //         <label className="text-sm font-medium">Location</label>
// //         <Input
// //           placeholder="Filter by location"
// //           value={filters.location}
// //           onChange={(e) =>
// //             setFilters((prev) => ({ ...prev, location: e.target.value }))
// //           }
// //         />
// //       </div>

// //       <div className="space-y-2">
// //         <label className="text-sm font-medium">Job Title</label>
// //         <Input
// //           placeholder="Filter by job title"
// //           value={filters.jobTitle}
// //           onChange={(e) =>
// //             setFilters((prev) => ({ ...prev, jobTitle: e.target.value }))
// //           }
// //         />
// //       </div>

// //       <div className="space-y-2">
// //         <label className="text-sm font-medium">Visa Status</label>
// //         <Select
// //           value={filters.visaStatus}
// //           onValueChange={(value) =>
// //             setFilters((prev) => ({ ...prev, visaStatus: value }))
// //           }
// //         >
// //           <SelectTrigger>
// //             <SelectValue placeholder="Select visa status" />
// //           </SelectTrigger>
// //           <SelectContent>
// //             <SelectItem value="all">All Visa Types</SelectItem>
// //             {visaOptions.map((option) => (
// //               <SelectItem key={option.value} value={option.value}>
// //                 {option.label}
// //               </SelectItem>
// //             ))}
// //           </SelectContent>
// //         </Select>
// //       </div>

// //       <div className="space-y-2">
// //         <label className="text-sm font-medium">Willing to Relocate</label>
// //         <Select
// //           value={filters.willingToRelocate}
// //           onValueChange={(value) =>
// //             setFilters((prev) => ({ ...prev, willingToRelocate: value }))
// //           }
// //         >
// //           <SelectTrigger>
// //             <SelectValue placeholder="Select preference" />
// //           </SelectTrigger>
// //           <SelectContent>
// //             <SelectItem value="all">All Preferences</SelectItem>
// //             <SelectItem value="yes">Yes</SelectItem>
// //             <SelectItem value="no">No</SelectItem>
// //           </SelectContent>
// //         </Select>
// //       </div>

// //       <Button
// //         variant="outline"
// //         onClick={() =>
// //           setFilters({
// //             searchQuery: "",
// //             location: "",
// //             visaStatus: "all",
// //             willingToRelocate: "all",
// //             jobTitle: "",
// //             skills: [],
// //             viewedStatus: "all"
// //           })
// //         }
// //         className="w-full"
// //       >
// //         Clear All Filters
// //       </Button>
// //     </div>
// //   );
// // };

// // // Company View Stats Component
// // const CompanyViewStats = ({ companyId }) => {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [statsData, setStatsData] = useState(null);

// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       try {
// //         const response = await fetch(`${USER_API_END_POINT}/companies/${companyId}/view-stats`, {
// //           method: 'GET',
// //           credentials: 'include',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'X-User-Email': localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : null
// //           }
// //         });

// //         const data = await response.json();

// //         if (data.success) {
// //           setStatsData(data.data);
// //           console.log(data.data)
// //         } else {
// //           throw new Error(data.message || "Failed to fetch company view statistics");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching view stats:", error);
// //         setError(error.message || "Failed to load view statistics");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (companyId) {
// //       fetchStats();
// //     }
// //   }, [companyId]);

// //   if (loading) {
// //     return <div className="text-center py-6">Loading view statistics...</div>;
// //   }

// //   if (error) {
// //     return (
// //       <Alert variant="destructive">
// //         <AlertCircle className="h-4 w-4" />
// //         <AlertTitle>Error</AlertTitle>
// //         <AlertDescription>{error}</AlertDescription>
// //       </Alert>
// //     );
// //   }

// //   if (!statsData) {
// //     return <div className="text-center py-6">No statistics available</div>;
// //   }

// //   const usedViews = statsData.initialViewCount - statsData.remainingViews;
// //   const viewPercentage = statsData.initialViewCount > 0
// //     ? Math.round((usedViews / statsData.initialViewCount) * 100)
// //     : 0;

// //   return (
// //     <div className="space-y-6">
// //       <div className="bg-white p-6 rounded-lg shadow">
// //         <h3 className="text-lg font-semibold mb-4">Company View Usage</h3>
// //         <div className="grid grid-cols-3 gap-4 text-center">
// //           <div className="bg-gray-50 p-4 rounded">
// //             <p className="text-sm text-gray-500">Total Views</p>
// //             <p className="text-2xl font-bold">{statsData.initialViewCount}</p>
// //           </div>
// //           <div className="bg-gray-50 p-4 rounded">
// //             <p className="text-sm text-gray-500">Used</p>
// //             <p className="text-2xl font-bold">{usedViews}</p>
// //           </div>
// //           <div className="bg-gray-50 p-4 rounded">
// //             <p className="text-sm text-gray-500">Remaining</p>
// //             <p className="text-2xl font-bold">{statsData.remainingViews}</p>
// //           </div>
// //         </div>

// //         <div className="mt-4">
// //           <div className="flex justify-between mb-1">
// //             <span className="text-sm">{viewPercentage}% used</span>
// //             <span className="text-sm">{statsData.remainingViews} remaining</span>
// //           </div>
// //           <div className="w-full bg-gray-200 rounded-full h-2.5">
// //             <div
// //               className={`h-2.5 rounded-full ${viewPercentage > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
// //               style={{ width: `${viewPercentage}%` }}
// //             ></div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="bg-white p-6 rounded-lg shadow">
// //         <h3 className="text-lg font-semibold mb-4">Recruiter Activity</h3>
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead>
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recruiter</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profiles Viewed</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Candidates</th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {statsData.recruiters.map((recruiter, index) => (
// //                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{recruiter.fullname}</td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recruiter.viewCount}</td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recruiter.uniqueCandidatesViewed}</td>
// //                 </tr>
// //               ))}
// //               {statsData.recruiters.length === 0 && (
// //                 <tr>
// //                   <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No recruiter activity yet</td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Main component that displays the candidates list
// // const CandidatesViewer = () => {
// //   const [students, setStudents] = useState([]);
// //   const [showMobileFilters, setShowMobileFilters] = useState(false);
// //   const [filters, setFilters] = useState({
// //     searchQuery: "",
// //     location: "",
// //     visaStatus: "all",
// //     willingToRelocate: "all",
// //     jobTitle: "",
// //     skills: [],
// //     viewedStatus: "all" // New filter for viewed/not viewed
// //   });
// //   const [viewCounts, setViewCounts] = useState({
// //     companyViews: null,
// //     personalViews: null,
// //     recruiterName: ""
// //   });
// //   const [companyId, setCompanyId] = useState(null);
// //   const [activeTab, setActiveTab] = useState("candidates");
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const visaOptions = [
// //     { value: "citizen", label: "Citizen" },
// //     { value: "permanent_resident", label: "Permanent Resident" },
// //     { value: "work_visa", label: "Work Visa" },
// //     { value: "student_visa", label: "Student Visa" },
// //     { value: "other", label: "Other" },
// //   ];

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         // Get user info from localStorage
// //         const user = JSON.parse(localStorage.getItem("user"));
// //         const userId = user ? user.email : null;

// //         if (!userId) {
// //           setError("Please log in to view candidates");
// //           setLoading(false);
// //           return;
// //         }

// //         // Get minimal student data
// //         const studentsResponse = await fetch(`${USER_API_END_POINT}/students-minimal`, {
// //           method: 'POST',
// //           credentials: 'include',
// //           headers: {
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({ email: userId })
// //         });

// //         const studentsData = await studentsResponse.json();

// //         if (studentsData.success) {
// //           setStudents(studentsData.data);
// //         } else {
// //           throw new Error(studentsData.message || "Failed to fetch students");
// //         }

// //         // Get company data using user ID
// //         const companyResponse = await fetch(`${USER_API_END_POINT}/companies/user/${userId}`, {
// //           method: 'POST',
// //           credentials: 'include',
// //           headers: {
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({ email: userId })
// //         });

// //         const companyData = await companyResponse.json();

// //         if (companyData.success) {
// //           setViewCounts({
// //             companyViews: companyData.data.remainingViews || 0,
// //             personalViews: companyData.data.personalViewCount || 0,
// //             recruiterName: companyData.data.recruiterName || "Recruiter"
// //           });
// //           setCompanyId(companyData.data.companyId);
// //         } else {
// //           throw new Error(companyData.message || "Failed to fetch company data");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setError(error.message || "Failed to load data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // Function to update view counts after viewing a profile
// //   const updateViewCounts = ({ companyViews, personalViews }) => {
// //     setViewCounts(prev => ({
// //       ...prev,
// //       companyViews,
// //       personalViews
// //     }));
// //   };

// //   const filteredStudents = students.filter((student) => {
// //     const searchMatch =
// //       student.fullname?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// //       student.email.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// //       student.profile?.skills?.some((skill) =>
// //         skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
// //       ) ||
// //       student.profile?.jobTitle
// //         ?.toLowerCase()
// //         .includes(filters.searchQuery.toLowerCase());

// //     const locationMatch =
// //       !filters.location ||
// //       student.profile?.currentLocation
// //         ?.toLowerCase()
// //         .includes(filters.location.toLowerCase());

// //     const visaMatch =
// //       filters.visaStatus === "all" ||
// //       student.profile?.visaStatus === filters.visaStatus;

// //     const relocateMatch =
// //       filters.willingToRelocate === "all" ||
// //       (filters.willingToRelocate === "yes"
// //         ? student.profile?.willingToRelocate
// //         : !student.profile?.willingToRelocate);

// //     const jobTitleMatch =
// //       !filters.jobTitle ||
// //       student.profile?.jobTitle
// //         ?.toLowerCase()
// //         .includes(filters.jobTitle.toLowerCase());

// //     const viewedMatch =
// //       filters.viewedStatus === "all" ||
// //       (filters.viewedStatus === "viewed" ? student.viewedByMe : !student.viewedByMe);

// //     return (
// //       searchMatch &&
// //       locationMatch &&
// //       visaMatch &&
// //       relocateMatch &&
// //       jobTitleMatch &&
// //       viewedMatch
// //     );
// //   });

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* View Credits Display */}
// //       {viewCounts.companyViews !== null && (
// //         <div className="p-4 sticky top-0 z-30 bg-white border-b">
// //           <ViewCreditsAlert
// //             companyViews={viewCounts.companyViews}
// //             personalViews={viewCounts.personalViews}
// //             recruiterName={viewCounts.recruiterName}
// //           />
// //         </div>
// //       )}

// //       {/* Error Message */}
// //       {error && (
// //         <div className="p-4">
// //           <Alert variant="destructive">
// //             <AlertCircle className="h-4 w-4" />
// //             <AlertTitle>Error</AlertTitle>
// //             <AlertDescription>{error}</AlertDescription>
// //           </Alert>
// //         </div>
// //       )}

// //       {/* Tabs for switching between candidates and view stats */}
// //       <div className="p-4 bg-white border-b">
// //         <Tabs defaultValue="candidates" onValueChange={setActiveTab} value={activeTab}>
// //           <TabsList className="grid w-full grid-cols-1">
// //             <TabsTrigger value="candidates" className="flex items-center gap-2">
// //               <User className="h-4 w-4" />
// //               Candidates
// //             </TabsTrigger>
// //             {/* <TabsTrigger value="viewStats" className="flex items-center gap-2">
// //               <PieChart className="h-4 w-4" />
// //               View Statistics
// //             </TabsTrigger> */}
// //           </TabsList>

// //           <TabsContent value="candidates">
// //             {/* Mobile Filter Toggle Button */}
// //             <div className="lg:hidden sticky top-0 z-20 bg-white border-b p-4">
// //               <Button
// //                 variant="outline"
// //                 onClick={() => setShowMobileFilters(!showMobileFilters)}
// //                 className="w-full gap-2"
// //               >
// //                 {showMobileFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
// //                 {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
// //               </Button>
// //             </div>

// //             {/* Mobile Filters - Shown as drawer on small screens */}
// //             {showMobileFilters && (
// //               <div className="lg:hidden fixed inset-0 z-10 bg-white p-4 mt-16 overflow-y-auto">
// //                 <FilterPanel
// //                   filters={filters}
// //                   setFilters={setFilters}
// //                   visaOptions={visaOptions}
// //                 />
// //               </div>
// //             )}

// //             <div className="flex">
// //               {/* Desktop Sidebar - Hidden on small screens */}
// //               <div className="hidden lg:block w-80 p-6 bg-white border-r h-screen sticky top-0 overflow-y-auto">
// //                 <h2 className="text-xl font-semibold mb-6">Filters</h2>
// //                 <FilterPanel
// //                   filters={filters}
// //                   setFilters={setFilters}
// //                   visaOptions={visaOptions}
// //                 />
// //               </div>

// //               {/* Main Content */}
// //               <div className="flex-1 p-4 lg:p-6">
// //                 <div className="max-w-4xl mx-auto">
// //                   <div className="flex justify-between items-center mb-6">
// //                     <h1 className="text-xl lg:text-2xl font-bold">
// //                       Candidates ({filteredStudents.length})
// //                     </h1>

// //                     <div className="flex gap-2">
// //                       <Badge variant="outline" className="flex items-center gap-1">
// //                         <CheckCircle className="h-3 w-3 text-blue-500" />
// //                         <span className="text-xs">Previously viewed</span>
// //                       </Badge>
// //                     </div>
// //                   </div>

// //                   {loading ? (
// //                     <div className="text-center py-12">
// //                       <p className="text-gray-500">Loading candidates...</p>
// //                     </div>
// //                   ) : (
// //                     <div className="space-y-6">
// //                       {filteredStudents.map((student) => (
// //                         <CandidateCard
// //                           key={student._id || student.email}
// //                           student={student}
// //                           onViewFullInfo={updateViewCounts}
// //                         />
// //                       ))}
// //                       {filteredStudents.length === 0 && !loading && !error && (
// //                         <div className="text-center py-12 text-gray-500">
// //                           No candidates found matching your filters
// //                         </div>
// //                       )}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </TabsContent>
// //         </Tabs>
// //       </div>

// //       {loading && !error && (
// //         <div className="flex items-center justify-center h-64">
// //           <div className="text-center">
// //             <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //             </svg>
// //             <p className="text-gray-500">Loading data...</p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CandidatesViewer;

// // import React, { useState, useEffect } from 'react';
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { User, Filter, X, AlertCircle, CheckCircle, PieChart } from "lucide-react";
// // import { USER_API_END_POINT } from '@/utils/constant';

// // // Import custom components
// // import ViewCreditsAlert from './ViewCreditsAlert';
// // import CandidateCard from './CandidateCard';
// // import FilterPanel from './FilterPanel';
// // import CompanyViewStats from './CompanyViewStats';

// // // Main component that displays the candidates list
// // const CandidatesViewer = () => {
// //   const [students, setStudents] = useState([]);
// //   const [showMobileFilters, setShowMobileFilters] = useState(false);
// //   const [filters, setFilters] = useState({
// //     searchQuery: "",
// //     location: "",
// //     visaStatus: "all",
// //     willingToRelocate: "all",
// //     jobTitle: "",
// //     skills: [],
// //     viewedStatus: "all"
// //   });
// //   const [viewCounts, setViewCounts] = useState({
// //     companyViews: null,
// //     personalViews: null,
// //     recruiterName: ""
// //   });
// //   const [companyId, setCompanyId] = useState(null);
// //   const [activeTab, setActiveTab] = useState("candidates");
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const visaOptions = [
// //     { value: "citizen", label: "Citizen" },
// //     { value: "permanent_resident", label: "Permanent Resident" },
// //     { value: "work_visa", label: "Work Visa" },
// //     { value: "student_visa", label: "Student Visa" },
// //     { value: "other", label: "Other" },
// //   ];

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         // Get user info from localStorage
// //         const user = JSON.parse(localStorage.getItem("user"));
// //         const userId = user ? user.email : null;

// //         if (!userId) {
// //           setError("Please log in to view candidates");
// //           setLoading(false);
// //           return;
// //         }

// //         // Get minimal student data
// //         const studentsResponse = await fetch(`${USER_API_END_POINT}/students-minimal`, {
// //           method: 'POST',
// //           credentials: 'include',
// //           headers: {
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({ email: userId })
// //         });

// //         const studentsData = await studentsResponse.json();

// //         if (studentsData.success) {
// //           setStudents(studentsData.data);
// //         } else {
// //           throw new Error(studentsData.message || "Failed to fetch students");
// //         }

// //         // Get company data using user ID
// //         const companyResponse = await fetch(`${USER_API_END_POINT}/companies/user/${userId}`, {
// //           method: 'POST',
// //           credentials: 'include',
// //           headers: {
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({ email: userId })
// //         });

// //         const companyData = await companyResponse.json();

// //         if (companyData.success) {
// //           setViewCounts({
// //             companyViews: companyData.data.remainingViews || 0,
// //             personalViews: companyData.data.personalViewCount || 0,
// //             recruiterName: companyData.data.recruiterName || "Recruiter"
// //           });
// //           setCompanyId(companyData.data.companyId);
// //         } else {
// //           throw new Error(companyData.message || "Failed to fetch company data");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setError(error.message || "Failed to load data");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // Function to update view counts after viewing a profile
// //   const updateViewCounts = ({ companyViews, personalViews }) => {
// //     setViewCounts(prev => ({
// //       ...prev,
// //       companyViews,
// //       personalViews
// //     }));
// //   };

// //   const filteredStudents = students.filter((student) => {
// //     const searchMatch =
// //       student.fullname?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// //       student.email.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
// //       student.profile?.skills?.some((skill) =>
// //         skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
// //       ) ||
// //       student.profile?.jobTitle
// //         ?.toLowerCase()
// //         .includes(filters.searchQuery.toLowerCase());

// //     const locationMatch =
// //       !filters.location ||
// //       student.profile?.currentLocation
// //         ?.toLowerCase()
// //         .includes(filters.location.toLowerCase());

// //     const visaMatch =
// //       filters.visaStatus === "all" ||
// //       student.profile?.visaStatus === filters.visaStatus;

// //     const relocateMatch =
// //       filters.willingToRelocate === "all" ||
// //       (filters.willingToRelocate === "yes"
// //         ? student.profile?.willingToRelocate
// //         : !student.profile?.willingToRelocate);

// //     const jobTitleMatch =
// //       !filters.jobTitle ||
// //       student.profile?.jobTitle
// //         ?.toLowerCase()
// //         .includes(filters.jobTitle.toLowerCase());

// //     const viewedMatch =
// //       filters.viewedStatus === "all" ||
// //       (filters.viewedStatus === "viewed" ? student.viewedByMe : !student.viewedByMe);

// //     return (
// //       searchMatch &&
// //       locationMatch &&
// //       visaMatch &&
// //       relocateMatch &&
// //       jobTitleMatch &&
// //       viewedMatch
// //     );
// //   });

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       {/* Compact Credits Display */}
// //       {viewCounts.companyViews !== null && (
// //         <div className="sticky top-0 z-30 bg-white border-b shadow-sm">
// //           <ViewCreditsAlert
// //             companyViews={viewCounts.companyViews}
// //             personalViews={viewCounts.personalViews}
// //             recruiterName={viewCounts.recruiterName}
// //           />
// //         </div>
// //       )}

// //       {/* Error Message */}
// //       {error && (
// //         <div className="p-3">
// //           <Alert variant="destructive" className="py-2">
// //             <AlertCircle className="h-4 w-4" />
// //             <AlertTitle className="text-sm">Error</AlertTitle>
// //             <AlertDescription className="text-xs">{error}</AlertDescription>
// //           </Alert>
// //         </div>
// //       )}

// //       {/* Main Content Area */}
// //       <div className="mx-auto max-w-7xl px-3 sm:px-4 py-3">
// //         {/* Tabs */}
// //         <Tabs defaultValue="candidates" value={activeTab} onValueChange={setActiveTab} className="w-full">
// //           <div className="flex items-center justify-between mb-4">
// //             <TabsList className="h-8">
// //               <TabsTrigger value="candidates" className="text-xs px-3 py-1 h-full">
// //                 <User className="h-3 w-3 mr-1" />
// //                 Candidates
// //               </TabsTrigger>
// //               <TabsTrigger value="viewStats" className="text-xs px-3 py-1 h-full">
// //                 <PieChart className="h-3 w-3 mr-1" />
// //                 View Statistics
// //               </TabsTrigger>
// //             </TabsList>

// //             {/* Mobile filter toggle */}
// //             <div className="md:hidden">
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={() => setShowMobileFilters(!showMobileFilters)}
// //                 className="text-xs h-8 gap-1"
// //               >
// //                 {showMobileFilters ? "Hide Filters" : "Filters"}
// //               </Button>
// //             </div>
// //           </div>

// //           <TabsContent value="candidates" className="mt-0">
// //             <div className="flex flex-col md:flex-row gap-4">
// //               {/* Mobile Filters */}
// //               {showMobileFilters && (
// //                 <div className="md:hidden bg-white p-3 border rounded shadow-sm">
// //                   <h3 className="font-medium text-sm mb-3">Filters</h3>
// //                   <FilterPanel
// //                     filters={filters}
// //                     setFilters={setFilters}
// //                     visaOptions={visaOptions}
// //                   />
// //                 </div>
// //               )}

// //               {/* Desktop Sidebar */}
// //               <div className="hidden md:block w-64 bg-white p-4 border rounded shadow-sm self-start sticky top-16">
// //                 <h3 className="font-medium text-sm mb-3">Filters</h3>
// //                 <FilterPanel
// //                   filters={filters}
// //                   setFilters={setFilters}
// //                   visaOptions={visaOptions}
// //                 />
// //               </div>

// //               {/* Main Candidates List */}
// //               <div className="flex-1">
// //                 <div className="bg-white p-4 border rounded shadow-sm mb-4">
// //                   <div className="flex justify-between items-center">
// //                     <h2 className="text-base font-medium">
// //                       Candidates <span className="text-sm text-gray-500">({filteredStudents.length})</span>
// //                     </h2>

// //                     <Badge variant="outline" className="flex items-center gap-1 text-xs">
// //                       <CheckCircle className="h-3 w-3 text-blue-500" />
// //                       <span>Previously viewed</span>
// //                     </Badge>
// //                   </div>
// //                 </div>

// //                 {loading ? (
// //                   <div className="text-center py-8 bg-white border rounded shadow-sm">
// //                     <svg className="animate-spin h-5 w-5 text-blue-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                     </svg>
// //                     <p className="text-sm text-gray-500">Loading candidates...</p>
// //                   </div>
// //                 ) : (
// //                   <div className="space-y-3">
// //                     {filteredStudents.map((student) => (
// //                       <CandidateCard
// //                         key={student._id || student.email}
// //                         student={student}
// //                         onViewFullInfo={updateViewCounts}
// //                       />
// //                     ))}
// //                     {filteredStudents.length === 0 && !loading && !error && (
// //                       <div className="text-center py-8 bg-white border rounded shadow-sm">
// //                         <p className="text-sm text-gray-500">No candidates match your current filters</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </TabsContent>

// //           <TabsContent value="viewStats" className="mt-0">
// //             <div className="bg-white border rounded shadow-sm">
// //               <div className="p-4 border-b">
// //                 <h2 className="text-base font-medium">Company View Statistics</h2>
// //               </div>
// //               <div className="p-4">
// //                 {companyId ? (
// //                   <CompanyViewStats companyId={companyId} />
// //                 ) : (
// //                   <div className="text-center py-4">
// //                     <p className="text-sm text-gray-500">Company information not available</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </TabsContent>
// //         </Tabs>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CandidatesViewer;
// import React, { useState, useEffect } from 'react';
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { User, Filter, X, AlertCircle, CheckCircle, PieChart } from "lucide-react";
// import { USER_API_END_POINT } from '@/utils/constant';

// // Import custom components
// import ViewCreditsAlert from './ViewCreditsAlert';
// import CandidateCard from './CandidateCard';
// import FilterPanel from './FilterPanel';
// import CompanyViewStats from './CompanyViewStats';
// import Pagination from './Pagination';

// // Main component that displays the candidates list
// const CandidatesViewer = () => {
//   const [students, setStudents] = useState([]);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     searchQuery: "",
//     location: "",
//     visaStatus: "all",
//     willingToRelocate: "all",
//     jobTitle: "",
//     skills: [],
//     viewedStatus: "all"
//   });
//   const [viewCounts, setViewCounts] = useState({
//     companyViews: null,
//     personalViews: null,
//     recruiterName: ""
//   });
//   const [companyId, setCompanyId] = useState(null);
//   const [activeTab, setActiveTab] = useState("candidates");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   const visaOptions = [
//     { value: "citizen", label: "Citizen" },
//     { value: "permanent_resident", label: "Permanent Resident" },
//     { value: "work_visa", label: "Work Visa" },
//     { value: "student_visa", label: "Student Visa" },
//     { value: "other", label: "Other" },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // Get user info from localStorage
//         const user = JSON.parse(localStorage.getItem("user"));
//         const userId = user ? user.email : null;

//         if (!userId) {
//           setError("Please log in to view candidates");
//           setLoading(false);
//           return;
//         }

//         // Get minimal student data
//         const studentsResponse = await fetch(`${USER_API_END_POINT}/students-minimal`, {
//           method: 'POST',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ email: userId })
//         });

//         const studentsData = await studentsResponse.json();

//         if (studentsData.success) {
//           setStudents(studentsData.data);
//         } else {
//           throw new Error(studentsData.message || "Failed to fetch students");
//         }

//         // Get company data using user ID
//         const companyResponse = await fetch(`${USER_API_END_POINT}/companies/user/${userId}`, {
//           method: 'POST',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ email: userId })
//         });

//         const companyData = await companyResponse.json();

//         if (companyData.success) {
//           setViewCounts({
//             companyViews: companyData.data.remainingViews || 0,
//             personalViews: companyData.data.personalViewCount || 0,
//             recruiterName: companyData.data.recruiterName || "Recruiter"
//           });
//           setCompanyId(companyData.data.companyId);
//         } else {
//           throw new Error(companyData.message || "Failed to fetch company data");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.message || "Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filters]);

//   // Function to update view counts after viewing a profile
//   const updateViewCounts = ({ companyViews, personalViews }) => {
//     setViewCounts(prev => ({
//       ...prev,
//       companyViews,
//       personalViews
//     }));
//   };

//   const filteredStudents = students.filter((student) => {
//     const searchMatch =
//       student.fullname?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
//       student.email?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
//       student.profile?.skills?.some((skill) =>
//         typeof skill === 'string'
//           ? skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
//           : skill?.S?.toLowerCase().includes(filters.searchQuery.toLowerCase())
//       ) ||
//       student.profile?.jobTitle
//         ?.toLowerCase()
//         .includes(filters.searchQuery.toLowerCase());

//     const locationMatch =
//       !filters.location ||
//       student.profile?.currentLocation
//         ?.toLowerCase()
//         .includes(filters.location.toLowerCase());

//     const visaMatch =
//       filters.visaStatus === "all" ||
//       student.profile?.visaStatus === filters.visaStatus;

//     const relocateMatch =
//       filters.willingToRelocate === "all" ||
//       (filters.willingToRelocate === "yes"
//         ? student.profile?.willingToRelocate === true || student.profile?.willingToRelocate === "true"
//         : student.profile?.willingToRelocate === false || student.profile?.willingToRelocate === "false");

//     const jobTitleMatch =
//       !filters.jobTitle ||
//       student.profile?.jobTitle
//         ?.toLowerCase()
//         .includes(filters.jobTitle.toLowerCase());

//     const viewedMatch =
//       filters.viewedStatus === "all" ||
//       (filters.viewedStatus === "viewed" ? student.viewedByMe : !student.viewedByMe);

//     return (
//       searchMatch &&
//       locationMatch &&
//       visaMatch &&
//       relocateMatch &&
//       jobTitleMatch &&
//       viewedMatch
//     );
//   });

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredStudents.length / pageSize);
//   const paginatedStudents = filteredStudents.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     // Scroll to top of content when changing pages
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Handle page size change
//   const handlePageSizeChange = (size) => {
//     setPageSize(size);
//     setCurrentPage(1); // Reset to first page when changing page size
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Compact Credits Display */}
//       {viewCounts.companyViews !== null && (
//         <div className="sticky top-0 z-30 bg-white border-b shadow-sm">
//           <ViewCreditsAlert
//             companyViews={viewCounts.companyViews}
//             personalViews={viewCounts.personalViews}
//             recruiterName={viewCounts.recruiterName}
//           />
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <div className="p-3">
//           <Alert variant="destructive" className="py-2">
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle className="text-sm">Error</AlertTitle>
//             <AlertDescription className="text-xs">{error}</AlertDescription>
//           </Alert>
//         </div>
//       )}

//       {/* Main Content Area */}
//       <div className="mx-auto max-w-7xl px-3 sm:px-4 py-3">
//         {/* Tabs */}
//         <Tabs defaultValue="candidates" value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <div className="flex items-center justify-between mb-4">
//             <TabsList className="h-8">
//               <TabsTrigger value="candidates" className="text-xs px-3 py-1 h-full">
//                 <User className="h-3 w-3 mr-1" />
//                 Candidates
//               </TabsTrigger>
//               <TabsTrigger value="viewStats" className="text-xs px-3 py-1 h-full">
//                 <PieChart className="h-3 w-3 mr-1" />
//                 View Statistics
//               </TabsTrigger>
//             </TabsList>

//             {/* Mobile filter toggle */}
//             <div className="md:hidden">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setShowMobileFilters(!showMobileFilters)}
//                 className="text-xs h-8 gap-1"
//               >
//                 {showMobileFilters ? "Hide Filters" : "Filters"}
//               </Button>
//             </div>
//           </div>

//           <TabsContent value="candidates" className="mt-0">
//             <div className="flex flex-col md:flex-row gap-4">
//               {/* Mobile Filters */}
//               {showMobileFilters && (
//                 <div className="md:hidden bg-white p-3 border rounded shadow-sm">
//                   <h3 className="font-medium text-sm mb-3">Filters</h3>
//                   <FilterPanel
//                     filters={filters}
//                     setFilters={setFilters}
//                     visaOptions={visaOptions}
//                   />
//                 </div>
//               )}

//               {/* Desktop Sidebar */}
//               <div className="hidden md:block w-64 bg-white p-4 border rounded shadow-sm self-start sticky top-16">
//                 <h3 className="font-medium text-sm mb-3">Filters</h3>
//                 <FilterPanel
//                   filters={filters}
//                   setFilters={setFilters}
//                   visaOptions={visaOptions}
//                 />
//               </div>

//               {/* Main Candidates List */}
//               <div className="flex-1">
//                 <div className="bg-white p-4 border rounded shadow-sm mb-4">
//                   <div className="flex justify-between items-center">
//                     <h2 className="text-base font-medium">
//                       Candidates <span className="text-sm text-gray-500">({filteredStudents.length})</span>
//                     </h2>

//                     <Badge variant="outline" className="flex items-center gap-1 text-xs">
//                       <CheckCircle className="h-3 w-3 text-blue-500" />
//                       <span>Previously viewed</span>
//                     </Badge>
//                   </div>
//                 </div>

//                 {loading ? (
//                   <div className="text-center py-8 bg-white border rounded shadow-sm">
//                     <svg className="animate-spin h-5 w-5 text-blue-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <p className="text-sm text-gray-500">Loading candidates...</p>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="space-y-3">
//                       {paginatedStudents.map((student) => (
//                         <CandidateCard
//                           key={student._id || student.email}
//                           student={student}
//                           onViewFullInfo={updateViewCounts}
//                         />
//                       ))}
//                       {filteredStudents.length === 0 && !loading && !error && (
//                         <div className="text-center py-8 bg-white border rounded shadow-sm">
//                           <p className="text-sm text-gray-500">No candidates match your current filters</p>
//                         </div>
//                       )}
//                     </div>

//                     {/* Pagination */}
//                     {filteredStudents.length > 0 && (
//                       <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={handlePageChange}
//                         pageSize={pageSize}
//                         totalItems={filteredStudents.length}
//                         onPageSizeChange={handlePageSizeChange}
//                       />
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="viewStats" className="mt-0">
//             <div className="bg-white border rounded shadow-sm">
//               <div className="p-4 border-b">
//                 <h2 className="text-base font-medium">Company View Statistics</h2>
//               </div>
//               <div className="p-4">
//                 {companyId ? (
//                   <CompanyViewStats companyId={companyId} />
//                 ) : (
//                   <div className="text-center py-4">
//                     <p className="text-sm text-gray-500">Company information not available</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default CandidatesViewer;
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Filter, X, AlertCircle, CheckCircle, PieChart, Search, Info } from "lucide-react";
import { USER_API_END_POINT } from '@/utils/constant';
import { Input } from "@/components/ui/input";
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
    viewedStatus: "all"
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
5

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
    <div className="min-h-screen bg-gray-100">
      {/* Compact Credits Display */}
      {viewCounts.companyViews !== null && (
        <div className="sticky top-0 z-30 bg-white border-b shadow-sm">
          <ViewCreditsAlert
            companyViews={viewCounts.companyViews}
            personalViews={viewCounts.personalViews}
            recruiterName={viewCounts.recruiterName}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3">
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-sm">Error</AlertTitle>
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4 py-3">
        {/* Tabs */}
        <Tabs defaultValue="candidates" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="h-8">
              <TabsTrigger value="candidates" className="text-xs px-3 py-1 h-full">
                <User className="h-3 w-3 mr-1" />
                Candidates
              </TabsTrigger>
              <TabsTrigger value="viewStats" className="text-xs px-3 py-1 h-full">
                <PieChart className="h-3 w-3 mr-1" />
                View Statistics
              </TabsTrigger>
            </TabsList>

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

          <TabsContent value="candidates" className="mt-0">
            {/* Advanced Search Bar */}
            <div className="bg-white p-4 border rounded shadow-sm mb-4">
              <form onSubmit={handleSearch} className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder={filters.booleanSearchEnabled
                        ? 'Search using AND, OR, NOT, "exact phrase"'
                        : 'Search name, email, skills, job title...'}
                      className="pl-10 pr-10 h-10"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    {searchInput && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={clearSearch}
                      >
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="submit" size="sm" className="h-10">
                      Search
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="booleanSearch"
                        checked={filters.booleanSearchEnabled}
                        onChange={toggleBooleanSearch}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="booleanSearch" className="ml-2 text-sm text-gray-700">
                        Enable Boolean Search
                      </label>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="text-gray-400 hover:text-gray-600">
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

                  <div className="text-xs text-gray-500">
                    {filteredStudents.length} {filteredStudents.length === 1 ? 'candidate' : 'candidates'} found
                  </div>
                </div>
              </form>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Mobile Filters */}
              {showMobileFilters && (
                <div className="md:hidden bg-white p-3 border rounded shadow-sm">
                  <h3 className="font-medium text-sm mb-3">Filters</h3>
                  <FilterPanel
                    filters={filters}
                    setFilters={setFilters}
                    visaOptions={visaOptions}
                  />
                </div>
              )}

              {/* Desktop Sidebar */}
              <div className="hidden md:block w-64 bg-white p-4 border rounded shadow-sm self-start sticky top-16">
                <h3 className="font-medium text-sm mb-3">Filters</h3>
                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  visaOptions={visaOptions}
                />
              </div>

              {/* Main Candidates List */}
              <div className="flex-1">
                <div className="bg-white p-4 border rounded shadow-sm mb-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-base font-medium">
                      Candidates <span className="text-sm text-gray-500">({filteredStudents.length})</span>
                    </h2>

                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                      <CheckCircle className="h-3 w-3 text-blue-500" />
                      <span>Previously viewed</span>
                    </Badge>
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
          </TabsContent>

          <TabsContent value="viewStats" className="mt-0">
            <div className="bg-white border rounded shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-base font-medium">Company View Statistics</h2>
              </div>
              <div className="p-4">
                {companyId ? (
                  <CompanyViewStats companyId={companyId} />
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">Company information not available</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CandidatesViewer;