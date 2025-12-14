import React, { useState, useEffect } from "react";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Button = ({ children, variant = "primary", type = "button", disabled, onClick, className = "" }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";
  const variants = {
    primary: "bg-blue-700 text-white hover:bg-blue-800 disabled:bg-blue-300",
    outline: "border-2 border-blue-700 text-blue-700 hover:bg-blue-50",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ value, onChange, required, name, type = "text", className = "" }) => (
  <input
    type={type}
    value={value || ""}
    onChange={onChange}
    required={required}
    name={name}
    className={`w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${className}`}
  />
);

const Textarea = ({ value, onChange, required, name, className = "" }) => (
  <textarea
    value={value || ""}
    onChange={onChange}
    required={required}
    name={name}
    className={`w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${className}`}
  />
);

const MultiSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option) => {
    const isSelected = value.some(item => item.value === option.value);
    const newValue = isSelected
      ? value.filter(item => item.value !== option.value)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <div className="relative">
      <div
        className="min-h-[38px] px-3 py-2 border-2 border-gray-200 rounded-md cursor-pointer hover:border-blue-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value?.length ? (
          <div className="flex flex-wrap gap-1">
            {value.map(item => (
              <span key={item.value} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                {item.label}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">Select options...</span>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-md shadow-lg">
          {options.map(option => (
            <div
              key={option.value}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                value?.some(item => item.value === option.value) ? 'bg-blue-100 text-blue-700' : ''
              }`}
              onClick={() => toggleOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HiringTeamMember = ({ member, onUpdate, onRemove, index }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate(index, {
      ...member,
      [name]: value
    });
  };

  return (
    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input
            name="name"
            value={member.name}
            onChange={handleChange}
            required
            placeholder="Name"
          />
        </div>
        <div>
          <Input
            name="email"
            type="email"
            value={member.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
        </div>
        <div>
          <Input
            name="position"
            value={member.position}
            onChange={handleChange}
            required
            placeholder="Position"
          />
        </div>
      </div>
      <Button variant="danger" onClick={() => onRemove(index)} className="p-2">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

const EditJobForm = () => {
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experience: "",
    location: "",
    jobType: [],
    hiringTeam: []
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobId = window.location.pathname.split('/').pop();
        const response = await fetch(`${JOB_API_END_POINT}/get/${jobId}`, {
          credentials: 'include',
        });
        const data = await response.json();

        if (data.status && data.job) {
          const job = data.job;
          let hiringTeam = [];
          try {
            hiringTeam = JSON.parse(job.hiringTeam || '[]');
          } catch (e) {
            console.error("Error parsing hiring team:", e);
          }

          setJobData({
            title: job.title || "",
            description: job.description || "",
            requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : job.requirements || "",
            salary: job.salary || "",
            experience: job.experience || "",
            location: job.location || "",
            jobType: Array.isArray(job.jobType) ? job.jobType : [],
            hiringTeam: hiringTeam
          });
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, []);

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobTypeChange = (selected) => {
    setJobData(prev => ({
      ...prev,
      jobType: selected?.map(item => item.value) || [],
    }));
  };

  const handleAddTeamMember = () => {
    setJobData(prev => ({
      ...prev,
      hiringTeam: [...prev.hiringTeam, {
        name: "",
        email: "",
        position: ""
      }]
    }));
  };

  const handleUpdateTeamMember = (index, updatedMember) => {
    setJobData(prev => ({
      ...prev,
      hiringTeam: prev.hiringTeam.map((member, i) =>
        i === index ? updatedMember : member
      )
    }));
  };

  const handleRemoveTeamMember = (index) => {
    setJobData(prev => ({
      ...prev,
      hiringTeam: prev.hiringTeam.filter((_, i) => i !== index)
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobId = window.location.pathname.split('/').pop();
      const formattedData = {
        ...jobData,
        requirements: jobData.requirements.split('\n').filter(req => req.trim()),
        hiringTeam: JSON.stringify(jobData.hiringTeam)
      };

      const response = await fetch(`${JOB_API_END_POINT}/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        toast.message("Job Updated successfully");
        navigate('/admin/jobs');
      } else {
        throw new Error("Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-8">Edit Job Posting</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
            <Input
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <Textarea
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              required
              className="min-h-[128px]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements (one per line)</label>
            <Textarea
              name="requirements"
              value={jobData.requirements}
              onChange={handleInputChange}
              required
              className="min-h-[96px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Salary</label>
              <Input
                name="salary"
                value={jobData.salary}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
              <Input
                name="experience"
                value={jobData.experience}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <Input
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
            <MultiSelect
              options={jobTypes.map(type => ({ label: type, value: type }))}
              value={(jobData.jobType || []).map(type => ({ label: type, value: type }))}
              onChange={handleJobTypeChange}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-gray-700">Hiring Team</label>
              <Button variant="outline" onClick={handleAddTeamMember} className="text-sm">
                Add Team Member
              </Button>
            </div>
            <div className="space-y-4">
              {jobData.hiringTeam.map((member, index) => (
                <HiringTeamMember
                  key={index}
                  member={member}
                  index={index}
                  onUpdate={handleUpdateTeamMember}
                  onRemove={handleRemoveTeamMember}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/jobs')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobForm;