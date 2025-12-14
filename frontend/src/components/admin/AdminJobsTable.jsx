import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Edit2,
  Eye,
  MoreHorizontal,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import {JOB_API_END_POINT} from "@/utils/constant.js";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (allAdminJobs && Array.isArray(allAdminJobs)) {
      setFilterJobs(allAdminJobs);
    }
  }, [allAdminJobs]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allAdminJobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm)
    );
    setFilterJobs(filtered);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!jobToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const  currentUserId = user ? user.email : null;
      console.log(jobToDelete.jobId);
      const response = await axios.delete(`${JOB_API_END_POINT}/delete/${jobToDelete.jobId}`, {
        data: { userId: currentUserId },
        withCredentials: true,
      });


      if (response.data.status) {
        toast.success("Job deleted successfully");
        // Filter out the deleted job from the local state
        setFilterJobs(prev => prev.filter(job => job.jobId !== jobToDelete.jobId));
      } else {
        toast.error(response.data.error || "Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error(
          error.response?.data?.error ||
          error.message ||
          "An error occurred while deleting the job"
      );
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setJobToDelete(null);
    }
  };

  // Mobile card view component
  const JobCard = ({ job }) => (
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{job?.title || "N/A"}</h3>
            <p className="text-gray-600">{job?.company?.CompanyName || "N/A"}</p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="space-y-2">
                <button
                    onClick={() => navigate(`/admin/jobs/edit/${job.jobId}`)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                    onClick={() => navigate(`/admin/jobs/${job.jobId}/applicants`)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                >
                  <Eye className="w-4 h-4" />
                  <span>Applicants</span>
                </button>
                <button
                    onClick={() => handleDeleteClick(job)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-1 text-sm text-gray-600">
          <p>Type: {job?.jobType?.join(", ") || "N/A"}</p>
          <p>Salary: {job?.salary || "N/A"}</p>
          <p>Posted: {formatDate(job?.createdAt)}</p>
        </div>
      </div>
  );

  return (
      <div className="w-full">
        <div className="px-4 sm:px-0 mb-4">
          <input
              type="text"
              placeholder="Search jobs..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFilter}
          />
        </div>

        {isMobile ? (
            <div className="px-4 sm:px-0">
              {filterJobs.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">No Jobs found</div>
              ) : (
                  filterJobs.map((job) => (
                      <JobCard key={job.jobId} job={job} />
                  ))
              )}
            </div>
        ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>A list of your recently posted Jobs</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Company</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Salary</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterJobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500">
                          No Jobs found
                        </TableCell>
                      </TableRow>
                  ) : (
                      filterJobs.map((job) => (
                          <TableRow key={job.jobId} className="hover:bg-gray-50">
                            <TableCell className="max-w-[200px] truncate">
                              {job?.company?.CompanyName || "N/A"}
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {job?.title || "N/A"}
                            </TableCell>
                            <TableCell className="max-w-[150px] truncate">
                              {job?.jobType?.join(", ") || "N/A"}
                            </TableCell>
                            <TableCell>{formatDate(job?.createdAt)}</TableCell>
                            <TableCell>{job?.salary || "N/A"}</TableCell>
                            <TableCell className="text-right">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <MoreHorizontal className="w-5 h-5" />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-40">
                                  <div className="space-y-2">
                                    <button
                                        onClick={() => navigate(`/admin/jobs/edit/${job.jobId}`)}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                      <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => navigate(`/admin/jobs/${job.jobId}/applicants`)}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                                    >
                                      <Eye className="w-4 h-4" />
                                      <span>Applicants</span>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(job)}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      <span>Delete</span>
                                    </button>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </TableCell>
                          </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
        )}

        {/* Confirmation Dialog for Delete */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Delete Job
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{jobToDelete?.title}"? This action cannot be undone and all applications for this job will be inaccessible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  );
};

export default AdminJobsTable;