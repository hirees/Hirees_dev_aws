import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function CallToActionSection() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const handleEmployerClick = () => {
    if (user) {
      if (user.role === "recruiter") {
        navigate("/admin/jobs");
      } else {
        toast.error("You are already registered as a candidate. Please log out to create a recruiter account.");
      }
    } else {
      navigate("/signup/recruiter");
    }
  };

  const handleCandidateClick = () => {
    if (user) {
      if (user.role === "recruiter") {
        toast.error("You are already registered as a recruiter. Please log out to create a candidate account.");
      } else {
        navigate("/profile");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full max-w-screen-7xl mx-auto min-h-[50vh] sm:h-[60vh] bg-white flex justify-center items-center px-4 py-8 sm:px-6 lg:px-6 mb-6 sm:mb-10">
      <div className="flex flex-col w-full max-w-[860px] gap-4 sm:gap-8 md:gap-10 items-center">
        <div className="flex flex-col gap-4 sm:gap-8 w-full items-center">
          <p className="font-extrabold text-[#444444] text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center tracking-[0] leading-tight">
            Let&apos;s Start the journey<br className="hidden sm:block" />towards Success with Hirees
          </p>
          <p className="w-full max-w-[90vw] sm:max-w-[70vh] font-medium text-[#949494] text-sm sm:text-base md:text-xl text-center tracking-[0] leading-normal mt-1 sm:mt-2">
            Post or upload your way where life takes you<br className="hidden sm:block"/> towards your path
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center w-full sm:w-auto">
          <button 
            onClick={handleEmployerClick}
            className="flex w-full sm:w-[221px] justify-center p-3 sm:p-4 md:p-5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 items-center"
          >
            <span className="font-semibold text-white text-base sm:text-lg md:text-xl tracking-[0] leading-normal">
              Post jobs now!
            </span>
          </button>
          <button 
            onClick={handleCandidateClick}
            className="flex w-full sm:w-[221px] justify-center p-3 sm:p-4 md:p-5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-950 transition-all duration-300 items-center"
          >
            <span className="font-semibold text-white text-base sm:text-lg md:text-xl tracking-[0] leading-normal">
              Upload your CV
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}