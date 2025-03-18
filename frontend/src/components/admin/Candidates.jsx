// import React, { useEffect } from "react";
// import Navbar from "../shared/Navbar";
// import axios from "axios";

// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import CandidatesTable from "./CandidatesTable";

// const Candidates = () => {
//   const params = useParams();

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto">
//         <CandidatesTable />
//       </div>
//     </div>
//   );
// };

// export default Candidates;
import React from "react";
import Navbar from "../shared/Navbar";
import CandidatesTable from "./CandidatesTable";
import { useParams } from "react-router-dom";
import Footer from "../Footer";

const Candidates = () => {
  const params = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-4 sm:py-6 lg:py-8">
        <CandidatesTable />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Candidates;