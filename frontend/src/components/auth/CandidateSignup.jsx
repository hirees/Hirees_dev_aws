import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";
// Import SVG for candidate
import candidate from "../../assets/candidate.svg"; // You'll need to ensure this exists or replace with appropriate SVG

const CandidateSignup = () => {
  const nav = useNavigate();
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
    showPassword: false,
  });
  const [errors, setErrors] = useState({});
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setInput({ ...input, showPassword: !input.showPassword });
  };

  // Handler functions for input changes
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
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      currentLocation,
      jobTitle,
      resume,
    } = input;
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!isValidEmail(email)) newErrors.email = "Invalid email format";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!currentLocation)
      newErrors.currentLocation = "Current location is required";
    if (!jobTitle) newErrors.jobTitle = "Job title is required";
    if (!resume) newErrors.resume = "Resume is required";

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
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
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 mt-14">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden mx-auto my-4 sm:my-8">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Image and Text */}
            <div className="relative w-full md:w-6/12 bg-gradient-to-br text-white flex flex-col justify-center p-6 sm:p-8 min-h-[300px] sm:min-h-[400px] md:min-h-0">
              {/* Background SVG Image */}
              <img
                src={candidate}
                className="absolute inset-0 object-cover w-full h-full"
                alt="background"
              />

              <div className="relative z-10 space-y-4 sm:space-y-6 mt-8 sm:mt-13 ml-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Match Your
                  <br /> skills and
                  <br /> ambitions
                  <br /> with Hirees
                </h1>
                <p className="text-sm sm:text-base md:text-lg opacity-90 mt-2 sm:mt-4">
                  Over <span className="text-[#97C0FF]">10,000+</span>{" "}
                  professionals and
                  <br />
                  companies already registered
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-7/12 p-4 sm:p-6 md:p-8">
              <div className="w-full">
                <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent mb-2">
                  For Candidates
                </h2>

                <div className="w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-900 mb-4"></div>

                <h3 className="text-base sm:text-lg text-gray-700 mb-4">
                  Register here to join the Hirees.
                </h3>

                <form onSubmit={submitHandler} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name*"
                        name="firstName"
                        value={input.firstName}
                        onChange={changeEventHandler}
                        className={`w-full p-2.5 text-sm border ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Last Name*"
                        name="lastName"
                        value={input.lastName}
                        onChange={changeEventHandler}
                        className={`w-full p-2.5 text-sm border ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address*"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className={`w-full p-2.5 text-sm border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Phone Number*"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        className={`w-full p-2.5 text-sm border ${
                          errors.phoneNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type={input.showPassword ? "text" : "password"}
                        placeholder="Password*"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className={`w-full p-2.5 text-sm border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Current Location*"
                        name="currentLocation"
                        value={input.currentLocation}
                        onChange={changeEventHandler}
                        className={`w-full p-2.5 text-sm border ${
                          errors.currentLocation
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      {errors.currentLocation && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.currentLocation}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <select
                          name="country"
                          value={input.country}
                          onChange={changeEventHandler}
                          className="w-full p-2.5 text-sm border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="USA">USA</option>
                          <option value="India">India</option>
                          <option value="Canada">Canada</option>
                          <option value="UK">UK</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Job Title*"
                        name="jobTitle"
                        value={input.jobTitle}
                        onChange={changeEventHandler}
                        className={`w-full p-2.5 text-sm border ${
                          errors.jobTitle ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      {errors.jobTitle && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.jobTitle}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <select
                          name="jobDomain"
                          value={input.jobDomain}
                          onChange={changeEventHandler}
                          className="w-full p-2.5 text-sm border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Finance & Accounting">
                            Finance & Accounting
                          </option>
                          <option value="Education">Education</option>
                          <option value="Marketing & Sales">
                            Marketing & Sales
                          </option>
                          <option value="Legal">Legal</option>
                          <option value="Creative & Media">
                            Creative & Media
                          </option>
                          <option value="Supply Chain & Operations">
                            Supply Chain & Operations
                          </option>
                          <option value="Human Resources">
                            Human Resources
                          </option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-300 rounded-md p-2.5 relative hover:border-blue-500 transition-colors duration-200">
                    <div className="flex items-center justify-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-xs text-gray-500">
                        Upload your resume (PDF, DOC or DOCX) (Max 5MB)*
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={changeFileHandler}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      aria-label="Upload your resume"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full p-2.5 bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-md font-medium text-sm hover:from-blue-700 hover:to-blue-950 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  <div className="flex items-center justify-center mt-4">
                    <div className="h-px bg-gray-300 flex-grow"></div>
                    <span className="px-3 text-gray-500 text-xs">
                      Already have an account?
                      <span
                        onClick={() => nav("/login")}
                        className="text-blue-600 cursor-pointer underline font-semibold ml-1 hover:text-blue-700 transition-colors duration-200"
                      >
                        LOG IN
                      </span>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CandidateSignup;
