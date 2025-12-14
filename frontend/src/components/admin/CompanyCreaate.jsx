import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import useGetAllCompany from "@/hooks/useGetAllCompanies";

function CompanyCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Get companies from Redux store
  useGetAllCompany();
  const companies = useSelector((state) => state.company.allCompanies);

  // Check if user has access to create page
  useEffect(() => {
    // Redirect if companies exist and length is greater than 1
    if (companies !== undefined) {
      if (companies.length >= 1) {
        toast.error("You already have a company and cannot create another one");
        navigate('/admin/companies');
      }
      setIsLoading(false);
    }
  }, [companies, navigate]);

  const registerNewCompany = async () => {
    if (!companyName || companyName.trim() === "") {
      toast.error("Company name is required");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.status) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message || "Company Created Successfully");
        // Navigate to company list page after successful registration
        navigate(`/admin/companies`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create company");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state until we check companies
  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="my-2 rounded-xl"
          placeholder="JobHunt, Microsoft etc."
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            className="border border-black text-black rounded-xl"
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="bg-black text-white rounded-xl hover:bg-black"
            onClick={registerNewCompany}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></span>
                Processing...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;