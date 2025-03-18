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
import { Loader2 } from "lucide-react";
import ForgotPassword from './ForgotPassword';  // Adjust the import path as needed

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
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}$/;
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
    if (user?.role=="recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-xl rounded-lg w-[90%] sm:w-[400px] p-6"
        >
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Login
          </h1>
          {/* Email Input */}
          <div className="mb-4">
            <Label>
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="email@gmail.com"
              className={`mt-2 w-full border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <Label>
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
              className={`mt-2 w-full border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-md ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            {/* Add Forgot Password link */}
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Forgot Password?
              </button>
            </div>
          </div>
          {/* Submit Button */}
          {loading ? (
            <Button className="w-full py-2 bg-indigo-500 text-white rounded-lg flex items-center justify-center shadow-md">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105"
            >
              Login
            </Button>
          )}
        </form>
      </div>

      {/* Add Forgot Password Modal */}
      <ForgotPassword
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </div>
  );
};

export default Login;

//   return (
//     <div className="min-h-screen flex flex-col">
//       {}
//       <Navbar />

//       {}
//       <div className="flex-grow  flex items-center  justify-center">
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
//     </div>
//   );
// };

// export default Login;
