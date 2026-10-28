// export default function TemplateProfessional8() {
//   return (
//     <div className="bg-[#efefef] min-h-screen py-8">
//       <div className="max-w-[1000px] mx-auto bg-white p-6 font-sans text-gray-700">

//         {/* ===== HEADER ===== */}
//         <div className="bg-gradient-to-r from-gray-200 to-gray-100 p-6 flex justify-between items-center rounded-sm">

//           <div>
//             <h1 className="text-4xl font-bold text-gray-700">
//               Kevin Sanderson
//             </h1>
//             <p className="tracking-[3px] text-gray-500 mt-1 text-sm">
//               SENIOR WEB DEVELOPER
//             </p>
//           </div>

//           <img
//             src="https://randomuser.me/api/portraits/men/45.jpg"
//             alt="profile"
//             className="w-24 h-24 rounded-full object-cover"
//           />
//         </div>

//         {/* ===== CONTENT ===== */}
//         <div className="grid grid-cols-2 mt-6">

//           {/* ===== LEFT SIDE ===== */}
//           <div className="pr-6 border-r border-gray-300">

//             {/* CONTACT */}
//             <div className="space-y-3 mb-6 text-sm">

//               <p className="flex items-center gap-2">
//                 <span>📞</span> 123-456-7890
//               </p>

//               <p className="flex items-center gap-2">
//                 <span>✉</span> hello@reallygreatsite.net
//               </p>

//               <p className="flex items-center gap-2">
//                 <span>📍</span> 123 Main Street, Any City
//               </p>

//               <p className="flex items-center gap-2">
//                 <span>🌐</span> reallygreatsite.net
//               </p>

//             </div>

//             {/* DIVIDER */}
//             <div className="border-t border-gray-300 mb-6"></div>

//             {/* SKILLS */}
//             <div className="mb-6">
//               <h2 className="font-bold text-gray-700 mb-3 tracking-wide">
//                 SKILLS
//               </h2>

//               <ul className="space-y-1 text-sm">
//                 <li>• Web design</li>
//                 <li>• Design thinking</li>
//                 <li>• Wireframe creation</li>
//                 <li>• Front-end coding</li>
//                 <li>• Problem solving</li>
//                 <li>• Project Management Tools</li>
//                 <li>• Strong Communication</li>
//                 <li>• Team Player</li>
//               </ul>
//             </div>

//             {/* DIVIDER */}
//             <div className="border-t border-gray-300 mb-6"></div>

//             {/* EDUCATION */}
//             <div>
//               <h2 className="font-bold text-gray-700 mb-3 tracking-wide">
//                 SKILLS
//               </h2>

//               <div className="mb-4">
//                 <p className="font-semibold text-sm">
//                   BACHELOR OF TECHNOLOGY
//                 </p>
//                 <p className="text-sm">Ivy League School</p>
//                 <p className="text-sm text-gray-500">2014 - 2018</p>
//               </div>

//               <div>
//                 <p className="font-semibold text-sm">
//                   HIGH SCHOOL HONORS
//                 </p>
//                 <p className="text-sm">Really Great High School</p>
//                 <p className="text-sm text-gray-500">2010 - 2014</p>
//               </div>
//             </div>
//           </div>

//           {/* ===== RIGHT SIDE ===== */}
//           <div className="pl-6">

//             {/* PROFILE */}
//             <div className="mb-6">
//               <h2 className="font-bold text-gray-700 mb-2 tracking-wide">
//                 PROFILE
//               </h2>

//               <p className="text-sm leading-relaxed">
//                 I am a qualified and professional web developer with five years of experience in database administration and website design. Strong creative and analytical skills. I am a team player with an eye for detail and a strong work ethic.
//               </p>
//             </div>

//             {/* DIVIDER */}
//             <div className="border-t border-gray-300 mb-6"></div>

//             {/* EXPERIENCE */}
//             <div>
//               <h2 className="font-bold text-gray-700 mb-4 tracking-wide">
//                 EXPERIENCE
//               </h2>

//               {/* JOB 1 */}
//               <div className="mb-5">
//                 <p className="font-semibold text-sm">
//                   APPLICATIONS DEVELOPER
//                 </p>
//                 <p className="text-sm">Cool Company Inc.</p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   2016 - Present
//                 </p>

//                 <ul className="text-sm space-y-1">
//                   <li>• Database administration and website design</li>
//                   <li>• Built the logic for streamlined ad-serving platform</li>
//                   <li>• Educational institution and online class management</li>
//                 </ul>
//               </div>

//               {/* JOB 2 */}
//               <div className="mb-5">
//                 <p className="font-semibold text-sm">
//                   WEB CONTENT MANAGER
//                 </p>
//                 <p className="text-sm">Second Company Inc.</p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   2014 - 2016
//                 </p>

//                 <ul className="text-sm space-y-1">
//                   <li>• Database administration and website design</li>
//                   <li>• Built the logic for streamlined ad-serving platform</li>
//                   <li>• Educational institution and online class management</li>
//                 </ul>
//               </div>

//               {/* JOB 3 */}
//               <div>
//                 <p className="font-semibold text-sm">
//                   CONTENT ANALYSIS
//                 </p>
//                 <p className="text-sm">Third Company Inc.</p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   2012 - 2014
//                 </p>

//                 <ul className="text-sm space-y-1">
//                   <li>• Database administration and website design</li>
//                   <li>• Built the logic for streamlined ad-serving platform</li>
//                   <li>• Educational institution and online class management</li>
//                 </ul>
//               </div>

//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { TEMPLATES_API_END_POINT } from "@/utils/constant";
import { defaultResumeTemplate } from "./defaultResume";

export default function TemplateProfessional8() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const res = await axios.get(`${TEMPLATES_API_END_POINT}/8`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setData(defaultResumeTemplate);
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="bg-[#efefef] min-h-screen py-8">
      <div className="max-w-[1000px] mx-auto bg-white p-6 font-sans text-gray-700">

        {/* ===== HEADER ===== */}
        <div className="bg-gradient-to-r from-gray-200 to-gray-100 p-6 flex justify-between items-center rounded-sm">

          <div>
            <h1 className="text-4xl font-bold text-gray-700">
              {data.name}
            </h1>
            <p className="tracking-[3px] text-gray-500 mt-1 text-sm">
              {data.designation || ""}
            </p>
          </div>

          <img
            src={
              data.profileImage ||
              "https://randomuser.me/api/portraits/men/45.jpg"
            }
            alt="profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* ===== CONTENT ===== */}
        <div className="grid grid-cols-2 mt-6">

          {/* ===== LEFT SIDE ===== */}
          <div className="pr-6 border-r border-gray-300">

            {/* CONTACT */}
            <div className="space-y-3 mb-6 text-sm">
              <p className="flex items-center gap-2">
                <span>📞</span> {data.contact?.phone}
              </p>

              <p className="flex items-center gap-2">
                <span>✉</span> {data.contact?.email}
              </p>

              <p className="flex items-center gap-2">
                <span>📍</span> {data.contact?.location}
              </p>

              {data.website && (
                <p className="flex items-center gap-2">
                  <span>🌐</span> {data.website}
                </p>
              )}
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-300 mb-6"></div>

            {/* SKILLS */}
            <div className="mb-6">
              <h2 className="font-bold text-gray-700 mb-3 tracking-wide">
                SKILLS
              </h2>

              <ul className="space-y-1 text-sm">
                {data.skills?.map((skill, i) => (
                  <li key={i}>• {skill.name}</li>
                ))}
              </ul>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-300 mb-6"></div>

            {/* EDUCATION */}
            <div>
              <h2 className="font-bold text-gray-700 mb-3 tracking-wide">
                EDUCATION
              </h2>

              {data.education?.map((edu, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold text-sm">
                    {edu.degree}
                  </p>
                  <p className="text-sm">{edu.institute}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== RIGHT SIDE ===== */}
          <div className="pl-6">

            {/* PROFILE */}
            <div className="mb-6">
              <h2 className="font-bold text-gray-700 mb-2 tracking-wide">
                PROFILE
              </h2>

              <p className="text-sm leading-relaxed">
                {data.summary}
              </p>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-300 mb-6"></div>

            {/* EXPERIENCE */}
            <div>
              <h2 className="font-bold text-gray-700 mb-4 tracking-wide">
                EXPERIENCE
              </h2>

              {data.workHistory?.map((job, i) => (
                <div key={i} className="mb-5">
                  <p className="font-semibold text-sm">
                    {job.title}
                  </p>
                  <p className="text-sm">{job.company}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {job.duration}
                  </p>

                  <ul className="text-sm space-y-1">
                    {job.points?.map((point, idx) => (
                      <li key={idx}>• {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
