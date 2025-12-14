import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import duo1 from "../assets/duo1.svg";
import duo2 from "../assets/duo2.svg";

export default function DuoCards() {
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
    <div className="flex justify-center items-center w-full py-6 md:py-12 bg-white">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 max-w-6xl mx-auto px-4">
        {/* Left Card - For Employers */}
        <div className="w-full md:w-[85vh] bg-[#97C0FF] bg-opacity-30 rounded-2xl overflow-hidden">
          <div className="p-4 md:p-8 flex flex-col h-full relative mt-6 md:mt-10 ml-4 md:ml-6">
            <div className="mb-6 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2 md:mb-4">
                For Employers
              </h2>
              <p className="text-base md:text-lg font-medium text-gray-500 max-w-xs">
                Global Talent, Local Impact — Find the Right Professionals
                Wherever They Are.
              </p>
            </div>

            <div className="mb-6 md:mb-12 relative z-10">
              <button 
                onClick={handleEmployerClick}
                className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-500 to-red-500 hover:opacity-90 transition-all duration-300"
              >
                Post jobs now!
              </button>
            </div>

            <div className="hidden sm:block absolute bottom-0 md:bottom-10 right-0 md:right-[-3vh] h-[20vh] sm:h-[25vh] md:h-[43vh] opacity-80">
              <img
                src={duo1}
                alt="Professional employer"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Card - For Candidates */}
        <div className="w-full md:w-[85vh] bg-[#97C0FF] bg-opacity-30 rounded-2xl overflow-hidden">
          <div className="p-4 md:p-8 flex flex-col h-full relative mt-6 md:mt-10">
            <div className="mb-6 md:mb-16 ml-4 md:ml-6">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2 md:mb-4">
                For Candidates
              </h2>
              <p className="text-base md:text-lg font-medium text-gray-500 max-w-xs">
                Create a standout profile, connect with top companies, and get
                hired faster than ever.
              </p>
            </div>

            <div className="mb-6 md:mb-12 ml-4 md:ml-6 relative z-10">
              <button 
                onClick={handleCandidateClick}
                className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-900 hover:opacity-90 transition-all duration-300"
              >
                Upload your CV
              </button>
            </div>

            <div className="hidden sm:block absolute bottom-[-1vh] sm:bottom-[-2vh] md:bottom-[-8vh] right-[-1vh] sm:right-[-2vh] md:right-[-10vh] h-[30vh] sm:h-[35vh] md:h-[58vh] opacity-80">
              <img
                src={duo2}
                alt="Job candidate"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}