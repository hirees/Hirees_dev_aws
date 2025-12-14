import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

const ForgotPassword = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
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
      const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, {
        email,
      });
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
        code: verificationCode,
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
        password: passwords.password,
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
      <DialogContent className="sm:max-w-[425px] px-10">
        <DialogHeader>
          <DialogTitle className="mt-3 text-3xl text-[#012760] font-bold">
            {step === 1 && "Forgot Password ?"}
            {step === 2 && "Enter Verification Code"}
            {step === 3 && "Reset Password"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label className="font-semibold text-[#747474]  ">
                Enter the registered email. You will recieve an <br />
                code to reset the password.
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email id*"
                className={`mt-2 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <Button
              className="w-full bg-[#012760] "
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
            <div className="px-16 text-sm font-semibold text-[#747474]">
              <p>
                If you need further assistance <br />
                <span className="text-[#012760] cursor-pointer">
                  &nbsp;&nbsp;&nbsp;contact our support team.
                </span>
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Enter the 6-digit code shared with you<br/> over mail.</Label>
              <div className="flex gap-2 mt-4">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    value={verificationCode[index] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      // If input is a digit or empty
                      if (value === "" || /^[0-9]$/.test(value)) {
                        // Create a new string by replacing the character at the specific index
                        const newCode =
                          verificationCode.substring(0, index) +
                          value +
                          verificationCode.substring(index + 1);
                        setVerificationCode(newCode.substring(0, 6));

                        // Move focus to next input if value is entered and not the last box
                        if (value !== "" && index < 5) {
                          const nextInput = e.target.parentElement.nextElementSibling?.querySelector(
                            "input"
                          );
                          if (nextInput) nextInput.focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      // Move to previous input when backspace is pressed on an empty input
                      if (
                        e.key === "Backspace" &&
                        !verificationCode[index] &&
                        index > 0
                      ) {
                        const prevInput = e.target.parentElement.previousElementSibling?.querySelector(
                          "input"
                        );
                        if (prevInput) prevInput.focus();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pastedData = e.clipboardData.getData("text");
                      if (!pastedData) return;

                      // Clean input to only keep digits
                      const cleanedInput = pastedData
                        .replace(/[^0-9]/g, "")
                        .substring(0, 6);
                      setVerificationCode(
                        cleanedInput.padEnd(
                          verificationCode.length,
                          verificationCode.substring(cleanedInput.length)
                        )
                      );

                      // Focus appropriate input after paste
                      if (cleanedInput.length < 6) {
                        const nextInput = e.target.parentElement.parentElement.children[
                          cleanedInput.length
                        ]?.querySelector("input");
                        if (nextInput) setTimeout(() => nextInput.focus(), 0);
                      }
                    }}
                    maxLength={1}
                    className={`w-10 h-10 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.code ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">{errors.code}</p>
              )}
            </div>
            <Button
              className="w-full bg-[#012760]"
              onClick={handleVerifyCode}
              disabled={loading || verificationCode.length !== 6}
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
              <Label>Your password must be different from your <br/> previous passwords.</Label>
              <div className="relative mt-5">
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
                    setPasswords({
                      ...passwords,
                      confirmPassword: e.target.value,
                    })
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
              className="w-full bg-[#012760]"
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
