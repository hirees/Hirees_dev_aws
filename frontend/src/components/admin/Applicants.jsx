import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Footer from "../Footer";

function Applicants() {
  const [applicants, setApplicants] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );

        if (res.data?.status) {
          setApplicants(res.data);
        } else {
          setError("Failed to fetch applicants");
          toast.error("Failed to fetch applicants");
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError(err?.response?.data?.message || "Failed to fetch applicants");
        toast.error("Error fetching applicants");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchAllApplicants();
    }
  }, [params.id]);

  return (
    <div>
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Button
              onClick={() => navigate("/admin/jobs")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-semibold bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 rounded-2xl px-4 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold">
              Applicants ({applicants?.applications?.length || 0})
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <ApplicantsTable applicants={applicants} />
          )}
        </div>
      </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Applicants;