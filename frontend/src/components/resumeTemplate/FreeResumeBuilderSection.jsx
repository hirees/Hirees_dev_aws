// import resumeImg from "@/assets/cvbuildLogo.webp"; 
// import { useNavigate } from "react-router-dom";

// export default function ResumeBuilderSection() {
//   const navigate = useNavigate();

//   return (
//     <section className="w-full bg-white py-10 md:py-14">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex flex-col md:flex-row items-center gap-10">

//           {/* Left Content */}
//           <div className="flex-1">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
//               Build Your <span className="text-blue-600">Professional Resume</span>
//               <br /> for Free
//             </h2>

//             <p className="mt-3 text-base text-gray-600 max-w-md">
//               Create a modern, ATS-friendly resume in minutes. Choose a template,
//               add your details, and download instantly.
//             </p>

//             {/* Features */}
//             <ul className="mt-5 space-y-3 text-gray-700 text-sm">
//               <li className="flex items-start gap-3">
//                 <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
//                 Multiple professional templates
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
//                 Step-by-step resume builder
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
//                 Instant PDF download
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
//                 100% free forever
//               </li>
//             </ul>

//             {/* CTA */}
//             <button
//               onClick={() => navigate("/resume-templates")}
//               className="mt-6 px-6 py-3 text-sm font-semibold text-white
//               rounded-lg bg-gradient-to-r from-blue-600 to-blue-900
//               hover:opacity-90 transition-all"
//             >
//               Create Resume Now
//             </button>
//           </div>

//           {/* Right Image */}
//           <div className="flex-1 flex justify-center">
//             <img
//               src={resumeImg}
//               alt="Resume Builder"
//               className="w-full max-w-md"
//             />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


import { useNavigate } from "react-router-dom";

// Trust badge icons (inline SVG)
const ShieldIcon = () => (
  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const LockIcon = () => (
  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

// Mini template preview cards (SVG sketches)
const TEMPLATE_PREVIEWS = [
  {
    id: 1,
    name: "Professional",
    popular: false,
    bg: "#EBF3FF",
    svgContent: (
      <svg width="52" height="70" viewBox="0 0 52 70" fill="none">
        <rect width="52" height="70" rx="3" fill="#EBF3FF" />
        <rect x="4" y="4" width="44" height="10" rx="1" fill="#2563EB" />
        <rect x="4" y="18" width="28" height="2" rx="1" fill="#93C5FD" />
        <rect x="4" y="23" width="22" height="2" rx="1" fill="#BFDBFE" />
        <rect x="4" y="30" width="44" height="1" rx="1" fill="#DBEAFE" />
        <rect x="4" y="34" width="30" height="2" rx="1" fill="#93C5FD" />
        <rect x="4" y="39" width="44" height="2" rx="1" fill="#BFDBFE" />
        <rect x="4" y="44" width="40" height="2" rx="1" fill="#BFDBFE" />
        <rect x="4" y="52" width="44" height="1" rx="1" fill="#DBEAFE" />
        <rect x="4" y="56" width="30" height="2" rx="1" fill="#93C5FD" />
        <rect x="4" y="61" width="44" height="2" rx="1" fill="#BFDBFE" />
        <rect x="4" y="66" width="36" height="2" rx="1" fill="#BFDBFE" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Modern",
    popular: false,
    svgContent: (
      <svg width="52" height="70" viewBox="0 0 52 70" fill="none">
        <rect width="52" height="70" rx="3" fill="#f8faff" />
        <rect x="0" y="0" width="16" height="70" fill="#1e3a8a" />
        <circle cx="8" cy="12" r="6" fill="#93C5FD" />
        <rect x="2" y="22" width="12" height="2" rx="1" fill="#BFDBFE" />
        <rect x="2" y="27" width="10" height="1" rx="1" fill="#60A5FA" />
        <rect x="2" y="31" width="10" height="1" rx="1" fill="#60A5FA" />
        <rect x="2" y="35" width="12" height="1" rx="1" fill="#60A5FA" />
        <rect x="20" y="5" width="28" height="4" rx="1" fill="#2563EB" />
        <rect x="20" y="13" width="20" height="2" rx="1" fill="#93C5FD" />
        <rect x="20" y="18" width="28" height="1" rx="1" fill="#DBEAFE" />
        <rect x="20" y="22" width="22" height="1" rx="1" fill="#DBEAFE" />
        <rect x="20" y="29" width="28" height="2" rx="1" fill="#93C5FD" />
        <rect x="20" y="34" width="28" height="1" rx="1" fill="#DBEAFE" />
        <rect x="20" y="38" width="24" height="1" rx="1" fill="#DBEAFE" />
        <rect x="20" y="45" width="28" height="2" rx="1" fill="#93C5FD" />
        <rect x="20" y="50" width="28" height="1" rx="1" fill="#DBEAFE" />
        <rect x="20" y="54" width="22" height="1" rx="1" fill="#DBEAFE" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Minimal",
    popular: false,
    svgContent: (
      <svg width="52" height="70" viewBox="0 0 52 70" fill="none">
        <rect width="52" height="70" rx="3" fill="#fafafa" />
        <rect x="8" y="5" width="36" height="3" rx="1" fill="#1a1a2e" />
        <rect x="14" y="11" width="24" height="2" rx="1" fill="#888" />
        <rect x="4" y="18" width="44" height="0.5" fill="#ddd" />
        <rect x="4" y="22" width="18" height="2" rx="1" fill="#555" />
        <rect x="4" y="27" width="44" height="1" rx="1" fill="#e0e0e0" />
        <rect x="4" y="31" width="40" height="1" rx="1" fill="#e0e0e0" />
        <rect x="4" y="38" width="18" height="2" rx="1" fill="#555" />
        <rect x="4" y="43" width="44" height="1" rx="1" fill="#e0e0e0" />
        <rect x="4" y="47" width="38" height="1" rx="1" fill="#e0e0e0" />
        <rect x="4" y="54" width="18" height="2" rx="1" fill="#555" />
        <rect x="4" y="59" width="44" height="1" rx="1" fill="#e0e0e0" />
        <rect x="4" y="63" width="30" height="1" rx="1" fill="#e0e0e0" />
      </svg>
    ),
  },
  {
    id: 6,
    name: "Classic",
    popular: true,
    svgContent: (
      <svg width="52" height="70" viewBox="0 0 52 70" fill="none">
        <rect width="52" height="70" rx="3" fill="#EBF3FF" />
        <rect x="0" y="0" width="52" height="22" fill="#1e3a8a" />
        <rect x="6" y="5" width="28" height="4" rx="2" fill="#fff" />
        <rect x="6" y="12" width="18" height="2" rx="1" fill="#93C5FD" />
        <rect x="6" y="27" width="12" height="2" rx="1" fill="#2563EB" />
        <rect x="6" y="32" width="40" height="1" rx="1" fill="#BFDBFE" />
        <rect x="6" y="36" width="36" height="1" rx="1" fill="#BFDBFE" />
        <rect x="6" y="43" width="12" height="2" rx="1" fill="#2563EB" />
        <rect x="6" y="48" width="40" height="1" rx="1" fill="#BFDBFE" />
        <rect x="6" y="52" width="32" height="1" rx="1" fill="#BFDBFE" />
        <rect x="6" y="59" width="12" height="2" rx="1" fill="#2563EB" />
        <rect x="6" y="64" width="40" height="1" rx="1" fill="#BFDBFE" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Creative",
    popular: false,
    svgContent: (
      <svg width="52" height="70" viewBox="0 0 52 70" fill="none">
        <rect width="52" height="70" rx="3" fill="#fff7ed" />
        <rect x="0" y="0" width="52" height="18" fill="#1e3a8a" />
        <rect x="4" y="4" width="24" height="4" rx="1" fill="#fff" />
        <rect x="4" y="11" width="16" height="2" rx="1" fill="#93C5FD" />
        <rect x="38" y="3" width="10" height="10" rx="5" fill="#60A5FA" />
        <rect x="4" y="22" width="44" height="2" rx="1" fill="#2563EB" />
        <rect x="4" y="27" width="40" height="1" rx="1" fill="#BFDBFE" />
        <rect x="4" y="31" width="36" height="1" rx="1" fill="#DBEAFE" />
        <rect x="4" y="38" width="44" height="2" rx="1" fill="#2563EB" />
        <rect x="4" y="43" width="40" height="1" rx="1" fill="#BFDBFE" />
        <rect x="4" y="47" width="32" height="1" rx="1" fill="#DBEAFE" />
        <rect x="4" y="54" width="44" height="2" rx="1" fill="#2563EB" />
        <rect x="4" y="59" width="40" height="1" rx="1" fill="#BFDBFE" />
        <rect x="4" y="63" width="28" height="1" rx="1" fill="#DBEAFE" />
      </svg>
    ),
  },
  {
    id: 5,
    name: "Simple",
    popular: false,
    svgContent: (
      <svg width="52" height="70" viewBox="0 0 52 70" fill="none">
        <rect width="52" height="70" rx="3" fill="#f8faff" />
        <rect x="4" y="4" width="30" height="5" rx="1" fill="#1a1a2e" />
        <rect x="4" y="12" width="20" height="2" rx="1" fill="#2563EB" />
        <rect x="4" y="19" width="44" height="0.5" fill="#2563EB" />
        <rect x="4" y="23" width="15" height="2" rx="1" fill="#444" />
        <rect x="4" y="28" width="44" height="1" rx="1" fill="#ddd" />
        <rect x="4" y="32" width="38" height="1" rx="1" fill="#ddd" />
        <rect x="4" y="39" width="15" height="2" rx="1" fill="#444" />
        <rect x="4" y="44" width="44" height="1" rx="1" fill="#ddd" />
        <rect x="4" y="48" width="40" height="1" rx="1" fill="#ddd" />
        <rect x="4" y="55" width="15" height="2" rx="1" fill="#444" />
        <rect x="4" y="60" width="44" height="1" rx="1" fill="#ddd" />
        <rect x="4" y="64" width="34" height="1" rx="1" fill="#ddd" />
      </svg>
    ),
  },
];

export default function ResumeBuilderSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* ── Left Content ── */}
          <div className="flex-1">

            {/* Trust tag */}
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700
              text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-blue-100">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Free ATS-friendly layouts
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
              Build Your <span className="text-blue-600">Professional Resume</span>
              <br /> for Free
            </h2>

            <p className="mt-3 text-base text-gray-600 max-w-md">
              Create a modern, ATS-friendly resume in minutes. Choose a template,
              add your details, and download instantly.
            </p>

            {/* ATS explanation box */}
            <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-blue-900 mb-1">What is ATS-optimized?</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Applicant Tracking Systems scan resumes before a human sees them.
                Our templates are built with proper headings, clean formatting, and
                keyword-ready sections — so your resume always reaches the hiring manager.
              </p>
            </div>

            {/* Features */}
            <ul className="mt-5 space-y-3 text-gray-700 text-sm">
              {[
                "Multiple professional templates",
                "Step-by-step resume builder",
                "Instant PDF download",
                "100% free forever",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => navigate("/resume-templates")}
              className="mt-6 px-6 py-3 text-sm font-semibold text-white
                rounded-lg bg-gradient-to-r from-blue-600 to-blue-900
                hover:opacity-90 transition-all"
            >
              Create Resume Now
            </button>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                { icon: <ShieldIcon />, label: "ATS Optimized" },
                { icon: <LockIcon />, label: "100% Secure" },
                { icon: <StarIcon />, label: "ATS-friendly" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200
                    rounded-lg px-3 py-2 text-xs font-medium text-gray-600"
                >
                  {icon}
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Template Previews ── */}
<div className="flex-1 flex flex-col items-start justify-center">
  <p className="text-xs text-gray-400 font-medium mb-4">
    Preview templates →
  </p>
  <div className="grid grid-cols-3 gap-4 w-full">
    {TEMPLATE_PREVIEWS.map((tpl) => (
      <div
        key={tpl.id}
        onClick={() => navigate(`/resume-editor?template=${tpl.id}`)}
        className={`relative rounded-xl overflow-hidden cursor-pointer
          transition-all duration-200 hover:-translate-y-1
          ${tpl.popular
            ? "border-2 border-blue-600 shadow-md"
            : "border border-gray-200 hover:border-blue-400"
          }`}
      >
        {tpl.popular && (
          <span className="absolute top-2 left-2 z-10 bg-blue-600 text-white
            text-[10px] font-bold px-2 py-1 rounded">
            Popular
          </span>
        )}
        <div className="flex items-center justify-center bg-gray-50 py-4 px-3">
          {/* Scale up the SVG */}
          <div style={{ transform: "scale(1.6)", transformOrigin: "center" }}>
            {tpl.svgContent}
          </div>
        </div>
        <div className={`text-center text-xs py-2 bg-white border-t border-gray-100
          ${tpl.popular ? "text-blue-600 font-semibold" : "text-gray-500 font-medium"}`}>
          {tpl.name}
        </div>
      </div>
    ))}
  </div>
</div>

        </div>
      </div>
    </section>
  );
}
