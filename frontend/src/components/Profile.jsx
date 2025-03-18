// // import {
// //   Contact,
// //   Mail,
// //   Pen,
// //   MapPin,
// //   Globe,
// //   Briefcase,
// //   CalendarDaysIcon,
// // } from "lucide-react";
// // import Navbar from "./shared/Navbar";
// // import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
// // import { Button } from "./ui/button";
// // import { Badge } from "./ui/badge";
// // import { Label } from "./ui/label";
// // import AppliedJobTable from "./AppliedJobTable";
// // import { useState } from "react";
// // import UpdateProfileDialog from "./UpdateProfileDialog";
// // import { useSelector } from "react-redux";
// // import store from "../redux/store";
// // import UseGetAppliedJobs from "@/hooks/useGetAppliedJobs";
// // import JobsSection from './JobsSection';
// // import ProfileCompletionTracker from "./ProfileCompletionTracker";

// // function Profile() {
// //   UseGetAppliedJobs();
// //   const { user } = useSelector((store) => store.auth);
// //   const [open, setOpen] = useState(false);

// //   const renderStudentDetails = () => {
// //     if (user?.role !== "student") return null;

// //     return (
// //       <div className="mt-8 border-t border-gray-200 pt-6">
// //         <h2 className="text-lg font-semibold text-black mb-4">
// //           Student Details
// //         </h2>
// //         <div className="grid md:grid-cols-2 gap-6">
// //           <div className="flex items-center gap-4">
// //             <MapPin className="text-blue-700 shrink-0" />
// //             <span className="text-black">
// //               Current Location:{" "}
// //               {user?.profile?.currentLocation || "Not specified"}
// //             </span>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <Globe className="text-blue-700 shrink-0" />
// //             <span className="text-black">
// //               Willing to Relocate:{" "}
// //               {user?.profile?.willingToRelocate ? "Yes" : "No"}
// //             </span>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <CalendarDaysIcon className="text-blue-700 shrink-0" />
// //             <span className="text-black">
// //               Visa Status: {user?.profile?.visaStatus || "Not specified"}
// //             </span>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <Briefcase className="text-blue-700 shrink-0" />
// //             <span className="text-black">
// //               Job Title: {user?.profile?.jobTitle || "Not specified"}
// //             </span>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <Briefcase className="text-blue-700 shrink-0" />
// //             <span className="text-black">
// //               Job Domain: {user?.profile?.jobDomain || "Not specified"}
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderSkills = () => (
// //     <div className="mt-8 border-t border-gray-200 pt-6">
// //       <h2 className="text-lg font-semibold text-black mb-4">Skills</h2>
// //       <div className="flex flex-wrap gap-3">
// //         {user?.profile?.skills?.length > 0 ? (
// //           user?.profile?.skills?.map((item, index) => (
// //             <Badge
// //               key={index}
// //               className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors rounded-full px-3 py-1"
// //             >
// //               {item}
// //             </Badge>
// //           ))
// //         ) : (
// //           <span className="text-gray-500">No skills added</span>
// //         )}
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
// //       <Navbar />
// //       <div className="container mx-auto px-6 py-10">
// //         <div className="max-w-4xl mx-auto space-y-10">
// //           {/* Profile Card */}
// //           <div className="bg-white shadow-lg rounded-3xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl">
// //             <div className="flex flex-col md:flex-row items-center gap-8">
// //               <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2 rounded-full">
// //                 <Avatar className="h-28 w-28 border-4 border-white">
// //                   <AvatarImage
// //                     src={user?.profile?.profilePhoto}
// //                     alt="Profile Picture"
// //                   />
// //                   <AvatarFallback className="bg-blue-200 text-blue-700 font-bold">
// //                     {user?.fullname?.charAt(0) || "NB"}
// //                   </AvatarFallback>
// //                 </Avatar>
// //               </div>
// //               <div className="flex-1 text-center md:text-left">
// //                 <div className="flex justify-between items-center">
// //                   <h1 className="text-3xl font-bold text-black">
// //                     {user?.fullname}
// //                   </h1>
// //                   <Button
// //                     onClick={() => setOpen(true)}
// //                     variant="outline"
// //                     className="hidden md:flex text-sm"
// //                   >
// //                     <Pen className="text-gray-600 hover:text-blue-600 " />
// //                   </Button>
// //                 </div>
// //                 <p className="text-gray-600 mt-3 leading-relaxed">
// //                   {user?.profile?.bio || "No bio available"}
// //                 </p>
// //               </div>
// //             </div>
// //             {/* Contact Information */}
// //             <div className="mt-8 grid md:grid-cols-2 gap-6 border-t pt-6 border-gray-200">
// //               <div className="flex items-center gap-4">
// //                 <Mail className="text-blue-700 shrink-0" />
// //                 <span className="text-black truncate">{user?.email}</span>
// //               </div>
// //               <div className="flex items-center gap-4">
// //                 <Contact className="text-blue-700 shrink-0" />
// //                 <span className="text-black">{user?.phoneNumber}</span>
// //               </div>
// //             </div>
// //             {/* Student Details Section */}
// //             {renderStudentDetails()}
// //             {/* Skills Section */}
// //             {renderSkills()}
// //             {/* Resume Section */}
// //             <div className="mt-8 border-t border-gray-200 pt-6">
// //               <Label className="text-md font-bold text-black">Resume</Label>
// //               {user?.profile?.resume ? (
// //                 <a
// //                   href={user?.profile?.resume}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="block mt-2 text-blue-700 hover:text-blue-800 hover:underline transition-colors"
// //                 >
// //                   {user?.profile?.resumeOriginalName || "View Resume"}
// //                 </a>
// //               ) : (
// //                 <span className="text-gray-500">No resume uploaded</span>
// //               )}
// //             </div>
// //           </div>
// //           <ProfileCompletionTracker user={user} />


// //           {/* Applied Jobs Section */}
// //           <div className="bg-white shadow-md rounded-3xl p-8">
// //             <h1 className="text-xl font-bold text-black mb-6">Jobs Section</h1>
// //             {/* <AppliedJobTable /> */}
// //             <JobsSection />
// //           </div>
// //         </div>
// //         <UpdateProfileDialog open={open} setOpen={setOpen} />
// //       </div>
// //     </div>
// //   );
// // }

// // export default Profile;
// import {
//   Contact,
//   Mail,
//   Pen,
//   MapPin,
//   Globe,
//   Briefcase,
//   CalendarDaysIcon,
//   GraduationCap,
//   LinkIcon,
//   Github,
//   Linkedin,
//   Twitter,
//   ExternalLink,
//   Download,
//   Check,
//   Settings,
//   ChevronRight
// } from "lucide-react";
// import Navbar from "./shared/Navbar";
// import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { Label } from "./ui/label";
// import AppliedJobTable from "./AppliedJobTable";
// import { useState } from "react";
// import UpdateProfileDialog from "./UpdateProfileDialog";
// import { useSelector } from "react-redux";
// import store from "../redux/store";
// import UseGetAppliedJobs from "@/hooks/useGetAppliedJobs";
// import JobsSection from './JobsSection';
// import ProfileCompletionTracker from "./ProfileCompletionTracker";

// function Profile() {
//   UseGetAppliedJobs();
//   const { user } = useSelector((store) => store.auth);
//   const [open, setOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("profile");

//   // Mock data for the UI presentation - remove in production
//   const socialLinks = [
//     { name: "LinkedIn", icon: Linkedin, url: user?.profile?.linkedin || "#" },
//     { name: "GitHub", icon: Github, url: user?.profile?.github || "#" },
//     { name: "Portfolio", icon: ExternalLink, url: user?.profile?.portfolio || "#" }
//   ];

//   const renderStudentDetails = () => {
//     if (user?.role !== "student") return null;

//     return (
//       <div className="mt-8 border-t border-gray-200 pt-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-bold text-gray-900">Professional Details</h2>
//           <Button variant="ghost" size="sm" className="text-blue-600 font-medium" onClick={() => setOpen(true)}>
//             <Settings className="w-4 h-4 mr-1" /> Edit
//           </Button>
//         </div>
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
//             <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
//               <MapPin className="w-5 h-5" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Current Location</p>
//               <p className="text-gray-900 font-semibold">
//                 {user?.profile?.currentLocation || "Not specified"}
//               </p>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
//             <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
//               <Globe className="w-5 h-5" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Relocation</p>
//               <p className="text-gray-900 font-semibold flex items-center">
//                 {user?.profile?.willingToRelocate ?
//                   <><Check className="w-4 h-4 text-green-500 mr-1" /> Open to relocate</> :
//                   "Not open to relocation"}
//               </p>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
//             <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
//               <CalendarDaysIcon className="w-5 h-5" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Visa Status</p>
//               <p className="text-gray-900 font-semibold">
//                 {user?.profile?.visaStatus || "Not specified"}
//               </p>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
//             <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
//               <Briefcase className="w-5 h-5" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Career Focus</p>
//               <p className="text-gray-900 font-semibold">
//                 {user?.profile?.jobTitle || "Not specified"}
//               </p>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100 md:col-span-2">
//             <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
//               <GraduationCap className="w-5 h-5" />
//             </div>
//             <div className="flex-1">
//               <p className="text-sm text-gray-500 font-medium">Industry / Domain</p>
//               <p className="text-gray-900 font-semibold">
//                 {user?.profile?.jobDomain || "Not specified"}
//               </p>
//             </div>
//             <Badge className="bg-indigo-100 text-indigo-700 rounded-full">
//               {user?.profile?.yearsOfExperience || "0"} Years
//             </Badge>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderSkills = () => (
//     <div className="mt-8 border-t border-gray-200 pt-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-bold text-gray-900">Skills & Expertise</h2>
//         <Button variant="ghost" size="sm" className="text-blue-600 font-medium" onClick={() => setOpen(true)}>
//           <Pen className="w-4 h-4 mr-1" /> Manage
//         </Button>
//       </div>
//       <div className="flex flex-wrap gap-3">
//         {user?.profile?.skills?.length > 0 ? (
//           user?.profile?.skills?.map((item, index) => (
//             <Badge
//               key={index}
//               className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 transition-all border border-blue-100 rounded-full px-4 py-1.5 font-medium"
//             >
//               {item}
//             </Badge>
//           ))
//         ) : (
//           <div className="w-full bg-gray-50 rounded-lg p-4 text-center">
//             <p className="text-gray-500">No skills added yet</p>
//             <Button variant="outline" size="sm" className="mt-2" onClick={() => setOpen(true)}>
//               Add Skills
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
//       <Navbar />
//       <div className="container mx-auto px-6 py-10">
//         <div className="max-w-5xl mx-auto space-y-10">
//           {/* Profile Card */}
//           <div className="bg-white shadow-xl rounded-3xl border border-gray-100 overflow-hidden">
//             {/* Profile Header/Cover */}
//             <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
//               <Button
//                 onClick={() => setOpen(true)}
//                 variant="ghost"
//                 className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
//               >
//                 <Pen className="w-5 h-5 mr-1" /> Edit Profile
//               </Button>
//             </div>

//             {/* Profile Content */}
//             <div className="px-8 pt-0 pb-8 -mt-20 relative">
//               {/* Avatar */}
//               <div className="flex flex-col md:flex-row md:items-end">
//                 <div className="relative">
//                   <div className="ring-4 ring-white rounded-full">
//                     <Avatar className="h-36 w-36 border-4 border-white shadow-lg">
//                       <AvatarImage
//                         src={user?.profile?.profilePhoto}
//                         alt="Profile Picture"
//                         className="object-cover"
//                       />
//                       <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-600 text-white text-3xl font-bold">
//                         {user?.fullname?.charAt(0) || "U"}
//                       </AvatarFallback>
//                     </Avatar>
//                   </div>
//                   <button
//                     className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-full shadow-md"
//                     onClick={() => setOpen(true)}
//                   >
//                     <Pen className="w-4 h-4" />
//                   </button>
//                 </div>

//                 <div className="flex-1 md:ml-6 mt-4 md:mt-0">
//                   <div className="flex flex-col md:flex-row md:justify-between md:items-end">
//                     <div>
//                       <h1 className="text-3xl font-bold text-gray-900">
//                         {user?.fullname || "Your Name"}
//                       </h1>
//                       <p className="text-blue-600 font-medium text-lg">
//                         {user?.profile?.jobTitle || "Job Title"}
//                       </p>
//                     </div>

//                     <div className="flex space-x-3 mt-4 md:mt-0">
//                       {socialLinks.map((link, index) => (
//                         <a
//                           key={index}
//                           href={link.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={`p-2 rounded-full ${link.url === "#" ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
//                         >
//                           <link.icon className="w-5 h-5" />
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Bio */}
//               <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-gray-100">
//                 <p className="text-gray-700 leading-relaxed">
//                   {user?.profile?.bio || "No bio available. Add a professional summary to tell employers about your experience and career goals."}
//                 </p>
//               </div>

//               {/* Contact Information */}
//               <div className="mt-8 grid md:grid-cols-2 gap-6">
//                 <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
//                   <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
//                     <Mail className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 font-medium">Email</p>
//                     <p className="text-gray-900 font-semibold truncate max-w-xs">
//                       {user?.email || "email@example.com"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
//                   <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
//                     <Contact className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 font-medium">Phone</p>
//                     <p className="text-gray-900 font-semibold">
//                       {user?.phoneNumber || "Not specified"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Student Details Section */}
//               {renderStudentDetails()}

//               {/* Skills Section */}
//               {renderSkills()}

//               {/* Resume Section */}
//               <div className="mt-8 border-t border-gray-200 pt-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-bold text-gray-900">Resume</h2>
//                 </div>

//                 {user?.profile?.resume ? (
//                   <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
//                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
//                       <Download className="w-5 h-5" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-500 font-medium">Resume File</p>
//                       <p className="text-gray-900 font-semibold">
//                         {user?.profile?.resumeOriginalName || "resume.pdf"}
//                       </p>
//                     </div>
//                     <a
//                       href={user?.profile?.resume}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium text-sm flex items-center"
//                     >
//                       View <ExternalLink className="w-4 h-4 ml-1" />
//                     </a>
//                   </div>
//                 ) : (
//                   <div className="w-full bg-gray-50 rounded-lg p-6 text-center">
//                     <p className="text-gray-500 mb-2">No resume uploaded yet</p>
//                     <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
//                       Upload Resume
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <ProfileCompletionTracker user={user} />

//           {/* Applied Jobs Section */}
//           <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
//             <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
//               <h1 className="text-xl font-bold text-gray-900">Career Dashboard</h1>

//               <div className="flex space-x-2">
//                 <Button
//                   variant={activeTab === "profile" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setActiveTab("profile")}
//                   className={activeTab === "profile" ? "bg-blue-600 text-white" : "text-gray-600"}
//                 >
//                   Applications
//                 </Button>
//                 <Button
//                   variant={activeTab === "saved" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setActiveTab("saved")}
//                   className={activeTab === "saved" ? "bg-blue-600 text-white" : "text-gray-600"}
//                 >
//                   Saved Jobs
//                 </Button>
//               </div>
//             </div>
//             <div className="p-8">
//               <JobsSection activeTab={activeTab} />
//             </div>
//           </div>
//         </div>
//         <UpdateProfileDialog open={open} setOpen={setOpen} />
//       </div>
//     </div>
//   );
// }

// export default Profile;
import {
  Contact,
  Mail,
  Pen,
  MapPin,
  Globe,
  Briefcase,
  CalendarDaysIcon,
  GraduationCap,
  LinkIcon,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Download,
  Check,
  Settings,
  ChevronRight
} from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import store from "../redux/store";
import UseGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import JobsSection from './JobsSection';
import ProfileCompletionTracker from "./ProfileCompletionTracker";

function Profile() {
  UseGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock data for the UI presentation - remove in production
  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, url: user?.profile?.linkedin || "#" },
    { name: "GitHub", icon: Github, url: user?.profile?.github || "#" },
    { name: "Portfolio", icon: ExternalLink, url: user?.profile?.portfolio || "#" }
  ];

  const renderStudentDetails = () => {
    if (user?.role !== "student") return null;

    return (
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Professional Details</h2>
          <Button variant="ghost" size="sm" className="text-blue-600 font-medium" onClick={() => setOpen(true)}>
            <Settings className="w-4 h-4 mr-1" /> Edit
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Current Location</p>
              <p className="text-gray-900 font-semibold">
                {user?.profile?.currentLocation || "Not specified"}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Relocation</p>
              <p className="text-gray-900 font-semibold flex items-center">
                {user?.profile?.willingToRelocate ?
                  <><Check className="w-4 h-4 text-green-500 mr-1" /> Open to relocate</> :
                  "Not open to relocation"}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <CalendarDaysIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Visa Status</p>
              <p className="text-gray-900 font-semibold">
                {user?.profile?.visaStatus || "Not specified"}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Career Focus</p>
              <p className="text-gray-900 font-semibold">
                {user?.profile?.jobTitle || "Not specified"}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100 md:col-span-2">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Industry / Domain</p>
              <p className="text-gray-900 font-semibold">
                {user?.profile?.jobDomain || "Not specified"}
              </p>
            </div>
            {/* <Badge className="bg-indigo-100 text-indigo-700 rounded-full">
              {user?.profile?.yearsOfExperience || "0"} Years
            </Badge> */}
          </div>
        </div>
      </div>
    );
  };

  const renderSkills = () => (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Skills & Expertise</h2>
        <Button variant="ghost" size="sm" className="text-blue-600 font-medium" onClick={() => setOpen(true)}>
          <Pen className="w-4 h-4 mr-1" /> Manage
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        {user?.profile?.skills?.length > 0 ? (
          user?.profile?.skills?.map((item, index) => (
            <Badge
              key={index}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 transition-all border border-blue-100 rounded-full px-4 py-1.5 font-medium"
            >
              {item}
            </Badge>
          ))
        ) : (
          <div className="w-full bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-500">No skills added yet</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => setOpen(true)}>
              Add Skills
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Profile Card */}
          <div className="bg-white shadow-xl rounded-3xl border border-gray-100 overflow-hidden">
            {/* Modern Pattern Header Instead of Banner */}
            <div className="relative">
              {/* SVG Pattern Background */}
              <div className="h-32 overflow-hidden relative bg-blue-600">
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1440 320">
                  <path fill="rgba(37, 99, 235, 0.8)" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                  <path fill="rgba(79, 70, 229, 0.6)" fillOpacity="1" d="M0,192L48,186.7C96,181,192,171,288,154.7C384,139,480,117,576,128C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-4 left-6 bg-white/10 rounded-full h-16 w-16"></div>
                  <div className="absolute top-10 right-24 bg-white/10 rounded-full h-8 w-8"></div>
                  <div className="absolute bottom-6 left-1/4 bg-white/10 rounded-full h-12 w-12"></div>
                </div>
              </div>

              <Button
                onClick={() => setOpen(true)}
                variant="ghost"
                className="absolute top-4 right-4 bg-white/20 text-white hover:bg-white/30 z-10"
              >
                <Pen className="w-5 h-5 mr-1" /> Edit Profile
              </Button>
            </div>

            {/* Profile Content */}
            <div className="px-8 pt-0 pb-8 -mt-16 relative">
              {/* Avatar */}
              <div className="flex flex-col md:flex-row md:items-end">
                <div className="relative">
                  <div className="ring-4 ring-white rounded-full shadow-lg">
                    <Avatar className="h-32 w-32 border-4 border-white">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="Profile Picture"
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-600 text-white text-3xl font-bold">
                        {user?.fullname?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <button
                    className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-full shadow-md"
                    onClick={() => setOpen(true)}
                  >
                    <Pen className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 md:ml-6 mt-4 md:mt-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-end">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {user?.fullname || "Your Name"}
                      </h1>
                      <p className="text-blue-600 font-medium text-lg">
                        {user?.profile?.jobTitle || "Job Title"}
                      </p>
                    </div>
{/*
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      {socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full ${link.url === "#" ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
                        >
                          <link.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-gray-700 leading-relaxed">
                  {user?.profile?.bio || "No bio available. Add a professional summary to tell employers about your experience and career goals."}
                </p>
              </div>

              {/* Contact Information */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-gray-900 font-semibold truncate max-w-xs">
                      {user?.email || "email@example.com"}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Contact className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                    <p className="text-gray-900 font-semibold">
                      {user?.phoneNumber || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Details Section */}
              {renderStudentDetails()}

              {/* Skills Section */}
              {renderSkills()}

              {/* Resume Section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Resume</h2>
                </div>

                {user?.profile?.resume ? (
                  <div className="bg-white p-4 rounded-xl hover:shadow-md transition-all duration-300 flex items-center gap-4 border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Download className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Resume File</p>
                      <p className="text-gray-900 font-semibold">
                        {user?.profile?.resumeOriginalName || "resume.pdf"}
                      </p>
                    </div>
                    <a
                      href={user?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium text-sm flex items-center"
                    >
                      View <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                ) : (
                  <div className="w-full bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-500 mb-2">No resume uploaded yet</p>
                    <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                      Upload Resume
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <ProfileCompletionTracker user={user} />

          {/* Applied Jobs Section */}
          <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">Career Dashboard</h1>

              <div className="flex space-x-2">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("profile")}
                  className={activeTab === "profile" ? "bg-blue-600 text-white" : "text-gray-600"}
                >
                  Applications
                </Button>
                <Button
                  variant={activeTab === "saved" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("saved")}
                  className={activeTab === "saved" ? "bg-blue-600 text-white" : "text-gray-600"}
                >
                  Saved Jobs
                </Button>
              </div>
            </div>
            <div className="p-8">
              <JobsSection activeTab={activeTab} />
            </div>
          </div>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Profile;