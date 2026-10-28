import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import ResumeMatchBox from "./ResumeMatchBox";
import { PAGE_META, usePageMeta } from "@/seo/usePageMeta";

export default function UploadResumePage() {
  usePageMeta({
    title: "Upload your resume | Hirees",
    description: "Upload a resume to get matched with Fstone recruiters. Sign in with an email link. Job alerts are on unless you turn them off.",
    path: "/upload-resume",
  });
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24">
        <ResumeMatchBox />
      </div>
      <Footer />
    </div>
  );
}
