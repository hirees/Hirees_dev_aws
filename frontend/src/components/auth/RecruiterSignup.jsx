// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "@/redux/authSlice";
// import { Loader2 } from "lucide-react";
// import { USER_API_END_POINT } from "@/utils/constant";
// import logo from "@/assets/logo.png";
// import Navbar from "../shared/Navbar";
// import RecruiterSlideshow from "./RecruiterSlideshow";

// const RecruiterSignup = () => {
//   const [input, setInput] = useState({
//     Name: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     file: "",
//     country: "USA",
//     role: "recruiter",
//   });
//   const [errors, setErrors] = useState({});
//   const { loading, user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };
//   const isValidEmail = (email) => {
//     // RFC 5322 compliant email regex
//     const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
//     return emailRegex.test(email);
//   };

//   const validateForm = () => {
//     const { Name, email, phoneNumber, password, country } = input;
//     const newErrors = {};

//     // if (!firstName) newErrors.firstName = "First Name is required";
//     if (!Name) newErrors.Name = "Name is required";
//     if (!email) newErrors.email = "Email is required";
//     if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
//     if (!password) newErrors.password = "Password is required";
//     if (!country) newErrors.country = "Country is required";

//     if (password && password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters long";
//     }

//     if (email && !isValidEmail(email)) {
//       newErrors.email = "Invalid email format";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const formData = new FormData();
//     // const fullname = `${input.firstName} ${input.lastName}`;
//     formData.append("fullname", input.Name);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("password", input.password);
//     formData.append("role", "recruiter");
//     formData.append("country", input.country);
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
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div>
//       <Navbar></Navbar>
//       <div className="h-screen flex overflow-hidden ">
//         {/* Left Side - Compelling Description */}
//         {/* Left Side - Compelling Description */}
//         <div className="w-1/2 bg-gradient-to-br from-blue-700 to-blue-600 text-white flex flex-col justify-center p-8 relative overflow-hidden max-w-6xl">
//           {/* Top Header with Text */}
//           <div className="absolute top-6 left-6">
//             {/* <a onClick={()=>navigate('/')}>
//             <h2 className="text-xl font-semibold bg-white text-blue-700 px-4 py-2 rounded-full shadow-md animate-fadeIn">
//               Welcome Hirees 🎯
//             </h2>
//             </a> */}
//           </div>

//           {/* Main Content */}
//           <div className="space-y-6 animate-slideUp">
//             <h1 className="text-4xl font-bold">
//               Unlock Your Hiring Potential 🌟
//             </h1>
//             <p className="text-lg leading-relaxed opacity-90">
//               Transform your recruitment strategy with our cutting-edge
//               platform. 💡 Connect with top-tier talent, streamline your hiring
//               process, and build your dream team faster than ever before.
//             </p>

//             {/* Features List */}
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <span className="text-2xl">🔍</span>
//                 <span className="text-lg font-medium">
//                   Advanced Talent Matching
//                 </span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span className="text-2xl">💰</span>
//                 <span className="text-lg font-medium">
//                   Cost-Effective Recruitment
//                 </span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span className="text-2xl">⚡</span>
//                 <span className="text-lg font-medium">
//                   Instant Candidate Insights
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="absolute bottom-4 left-4 text-sm opacity-70">
//             © 2024 Hirees
//           </div>
//         </div>

//         {/* Right Side - Signup Form */}
//         <div className="w-1/2 flex items-center justify-center bg-gray-100 p-8 overflow-y-auto">
//           <form
//             onSubmit={submitHandler}
//             className="w-full max-w-md bg-white shadow-xl rounded-xl p-6"
//           >
//             <h2 className="text-3xl font-bold text-black text-center mb-6">
//               Employer Signup
//             </h2>
//             {[
//               // { label: "First Name", name: "firstName", type: "text", placeholder: "First Name" },
//               {
//                 label: "Name",
//                 name: "Name",
//                 type: "text",
//                 placeholder: "Name",
//               },
//               {
//                 label: "Email",
//                 name: "email",
//                 type: "email",
//                 placeholder: "email@gmail.com",
//               },
//               {
//                 label: "Phone Number",
//                 name: "phoneNumber",
//                 type: "text",
//                 placeholder: "8080808080",
//               },
//               {
//                 label: "Password",
//                 name: "password",
//                 type: "password",
//                 placeholder: "Password",
//               },
//             ].map((field, idx) => (
//               <div className="mb-3" key={idx}>
//                 <Label className="text-black">
//                   {field.label} <span className="text-red-600">*</span>
//                 </Label>
//                 <Input
//                   type={field.type}
//                   value={input[field.name]}
//                   name={field.name}
//                   onChange={changeEventHandler}
//                   placeholder={field.placeholder}
//                   className={`mt-1 border ${
//                     errors[field.name] ? "border-red-600" : "border-gray-300"
//                   } rounded-md p-2 w-full`}
//                 />
//                 {errors[field.name] && (
//                   <p className="text-red-600 text-sm mt-1">
//                     {errors[field.name]}
//                   </p>
//                 )}
//               </div>
//             ))}

//             <div className="mb-3">
//               <Label className="text-black">
//                 Country <span className="text-red-600">*</span>
//               </Label>
//               <select
//                 name="country"
//                 value={input.country}
//                 onChange={changeEventHandler}
//                 className="mt-1 border border-gray-300 rounded-md p-2 w-full"
//               >
//                 <option value="USA">USA</option>
//                 <option value="India">India</option>
//                 <option value="Canada">Canada</option>
//                 <option value="Uk">Uk</option>
//               </select>
//             </div>

//             <div className="mb-3">
//               <Label className="text-black">Company Logo</Label>
//               <Input
//                 accept="image/*"
//                 type="file"
//                 onChange={changeFileHandler}
//                 className="mt-1 cursor-pointer"
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full mt-3 bg-blue-700 hover:bg-blue-800 text-white"
//             >
//               {loading ? (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               ) : (
//                 "Create Employer Account"
//               )}
//             </Button>

//             <div className="text-center mt-3">
//               <span className="text-sm text-black">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-blue-700 hover:underline">
//                   Login
//                 </Link>
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterSignup;








import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";

const RecruiterSignup = () => {
  const [input, setInput] = useState({
    Name: "",
    email: "",
    phoneNumber: "",
    password: "",
    file: "",
    country: "USA",
    role: "recruiter",
  });
  const [errors, setErrors] = useState({});
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler functions remain the same
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const { Name, email, phoneNumber, password, country } = input;
    const newErrors = {};

    if (!Name) newErrors.Name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!password) newErrors.password = "Password is required";
    if (!country) newErrors.country = "Country is required";

    if (password && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (email && !isValidEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("fullname", input.Name);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", "recruiter");
    formData.append("country", input.country);

    if (input.file) {
      formData.append("file", input.file);
    }

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

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen">


        {/* Right Side - Form (Full width on mobile, half on desktop) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <form onSubmit={submitHandler} className="w-full max-w-md bg-white  rounded-xl p-4 md:p-6 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 text-center mb-6">
              Employer Signup
            </h2>

            <div className="space-y-4">
              {[
                {
                  label: "Name",
                  name: "Name",
                  type: "text",
                  placeholder: "Name",
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "email@gmail.com",
                },
                {
                  label: "Phone Number",
                  name: "phoneNumber",
                  type: "text",
                  placeholder: "8080808080",
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  placeholder: "Password",
                },
              ].map((field, idx) => (
                <div className="space-y-1" key={idx}>
                  <Label className="text-black flex items-center">
                    {field.label} <span className="text-red-600 ml-1">*</span>
                  </Label>
                  <Input
                    type={field.type}
                    value={input[field.name]}
                    name={field.name}
                    onChange={changeEventHandler}
                    placeholder={field.placeholder}
                    className={`w-full ${
                      errors[field.name] ? "border-red-600" : "border-gray-300"
                    }`}
                  />
                  {errors[field.name] && (
                    <p className="text-red-600 text-sm">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              <div className="space-y-1">
                <Label className="text-black flex items-center">
                  Country <span className="text-red-600 ml-1">*</span>
                </Label>
                <select
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="USA">USA</option>
                  <option value="India">India</option>
                  <option value="Canada">Canada</option>
                  <option value="Uk">UK</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-black">Company Logo</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Employer Account"
                )}
              </Button>

              <div className="text-center">
                <span className="text-sm text-black">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-700 hover:underline">
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
         {/* Left Side - Hidden on mobile, visible on desktop */}
         <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-blue-600 text-white flex-col justify-center p-8 relative overflow-hidden">
          <div className="space-y-6 animate-slideUp">
            <h1 className="text-4xl font-bold">
              Unlock Your Hiring Potential 🌟
            </h1>
            <p className="text-lg leading-relaxed opacity-90">
              Transform your recruitment strategy with our cutting-edge platform.
              💡 Connect with top-tier talent, streamline your hiring process,
              and build your dream team faster than ever before.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔍</span>
                <span className="text-lg font-medium">
                  Advanced Talent Matching
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💰</span>
                <span className="text-lg font-medium">
                  Cost-Effective Recruitment
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⚡</span>
                <span className="text-lg font-medium">
                  Instant Candidate Insights
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 text-sm opacity-70">
            © 2024 Hirees
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RecruiterSignup;