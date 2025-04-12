// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Building2, CheckCircle2, User } from "lucide-react";
// import { Link } from "react-router-dom";
// import Navbar from "../shared/Navbar";
// import Footer from "../Footer";

// const RegisterLanding = () => {
//   return (
//     <>
//     <Navbar></Navbar>
//     <div className="flex flex-col items-center min-h-screen bg-gray-50 py-7 px-4">
//       <div className="max-w-4xl w-full mt-32">
//         <div className="text-center mb-8">
//           <h1 className="text-6xl font-bold text-blue-00">Join Hirees Today</h1>
//           <p className="text-gray-600 mt-2">Select your account type to get started</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Card for Job Seekers */}
//           <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-0">
//             <CardHeader className="text-center pb-2">
//               <div className="mx-auto bg-blue-100 p-4 rounded-full mb-4">
//                 <User size={28} className="text-blue-600" />
//               </div>
//               <CardTitle className="text-xl">Professionals</CardTitle>
//             </CardHeader>
//             <CardContent className="text-center text-gray-600">
//               <p>Looking for your next opportunity? Create a profile to showcase your skills and get hired.</p>
//               <div className="mt-4 space-y-2">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 size={16} className="text-blue-600" />
//                   <span className="text-sm">Build a professional profile</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 size={16} className="text-blue-600" />
//                   <span className="text-sm">Apply to jobs with one click</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 size={16} className="text-blue-600" />
//                   <span className="text-sm">Get discovered by employers</span>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Link to="/signup/candidate" className="w-full">
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5">
//                   Register as Professional
//                 </Button>
//               </Link>
//             </CardFooter>
//           </Card>

//           {/* Card for Employers */}
//           <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-0">
//             <CardHeader className="text-center pb-2">
//               <div className="mx-auto bg-blue-100 p-4 rounded-full mb-4">
//                 <Building2 size={28} className="text-blue-600" />
//               </div>
//               <CardTitle className="text-xl">Employers</CardTitle>
//             </CardHeader>
//             <CardContent className="text-center text-gray-600">
//               <p>Looking to hire top talent? Create a company account to post jobs and find qualified candidates.</p>
//               <div className="mt-4 space-y-2">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 size={16} className="text-blue-600" />
//                   <span className="text-sm">Post unlimited job listings</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 size={16} className="text-blue-600" />
//                   <span className="text-sm">Access to candidate database</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 size={16} className="text-blue-600" />
//                   <span className="text-sm">Track applicants efficiently</span>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Link to="/signup/recruiter" className="w-full">
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5">
//                   Register as Employer
//                 </Button>
//               </Link>
//             </CardFooter>
//           </Card>
//         </div>

//         <div className="text-center mt-8">
//           <p className="text-gray-600">
//             Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Login here</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//     <Footer></Footer>
//     </>
//   );
// };

// export default RegisterLanding;
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Building2, User, CheckCircle2, ArrowRight, Sparkles, Users, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";

const RegisterLanding = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-16 px-4">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-600 opacity-5 rounded-bl-full transform -skew-y-6"></div>
      <div className="absolute top-40 right-0 w-64 h-64 bg-blue-400 opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header section */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-blue-600 rounded-full opacity-50"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join the Hirees Community</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with opportunities that match your skills and ambitions, or find the perfect talent for your company
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Sparkles className="text-blue-600 h-5 w-5" />
            <span className="text-blue-600 font-medium">Over 10,000+ professionals and companies already registered</span>
          </div>
        </div>

        {/* Card section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Professional Card */}
          <div
            className={`relative overflow-hidden transition-all duration-300 ${hoveredCard === 'professional' ? 'transform -translate-y-2' : ''}`}
            onMouseEnter={() => setHoveredCard('professional')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Card className="border-0 shadow-lg rounded-xl h-full z-10 relative bg-white">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-lg bg-blue-50">
                    <User size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">For Professionals</h2>
                    <p className="text-gray-500">Find your dream job opportunity</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-700">Join thousands of professionals who found their ideal position through our platform.</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                    <CheckCircle2 size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Professional Profile</h3>
                      <p className="text-sm text-gray-600">Create a comprehensive profile to showcase your skills and experience</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                    <Users size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Get Discovered</h3>
                      <p className="text-sm text-gray-600">Recruiters actively search for candidates with your qualifications</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                    <Briefcase size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">One-Click Apply</h3>
                      <p className="text-sm text-gray-600">Apply to multiple positions with a single click</p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Link to="/signup/candidate" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-lg group">
                    <span>Register as Professional</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            {/* Background effect element */}
            <div className={`absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600 opacity-5 rounded-full transition-all duration-300 ${hoveredCard === 'professional' ? 'scale-110' : ''}`}></div>
          </div>

          {/* Employer Card */}
          <div
            className={`relative overflow-hidden transition-all duration-300 ${hoveredCard === 'employer' ? 'transform -translate-y-2' : ''}`}
            onMouseEnter={() => setHoveredCard('employer')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Card className="border-0 shadow-lg rounded-xl h-full z-10 relative bg-white">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-800"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-lg bg-blue-50">
                    <Building2 size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">For Employers</h2>
                    <p className="text-gray-500">Find the perfect talent for your team</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-700">Connect with skilled professionals and streamline your recruitment process.</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                    <CheckCircle2 size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Company Profile</h3>
                      <p className="text-sm text-gray-600">Showcase your company culture and attract top talent</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                    <Briefcase size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Post Job Listings</h3>
                      <p className="text-sm text-gray-600">Create detailed job listings to find your ideal candidates</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                    <Users size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Candidate Management</h3>
                      <p className="text-sm text-gray-600">Efficiently track and manage applicants through your pipeline</p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Link to="/signup/recruiter" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-lg group">
                    <span>Register as Employer</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            {/* Background effect element */}
            <div className={`absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600 opacity-5 rounded-full transition-all duration-300 ${hoveredCard === 'employer' ? 'scale-110' : ''}`}></div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center justify-between border-t-4 border-blue-600">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Already have an account?</h2>
            <p className="text-gray-600">Sign in to access your dashboard and continue your journey</p>
          </div>
          <Link to="/login">
            <Button className="mt-4 md:mt-0 bg-blue-100 text-blue-600 hover:bg-blue-200 px-6 py-3 rounded-lg font-medium">
              Login to Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default RegisterLanding;