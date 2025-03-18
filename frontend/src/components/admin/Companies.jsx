// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../shared/Navbar";
// // import { Button } from "../ui/button";
// // import { Input } from "../ui/input";
// // import CompaniesTable from "./CompaniesTable";
// // import useGetAllCompany from "@/hooks/useGetAllCompanies";
// // import { useSelector } from "react-redux";

// // function Companies() {
// //   useGetAllCompany();
// //   const navigate = useNavigate();

// //   // Get the list of companies from Redux state
// //   const companies = useSelector((state) => state.company.allCompanies);

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="max-w-6xl mx-auto my-10">
// //         <div className="flex items-center justify-between my-5">
// //           {companies?.length < 0 ? (
// //             <>
// //               <Button
// //                 className="bg-black text-white rounded-xl hover:bg-black"
// //                 onClick={() => navigate("/admin/companies/create")}
// //               >
// //                 New Company
// //               </Button>
// //             </>
// //           ) : (
// //             <></>
// //           )}
// //           {/* Uncomment if filtering functionality is needed */}
// //           {/* <Input
// //             className="w-fit rounded-xl"
// //             placeholder="Filter by name"
// //           /> */}
// //         </div>
// //         {companies?.length > 0 ? (
// //           <CompaniesTable />
// //         ) : (
// //           <div className="text-center">
// //             <p className="mb-4 text-gray-600">No companies available yet.</p>
// //             <Button
// //               className="bg-blue-500 text-white rounded-xl hover:bg-blue-600"
// //               onClick={() => navigate("/admin/companies/create")}
// //             >
// //               Create New Company
// //             </Button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Companies;
// import { useNavigate } from "react-router-dom";
// import Navbar from "../shared/Navbar";
// import CompaniesTable from "./CompaniesTable";
// import useGetAllCompany from "@/hooks/useGetAllCompanies";
// import { useSelector } from "react-redux";
// import EmptyCompaniesView from "./EmptyCompaniesView";
// import { Button } from "../ui/button";

// function Companies() {
//   useGetAllCompany();
//   const navigate = useNavigate();
//   const companies = useSelector((state) => state.company.allCompanies);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-6xl mx-auto my-10">
//         {companies?.length > 0 ? (
//           <>
//             <div className="flex items-center justify-between my-5">
//               <Button
//                 className="bg-black text-white rounded-xl hover:bg-black"
//                 onClick={() => navigate("/admin/companies/create")}
//               >
//                 New Company
//               </Button>
//             </div>
//             <CompaniesTable />
//           </>
//         ) : (
//           <EmptyCompaniesView />
//         )}
//       </div>
//     </div>
//   );
// }

// // export default Companies;
// import { useNavigate } from "react-router-dom";
// import Navbar from "../shared/Navbar";
// import CompaniesTable from "./CompaniesTable";
// import useGetAllCompany from "@/hooks/useGetAllCompanies";
// import { useSelector } from "react-redux";
// import EmptyCompaniesView from "./EmptyCompaniesView";
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Plus } from 'lucide-react';

// function Companies() {
//   useGetAllCompany();
//   const navigate = useNavigate();
//   const companies = useSelector((state) => state.company.allCompanies);

//   return (
//     <div>
//     <Navbar />
//     <div className="min-h-screen top-0 bg-gray-50">

//       <motion.div
//         className="max-w-6xl mx-auto py-10 px-4"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {companies?.length > 0 ? (
//           <>
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Management</h1>
//                 <p className="text-gray-600">Manage and organize your companies</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <CompaniesTable />
//             </div>
//           </>
//         ) : (
//           <EmptyCompaniesView />
//         )}
//       </motion.div>
//     </div>
//     </div>
//   );
// }

// export default Companies;
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompany from "@/hooks/useGetAllCompanies";
import { useSelector } from "react-redux";
import EmptyCompaniesView from "./EmptyCompaniesView";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState, useEffect } from "react";
import Footer from "../Footer";

function Companies() {
  const [isLoading, setIsLoading] = useState(true);
  useGetAllCompany();
  const navigate = useNavigate();
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
      <div className="min-h-screen top-0 bg-gray-50">
        <motion.div
          className="max-w-6xl mx-auto py-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            // Loading indicator
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : companies.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Management</h1>
                  <p className="text-gray-600">Manage and organize your companies</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
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