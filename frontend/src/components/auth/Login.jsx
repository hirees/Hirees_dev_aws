// import React, { useEffect, useState } from "react";
// import Navbar from "../shared/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setUser } from "@/redux/authSlice";
// import { Loader2 } from "lucide-react";
// import ForgotPassword from './ForgotPassword';  // Adjust the import path as needed

// const Login = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//   });
//   const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
//   const [errors, setErrors] = useState({});
//   const { loading, user } = useSelector((store) => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     // Email validation
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}$/;
//     if (!input.email) newErrors.email = "Email is required";
//     else if (!emailPattern.test(input.email))
//       newErrors.email = "Invalid email format";

//     // Password validation
//     if (!input.password) newErrors.password = "Password is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Returns true if no errors
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {

//       toast.error(error.response.data.message);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     if (user?.role=="recruiter") {
//       navigate("/admin/companies");
//     }
//   }, [user, navigate]);
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow flex items-center justify-center">
//         <form
//           onSubmit={submitHandler}
//           className="bg-white shadow-xl rounded-lg w-[90%] sm:w-[400px] p-6"
//         >
//           <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
//             Login
//           </h1>
//           {/* Email Input */}
//           <div className="mb-4">
//             <Label>
//               Email <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               type="email"
//               value={input.email}
//               name="email"
//               onChange={changeEventHandler}
//               placeholder="email@gmail.com"
//               className={`mt-2 w-full border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-md ${
//                 errors.email ? "border-red-500" : ""
//               }`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>
//           {/* Password Input */}
//           <div className="mb-4">
//             <Label>
//               Password <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               type="password"
//               value={input.password}
//               name="password"
//               onChange={changeEventHandler}
//               placeholder="Password"
//               className={`mt-2 w-full border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-md ${
//                 errors.password ? "border-red-500" : ""
//               }`}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//             {/* Add Forgot Password link */}
//             <div className="mt-2 text-right">
//               <button
//                 type="button"
//                 onClick={() => setForgotPasswordOpen(true)}
//                 className="text-indigo-600 hover:text-indigo-800 text-sm"
//               >
//                 Forgot Password?
//               </button>
//             </div>
//           </div>
//           {/* Submit Button */}
//           {loading ? (
//             <Button className="w-full py-2 bg-indigo-500 text-white rounded-lg flex items-center justify-center shadow-md">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//             </Button>
//           ) : (
//             <Button
//               type="submit"
//               className="w-full py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105"
//             >
//               Login
//             </Button>
//           )}
//         </form>
//       </div>

//       {/* Add Forgot Password Modal */}
//       <ForgotPassword
//         open={forgotPasswordOpen}
//         onClose={() => setForgotPasswordOpen(false)}
//       />
//     </div>
//   );
// };

// export default Login;
import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
import ForgotPassword from './ForgotPassword';
import Aurora from "../background/Aurora";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
    if (!input.email) newErrors.email = "Email is required";
    else if (!emailPattern.test(input.email))
      newErrors.email = "Invalid email format";

    // Password validation
    if (!input.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card with subtle animation */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl border border-gray-100">
            {/* Top banner/header */}
            <div className="bg-blue-600 px-8 py-6 text-white">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-blue-100 mt-1">Sign in to your account</p>
            </div>

            {/* Form content */}
            <form onSubmit={submitHandler} className="p-8">
              {/* Email Input Group */}
              <div className="mb-6">
                <Label className="text-black font-medium block mb-2">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="you@example.com"
                    className={`pl-10 w-full h-12 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg ${
                      errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="ml-1">{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Input Group */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-black font-medium">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className={`pl-10 w-full h-12 border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg ${
                      errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="ml-1">{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              {loading ? (
                <Button disabled className="w-full h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all font-medium text-lg"
                >
                  <LogIn className="mr-2 h-5 w-5" /> Sign In
                </Button>
              )}

              {/* Create Account Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Brand or motto text */}
          <div className="text-center mt-6 text-gray-500 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-1 bg-blue-600 rounded"></div>
              <span>Secure login • Your data is protected</span>
              <div className="w-8 h-1 bg-blue-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPassword
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
      <div className="rotate-180">
      <Aurora
      amplitude={2.0}
      colorStops={["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"]}

      ></Aurora>
      </div>
    </div>
  );
};

export default Login;