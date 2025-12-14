import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "sonner";

import Navbar from "../shared/Navbar";
import JobPreview from "./JobPreview";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";

const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Contract to Hire",
  "Internship",
  "Freelance",
  "Contract",
];

function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [hiringTeam, setHiringTeam] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    company: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (response.data.status && response.data.companies.length > 0) {
          const fetchedCompanies = response.data.companies;
          setCompanies(fetchedCompanies);
          setSelectedCompany(fetchedCompanies[0]);
          setInput(prev => ({ ...prev, company: fetchedCompanies[0].companyId }));
        } else {
          toast.error("No companies found. Please create a company first.");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("Failed to fetch companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const addTeamMember = () => {
    setHiringTeam([...hiringTeam, { name: "", email: "", position: "", displayInJob: true }]);
  };

  const removeTeamMember = (index) => {
    setHiringTeam(hiringTeam.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index, field, value) => {
    const newTeam = [...hiringTeam];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setHiringTeam(newTeam);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.company) {
      toast.error("Please create a company first");
      return;
    }

    try {
      const response = await axios.post(
        `${JOB_API_END_POINT}/postjob`,
        {
          ...input,
          description: input.description,
          requirements: input.requirements,
          hiringTeam: JSON.stringify(hiringTeam)
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status) {
        navigate("/admin/jobs");
        toast.success("Job posted successfully!");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const previewJob = {
    ...input,
    company: selectedCompany,
    hiringTeam,
    createdAt: new Date().toISOString(),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-blue-500">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="mb-6 flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </button>

        {companies.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl shadow">
            <p className="text-lg text-red-500">No companies found. Please create a company first.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
              Post New Job
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title - Using standard HTML input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-600">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>

              {/* Location - Using standard HTML input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-600">Location</label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={handleChange}
                  placeholder="Enter job location"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>
            </div>

            {/* Job Description - Using standard HTML textarea */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-blue-600">Job Description</label>
              <textarea
                name="description"
                value={input.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base resize-none"
                style={{ whiteSpace: "pre-wrap" }}
              ></textarea>
            </div>

            {/* Requirements - Using standard HTML textarea */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-blue-600">Requirements</label>
              <textarea
                name="requirements"
                value={input.requirements}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-base resize-none"
                style={{ whiteSpace: "pre-wrap" }}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Job Type - Using the original Select component */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-blue-600">Job Type</Label>
                <Select
                  onValueChange={(value) =>
                    setInput((prev) => ({ ...prev, jobType: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience - Using standard HTML input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-600">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={handleChange}
                  placeholder="Enter required experience"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>

              {/* Salary - Using standard HTML input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-blue-600">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={handleChange}
                  placeholder="Enter salary range"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-lg font-semibold text-blue-600">
                  Hiring Team
                </label>
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Team Member
                </button>
              </div>

              <div className="space-y-4">
                {hiringTeam.map((member, index) => (
                  <div key={index} className="relative bg-gray-50 p-6 rounded-lg">
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Name - Using standard HTML input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-blue-600">Name</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                          placeholder="Team member's name"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                      </div>

                      {/* Email - Using standard HTML input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-blue-600">Email</label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                          placeholder="Email address"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                      </div>

                      {/* Position - Using standard HTML input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-blue-600">Position</label>
                        <input
                          type="text"
                          value={member.position}
                          onChange={(e) => updateTeamMember(index, "position", e.target.value)}
                          placeholder="Job position"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="w-32 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
                  >
                    Preview
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Job Post Preview</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <JobPreview job={previewJob} />
                  </div>
                </DialogContent>
              </Dialog>

              <button
                type="submit"
                className="w-48 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg"
              >
                Post Job
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PostJob;