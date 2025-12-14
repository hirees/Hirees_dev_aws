
import Navbar from "../shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import { useSelector } from "react-redux";
import EmptyCompaniesView from "./EmptyCompaniesView";
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import Footer from "../Footer";
import useGetAllCompany from "@/hooks/useGetAllCompanies";

function Companies() {
  const [isLoading, setIsLoading] = useState(true);
  useGetAllCompany();
  const companies = useSelector((state) => state.company.allCompanies);

  useEffect(() => {
    // Set loading to false once we have companies data
    if (companies !== undefined) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Small delay to ensure data is processed
      return () => clearTimeout(timer);
    }
  }, [companies]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen top-0">
        <motion.div
          className="max-w-6xl mx-auto py-10 px-4 mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            // Loading indicator
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-10 w-10 border-4 border-[#012760] rounded-full border-t-transparent"></div>
            </div>
          ) : companies.length > 0 ? (
            <>
              <div className="flex items-center justify-between ">
              </div>
              <div className="p-6">
              <p className="text-[#012760] text-2xl font-medium ml-16">Manage & Organize your company</p>
                <CompaniesTable />
              </div>
            </>
          ) : (
            <EmptyCompaniesView />
          )}
        </motion.div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Companies;