import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(",") || "",
    file: user?.profile?.resume || "",

    // Student-specific fields (only for students)
    ...(user?.role === "student"
      ? {
          currentLocation: user?.profile?.currentLocation || "",
          willingToRelocate: user?.profile?.willingToRelocate || false,
          visaStatus: user?.profile?.visaStatus || "",
          jobTitle: user?.profile?.jobTitle || "",
          jobDomain: user?.profile?.jobDomain || "",
        }
      : {}),
  });

  const changeEventHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setInput({
      ...input,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput({
      ...input,
      file: file,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    // Append student-specific fields if user is a student
    if (user?.role === "student") {
      formData.append("currentLocation", input.currentLocation);
      formData.append("willingToRelocate", input.willingToRelocate);
      formData.append("visaStatus", input.visaStatus);
      formData.append("jobTitle", input.jobTitle);
      formData.append("jobDomain", input.jobDomain);
    }

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${USER_API_END_POINT}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.status) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Render student-specific fields only for student users
  const renderStudentFields = () => {
    if (user?.role !== "student") return null;

    return (
      <>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="currentLocation"
            className="text-right font-medium text-gray-700"
          >
            Current Location
          </Label>
          <input
            type="text"
            id="currentLocation"
            name="currentLocation"
            value={input.currentLocation}
            onChange={changeEventHandler}
            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your current location"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="willingToRelocate"
            className="text-right font-medium text-gray-700"
          >
            Willing to Relocate
          </Label>
          <div className="col-span-3 flex items-center">
            <input
              type="checkbox"
              id="willingToRelocate"
              name="willingToRelocate"
              checked={input.willingToRelocate}
              onChange={changeEventHandler}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">I am willing to relocate</span>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="visaStatus"
            className="text-right font-medium text-gray-700"
          >
            Visa Status
          </Label>
          <select
  id="visaStatus"
  name="visaStatus"
  value={input.visaStatus}
  onChange={changeEventHandler}
  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
>
  <option value="">Select Visa Status</option>
  <option value="Citizen">Citizen</option>
  <option value="Permanent_Resident">Permanent Resident</option>
  <option value="Work_Visa">Work Visa</option>
  <option value="Student_Visa">Student Visa</option>
  <option value="Other">Other</option>
  <option value="US_Citizen">US Citizen</option>
  <option value="Green_Card_Holder">Green Card Holder</option>
  <option value="Employment_Authorization">Employment Authorization</option>
  <option value="Need_H1_Visa">Need H-1 Visa</option>
  <option value="Have_H1_Visa">Have H-1 Visa</option>
  <option value="TN_Permit_Holder">TN Permit Holder</option>
  <option value="Unspecified">Unspecified</option>
</select>

        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="jobTitle"
            className="text-right font-medium text-gray-700"
          >
            Job Title
          </Label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={input.jobTitle}
            onChange={changeEventHandler}
            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your target job title"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="">Job Domain</Label>
          <select
            name="jobDomain"
            value={input.jobDomain}
            onChange={changeEventHandler}
            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Engineering">Engineering</option>
            <option value="Finance & Accounting">Finance & Accounting</option>
            <option value="Education">Education</option>
            <option value="Marketing & Sales">Marketing & Sales</option>
            <option value="Legal">Legal</option>
            <option value="Creative & Media">Creative & Media</option>
            <option value="Supply Chain & Operations">
              Supply Chain & Operations
            </option>
            <option value="Human Resources">Human Resources</option>
            <option value="Hospitality & Tourism">Hospitality & Tourism</option>
            <option value="Energy">Energy</option>
            <option value="Retail">Retail</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Agriculture">Agriculture</option>
          </select>
        </div>
      </>
    );
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-lg p-6 rounded-lg shadow-lg bg-white border border-gray-300"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-gray-900">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-6 py-4">
            {/* Existing fields */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="fullname"
                className="text-right font-medium text-gray-700"
              >
                Name
              </Label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="email"
                className="text-right font-medium text-gray-700"
              >
                Email
              </Label>
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="phoneNumber"
                className="text-right font-medium text-gray-700"
              >
                Number
              </Label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your number"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="bio"
                className="text-right font-medium text-gray-700"
              >
                Bio
              </Label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write a short bio"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="skills"
                className="text-right font-medium text-gray-700"
              >
                Skills
              </Label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="List your skills (comma-separated)"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="file"
                className="text-right font-medium text-gray-700"
              >
                Resume
              </Label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf"
                onChange={fileChangeHandler}
                className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Student-specific fields */}
            {renderStudentFields()}

            {loading ? (
              <Button
                type="submit"
                className="w-full my-4 flex items-center justify-center"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md mt-4 my-4 hover:bg-gray-800"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;