import React from "react";
import Navbar from "../shared/Navbar";
import CandidatesTable from "./CandidatesTable";
import { useParams } from "react-router-dom";
import Footer from "../Footer";

const Candidates = () => {
  const params = useParams();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w- mt-16">
        <CandidatesTable />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Candidates;