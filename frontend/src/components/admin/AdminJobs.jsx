import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAdminAllJobs from "@/hooks/useGetAllAdmin";
import Footer from "../Footer";

function AdminJobs() {
  useGetAdminAllJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-4 sm:my-6 lg:my-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-4 sm:my-5">
          <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
          <Button
            className="w-full sm:w-auto bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
            onClick={() => navigate("/admin/jobs/post")}
          >
            Post New Jobs
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow">
          <AdminJobsTable />
        </div>
      </div>

      </div>
      <Footer></Footer>

    </div>
  );
}

export default AdminJobs;