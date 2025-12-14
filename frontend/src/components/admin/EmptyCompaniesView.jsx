import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Shield,
  Mail,
  Plus,
  Building2,
  ArrowRight,
} from "lucide-react";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Footer from "../Footer";

const EmptyCompaniesView = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);

  // OTP related states
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  // Check if user can create a company
  const userCompanies = useSelector((state) => state.company.allCompanies);
  const [canCreateCompany, setCanCreateCompany] = useState(true);

  useEffect(() => {
    // Determine if user can create a company (only if they have none)
    if (userCompanies !== undefined) {
      setCanCreateCompany(userCompanies.length === 0);
    }
  }, [userCompanies]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Fetching company data from your backend route
        const response = await fetch(`${COMPANY_API_END_POINT}/getall`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch companies.");
        }

        const data = await response.json();
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    // Filter companies based on search query
    if (searchQuery.trim() === "") {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter((company) =>
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [searchQuery, companies]);

  const handleRequestJoin = async (company) => {
    setRequestingId(company.companyId);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user.email : null;

      if (!userId) {
        alert("User not logged in.");
        return;
      }

      // Sending the join request to the backend
      const response = await fetch(`${COMPANY_API_END_POINT}/request-join`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyId: company.companyId, userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to request join");
      }

      const data = await response.json();
      setAdminEmail(data.adminEmail);

      // Open OTP dialog and set current company
      setCurrentCompany(company);
      setOtpDialogOpen(true);
    } catch (error) {
      console.error("Error requesting to join company:", error);
      alert(error.message || "Failed to request join");
    } finally {
      setRequestingId(null);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setOtpLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user.email : null;

      if (!userId || !currentCompany) {
        throw new Error("Missing user or company information");
      }

      // Verifying OTP and joining company
      const response = await fetch(`${COMPANY_API_END_POINT}/verify-join`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: currentCompany.companyId,
          userId,
          code: otp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to verify OTP");
      }

      // Close dialog and navigate to dashboard
      setOtpDialogOpen(false);
      navigate(`/admin/jobs`);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert(error.message || "Failed to verify OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="min-h-[80vh] flex flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Company Directory
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Join an existing company or set up your own
        </p>
        <div className="mt-6 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </motion.div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search companies..."
          className="pl-10 w-full h-12 rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto mb-8">
          {filteredCompanies.length === 0 ? (
            <motion.div
              className="text-center py-12 h-full flex flex-col justify-center"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              <div className="bg-gray-50 rounded-xl p-8 max-w-lg mx-auto shadow-sm border border-gray-200">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  No matching companies found
                </h3>
                <p className="text-gray-600 mb-8">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : "There are no companies available to join at the moment"}
                </p>

                {canCreateCompany ? (
                  <div className="mt-2">
                    <Separator className="my-6" />
                    <p className="text-blue-700 font-medium text-lg mb-4">
                      Don't see your company?
                    </p>
                    <Button
                      onClick={() => navigate("/admin/companies/create")}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                      size="lg"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Create Your Own Company
                      <ArrowRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-6 text-amber-700 bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm">
                      You already have a company and cannot create another one.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredCompanies.map((company, index) => (
                  <motion.div
                    key={company.companyId}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-50 rounded-lg h-14 w-14 flex items-center justify-center text-blue-700">
                        {company?.logo ? (
                          <img
                            src={company?.logo}
                            alt={`${company?.companyName || "Company"} logo`}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <Building2 className="w-8 h-8 text-blue-500" />
                        )}
                      </div>
                      <h2 className="text-xl font-semibold ml-4 text-gray-800">
                        {company.companyName}
                      </h2>
                    </div>

                    <Separator className="my-4" />

                    {company.description && (
                      <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">
                        {company.description}
                      </p>
                    )}

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 h-10"
                      onClick={() => handleRequestJoin(company)}
                      disabled={requestingId === company.companyId}
                    >
                      {requestingId === company.companyId ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></span>
                          Requesting...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Request to Join
                        </>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Bottom create company banner when companies exist */}
              {canCreateCompany && (
                <motion.div
                  className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100 flex flex-col md:flex-row items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Don't see your company?
                    </h3>
                    <p className="text-gray-600">
                      Create your own company profile in just a few steps
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate("/admin/companies/create")}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your Company
                    <ArrowRight className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      )}

      {/* OTP Verification Dialog */}
      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              OTP Verification
            </DialogTitle>
            <DialogDescription className="text-center">
              {currentCompany && (
                <>
                  An OTP has been sent to the admin of{" "}
                  <strong className="text-blue-600">
                    {currentCompany.companyName}
                  </strong>
                  .
                </>
              )}
              <div className="flex items-center mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <Mail className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                <span className="text-sm">
                  Contact admin at{" "}
                  <strong className="text-amber-700">{adminEmail}</strong> to
                  get the verification code
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="text-center text-lg font-mono tracking-wider h-12 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOtpDialogOpen(false)}
              className="w-full sm:w-auto rounded-lg border-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleVerifyOtp}
              disabled={otpLoading || otp.length !== 6}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {otpLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></span>
                  Verifying...
                </>
              ) : (
                "Verify & Join"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmptyCompaniesView;