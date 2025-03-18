// // // import React from "react";
// // // import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// // // import { Button } from "../ui/button";
// // // import { Avatar, AvatarImage } from "../ui/avatar";
// // // import { LogOut, User, User2 } from "lucide-react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import axios from "axios";
// // // import { USER_API_END_POINT } from "@/utils/constant";
// // // import { setUser } from "@/redux/authSlice";
// // // import { toast } from "sonner";
// // // import logo from "../../assets/logo.png";
// // // import { useLocation } from "react-router-dom";

// // // const Navbar = () => {
// // //   const { user } = useSelector((store) => store.auth);
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const isActive = (path) => location.pathname === path;

// // //   const logoutHandler = async () => {
// // //     try {
// // //       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
// // //         withCredentials: true,
// // //       });
// // //       if (res.data.status) {
// // //         dispatch(setUser(null));
// // //         navigate("/");
// // //         toast.success(res.data.message);
// // //       }
// // //     } catch (error) {
// // //       console.log(error);
// // //       toast.error(error.response.data.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="bg-white shadow-sm">
// // //       <div className="flex items-center justify-between mx-auto h-16 px-4 max-w-7xl ">
// // //         <div className="flex items-center group relative">
// // //           <img
// // //             onClick={() => navigate("/")}
// // //             src={logo}
// // //             alt="Hirees Logo"
// // //             className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-md cursor-pointer transition-all duration-300"
// // //           />
// // //           <span className="absolute left-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 text-gray-800 font-semibold text-xl transition-all duration-300">
// // //             Hirees
// // //           </span>
// // //         </div>

// // //         {/* Navigation Links */}
// // //         <div className="hidden md:flex items-center gap-8">
// // //           <ul className="flex font-medium items-center gap-5">
// // //             {user && user.role === "recruiter" ? (
// // //               <>
// // //                 <li>
// // //                   <Link
// // //                     to="/admin/companies"
// // //                     className={`hover:text-[#6A38C2] ${
// // //                       isActive("/admin/companies")
// // //                         ? "text-[#6A38C2] font-semibold"
// // //                         : ""
// // //                     }`}
// // //                   >
// // //                     Company
// // //                   </Link>
// // //                 </li>
// // //                 <li>
// // //                   <Link
// // //                     to="/admin/jobs"
// // //                     className={`hover:text-[#6A38C2] ${
// // //                       isActive("/admin/jobs")
// // //                         ? "text-[#6A38C2] font-semibold"
// // //                         : ""
// // //                     }`}
// // //                   >
// // //                     Jobs
// // //                   </Link>
// // //                 </li>
// // //                 <li>
// // //                   <Link
// // //                     to="/admin/candidates"
// // //                     className={`hover:text-[#6A38C2] ${
// // //                       isActive("/admin/candidates")
// // //                         ? "text-[#6A38C2] font-semibold"
// // //                         : ""
// // //                     }`}
// // //                   >
// // //                     Candidates
// // //                   </Link>
// // //                 </li>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <li className="hover:text-blue-700 cursor-pointer text-l">
// // //                   <Link to="/">Home</Link>
// // //                 </li>
// // //                 <li className="hover:text-blue-700 cursor-pointer text-l">
// // //                   <Link to="/jobs">Jobs</Link>
// // //                 </li>
// // //                 {/* <li className="hover:text-blue-700 cursor-pointer">
// // //                   <Link to="/browse">Browse</Link>
// // //                 </li> */}
// // //               </>
// // //             )}
// // //           </ul>

// // //           {/* Button Section */}
// // //           {!user ? (
// // //             <div className="flex items-center gap-3">
// // //               <Link to="/login">
// // //                 <Button className="bg-blue-700 text-white hover:bg-blue-900 text-lg py-3 px-6 rounded-xl">
// // //                   Login
// // //                 </Button>
// // //               </Link>
// // //               <Link to="/signup/recruiter">
// // //                 <Button
// // //                   className=" text-white font-bold text-lg py-3 px-6 rounded-xl"
// // //                   title="Post Job"
// // //                 >
// // //                   Employers
// // //                 </Button>
// // //               </Link>
// // //               <Link to="/signup/candidate">
// // //                 <Button
// // //                   className=" text-white font-bold text-lg py-3 px-6 rounded-xl"
// // //                   title="Create your Profile"
// // //                 >
// // //                   Professionals
// // //                 </Button>
// // //               </Link>
// // //             </div>
// // //           ) : (
// // //             <Popover>
// // //               <PopoverTrigger asChild>
// // //                 <Avatar className="cursor-pointer">
// // //                   <AvatarImage
// // //                     src={user?.profile?.profilePhoto}
// // //                     alt="User Avatar"
// // //                   />
// // //                 </Avatar>
// // //               </PopoverTrigger>
// // //               <PopoverContent className="w-80">
// // //                 <div>
// // //                   <div className="flex gap-2 space-y-2">
// // //                     <Avatar className="cursor-pointer">
// // //                       <AvatarImage
// // //                         src={user?.profile?.profilePhoto}
// // //                         alt="User Avatar"
// // //                       />
// // //                     </Avatar>
// // //                     <div>
// // //                       <h4 className="font-medium">{user?.fullname}</h4>
// // //                       <p className="text-sm text-muted-foreground">
// // //                         {user?.profile?.bio}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex flex-col my-2 text-gray-600">
// // //                     {user.role === "recruiter" ? (
// // //                       <>
// // //                         <Button
// // //                           onClick={logoutHandler}
// // //                           variant="ghost"
// // //                           className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
// // //                         >
// // //                           <LogOut size={16} />
// // //                           Logout
// // //                         </Button>
// // //                       </>
// // //                     ) : (
// // //                       <>
// // //                         <div className="flex flex-col gap-2 pt-2 border-t">
// // //                           <Link to="/profile">
// // //                             <Button
// // //                               variant="ghost"
// // //                               className="justify-start gap-2"
// // //                             >
// // //                               <User size={16} />
// // //                               View Profile
// // //                             </Button>
// // //                           </Link>

// // //                           <Button
// // //                             onClick={logoutHandler}
// // //                             variant="ghost"
// // //                             className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
// // //                           >
// // //                             <LogOut size={16} />
// // //                             Logout
// // //                           </Button>
// // //                         </div>
// // //                       </>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </PopoverContent>
// // //             </Popover>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Navbar;
// // import React from "react";
// // import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// // import { Button } from "../ui/button";
// // import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
// // import { LogOut, User, Building } from "lucide-react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import axios from "axios";

// // import { setUser } from "@/redux/authSlice";
// // import { toast } from "sonner";
// // import logo from "../../assets/logo.png";
// // import { useLocation } from "react-router-dom";
// // import { USER_API_END_POINT } from "@/utils/constant";

// // const Navbar = React.memo(() => {
// //   const { user } = useSelector((store) => store.auth);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const isActive = (path) => location.pathname === path;

// //   const logoutHandler = async () => {
// //     try {
// //       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
// //         withCredentials: true,
// //       });
// //       if (res.data.status) {
// //         dispatch(setUser(null));
// //         navigate("/");
// //         toast.success(res.data.message);
// //       }
// //     } catch (error) {

// //       toast.error(error.response.data.message);
// //     }
// //   };

// //   // Function to render avatar with fallback based on user role
// //   const renderAvatar = () => (
// //     <Avatar className="cursor-pointer">
// //       <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
// //       <AvatarFallback className="bg-gray-100">
// //         {user?.role === "recruiter" ? (
// //           <Building className="h-5 w-5 text-gray-600" />
// //         ) : (
// //           <User className="h-5 w-5 text-gray-600" />
// //         )}
// //       </AvatarFallback>
// //     </Avatar>
// //   );

// //   return (
// //     <div className="bg-white shadow-sm">
// //       <div className="flex items-center justify-between mx-auto h-16 px-4 max-w-7xl">
// //         <div className="flex items-center group relative">
// //           <img
// //             onClick={() => navigate("/")}
// //             src={logo}
// //             alt="Hirees Logo"
// //             className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-md cursor-pointer transition-all duration-300"
// //           />
// //           <span className="absolute left-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 text-gray-800 font-semibold text-xl transition-all duration-300">
// //             Hirees
// //           </span>
// //         </div>

// //         {/* Navigation Links */}
// //         <div className="hidden md:flex items-center gap-8 ">
// //           <ul className="flex font-bold items-center gap-5">
// //             {user && user.role === "recruiter" ? (
// //               <>
// //                 <li>
// //                   <Link
// //                     to="/admin/companies"
// //                     className={`hover:text-[#6A38C2] ${
// //                       isActive("/admin/companies")
// //                         ? "text-[#6A38C2] font-semibold"
// //                         : ""
// //                     }`}
// //                   >
// //                     Company
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link
// //                     to="/admin/jobs"
// //                     className={`hover:text-[#6A38C2] ${
// //                       isActive("/admin/jobs")
// //                         ? "text-[#6A38C2] font-semibold"
// //                         : ""
// //                     }`}
// //                   >
// //                     Jobs
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link
// //                     to="/admin/candidates"
// //                     className={`hover:text-[#6A38C2] ${
// //                       isActive("/admin/candidates")
// //                         ? "text-[#6A38C2] font-semibold"
// //                         : ""
// //                     }`}
// //                   >
// //                     Candidates
// //                   </Link>
// //                 </li>
// //               </>
// //             ) : (
// //               <>
// //                 <li className="hover:text-blue-700 cursor-pointer text-l">
// //                   <Link to="/">Home</Link>
// //                 </li>
// //                 <li className="hover:text-blue-700 cursor-pointer text-l">
// //                   <Link to="/jobs">Jobs</Link>
// //                 </li>
// //                 <li className="hover:text-blue-700 cursor-pointer text-l">
// //                   <Link to="/company">Companies</Link>
// //                 </li>
// //               </>
// //             )}
// //           </ul>

// //           {/* Button Section */}
// //           {!user ? (
// //             <div className="flex items-center gap-3">
// //               <Link to="/login">
// //                 <Button className="bg-blue-700 text-white hover:bg-blue-900 text-lg py-3 px-6 rounded-xl">
// //                   Login
// //                 </Button>
// //               </Link>
// //               <Link to="/signup/recruiter">
// //                 <Button
// //                   className="text-white font-bold text-lg py-3 px-6 rounded-xl"
// //                   title="Post Job"
// //                 >
// //                   Employers
// //                 </Button>
// //               </Link>
// //               <Link to="/signup/candidate">
// //                 <Button
// //                   className="text-white font-bold text-lg py-3 px-6 rounded-xl"
// //                   title="Create your Profile"
// //                 >
// //                   Professionals
// //                 </Button>
// //               </Link>
// //             </div>
// //           ) : (
// //             <Popover>
// //               <PopoverTrigger asChild>
// //                 {renderAvatar()}
// //               </PopoverTrigger>
// //               <PopoverContent className="w-80">
// //                 <div>
// //                   <div className="flex gap-2 space-y-2">
// //                     {renderAvatar()}
// //                     <div>
// //                       <h4 className="font-medium">{user?.fullname}</h4>
// //                       <p className="text-sm text-muted-foreground">
// //                         {user?.profile?.bio}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="flex flex-col my-2 text-gray-600">
// //                     {user.role === "recruiter" ? (
// //                       <>
// //                         <Button
// //                           onClick={logoutHandler}
// //                           variant="ghost"
// //                           className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
// //                         >
// //                           <LogOut size={16} />
// //                           Logout
// //                         </Button>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <div className="flex flex-col gap-2 pt-2 border-t">
// //                           <Link to="/profile">
// //                             <Button
// //                               variant="ghost"
// //                               className="justify-start gap-2"
// //                             >
// //                               <User size={16} />
// //                               View Profile
// //                             </Button>
// //                           </Link>

// //                           <Button
// //                             onClick={logoutHandler}
// //                             variant="ghost"
// //                             className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
// //                           >
// //                             <LogOut size={16} />
// //                             Logout
// //                           </Button>
// //                         </div>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>
// //               </PopoverContent>
// //             </Popover>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // });

// // export default Navbar;
// import React, { useState } from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Button } from "../ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
// import { LogOut, User, Building, Menu, Home, Briefcase, Building2, BriefcaseBusiness } from "lucide-react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setUser } from "@/redux/authSlice";
// import { toast } from "sonner";
// import { USER_API_END_POINT } from "@/utils/constant";
// import logo from "../../assets/logo.png";

// const Navbar = React.memo(() => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
//         withCredentials: true,
//       });
//       if (res.data.status) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const renderAvatar = () => (
//     <Avatar className="cursor-pointer">
//       <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
//       <AvatarFallback className="bg-gray-100">
//         {user?.role === "recruiter" ? (
//           <Building className="h-5 w-5 text-gray-600" />
//         ) : (
//           <User className="h-5 w-5 text-gray-600" />
//         )}
//       </AvatarFallback>
//     </Avatar>
//   );

//   const MobileMenu = () => (
//     <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white shadow-lg z-50`}>
//       <div className="px-4 py-3 space-y-3">
//         {user && user.role === "recruiter" ? (
//           <>
//            <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//               <Home size={18} />
//               <span>Home</span>
//             </Link>
//             <Link to="/admin/companies" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//               <Building2 size={18} />
//               <span className={isActive("/admin/companies") ? "text-[#6A38C2] font-semibold" : ""}>Company</span>
//             </Link>
//             <Link to="/admin/jobs" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//               <Briefcase size={18} />
//               <span className={isActive("/admin/jobs") ? "text-[#6A38C2] font-semibold" : ""}>Jobs</span>
//             </Link>
//             <Link to="/admin/candidates" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//               <User size={18} />
//               <span className={isActive("/admin/candidates") ? "text-[#6A38C2] font-semibold" : ""}>Candidates</span>
//             </Link>

//           </>
//         ) : (
//           <>
//             <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//               <Home size={18} />
//               <span>Home</span>
//             </Link>
//             <Link to="/jobs" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//               <Briefcase size={18} />
//               <span>Jobs</span>
//             </Link>
//             <Link to="/company" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//               <Building2 size={18} />
//               <span>Companies</span>
//             </Link>
//           </>
//         )}
//         {!user && (
//           <div className="space-y-2 pt-2 border-t">
//             <Link to="/login" className="block">
//               <Button className="w-full bg-blue-700 text-white hover:bg-blue-900">Login</Button>
//             </Link>
//             <Link to="/signup/recruiter" className="block">
//               <Button className="w-full">Employers</Button>
//             </Link>
//             <Link to="/signup/candidate" className="block">
//               <Button className="w-full">Professionals</Button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-white shadow-sm relative">
//       <div className="flex items-center justify-between mx-auto h-16 px-4 max-w-7xl">
//         <div className="flex items-center gap-4">
//           <div className="flex items-center group relative">
//             <img
//               onClick={() => navigate("/")}
//               src={logo}
//               alt="Hirees Logo"
//               className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-md cursor-pointer transition-all duration-300"
//             />
//             <span className="absolute left-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 text-gray-800 font-semibold text-xl transition-all duration-300">
//               Hirees
//             </span>
//           </div>
//         </div>

//         <div className="hidden md:flex items-center gap-8">
//           <ul className="flex font-bold items-center gap-5">
//             {user && user.role === "recruiter" ? (
//               <>
//                 <li>
//                   <Link
//                     to="/admin/companies"
//                     className={`flex items-center gap-2 hover:text-[#6A38C2] ${
//                       isActive("/admin/companies") ? "text-[#6A38C2] font-semibold" : ""
//                     }`}
//                   >
//                     <Building2 size={18} />
//                     Company
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/jobs"
//                     className={`flex items-center gap-2 hover:text-[#6A38C2] ${
//                       isActive("/admin/jobs") ? "text-[#6A38C2] font-semibold" : ""
//                     }`}
//                   >
//                     <BriefcaseBusiness size={18} />
//                     Jobs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/candidates"
//                     className={`flex items-center gap-2 hover:text-[#6A38C2] ${
//                       isActive("/admin/candidates") ? "text-[#6A38C2] font-semibold" : ""
//                     }`}
//                   >
//                     <User size={18} />
//                     Candidates
//                   </Link>

//                 </li>
//                 <li>
//                 <Link
//                     to="/jobs"
//                     className={`flex items-center gap-2 hover:text-[#6A38C2] ${
//                       isActive("/admin/candidates") ? "text-[#6A38C2] font-semibold" : ""
//                     }`}
//                   >
//                     <Briefcase size={18} />
//                     All Jobs
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/" className="flex items-center gap-2 hover:text-blue-700">
//                     <Home size={18} />
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/jobs" className="flex items-center gap-2 hover:text-blue-700">
//                     <Briefcase size={18} />
//                     Jobs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/company" className="flex items-center gap-2 hover:text-blue-700">
//                     <Building2 size={18} />
//                     Companies
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>

//           {!user ? (
//             <div className="flex items-center gap-3">
//               <Link to="/login">
//                 <Button className="bg-blue-700 text-white hover:bg-blue-900 text-lg py-3 px-6 rounded-xl">
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/signup/recruiter">
//                 <Button className="text-white font-bold text-lg py-3 px-6 rounded-xl">
//                   Employers
//                 </Button>
//               </Link>
//               <Link to="/signup/candidate">
//                 <Button className="text-white font-bold text-lg py-3 px-6 rounded-xl">
//                   Professionals
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>{renderAvatar()}</PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div>
//                   <div className="flex gap-2 space-y-2">
//                     {renderAvatar()}
//                     <div>
//                       <h4 className="font-medium">{user?.fullname}</h4>
//                       <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col my-2 text-gray-600">
//                     {user.role === "recruiter" ? (
//                       <Button
//                         onClick={logoutHandler}
//                         variant="ghost"
//                         className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
//                       >
//                         <LogOut size={16} />
//                         Logout
//                       </Button>
//                     ) : (
//                       <div className="flex flex-col gap-2 pt-2 border-t">
//                         <Link to="/profile">
//                           <Button variant="ghost" className="justify-start gap-2">
//                             <User size={16} />
//                             View Profile
//                           </Button>
//                         </Link>
//                         <Button
//                           onClick={logoutHandler}
//                           variant="ghost"
//                           className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <LogOut size={16} />
//                           Logout
//                         </Button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//         <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
//           <Menu className="h-6 w-6" />
//         </button>
//       </div>
//       <MobileMenu />
//     </div>
//   );
// });

// export default Navbar;
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  LogOut,
  User,
  Building,
  Menu,
  Home,
  Briefcase,
  Building2,
  BriefcaseBusiness,
  PieChart,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import logo from "../../assets/logo.png";

const Navbar = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.status) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const renderAvatar = () => (
    <Avatar className="cursor-pointer">
      <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
      <AvatarFallback className="bg-gray-100">
        {user?.role === "recruiter" ? (
          <Building className="h-5 w-5 text-gray-600" />
        ) : (
          <User className="h-5 w-5 text-gray-600" />
        )}
      </AvatarFallback>
    </Avatar>
  );

  const MobileMenu = () => (
    <div
      className={`md:hidden ${
        isOpen ? "block" : "hidden"
      } absolute top-16 left-0 right-0 bg-white shadow-lg z-50`}
    >
      <div className="px-4 py-3 space-y-3">
        {user && user.role === "recruiter" ? (
          <>
            <Link
              to="/"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <PieChart size={18} />
              <span
                className={
                  isActive("/admin/dashboard")
                    ? "text-[#6A38C2] font-semibold"
                    : ""
                }
              >
                Dashboard
              </span>
            </Link>
            <Link
              to="/admin/companies"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <Building2 size={18} />
              <span
                className={
                  isActive("/admin/companies")
                    ? "text-[#6A38C2] font-semibold"
                    : ""
                }
              >
                Company
              </span>
            </Link>
            <Link
              to="/admin/jobs"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <Briefcase size={18} />
              <span
                className={
                  isActive("/admin/jobs") ? "text-[#6A38C2] font-semibold" : ""
                }
              >
                Jobs
              </span>
            </Link>
            <Link
              to="/admin/candidates"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <User size={18} />
              <span
                className={
                  isActive("/admin/candidates")
                    ? "text-[#6A38C2] font-semibold"
                    : ""
                }
              >
                Candidates
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/jobs"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <Briefcase size={18} />
              <span>Jobs</span>
            </Link>
            <Link
              to="/company"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <Building2 size={18} />
              <span>Companies</span>
            </Link>
          </>
        )}
        {!user && (
          <div className="space-y-2 pt-2 border-t">
            <Link to="/login" className="block">
              <Button className="w-full bg-blue-700 text-white hover:bg-blue-900">
                Login
              </Button>
            </Link>
            <Link to="/signup/recruiter" className="block">
              <Button className="w-full">Employers</Button>
            </Link>
            <Link to="/signup/candidate" className="block">
              <Button className="w-full">Professionals</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-sm relative">
      <div className="flex items-center justify-between mx-auto h-16 px-4 max-w-7xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center group relative">
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="Hirees Logo"
              className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-md cursor-pointer transition-all duration-300"
            />
            <span className="absolute left-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 text-gray-800 font-semibold text-xl transition-all duration-300">
              Hirees
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-bold items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className={`flex items-center gap-2 hover:text-[#6A38C2] ${
                      isActive("/admin/companies")
                        ? "text-[#6A38C2] font-semibold"
                        : ""
                    }`}
                  >
                    <Building2 size={18} />
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className={`flex items-center gap-2 hover:text-[#6A38C2] ${
                      isActive("/admin/jobs")
                        ? "text-[#6A38C2] font-semibold"
                        : ""
                    }`}
                  >
                    <BriefcaseBusiness size={18} />
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/candidates"
                    className={`flex items-center gap-2 hover:text-[#6A38C2] ${
                      isActive("/admin/candidates")
                        ? "text-[#6A38C2] font-semibold"
                        : ""
                    }`}
                  >
                    <User size={18} />
                    Candidates
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className={`flex items-center gap-2 hover:text-[#6A38C2] ${
                      isActive("/jobs") ? "text-[#6A38C2] font-semibold" : ""
                    }`}
                  >
                    <Briefcase size={18} />
                    All Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="flex items-center gap-2 hover:text-blue-700"
                  >
                    <Home size={18} />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="flex items-center gap-2 hover:text-blue-700"
                  >
                    <Briefcase size={18} />
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/company"
                    className="flex items-center gap-2 hover:text-blue-700"
                  >
                    <Building2 size={18} />
                    Companies
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button className="bg-blue-700 text-white hover:bg-blue-900 text-lg py-3 px-6 rounded-xl">
                  Login
                </Button>
              </Link>
              <Link to="/signup/recruiter">
                <Button className="text-white font-bold text-lg py-3 px-6 rounded-xl">
                  Employers
                </Button>
              </Link>
              <Link to="/signup/candidate">
                <Button className="text-white font-bold text-lg py-3 px-6 rounded-xl">
                  Professionals
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>{renderAvatar()}</PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 space-y-2">
                    {renderAvatar()}
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user.role === "recruiter" ? (
                      <>
                        {" "}
                        <Link
                          to="/admin/dashboard"
                          className={`flex items-center gap-2 hover:text-[#6A38C2] mb-4 justify-start ml-3 mt-3 ${
                            isActive("/admin/dashboard")
                              ? "text-[#6A38C2] font-semibold"
                              : ""
                          }`}
                        >
                          <PieChart size={18} />
                          Dashboard
                        </Link>
                        <Button
                          onClick={logoutHandler}
                          variant="ghost"
                          className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut size={16} />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2 pt-2 border-t">
                        <Link to="/profile">
                          <Button
                            variant="ghost"
                            className="justify-start gap-2"
                          >
                            <User size={16} />
                            View Profile
                          </Button>
                        </Link>
                        <Button
                          onClick={logoutHandler}
                          variant="ghost"
                          className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut size={16} />
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <MobileMenu />
    </div>
  );
});

export default Navbar;
