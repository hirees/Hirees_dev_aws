import {
  Contact,
  Mail,
  Pen,
  MapPin,
  Globe,
  Briefcase,
  Download,
  ExternalLink,
  User,
  FileText,
  Code,
  BriefcaseIcon,
  Image,
  Layout,
  Book,
  Award,
  ArrowRight,
  Phone
} from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import UseGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import JobsSection from './JobsSection';
import Footer from "./Footer";

function Profile() {
  UseGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  const calculateProfileCompletion = () => {
    const fields = [
      { name: 'Profile Photo', value: user?.profile?.profilePhoto, icon: Image },
      { name: 'Full Name', value: user?.fullname, icon: User },
      { name: 'Bio', value: user?.profile?.bio, icon: Layout },
      { name: 'Email', value: user?.email, icon: Mail },
      { name: 'Phone', value: user?.phoneNumber, icon: Phone },
      { name: 'Current Location', value: user?.profile?.currentLocation, icon: MapPin },
      { name: 'Job Title', value: user?.profile?.jobTitle, icon: Briefcase },
      { name: 'Job Domain', value: user?.profile?.jobDomain, icon: Globe },
      { name: 'Visa Status', value: user?.profile?.visaStatus, icon: Book },
      { name: 'Skills', value: user?.profile?.skills?.length > 0, icon: Award },
      { name: 'Resume', value: user?.profile?.resume, icon: FileText }
    ];
    const completedFields = fields.filter(field => Boolean(field.value));
    const remainingFields = fields.filter(field => !field.value);
    return {
      percentage: Math.round((completedFields.length / fields.length) * 100),
      remaining: remainingFields
    };
  };

  const { percentage, remaining } = calculateProfileCompletion();

  const navigationItems = [
    { id: "about", label: "About", icon: User },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "skills", label: "Skills & Expertise", icon: Code },
    { id: "applications", label: "Job Applications", icon: BriefcaseIcon },
  
  ];

  return (
    <div className="bg-gradient-to-br  min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-10 mt-24 max-w-6xl">
        {/* Top Profile Section */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Box - Profile Information */}
            <div className={`bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 ${percentage === 100 ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Left Side - Profile Image with Completion Ring */}
                <div className="relative mt-4 flex justify-center">
                  <div className="relative w-32 h-32">
                    {/* Progress Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      {/* Background Circle */}
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="#E5E7EB"
                        strokeWidth="4"
                        fill="none"
                      />
                      {/* Progress Circle */}
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="#22C55E"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${(percentage / 100) * 376.8} 376.8`}
                        className="transition-all duration-1000 ease-in-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="Profile Picture"
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white text-3xl font-bold">
                          {user?.fullname?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                 
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 text-center">
                    <div className="text-lg font-bold text-green-400">
                      {percentage}%
                    </div>
                  </div>
                </div>

                {/* Right Side - Name, Role, and Details */}
                <div className="flex-1 space-y-6 ">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-[#444444]">
                        {user?.fullname || "Your Name"}
                      </h1>
                      <p className="text-xl text-[#949494] font-medium mt-1">
                        {user?.profile?.jobTitle || "Job Title"}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-[#012760] hover:text-[#012760] hover:bg-[#012760]/10 mb-3 font-bold"
                      onClick={() => setOpen(true)}
                    >
                      <Pen className="w-4 h-4 " /> Edit Profile
                    </Button>
                  </div>

                  <div className="flex gap-8">
                    {/* Left Column */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#6E6E6E]" />
                        <p className="text-[#949494] font-medium">{user?.email || "Not specified"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Contact className="w-5 h-5 text-[#6E6E6E]" />
                        <p className="text-[#949494] font-medium">{user?.phoneNumber || "Not specified"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Book className="w-5 h-5 text-[#6E6E6E]" />
                        <p className="text-[#949494] font-medium">{user?.profile?.visaStatus || "Not specified"}</p>
                      </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-px bg-gray-200"></div>

                    {/* Right Column */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#6E6E6E]" />
                        <p className="text-[#949494] font-medium">{user?.profile?.currentLocation || "Not specified"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-[#6E6E6E]" />
                        <p className="text-[#949494] font-medium">{user?.profile?.jobDomain || "Not specified"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-[#6E6E6E]" />
                        <p className="text-[#949494] font-medium flex items-center">
                          {user?.profile?.willingToRelocate ? (
                            <> Open to relocate</>
                          ) : (
                            "Not open to relocation"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box - Profile Completion (only show if not 100%) */}
            {percentage < 100 && (
              <div className="rounded-2xl shadow-lg border-2 border-gray-200 p-6 bg-[#8ab8fd37] ">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Complete Your Profile</h2>

                </div>
                <div className="space-y-3">
                  {remaining.map((field, index) => {
                    const Icon = field.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#012760] transition-all duration-200"
                      >
                        <div className="p-2 rounded-full bg-[#012760]/10 text-[#012760]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-700">{field.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-[#012760] hover:text-[#012760] font-medium text-xs flex items-center gap-1"
                          onClick={() => setOpen(true)}
                        >
                          Add <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Vertical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden sticky top-24">
              <nav className="p-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      const element = document.getElementById(item.id);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* About Section */}
            <div id="about" className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">About</h2>
                <Button variant="ghost" size="sm" className="text-[#012760]" onClick={() => setOpen(true)}>
                  <Pen className="w-4 h-4 mr-1" /> Edit
                </Button>
              </div>
              <div className="space-y-6">
                {/* Bio Section */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Bio</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {user?.profile?.bio || "No bio added yet. Add a bio to tell others about yourself."}
                  </p>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#012760]" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">{user?.email || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Contact className="w-5 h-5 text-[#012760]" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 font-medium">{user?.phoneNumber || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#012760]" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900 font-medium">{user?.profile?.currentLocation || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-[#012760]" />
                    <div>
                      <p className="text-sm text-gray-500">Field</p>
                      <p className="text-gray-900 font-medium">{user?.profile?.jobDomain || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#012760]" />
                    <div>
                      <p className="text-sm text-gray-500">Relocation</p>
                      <p className="text-gray-900 font-medium flex items-center">
                        {user?.profile?.willingToRelocate ? (
                          <> Open to relocate</>
                        ) : (
                          "Not open to relocation"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Section */}
            <div id="resume" className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Resume</h2>
                <Button variant="ghost" size="sm" className="text-[#012760]" onClick={() => setOpen(true)}>
                  <Pen className="w-4 h-4 mr-1" /> Edit
                </Button>
              </div>
              {user?.profile?.resume ? (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Download className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Resume File</p>
                    <p className="text-gray-900 font-medium">
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
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No resume uploaded yet</p>
                  <Button variant="outline" onClick={() => setOpen(true)}>
                    Upload Resume
                  </Button>
                </div>
              )}
            </div>

            {/* Skills Section */}
            <div id="skills" className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Skills & Expertise</h2>
                <Button variant="ghost" size="sm" className="text-[#012760]" onClick={() => setOpen(true)}>
                  <Pen className="w-4 h-4 mr-1" /> Edit
                </Button>
              </div>
              {user?.profile?.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {user.profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No skills added yet</p>
                  <Button variant="outline" onClick={() => setOpen(true)}>
                    Add Skills
                  </Button>
                </div>
              )}
            </div>

            {/* Applications Section */}
            <div id="applications" className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
              </div>
              <JobsSection activeTab="applications" />
            </div>
          </div>
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer/>
    </div>
  );
}

export default Profile;