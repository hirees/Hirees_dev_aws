// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { toast } from "sonner"
// import { Loader2 } from "lucide-react"
// import axios from "axios"
// import { USER_API_END_POINT } from "@/utils/constant"

// const ForgotPassword = ({ open, onClose }) => {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [verificationCode, setVerificationCode] = useState("");
//   const [passwords, setPasswords] = useState({
//     password: "",
//     confirmPassword: ""
//   });
//   const [errors, setErrors] = useState({});

//   const validateEmail = () => {
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
//     if (!email) {
//       setErrors({ email: "Email is required" });
//       return false;
//     }
//     if (!emailPattern.test(email)) {
//       setErrors({ email: "Invalid email format" });
//       return false;
//     }
//     return true;
//   };

//   const validateCode = () => {
//     if (!verificationCode) {
//       setErrors({ code: "Verification code is required" });
//       return false;
//     }
//     if (verificationCode.length !== 6) {
//       setErrors({ code: "Code must be 6 digits" });
//       return false;
//     }
//     return true;
//   };

//   const validatePasswords = () => {
//     const newErrors = {};
//     if (!passwords.password) {
//       newErrors.password = "Password is required";
//     }
//     if (!passwords.confirmPassword) {
//       newErrors.confirmPassword = "Confirm password is required";
//     }
//     if (passwords.password !== passwords.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//     if (passwords.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSendCode = async () => {
//     if (!validateEmail()) return;

//     try {
//       setLoading(true);
//       const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, { email });
//       if (res.data.success) {
//         toast.success("Verification code sent to your email");
//         setStep(2);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyCode = async () => {
//     if (!validateCode()) return;

//     try {
//       setLoading(true);
//       const res = await axios.post(`${USER_API_END_POINT}/verify-code`, {
//         email,
//         code: verificationCode
//       });
//       if (res.data.success) {
//         toast.success("Code verified successfully");
//         setStep(3);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Invalid code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!validatePasswords()) return;

//     try {
//       setLoading(true);
//       const res = await axios.post(`${USER_API_END_POINT}/reset-password`, {
//         email,
//         code: verificationCode,
//         password: passwords.password
//       });
//       if (res.data.success) {
//         toast.success("Password reset successfully");
//         onClose();
//         setStep(1);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>
//             {step === 1 && "Forgot Password"}
//             {step === 2 && "Enter Verification Code"}
//             {step === 3 && "Reset Password"}
//           </DialogTitle>
//         </DialogHeader>

//         {step === 1 && (
//           <div className="space-y-4">
//             <div>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className={`mt-2 ${errors.email ? "border-red-500" : ""}`}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>
//             <Button
//               className="w-full"
//               onClick={handleSendCode}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Code
//                 </>
//               ) : (
//                 "Send Code"
//               )}
//             </Button>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-4">
//             <div>
//               <Label>Verification Code</Label>
//               <Input
//                 type="text"
//                 value={verificationCode}
//                 onChange={(e) => setVerificationCode(e.target.value)}
//                 placeholder="Enter 6-digit code"
//                 maxLength={6}
//                 className={`mt-2 ${errors.code ? "border-red-500" : ""}`}
//               />
//               {errors.code && (
//                 <p className="text-red-500 text-sm mt-1">{errors.code}</p>
//               )}
//             </div>
//             <Button
//               className="w-full"
//               onClick={handleVerifyCode}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying
//                 </>
//               ) : (
//                 "Verify Code"
//               )}
//             </Button>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="space-y-4">
//             <div>
//               <Label>New Password</Label>
//               <Input
//                 type="password"
//                 value={passwords.password}
//                 onChange={(e) =>
//                   setPasswords({ ...passwords, password: e.target.value })
//                 }
//                 placeholder="Enter new password"
//                 className={`mt-2 ${errors.password ? "border-red-500" : ""}`}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>
//             <div>
//               <Label>Confirm Password</Label>
//               <Input
//                 type="password"
//                 value={passwords.confirmPassword}
//                 onChange={(e) =>
//                   setPasswords({ ...passwords, confirmPassword: e.target.value })
//                 }
//                 placeholder="Confirm new password"
//                 className={`mt-2 ${
//                   errors.confirmPassword ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>
//             <Button
//               className="w-full"
//               onClick={handleResetPassword}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting
//                 </>
//               ) : (
//                 "Reset Password"
//               )}
//             </Button>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ForgotPassword;
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff } from "lucide-react"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"

const ForgotPassword = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
    if (!email) {
      setErrors({ email: "Email is required" });
      return false;
    }
    if (!emailPattern.test(email)) {
      setErrors({ email: "Invalid email format" });
      return false;
    }
    return true;
  };

  const validateCode = () => {
    if (!verificationCode) {
      setErrors({ code: "Verification code is required" });
      return false;
    }
    if (verificationCode.length !== 6) {
      setErrors({ code: "Code must be 6 digits" });
      return false;
    }
    return true;
  };

  const validatePasswords = () => {
    const newErrors = {};
    if (!passwords.password) {
      newErrors.password = "Password is required";
    }
    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    }
    if (passwords.password !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (passwords.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async () => {
    if (!validateEmail()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, { email });
      if (res.data.success) {
        toast.success("Verification code sent to your email");
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!validateCode()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/verify-code`, {
        email,
        code: verificationCode
      });
      if (res.data.success) {
        toast.success("Code verified successfully");
        setStep(3);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validatePasswords()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/reset-password`, {
        email,
        code: verificationCode,
        password: passwords.password
      });
      if (res.data.success) {
        toast.success("Password reset successfully");
        onClose();
        setStep(1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Forgot Password"}
            {step === 2 && "Enter Verification Code"}
            {step === 3 && "Reset Password"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`mt-2 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <Button
              className="w-full"
              onClick={handleSendCode}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Code
                </>
              ) : (
                "Send Code"
              )}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Verification Code</Label>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className={`mt-2 ${errors.code ? "border-red-500" : ""}`}
              />
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">{errors.code}</p>
              )}
            </div>
            <Button
              className="w-full"
              onClick={handleVerifyCode}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying
                </>
              ) : (
                "Verify Code"
              )}
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label>New Password</Label>
              <div className="relative mt-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={passwords.password}
                  onChange={(e) =>
                    setPasswords({ ...passwords, password: e.target.value })
                  }
                  placeholder="Enter new password"
                  className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <Label>Confirm Password</Label>
              <div className="relative mt-2">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm new password"
                  className={`pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <Button
              className="w-full"
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;