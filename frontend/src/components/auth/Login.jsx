import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Eye, EyeOff, Mail } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import professionalImage from "../../assets/professionals.svg";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
  });
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setInput({ ...input, showPassword: !input.showPassword });
  };

  const changeEventHandler = (e) => {
    const { name, type, checked, value } = e.target;
    setInput({
      ...input,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!input.email) newErrors.email = "Email is required";
    else if (!isValidEmail(input.email))
      newErrors.email = "Invalid email format";

    if (!input.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        localStorage.setItem("user", JSON.stringify(res.data.user));
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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 mt-10 sm:mt-10  ">
        <div className="max-w-5xl w-full mx-auto my-4 sm:my-8 flex flex-col md:flex-row overflow-hidden lg:max-h-[80vh]">
          {/* Left Side - Image (hidden on mobile) */}
          <div className="hidden md:block md:w-1/2">
            <div className="h-full flex items-center justify-center">
              <img
                src={professionalImage}
                className="w-full h-full object-contain"
                alt="Professionals"
              />
            </div>
          </div>

          {/* Right Side - Form (full width on mobile) */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex items-center justify-center border-2 border-blue-50 md:border-l-0">
            <div className="w-full max-w-md">
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2 sm:mb-3">
                Welcome Back!
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8">Log in to your account.</p>

              <form onSubmit={submitHandler} className="space-y-5 sm:space-y-6">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={input.email}
                      onChange={changeEventHandler}
                      placeholder="Enter your email id*"
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type={input.showPassword ? "text" : "password"}
                      name="password"
                      value={input.password}
                      onChange={changeEventHandler}
                      placeholder="Password*"
                      className={`w-full pl-10 pr-10 py-3 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {input.showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      checked={input.rememberMe}
                      onChange={changeEventHandler}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 text-sm text-gray-600"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-sm text-blue-700 hover:text-blue-800 font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-900 text-white rounded-lg font-medium text-m hover:bg-blue-800 transition duration-200"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Sign Up Link */}
                <div className="text-center mt-4 sm:mt-6">
                  <div className="inline-block border border-blue-800 rounded-md p-3 sm:p-4 bg-white shadow-sm w-full">
                    <p className="text-gray-600 text-sm">
                      Don't have an account?{" "}
                      <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-900 cursor-pointer hover:underline font-semibold"
                      >
                        CREATE ONE
                      </span>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ForgotPassword
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default Login;