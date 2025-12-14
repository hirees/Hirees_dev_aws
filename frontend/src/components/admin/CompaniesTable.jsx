import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Globe, Edit2, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "@/hooks/useGetAllCompanies";

import { useSelector } from "react-redux";

const CompanyDashboard = () => {
  useGetAllCompany();
  const navigate = useNavigate();
  const { allCompanies: companies } = useSelector((store) => store.company);
  const company = companies[0];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="max-w-5xl mx-auto">
        <div className="">
          <CardHeader className="border-b p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto md:gap-3">
                <div className="h-16 w-16 sm:h-20 sm:w-20  p-1 flex-shrink-0">
                  <img
                    src={company.logo}
                    alt="Company Logo"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl font-medium text-[#444444] break-words md:text-3xl ">
                    {company.CompanyName}
                  </h1>
                  <p className="lg:text-sm sm:text-sm text-[#949494] mb-2 ">
                    Registered on {formatDate(company.createdAt)}
                  </p>
                </div>
              </div>
              <Button
                onClick={() =>
                  navigate(`/admin/companies/${company.companyId}`)
                }
                className="w-full sm:w-auto text-[#012760] bg-white border border-[#012760] hover:bg-[#012760] hover:text-white transition-all duration-300 underline font-medium"
              >
                <Edit2 className="h-4 w-4  text-[#012760] hover:text-white " />
                Edit Details
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-6">
                <div className=" p-4 rounded-lg">
                  <div className="flex items-center gap-2  mb-5">
                    <Building className="h-6 w-6 flex-shrink-0 text-[#012760]" />
                    <h2 className="font-semibold text-m">About Company</h2>
                  </div>
                  <p className="text-sm sm:text-base text-[#949494] break-words md:text-sm">
                    {company.description !== "nothing"
                      ? company.description
                      : "No description provided"}
                  </p>
                </div>
              </div>

              <div className="">
                <div className="p-3.5 rounded-lg bg-[#97C0FF]/20">
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-4 w-4 flex-shrink-0 text-[#012760]" />
                    <p className="text-sm break-words">
                      {company.website !== "nothing" ? (
                        <a
                          href={
                            company.website.startsWith("http")
                              ? company.website
                              : `https://${company.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {company.website}
                        </a>
                      ) : (
                        "Website not provided"
                      )}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#97C0FF]/20 mt-4">
                  <div className="flex items-center gap-2.5 text-blue-700">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-[#012760]" />
                    <p className="text-sm text-gray-600 break-words">
                      {company.location !== "nothing"
                        ? company.location
                        : "Location not specified"}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#97C0FF]/20 mt-4">
                  <div className="flex items-center gap-2.5 text-blue-700">
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-[#012760]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 break-words">
                      {company.userId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px bg-gray-200 mt-8"></div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
