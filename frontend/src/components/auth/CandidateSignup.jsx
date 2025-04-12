// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Label } from "../ui/label";
// // import { Input } from "../ui/input";
// // import { Button } from "../ui/button";
// // import axios from "axios";
// // import { toast } from "sonner";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setLoading } from "@/redux/authSlice";
// // import { ArrowRight, Loader2, Rocket, Shield, Star } from "lucide-react";
// // import { USER_API_END_POINT } from "@/utils/constant";

// // import Navbar from "../shared/Navbar";
// // import IconCloudDemo from "../IconCloudDemo";

// // const CandidateSignup = () => {
// //   const [input, setInput] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phoneNumber: "",
// //     password: "",
// //     file: "",
// //     country: "USA",
// //     role: "student",
// //     // New student-specific fields
// //     currentLocation: "",
// //     willingToRelocate: false,
// //     visaStatus: "citizen",
// //     jobTitle: "",
// //     jobDomain: "",
// //   });
// //   const [errors, setErrors] = useState({});
// //   const { loading, user } = useSelector((store) => store.auth);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const changeEventHandler = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setInput((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const changeFileHandler = (e) => {
// //     setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
// //   };
// //   const isValidEmail = (email) => {
// //     // RFC 5322 compliant email regex
// //     const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
// //     return emailRegex.test(email);
// //   };
// //   const validateForm = () => {
// //     const {
// //       firstName,
// //       lastName,
// //       email,
// //       phoneNumber,
// //       password,
// //       country,
// //       currentLocation,
// //       jobTitle,
// //       jobDomain,
// //     } = input;
// //     const newErrors = {};

// //     if (!firstName) newErrors.firstName = "First Name is required";
// //     if (!lastName) newErrors.lastName = "Last Name is required";
// //     if (!email) newErrors.email = "Email is required";
// //     if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
// //     // if (!password) newErrors.password = "Password is required";
// //     if (!country) newErrors.country = "Country is required";

// //     // New validation for student-specific fields
// //     if (!currentLocation)
// //       newErrors.currentLocation = "Current Location is required";
// //     if (!jobTitle) newErrors.jobTitle = "Job Title is required";
// //     // if (!visaStatus) newErrors.visaStatus = "Visa Status is required";

// //     if (!password) {
// //       newErrors.password = "Password is required";
// //     } else if (password.length < 8) {
// //       newErrors.password = "Password must be at least 8 characters long";
// //     } else if (!/[A-Z]/.test(password)) {
// //       newErrors.password =
// //         "Password must contain at least one uppercase letter";
// //     } else if (!/[a-z]/.test(password)) {
// //       newErrors.password =
// //         "Password must contain at least one lowercase letter";
// //     } else if (!/[0-9]/.test(password)) {
// //       newErrors.password = "Password must contain at least one numeric digit";
// //     } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
// //       newErrors.password =
// //         "Password must contain at least one special character";
// //     }

// //     if (email && !isValidEmail(email)) {
// //       newErrors.email = "Invalid email format";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const submitHandler = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     const formData = new FormData();
// //     const fullname = `${input.firstName} ${input.lastName}`;
// //     formData.append("fullname", fullname);
// //     formData.append("email", input.email);
// //     formData.append("phoneNumber", input.phoneNumber);
// //     formData.append("password", input.password);
// //     formData.append("role", "student");
// //     formData.append("country", input.country);

// //     // Append new student-specific fields
// //     formData.append("currentLocation", input.currentLocation);
// //     // formData.append("willingToRelocate", input.willingToRelocate);
// //     // formData.append("visaStatus", input.visaStatus);
// //     formData.append("jobTitle", input.jobTitle);
// //     formData.append("jobDomain", input.jobDomain);

// //     if (input.file) {
// //       formData.append("file", input.file);
// //     }

// //     try {
// //       dispatch(setLoading(true));
// //       const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //         withCredentials: true,
// //       });
// //       if (res.data.status) {
// //         // navigate("/login");
// //         toast.success(res.data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Something went wrong");
// //     } finally {
// //       dispatch(setLoading(false));
// //     }
// //   };

// //   return (
// //     <div>
// //       <Navbar></Navbar>
// //       <div className="h-screen flex overflow-hidden ">
// //         <div className="w-1/2 flex items-center justify-center bg-gray-100 p-8 overflow-y-auto">
// //           <form
// //             onSubmit={submitHandler}
// //             className="w-full max-w-md bg-white shadow-xl rounded-xl p-6"
// //           >
// //             <h2 className="text-3xl font-bold text-indigo-800 text-center mb-6">
// //               Candidate Signup
// //             </h2>
// //             <div className="grid grid-cols-2 gap-4">
// //               {[
// //                 {
// //                   label: "First Name",
// //                   name: "firstName",
// //                   type: "text",
// //                   placeholder: "First Name",
// //                 },
// //                 {
// //                   label: "Last Name",
// //                   name: "lastName",
// //                   type: "text",
// //                   placeholder: "Last Name",
// //                 },
// //                 {
// //                   label: "Email",
// //                   name: "email",
// //                   type: "email",
// //                   placeholder: "email@example.com",
// //                 },
// //                 {
// //                   label: "Phone Number",
// //                   name: "phoneNumber",
// //                   type: "text",
// //                   placeholder: "8080808080",
// //                 },
// //                 {
// //                   label: "Password",
// //                   name: "password",
// //                   type: "password",
// //                   placeholder: "Password",
// //                 },
// //                 {
// //                   label: "Current Location",
// //                   name: "currentLocation",
// //                   type: "text",
// //                   placeholder: "City, State",
// //                 },
// //                 // {
// //                 //   label: "Job Title",
// //                 //   name: "jobTitle",
// //                 //   type: "text",
// //                 //   placeholder: "Your current or desired job title",
// //                 // },
// //               ].map((field, idx) => (
// //                 <div className="col-span-2 sm:col-span-1 mb-3" key={idx}>
// //                   <Label className="text-indigo-800 flex items-center">
// //                     {field.label}
// //                     <span className="text-red-600 ml-1">*</span>
// //                   </Label>
// //                   <Input
// //                     type={field.type}
// //                     value={input[field.name]}
// //                     name={field.name}
// //                     onChange={changeEventHandler}
// //                     placeholder={field.placeholder}
// //                     className={`mt-1 border ${
// //                       errors[field.name] ? "border-red-600" : "border-gray-300"
// //                     } rounded-md p-2 w-full`}
// //                   />
// //                   {errors[field.name] && (
// //                     <p className="text-red-600 text-sm mt-1">
// //                       {errors[field.name]}
// //                     </p>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="col-span-2 mb-3">
// //               <Label className="text-indigo-800 flex items-center">
// //                 Job Title
// //                 <span className="text-red-600 ml-1">*</span>
// //               </Label>
// //               <Input
// //                 type="text"
// //                 value={input.jobTitle}
// //                 name="jobTitle"
// //                 onChange={changeEventHandler}
// //                 placeholder="Your current or desired job title"
// //                 className={`mt-1 border ${
// //                   errors.jobTitle ? "border-red-600" : "border-gray-300"
// //                 } rounded-md p-2 w-full`}
// //               />
// //               {errors.jobTitle && (
// //                 <p className="text-red-600 text-sm mt-1">{errors.jobTitle}</p>
// //               )}
// //             </div>

// //             <div className="mb-3">
// //               <Label className="text-indigo-800 flex items-center">
// //                 Job Domain
// //               </Label>
// //               <select
// //                 name="jobDomain"
// //                 value={input.jobDomain}
// //                 onChange={changeEventHandler}
// //                 className="mt-1 border border-gray-300 rounded-md p-2 w-full"
// //               >
// //                 <option value="Technology">Technology</option>
// //                 <option value="Healthcare">Healthcare</option>
// //                 <option value="Engineering">Engineering</option>
// //                 <option value="Finance & Accounting">
// //                   Finance & Accounting
// //                 </option>
// //                 <option value="Education">Education</option>
// //                 <option value="Marketing & Sales">Marketing & Sales</option>
// //                 <option value="Legal">Legal</option>
// //                 <option value="Creative & Media">Creative & Media</option>
// //                 <option value="Supply Chain & Operations">
// //                   Supply Chain & Operations
// //                 </option>
// //                 <option value="Human Resources">Human Resources</option>
// //                 <option value="Hospitality & Tourism">
// //                   Hospitality & Tourism
// //                 </option>
// //                 <option value="Energy">Energy</option>
// //                 <option value="Retail">Retail</option>
// //                 <option value="Customer Service">Customer Service</option>
// //                 <option value="Agriculture">Agriculture</option>
// //               </select>
// //             </div>

// //             <div className="mb-3">
// //               <Label className="text-indigo-800 flex items-center">
// //                 Country <span className="text-red-600 ml-1">*</span>
// //               </Label>
// //               <select
// //                 name="country"
// //                 value={input.country}
// //                 onChange={changeEventHandler}
// //                 className="mt-1 border border-gray-300 rounded-md p-2 w-full"
// //               >
// //                 <option value="USA">USA</option>
// //                 <option value="India">India</option>
// //                 <option value="Canada">Canada</option>
// //                 <option value="Uk">Uk</option>
// //               </select>
// //             </div>

// //             <div className="mb-3">
// //               <Label className="text-indigo-800 flex items-center">
// //                 Profile Picture
// //               </Label>
// //               <Input
// //                 accept="image/*"
// //                 type="file"
// //                 onChange={changeFileHandler}
// //                 className="mt-1 cursor-pointer"
// //               />
// //             </div>

// //             <Button
// //               type="submit"
// //               className="w-full mt-3 bg-indigo-700 hover:bg-indigo-800 text-white flex items-center justify-center"
// //             >
// //               {loading ? (
// //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //               ) : (
// //                 "Create Professional Account"
// //               )}
// //             </Button>

// //             <div className="text-center mt-3">
// //               <span className="text-sm text-gray-600">
// //                 Already have an account?{" "}
// //                 <Link to="/login" className="text-indigo-700 hover:underline">
// //                   Login
// //                 </Link>
// //               </span>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Right Side - Compelling Description */}
// //         <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white flex flex-col justify-start p-6 relative rounded-t-lg">
// //           {/* Text and content */}
// //           <div className="space-y-6">
// //             {/* Title section with icon */}
// //             <h1 className="text-3xl font-extrabold flex items-center space-x-2">
// //               <ArrowRight></ArrowRight>
// //               <span>Elevate Your Career Journey</span>
// //             </h1>

// //             {/* Description */}
// //             <p className="text-lg leading-relaxed">
// //               🌟 Unlock a world of possibilities with our innovative job
// //               platform! We're not just connecting professionals – we're
// //               transforming careers through intelligent matching and personalized
// //               opportunities.
// //             </p>

// //             {/* Features Section */}
// //             <div className="space-y-6">
// //               {/* Secure & Trusted Feature */}
// //               <div className="flex items-center space-x-4 bg-blue-800 p-3 rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out">
// //                 <Shield className="h-10 w-10 text-green-300" />
// //                 <div>
// //                   <h3 className="font-semibold text-md">Secure & Trusted</h3>
// //                   <p className="text-sm text-gray-200">
// //                     Your career information is protected with state-of-the-art
// //                     security.
// //                   </p>
// //                 </div>
// //               </div>

// //               {/* Fast-Track Your Career Feature */}
// //               <div className="flex items-center space-x-4 bg-blue-800 p-3 rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out">
// //                 <Rocket className="h-10 w-10 text-yellow-300" />
// //                 <div>
// //                   <h3 className="font-semibold text-md">
// //                     Fast-Track Your Career
// //                   </h3>
// //                   <p className="text-sm text-gray-200">
// //                     Advanced algorithms match you with your dream opportunities.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Curved blue background with bottom border */}
// //           <div className="h-2/4 w-full mt-10">
// //             <IconCloudDemo className="4"></IconCloudDemo>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CandidateSignup;
// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Label } from "../ui/label";
// // import { Input } from "../ui/input";
// // import { Button } from "../ui/button";
// // import axios from "axios";
// // import { toast } from "sonner";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setLoading } from "@/redux/authSlice";
// // import { ArrowRight, Loader2, Rocket, Shield } from "lucide-react";
// // import { USER_API_END_POINT } from "@/utils/constant";
// // import Navbar from "../shared/Navbar";
// // import IconCloudDemo from "../IconCloudDemo";

// // const CandidateSignup = () => {
// //   const [input, setInput] = useState({
// //         firstName: "",
// //         lastName: "",
// //         email: "",
// //         phoneNumber: "",
// //         password: "",
// //         file: "",
// //         country: "USA",
// //         role: "student",
// //         // New student-specific fields
// //         currentLocation: "",
// //         willingToRelocate: false,
// //         visaStatus: "citizen",
// //         jobTitle: "",
// //         jobDomain: "",
// //       });
// //       const [errors, setErrors] = useState({});
// //       const { loading, user } = useSelector((store) => store.auth);
// //       const dispatch = useDispatch();
// //       const navigate = useNavigate();

// //       const changeEventHandler = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setInput((prev) => ({
// //           ...prev,
// //           [name]: type === "checkbox" ? checked : value,
// //         }));
// //       };

// //       const changeFileHandler = (e) => {
// //         setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
// //       };
// //       const isValidEmail = (email) => {
// //         // RFC 5322 compliant email regex
// //         const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
// //         return emailRegex.test(email);
// //       };
// //       const validateForm = () => {
// //         const {
// //           firstName,
// //           lastName,
// //           email,
// //           phoneNumber,
// //           password,
// //           country,
// //           currentLocation,
// //           jobTitle,
// //           jobDomain,
// //         } = input;
// //         const newErrors = {};

// //         if (!firstName) newErrors.firstName = "First Name is required";
// //         if (!lastName) newErrors.lastName = "Last Name is required";
// //         if (!email) newErrors.email = "Email is required";
// //         if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
// //         // if (!password) newErrors.password = "Password is required";
// //         if (!country) newErrors.country = "Country is required";

// //         // New validation for student-specific fields
// //         if (!currentLocation)
// //           newErrors.currentLocation = "Current Location is required";
// //         if (!jobTitle) newErrors.jobTitle = "Job Title is required";
// //         // if (!visaStatus) newErrors.visaStatus = "Visa Status is required";

// //         if (!password) {
// //           newErrors.password = "Password is required";
// //         } else if (password.length < 8) {
// //           newErrors.password = "Password must be at least 8 characters long";
// //         } else if (!/[A-Z]/.test(password)) {
// //           newErrors.password =
// //             "Password must contain at least one uppercase letter";
// //         } else if (!/[a-z]/.test(password)) {
// //           newErrors.password =
// //             "Password must contain at least one lowercase letter";
// //         } else if (!/[0-9]/.test(password)) {
// //           newErrors.password = "Password must contain at least one numeric digit";
// //         } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
// //           newErrors.password =
// //             "Password must contain at least one special character";
// //         }

// //         if (email && !isValidEmail(email)) {
// //           newErrors.email = "Invalid email format";
// //         }

// //         setErrors(newErrors);
// //         return Object.keys(newErrors).length === 0;
// //       };

// //       const submitHandler = async (e) => {
// //         e.preventDefault();
// //         if (!validateForm()) return;

// //         const formData = new FormData();
// //         const fullname = `${input.firstName} ${input.lastName}`;
// //         formData.append("fullname", fullname);
// //         formData.append("email", input.email);
// //         formData.append("phoneNumber", input.phoneNumber);
// //         formData.append("password", input.password);
// //         formData.append("role", "student");
// //         formData.append("country", input.country);

// //         // Append new student-specific fields
// //         formData.append("currentLocation", input.currentLocation);
// //         // formData.append("willingToRelocate", input.willingToRelocate);
// //         // formData.append("visaStatus", input.visaStatus);
// //         formData.append("jobTitle", input.jobTitle);
// //         formData.append("jobDomain", input.jobDomain);

// //         if (input.file) {
// //           formData.append("file", input.file);
// //         }

// //         try {
// //           dispatch(setLoading(true));
// //           const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
// //             headers: { "Content-Type": "multipart/form-data" },
// //             withCredentials: true,
// //           });
// //           if (res.data.status) {
// //             // navigate("/login");
// //             toast.success(res.data.message);
// //           }
// //         } catch (error) {
// //           console.log(error.response.data.error)
// //           toast.error(error.response?.data?.error || "Something went wrong");
// //         } finally {
// //           dispatch(setLoading(false));
// //         }
// //       };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Navbar />
// //       <div className="flex flex-col md:flex-row min-h-screen">
// //         {/* Form Section - Full width on mobile, half on desktop */}
// //         <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
// //           <form onSubmit={submitHandler} className="w-full max-w-md bg-white shadow-xl rounded-xl p-4 md:p-6 space-y-4">
// //             <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 text-center mb-6">
// //               Candidate Signup
// //             </h2>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               {[
// //                 {
// //                   label: "First Name",
// //                   name: "firstName",
// //                   type: "text",
// //                   placeholder: "First Name",
// //                 },
// //                 {
// //                   label: "Last Name",
// //                   name: "lastName",
// //                   type: "text",
// //                   placeholder: "Last Name",
// //                 },
// //                 {
// //                   label: "Email",
// //                   name: "email",
// //                   type: "email",
// //                   placeholder: "email@example.com",
// //                 },
// //                 {
// //                   label: "Phone Number",
// //                   name: "phoneNumber",
// //                   type: "text",
// //                   placeholder: "8080808080",
// //                 },
// //                 {
// //                   label: "Password",
// //                   name: "password",
// //                   type: "password",
// //                   placeholder: "Password",
// //                 },
// //                 {
// //                   label: "Current Location",
// //                   name: "currentLocation",
// //                   type: "text",
// //                   placeholder: "City, State",
// //                 },
// //               ].map((field, idx) => (
// //                 <div className="col-span-1 space-y-1" key={idx}>
// //                   <Label className="text-indigo-800 flex items-center">
// //                     {field.label}
// //                     <span className="text-red-600 ml-1">*</span>
// //                   </Label>
// //                   <Input
// //                     type={field.type}
// //                     value={input[field.name]}
// //                     name={field.name}
// //                     onChange={changeEventHandler}
// //                     placeholder={field.placeholder}
// //                     className={`w-full ${
// //                       errors[field.name] ? "border-red-600" : "border-gray-300"
// //                     }`}
// //                   />
// //                   {errors[field.name] && (
// //                     <p className="text-red-600 text-sm">{errors[field.name]}</p>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="space-y-1">
// //               <Label className="text-indigo-800 flex items-center">
// //                 Job Title
// //                 <span className="text-red-600 ml-1">*</span>
// //               </Label>
// //               <Input
// //                 type="text"
// //                 value={input.jobTitle}
// //                 name="jobTitle"
// //                 onChange={changeEventHandler}
// //                 placeholder="Your current or desired job title"
// //                 className={`w-full ${
// //                   errors.jobTitle ? "border-red-600" : "border-gray-300"
// //                 }`}
// //               />
// //               {errors.jobTitle && (
// //                 <p className="text-red-600 text-sm">{errors.jobTitle}</p>
// //               )}
// //             </div>

// //             <div className="space-y-1">
// //               <Label className="text-indigo-800">Job Domain</Label>
// //               <select
// //                 name="jobDomain"
// //                 value={input.jobDomain}
// //                 onChange={changeEventHandler}
// //                 className="w-full border border-gray-300 rounded-md p-2"
// //               >
// //                 <option value="Technology">Technology</option>
// //                 <option value="Healthcare">Healthcare</option>
// //                 <option value="Engineering">Engineering</option>
// //                 <option value="Finance & Accounting">Finance & Accounting</option>
// //                 <option value="Education">Education</option>
// //                 <option value="Marketing & Sales">Marketing & Sales</option>
// //                 <option value="Legal">Legal</option>
// //                 <option value="Creative & Media">Creative & Media</option>
// //                 <option value="Supply Chain & Operations">Supply Chain & Operations</option>
// //                 <option value="Human Resources">Human Resources</option>
// //                 <option value="Hospitality & Tourism">Hospitality & Tourism</option>
// //                 <option value="Energy">Energy</option>
// //                 <option value="Retail">Retail</option>
// //                 <option value="Customer Service">Customer Service</option>
// //                 <option value="Agriculture">Agriculture</option>
// //               </select>
// //             </div>

// //             <div className="space-y-1">
// //               <Label className="text-indigo-800 flex items-center">
// //                 Country <span className="text-red-600 ml-1">*</span>
// //               </Label>
// //               <select
// //                 name="country"
// //                 value={input.country}
// //                 onChange={changeEventHandler}
// //                 className="w-full border border-gray-300 rounded-md p-2"
// //               >
// //                 <option value="USA">USA</option>
// //                 <option value="India">India</option>
// //                 <option value="Canada">Canada</option>
// //                 <option value="Uk">UK</option>
// //               </select>
// //             </div>

// //             <div className="space-y-1">
// //               <Label className="text-indigo-800">Profile Picture</Label>
// //               <Input
// //                 accept="image/*"
// //                 type="file"
// //                 onChange={changeFileHandler}
// //                 className="cursor-pointer"
// //               />
// //             </div>

// //             <Button
// //               type="submit"
// //               className="w-full bg-indigo-700 hover:bg-indigo-800 text-white"
// //             >
// //               {loading ? (
// //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //               ) : (
// //                 "Create Professional Account"
// //               )}
// //             </Button>

// //             <div className="text-center">
// //               <span className="text-sm text-gray-600">
// //                 Already have an account?{" "}
// //                 <Link to="/login" className="text-indigo-700 hover:underline">
// //                   Login
// //                 </Link>
// //               </span>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Right Side - Hidden on mobile, visible on desktop */}
// //         <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white flex-col justify-start p-6 relative">
// //           <div className="space-y-6">
// //             <h1 className="text-3xl font-extrabold flex items-center space-x-2">
// //               <ArrowRight />
// //               <span>Elevate Your Career Journey</span>
// //             </h1>

// //             <p className="text-lg leading-relaxed">
// //               🌟 Unlock a world of possibilities with our innovative job platform!
// //               We're not just connecting professionals – we're transforming careers
// //               through intelligent matching and personalized opportunities.
// //             </p>

// //             <div className="space-y-6">
// //               <div className="flex items-center space-x-4 bg-blue-800 p-3 rounded-xl shadow-md hover:shadow-xl transition duration-300">
// //                 <Shield className="h-10 w-10 text-green-300" />
// //                 <div>
// //                   <h3 className="font-semibold text-md">Secure & Trusted</h3>
// //                   <p className="text-sm text-gray-200">
// //                     Your career information is protected with state-of-the-art security.
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex items-center space-x-4 bg-blue-800 p-3 rounded-xl shadow-md hover:shadow-xl transition duration-300">
// //                 <Rocket className="h-10 w-10 text-yellow-300" />
// //                 <div>
// //                   <h3 className="font-semibold text-md">Fast-Track Your Career</h3>
// //                   <p className="text-sm text-gray-200">
// //                     Advanced algorithms match you with your dream opportunities.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="h-2/4 w-full mt-10">
// //             <IconCloudDemo />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CandidateSignup;
// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Label } from "../ui/label";
// // import { Input } from "../ui/input";
// // import { Button } from "../ui/button";
// // import axios from "axios";
// // import { toast } from "sonner";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setLoading } from "@/redux/authSlice";
// // import { ArrowRight, Loader2, Rocket, Shield, User, Mail, Phone, Lock, MapPin, Briefcase, Globe, Upload } from "lucide-react";
// // import { USER_API_END_POINT } from "@/utils/constant";
// // import Navbar from "../shared/Navbar";
// // import IconCloudDemo from "../IconCloudDemo";

// // const CandidateSignup = () => {
// //   const [input, setInput] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phoneNumber: "",
// //     password: "",
// //     file: "",
// //     country: "USA",
// //     role: "student",
// //     // New student-specific fields
// //     currentLocation: "",
// //     willingToRelocate: false,
// //     visaStatus: "citizen",
// //     jobTitle: "",
// //     jobDomain: "",
// //   });
// //   const [errors, setErrors] = useState({});
// //   const { loading, user } = useSelector((store) => store.auth);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const changeEventHandler = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setInput((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const changeFileHandler = (e) => {
// //     setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
// //   };

// //   const isValidEmail = (email) => {
// //     // RFC 5322 compliant email regex
// //     const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
// //     return emailRegex.test(email);
// //   };

// //   const validateForm = () => {
// //     const {
// //       firstName,
// //       lastName,
// //       email,
// //       phoneNumber,
// //       password,
// //       country,
// //       currentLocation,
// //       jobTitle,
// //       jobDomain,
// //     } = input;
// //     const newErrors = {};

// //     if (!firstName) newErrors.firstName = "First Name is required";
// //     if (!lastName) newErrors.lastName = "Last Name is required";
// //     if (!email) newErrors.email = "Email is required";
// //     if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
// //     if (!country) newErrors.country = "Country is required";
// //     if (!currentLocation) newErrors.currentLocation = "Current Location is required";
// //     if (!jobTitle) newErrors.jobTitle = "Job Title is required";

// //     if (!password) {
// //       newErrors.password = "Password is required";
// //     } else if (password.length < 8) {
// //       newErrors.password = "Password must be at least 8 characters long";
// //     } else if (!/[A-Z]/.test(password)) {
// //       newErrors.password = "Password must contain at least one uppercase letter";
// //     } else if (!/[a-z]/.test(password)) {
// //       newErrors.password = "Password must contain at least one lowercase letter";
// //     } else if (!/[0-9]/.test(password)) {
// //       newErrors.password = "Password must contain at least one numeric digit";
// //     } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
// //       newErrors.password = "Password must contain at least one special character";
// //     }

// //     if (email && !isValidEmail(email)) {
// //       newErrors.email = "Invalid email format";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const submitHandler = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     const formData = new FormData();
// //     const fullname = `${input.firstName} ${input.lastName}`;
// //     formData.append("fullname", fullname);
// //     formData.append("email", input.email);
// //     formData.append("phoneNumber", input.phoneNumber);
// //     formData.append("password", input.password);
// //     formData.append("role", "student");
// //     formData.append("country", input.country);
// //     formData.append("currentLocation", input.currentLocation);
// //     formData.append("jobTitle", input.jobTitle);
// //     formData.append("jobDomain", input.jobDomain);

// //     if (input.file) {
// //       formData.append("file", input.file);
// //     }

// //     try {
// //       dispatch(setLoading(true));
// //       const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //         withCredentials: true,
// //       });
// //       if (res.data.status) {
// //         toast.success(res.data.message);
// //       }
// //     } catch (error) {
// //       console.log(error.response.data.error)
// //       toast.error(error.response?.data?.error || "Something went wrong");
// //     } finally {
// //       dispatch(setLoading(false));
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
// //       <Navbar />
// //       <div className="flex flex-col md:flex-row min-h-screen">
// //         {/* Form Section - Full width on mobile, half on desktop */}
// //         <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
// //           <form onSubmit={submitHandler} className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 md:p-8 space-y-5 border border-gray-100">
// //             <div className="text-center mb-2">
// //               <h2 className="text-2xl md:text-3xl font-bold text-indigo-800">
// //                 Create Your Professional Profile
// //               </h2>
// //               <p className="text-gray-500 mt-2">Join our talent network and unlock career opportunities</p>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //               {/* First Name */}
// //               <div className="col-span-1 space-y-2">
// //                 <Label className="text-gray-700 font-medium flex items-center">
// //                   <User className="h-4 w-4 mr-2 text-indigo-600" />
// //                   First Name
// //                   <span className="text-red-600 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   type="text"
// //                   value={input.firstName}
// //                   name="firstName"
// //                   onChange={changeEventHandler}
// //                   placeholder="John"
// //                   className={`w-full transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${
// //                     errors.firstName ? "border-red-600" : "border-gray-300"
// //                   }`}
// //                 />
// //                 {errors.firstName && (
// //                   <p className="text-red-600 text-sm">{errors.firstName}</p>
// //                 )}
// //               </div>

// //               {/* Last Name */}
// //               <div className="col-span-1 space-y-2">
// //                 <Label className="text-gray-700 font-medium flex items-center">
// //                   <User className="h-4 w-4 mr-2 text-indigo-600" />
// //                   Last Name
// //                   <span className="text-red-600 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   type="text"
// //                   value={input.lastName}
// //                   name="lastName"
// //                   onChange={changeEventHandler}
// //                   placeholder="Doe"
// //                   className={`w-full transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${
// //                     errors.lastName ? "border-red-600" : "border-gray-300"
// //                   }`}
// //                 />
// //                 {errors.lastName && (
// //                   <p className="text-red-600 text-sm">{errors.lastName}</p>
// //                 )}
// //               </div>

// //               {/* Email */}
// //               <div className="col-span-1 space-y-2">
// //                 <Label className="text-gray-700 font-medium flex items-center">
// //                   <Mail className="h-4 w-4 mr-2 text-indigo-600" />
// //                   Email Address
// //                   <span className="text-red-600 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   type="email"
// //                   value={input.email}
// //                   name="email"
// //                   onChange={changeEventHandler}
// //                   placeholder="john.doe@example.com"
// //                   className={`w-full transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${
// //                     errors.email ? "border-red-600" : "border-gray-300"
// //                   }`}
// //                 />
// //                 {errors.email && (
// //                   <p className="text-red-600 text-sm">{errors.email}</p>
// //                 )}
// //               </div>

// //               {/* Phone Number */}
// //               <div className="col-span-1 space-y-2">
// //                 <Label className="text-gray-700 font-medium flex items-center">
// //                   <Phone className="h-4 w-4 mr-2 text-indigo-600" />
// //                   Phone Number
// //                   <span className="text-red-600 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   type="text"
// //                   value={input.phoneNumber}
// //                   name="phoneNumber"
// //                   onChange={changeEventHandler}
// //                   placeholder="(555) 123-4567"
// //                   className={`w-full transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${
// //                     errors.phoneNumber ? "border-red-600" : "border-gray-300"
// //                   }`}
// //                 />
// //                 {errors.phoneNumber && (
// //                   <p className="text-red-600 text-sm">{errors.phoneNumber}</p>
// //                 )}
// //               </div>

// //               {/* Password */}
// //               <div className="col-span-1 space-y-2">
// //                 <Label className="text-gray-700 font-medium flex items-center">
// //                   <Lock className="h-4 w-4 mr-2 text-indigo-600" />
// //                   Password
// //                   <span className="text-red-600 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   type="password"
// //                   value={input.password}
// //                   name="password"
// //                   onChange={changeEventHandler}
// //                   placeholder="••••••••"
// //                   className={`w-full transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${
// //                     errors.password ? "border-red-600" : "border-gray-300"
// //                   }`}
// //                 />
// //                 {errors.password && (
// //                   <p className="text-red-600 text-sm">{errors.password}</p>
// //                 )}
// //               </div>

// //               {/* Current Location */}
// //               <div className="col-span-1 space-y-2">
// //                 <Label className="text-gray-700 font-medium flex items-center">
// //                   <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
// //                   Current Location
// //                   <span className="text-red-600 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   type="text"
// //                   value={input.currentLocation}
// //                   name="currentLocation"
// //                   onChange={changeEventHandler}
// //                   placeholder="New York, NY"
// //                   className={`w-full transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${
// //                     errors.currentLocation ? "border-red-600" : "border-gray-300"
// //                   }`}
// //                 />
// //                 {errors.currentLocation && (
// //                   <p className="text-red-600 text-sm">{errors.currentLocation}</p>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Job Title */}
// //             <div className="space-y-2">
// //               <Label className="text-gray-700 font-medium flex items-center">
// //                 <Briefcase className="h-4 w-4 mr-2 text-indigo-600" />
// //                 Job Title
// //                 <span className="text-red-600 ml-1">*</span>
// //               </Label>
// //               <Input
// //                 type="text"
// //                 value={input.jobTitle}
// //                 name="jobTitle"
// //                 onChange={changeEventHandler}
// //                 placeholder="Software Engineer"
// //                 className={`w-full transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${
// //                   errors.jobTitle ? "border-red-600" : "border-gray-300"
// //                 }`}
// //               />
// //               {errors.jobTitle && (
// //                 <p className="text-red-600 text-sm">{errors.jobTitle}</p>
// //               )}
// //             </div>

// //             {/* Job Domain */}
// //             <div className="space-y-2">
// //               <Label className="text-gray-700 font-medium flex items-center">
// //                 <Briefcase className="h-4 w-4 mr-2 text-indigo-600" />
// //                 Job Domain
// //               </Label>
// //               <select
// //                 name="jobDomain"
// //                 value={input.jobDomain}
// //                 onChange={changeEventHandler}
// //                 className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
// //               >
// //                 <option value="Technology">Technology</option>
// //                 <option value="Healthcare">Healthcare</option>
// //                 <option value="Engineering">Engineering</option>
// //                 <option value="Finance & Accounting">Finance & Accounting</option>
// //                 <option value="Education">Education</option>
// //                 <option value="Marketing & Sales">Marketing & Sales</option>
// //                 <option value="Legal">Legal</option>
// //                 <option value="Creative & Media">Creative & Media</option>
// //                 <option value="Supply Chain & Operations">Supply Chain & Operations</option>
// //                 <option value="Human Resources">Human Resources</option>
// //                 <option value="Hospitality & Tourism">Hospitality & Tourism</option>
// //                 <option value="Energy">Energy</option>
// //                 <option value="Retail">Retail</option>
// //                 <option value="Customer Service">Customer Service</option>
// //                 <option value="Agriculture">Agriculture</option>
// //               </select>
// //             </div>

// //             {/* Country */}
// //             <div className="space-y-2">
// //               <Label className="text-gray-700 font-medium flex items-center">
// //                 <Globe className="h-4 w-4 mr-2 text-indigo-600" />
// //                 Country <span className="text-red-600 ml-1">*</span>
// //               </Label>
// //               <select
// //                 name="country"
// //                 value={input.country}
// //                 onChange={changeEventHandler}
// //                 className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
// //               >
// //                 <option value="USA">United States</option>
// //                 <option value="India">India</option>
// //                 <option value="Canada">Canada</option>
// //                 <option value="Uk">United Kingdom</option>
// //               </select>
// //             </div>

// //             {/* Profile Picture */}
// //             <div className="space-y-2">
// //               <Label className="text-gray-700 font-medium flex items-center">
// //                 <Upload className="h-4 w-4 mr-2 text-indigo-600" />
// //                 Profile Picture
// //               </Label>
// //               <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-indigo-500 transition-all duration-200">
// //                 <Input
// //                   accept="image/*"
// //                   type="file"
// //                   onChange={changeFileHandler}
// //                   className="cursor-pointer"
// //                 />
// //                 <p className="text-sm text-gray-500 mt-2">Upload a professional photo (JPG, PNG)</p>
// //               </div>
// //             </div>

// //             {/* Submit Button */}
// //             <Button
// //               type="submit"
// //               className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-lg shadow-md hover:shadow-xl transition duration-300"
// //             >
// //               {loading ? (
// //                 <Loader2 className="mr-2 h-5 w-5 animate-spin" />
// //               ) : (
// //                 "Create Professional Account"
// //               )}
// //             </Button>

// //             {/* Login Link */}
// //             <div className="text-center">
// //               <span className="text-sm text-gray-600">
// //                 Already have an account?{" "}
// //                 <Link to="/login" className="text-indigo-700 hover:underline font-medium">
// //                   Login here
// //                 </Link>
// //               </span>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Right Side - Hidden on mobile, visible on desktop */}
// //         <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex-col justify-start p-8 relative overflow-hidden">
// //           <div className="relative z-10 space-y-8 max-w-lg">
// //             <h1 className="text-4xl font-extrabold">
// //               <span className="block">Launch Your</span>
// //               <span className="text-yellow-300">Professional Journey</span>
// //             </h1>

// //             <p className="text-xl leading-relaxed text-gray-100">
// //               Join thousands of professionals who have accelerated their careers through our intelligent platform.
// //             </p>

// //             <div className="space-y-5 mt-8">
// //               <div className="flex items-center space-x-4 bg-indigo-800/50 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-indigo-500/30">
// //                 <Shield className="h-12 w-12 text-green-300 flex-shrink-0" />
// //                 <div>
// //                   <h3 className="font-semibold text-lg">Industry-Leading Security</h3>
// //                   <p className="text-gray-200">
// //                     Your data is protected with enterprise-grade encryption and security protocols.
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex items-center space-x-4 bg-indigo-800/50 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-indigo-500/30">
// //                 <Rocket className="h-12 w-12 text-yellow-300 flex-shrink-0" />
// //                 <div>
// //                   <h3 className="font-semibold text-lg">AI-Powered Matching</h3>
// //                   <p className="text-gray-200">
// //                     Our proprietary algorithms connect you with perfect-fit opportunities that align with your career goals.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Stats */}
// //             <div className="grid grid-cols-3 gap-4 mt-10">
// //               <div className="text-center">
// //                 <p className="text-3xl font-bold text-white">10k+</p>
// //                 <p className="text-sm text-gray-200">Companies</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-3xl font-bold text-white">85%</p>
// //                 <p className="text-sm text-gray-200">Success Rate</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-3xl font-bold text-white">24/7</p>
// //                 <p className="text-sm text-gray-200">Support</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Icon Cloud in background */}
// //           <div className="absolute right-0 bottom-0 w-full opacity-30">
// //             <IconCloudDemo />
// //           </div>

// //           {/* Decorative elements */}
// //           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
// //           <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-800 rounded-full filter blur-3xl opacity-20"></div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CandidateSignup;
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "@/redux/authSlice";
// import { ArrowRight, Loader2, Rocket, Shield, User, Mail, Phone, Lock, MapPin, Briefcase, Globe, Upload } from "lucide-react";
// import { USER_API_END_POINT } from "@/utils/constant";
// import Navbar from "../shared/Navbar";
// import Footer from "../Footer";

// const CandidateSignup = () => {
//   const [input, setInput] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     file: "",
//     country: "USA",
//     currentLocation: "",
//     jobTitle: "",
//     jobDomain: "Technology",
//   });
//   const [errors, setErrors] = useState({});
//   const { loading } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Handling input changes
//   const changeEventHandler = (e) => {
//     const { name, value, type, checked } = e.target;
//     setInput((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Handling file uploads
//   const changeFileHandler = (e) => {
//     setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
//   };

//   // Email validation
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Form validation
//   const validateForm = () => {
//     const { firstName, lastName, email, phoneNumber, password, currentLocation, jobTitle } = input;
//     const newErrors = {};

//     if (!firstName) newErrors.firstName = "Required";
//     if (!lastName) newErrors.lastName = "Required";
//     if (!email) newErrors.email = "Required";
//     else if (!isValidEmail(email)) newErrors.email = "Invalid email format";
//     if (!phoneNumber) newErrors.phoneNumber = "Required";
//     if (!currentLocation) newErrors.currentLocation = "Required";
//     if (!jobTitle) newErrors.jobTitle = "Required";

//     if (!password) {
//       newErrors.password = "Required";
//     } else if (password.length < 8) {
//       newErrors.password = "Minimum 8 characters";
//     } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
//       newErrors.password = "Must include uppercase, lowercase, number, and special character";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Form submission
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const formData = new FormData();
//     const fullname = `${input.firstName} ${input.lastName}`;
//     formData.append("fullname", fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("password", input.password);
//     formData.append("role", "student");
//     formData.append("country", input.country);
//     formData.append("currentLocation", input.currentLocation);
//     formData.append("jobTitle", input.jobTitle);
//     formData.append("jobDomain", input.jobDomain);

//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       if (res.data.status) {
//         toast.success(res.data.message);
//         navigate("/login");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Registration failed");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
//       <Navbar />

//       <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
//         {/* Left Side - Content */}
//         <div className="hidden md:flex w-2/5 bg-gradient-to-br from-blue-600 to-indigo-800 text-white items-center justify-center p-8">
//           <div className="max-w-md space-y-8">
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight">
//                 <span className="block">Launch Your</span>
//                 <span className="text-yellow-300 text-4xl">Professional Journey</span>
//               </h1>
//               <p className="mt-4 text-lg text-gray-100">
//                 Join thousands of professionals who have found their ideal career opportunities.
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-start space-x-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
//                 <Shield className="h-6 w-6 text-green-300 flex-shrink-0 mt-1" />
//                 <div>
//                   <h3 className="font-medium">Secure & Private</h3>
//                   <p className="text-sm text-gray-200">Enterprise-grade encryption keeps your data protected</p>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
//                 <Rocket className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
//                 <div>
//                   <h3 className="font-medium">AI-Powered Matching</h3>
//                   <p className="text-sm text-gray-200">Smart algorithms connect you with perfect-fit opportunities</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Form */}
//         <div className="w-full md:w-3/5 flex items-center justify-center p-4 md:p-8">
//           <div className="w-full max-w-md">
//             <div className="text-center mb-6 md:mb-8">
//               <h2 className="text-2xl font-bold text-blue-600">Create Your Professional Profile</h2>
//               <p className="text-gray-500 mt-1">Join our talent network today</p>
//             </div>

//             <form onSubmit={submitHandler} className="space-y-5">
//               {/* Two column layout */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User className="h-4 w-4 text-gray-400" />
//                     </div>
//                     <Input
//                       id="firstName"
//                       name="firstName"
//                       value={input.firstName}
//                       onChange={changeEventHandler}
//                       className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
//                       placeholder="John"
//                     />
//                   </div>
//                   {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
//                 </div>

//                 <div className="space-y-1">
//                   <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User className="h-4 w-4 text-gray-400" />
//                     </div>
//                     <Input
//                       id="lastName"
//                       name="lastName"
//                       value={input.lastName}
//                       onChange={changeEventHandler}
//                       className={`pl-10 ${errors.lastName ? "border-red-500" : ""}`}
//                       placeholder="Doe"
//                     />
//                   </div>
//                   {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-4 w-4 text-gray-400" />
//                   </div>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={input.email}
//                     onChange={changeEventHandler}
//                     className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
//                     placeholder="john.doe@example.com"
//                   />
//                 </div>
//                 {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//               </div>

//               <div className="space-y-1">
//                 <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</Label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Phone className="h-4 w-4 text-gray-400" />
//                   </div>
//                   <Input
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     value={input.phoneNumber}
//                     onChange={changeEventHandler}
//                     className={`pl-10 ${errors.phoneNumber ? "border-red-500" : ""}`}
//                     placeholder="(555) 123-4567"
//                   />
//                 </div>
//                 {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
//               </div>

//               <div className="space-y-1">
//                 <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-4 w-4 text-gray-400" />
//                   </div>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     value={input.password}
//                     onChange={changeEventHandler}
//                     className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
//                     placeholder="••••••••"
//                   />
//                 </div>
//                 {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
//               </div>

//               {/* Two column layout */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <Label htmlFor="currentLocation" className="text-sm font-medium text-gray-700">Current Location</Label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <MapPin className="h-4 w-4 text-gray-400" />
//                     </div>
//                     <Input
//                       id="currentLocation"
//                       name="currentLocation"
//                       value={input.currentLocation}
//                       onChange={changeEventHandler}
//                       className={`pl-10 ${errors.currentLocation ? "border-red-500" : ""}`}
//                       placeholder="New York, NY"
//                     />
//                   </div>
//                   {errors.currentLocation && <p className="text-red-500 text-xs">{errors.currentLocation}</p>}
//                 </div>

//                 <div className="space-y-1">
//                   <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country</Label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Globe className="h-4 w-4 text-gray-400" />
//                     </div>
//                     <select
//                       id="country"
//                       name="country"
//                       value={input.country}
//                       onChange={changeEventHandler}
//                       className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     >
//                       <option value="USA">United States</option>
//                       <option value="India">India</option>
//                       <option value="Canada">Canada</option>
//                       <option value="Uk">United Kingdom</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Two column layout */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">Job Title</Label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Briefcase className="h-4 w-4 text-gray-400" />
//                     </div>
//                     <Input
//                       id="jobTitle"
//                       name="jobTitle"
//                       value={input.jobTitle}
//                       onChange={changeEventHandler}
//                       className={`pl-10 ${errors.jobTitle ? "border-red-500" : ""}`}
//                       placeholder="Software Engineer"
//                     />
//                   </div>
//                   {errors.jobTitle && <p className="text-red-500 text-xs">{errors.jobTitle}</p>}
//                 </div>

//                 <div className="space-y-1">
//                   <Label htmlFor="jobDomain" className="text-sm font-medium text-gray-700">Job Domain</Label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Briefcase className="h-4 w-4 text-gray-400" />
//                     </div>
//                     <select
//                       id="jobDomain"
//                       name="jobDomain"
//                       value={input.jobDomain}
//                       onChange={changeEventHandler}
//                       className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     >
//                       <option value="Technology">Technology</option>
//                       <option value="Healthcare">Healthcare</option>
//                       <option value="Engineering">Engineering</option>
//                       <option value="Finance & Accounting">Finance & Accounting</option>
//                       <option value="Education">Education</option>
//                       <option value="Marketing & Sales">Marketing & Sales</option>
//                       <option value="Legal">Legal</option>
//                       <option value="Creative & Media">Creative & Media</option>
//                       <option value="Supply Chain & Operations">Supply Chain & Operations</option>
//                       <option value="Human Resources">Human Resources</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <Label htmlFor="file" className="text-sm font-medium text-gray-700">Profile Picture (Optional)</Label>
//                 <div className="relative border border-gray-300 border-dashed rounded-md p-4 hover:border-indigo-500 transition-colors">
//                   <Input
//                     id="file"
//                     type="file"
//                     accept="image/*"
//                     onChange={changeFileHandler}
//                     className="cursor-pointer"
//                   />
//                   <p className="text-xs text-gray-500 mt-1 text-center">JPG or PNG, max 5MB</p>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md shadow transition-colors"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     <span>Creating Account...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center">
//                     <span>Create Account</span>
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </div>
//                 )}
//               </Button>

//               <div className="text-center pt-2">
//                 <p className="text-sm text-gray-600">
//                   Already have an account?{" "}
//                   <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer></Footer>
//     </div>
//   );
// };

// export default CandidateSignup;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { ArrowRight, Loader2, Rocket, Shield, User, Mail, Phone, Lock, MapPin, Briefcase, Globe, FileText } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";

const CandidateSignup = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    resume: null,
    country: "USA",
    currentLocation: "",
    jobTitle: "",
    jobDomain: "Technology",
  });
  const [errors, setErrors] = useState({});
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handling input changes
  const changeEventHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handling file uploads
  const changeFileHandler = (e) => {
    setInput((prev) => ({ ...prev, resume: e.target.files?.[0] }));
  };

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = () => {
    const { firstName, lastName, email, phoneNumber, password, currentLocation, jobTitle, resume } = input;
    const newErrors = {};

    if (!firstName) newErrors.firstName = "Required";
    if (!lastName) newErrors.lastName = "Required";
    if (!email) newErrors.email = "Required";
    else if (!isValidEmail(email)) newErrors.email = "Invalid email format";
    if (!phoneNumber) newErrors.phoneNumber = "Required";
    if (!currentLocation) newErrors.currentLocation = "Required";
    if (!jobTitle) newErrors.jobTitle = "Required";
    if (!resume) newErrors.resume = "Resume is required";

    if (!password) {
      newErrors.password = "Required";
    } else if (password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      newErrors.password = "Must include uppercase, lowercase, number, and special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    const fullname = `${input.firstName} ${input.lastName}`;
    formData.append("fullname", fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", "student");
    formData.append("country", input.country);
    formData.append("currentLocation", input.currentLocation);
    formData.append("jobTitle", input.jobTitle);
    formData.append("jobDomain", input.jobDomain);

    // Always append resume file
    formData.append("file", input.resume);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.status) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        {/* Left Side - Content */}
        <div className="hidden md:flex w-2/5 bg-gradient-to-br from-blue-600 to-indigo-800 text-white items-center justify-center p-8">
          <div className="max-w-md space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="block">Launch Your</span>
                <span className="text-yellow-300 text-4xl">Professional Journey</span>
              </h1>
              <p className="mt-4 text-lg text-gray-100">
                Join thousands of professionals who have found their ideal career opportunities.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <Shield className="h-6 w-6 text-green-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium">Secure & Private</h3>
                  <p className="text-sm text-gray-200">Enterprise-grade encryption keeps your data protected</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <Rocket className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium">AI-Powered Matching</h3>
                  <p className="text-sm text-gray-200">Smart algorithms connect you with perfect-fit opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-3/5 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl font-bold text-blue-600">Create Your Professional Profile</h2>
              <p className="text-gray-500 mt-1">Join our talent network today</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Two column layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={input.firstName}
                      onChange={changeEventHandler}
                      className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={input.lastName}
                      onChange={changeEventHandler}
                      className={`pl-10 ${errors.lastName ? "border-red-500" : ""}`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="john.doe@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    className={`pl-10 ${errors.phoneNumber ? "border-red-500" : ""}`}
                    placeholder="(555) 123-4567"
                  />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>

              {/* Two column layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="currentLocation" className="text-sm font-medium text-gray-700">Current Location</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="currentLocation"
                      name="currentLocation"
                      value={input.currentLocation}
                      onChange={changeEventHandler}
                      className={`pl-10 ${errors.currentLocation ? "border-red-500" : ""}`}
                      placeholder="New York, NY"
                    />
                  </div>
                  {errors.currentLocation && <p className="text-red-500 text-xs">{errors.currentLocation}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      id="country"
                      name="country"
                      value={input.country}
                      onChange={changeEventHandler}
                      className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="USA">United States</option>
                      <option value="India">India</option>
                      <option value="Canada">Canada</option>
                      <option value="Uk">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Two column layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">Job Title</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      value={input.jobTitle}
                      onChange={changeEventHandler}
                      className={`pl-10 ${errors.jobTitle ? "border-red-500" : ""}`}
                      placeholder="Software Engineer"
                    />
                  </div>
                  {errors.jobTitle && <p className="text-red-500 text-xs">{errors.jobTitle}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="jobDomain" className="text-sm font-medium text-gray-700">Job Domain</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      id="jobDomain"
                      name="jobDomain"
                      value={input.jobDomain}
                      onChange={changeEventHandler}
                      className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Finance & Accounting">Finance & Accounting</option>
                      <option value="Education">Education</option>
                      <option value="Marketing & Sales">Marketing & Sales</option>
                      <option value="Legal">Legal</option>
                      <option value="Creative & Media">Creative & Media</option>
                      <option value="Supply Chain & Operations">Supply Chain & Operations</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="resume" className="text-sm font-medium text-gray-700">
                  Resume <span className="text-red-500">*</span>
                </Label>
                <div className={`relative border ${errors.resume ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-md p-4 hover:border-indigo-500 transition-colors`}>
                  <div className="flex items-center justify-center">
                    <FileText className="h-8 w-8 text-gray-400 mb-2" />
                  </div>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={changeFileHandler}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center">PDF, DOC, or DOCX (Max 5MB)</p>
                </div>
                {errors.resume && <p className="text-red-500 text-xs">{errors.resume}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md shadow transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Create Account</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CandidateSignup;