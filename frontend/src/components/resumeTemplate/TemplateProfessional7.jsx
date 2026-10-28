// export default function TemplateProfessional7() {
//   return (
//     <div className="bg-white max-w-[1000px] mx-auto px-12 py-10 text-[14px] font-sans text-gray-800">

//       {/* ===== NAME ===== */}
//       <h1 className="text-3xl font-bold text-center text-teal-600 mb-1">
//         SOPHIA PATEL
//       </h1>

//       {/* ===== CONTACT ===== */}
//       <p className="text-center mb-8">
//         Tampa, FL 33607 <br />
//         (555)555-5555 - sophia@example.com
//       </p>

//       {/* ===== OBJECTIVE ===== */}
//       <Section title="Resume Objective" />

//       <p className="ml-6 mb-8 leading-relaxed">
//         Dedicated Childcare Assistant with expertise in early childhood education.
//         Proven track record in creating engaging activities that improve learning
//         outcomes by 25%. Committed to fostering a safe and nurturing environment
//         for children.
//       </p>

//       {/* ===== EDUCATION ===== */}
//       <Section title="Education" />

//       <div className="space-y-5 mb-8">

//         <div className="flex">
//           <span className="w-24">06/2021</span>
//           <div>
//             <p className="font-semibold">
//               Master's: Early Childhood Education
//             </p>
//             <p>
//               University of California, Berkeley - Riverview, FL
//             </p>
//           </div>
//         </div>

//         <div className="flex">
//           <span className="w-24">06/2019</span>
//           <div>
//             <p className="font-semibold">
//               Bachelor's: Child Development
//             </p>
//             <p>
//               California State University - Riverview, FL
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ===== SKILLS ===== */}
//       <Section title="Skills" />

//       <div className="grid grid-cols-2 gap-6 mb-8">

//         {[
//           { name: "Behavioral management", level: 3 },
//           { name: "Health and safety guidelines", level: 3 },
//           { name: "Childcare expertise", level: 5 },
//           { name: "Early education programs", level: 5 },
//           { name: "Creative play planning", level: 5 },
//         ].map((skill, i) => (
//           <div key={i}>
//             <p className="mb-1">{skill.name}</p>
//             <div className="flex gap-1">
//               {[1, 2, 3, 4, 5].map((n) => (
//                 <div
//                   key={n}
//                   className={`h-2 w-8 ${
//                     n <= skill.level ? "bg-teal-500" : "bg-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ===== WORK HISTORY ===== */}
//       <Section title="Work History" />

//       <div className="space-y-6 mb-8">

//         <div className="flex">
//           <span className="w-36">01/2024 to 12/2025</span>
//           <div>
//             <p className="font-semibold">Childcare Assistant</p>
//             <p className="font-semibold">
//               BrightPath Caregiving – Tampa, FL
//             </p>
//             <ul className="list-disc ml-6 mt-2 space-y-1">
//               <li>Assisted with 15+ daily childcare routines</li>
//               <li>Implemented activities, boosting learning by 25%</li>
//               <li>Maintained clean and safe environment for 20 kids</li>
//             </ul>
//           </div>
//         </div>

//         <div className="flex">
//           <span className="w-36">01/2022 to 12/2023</span>
//           <div>
//             <p className="font-semibold">Nursery Aide</p>
//             <p className="font-semibold">
//               CareWell Home Services – Tampa, FL
//             </p>
//             <ul className="list-disc ml-6 mt-2 space-y-1">
//               <li>Supported early learning for 10 children</li>
//               <li>Reduced incidence of accidents by 30%</li>
//               <li>Organized events improving engagement</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* ===== ACCOMPLISHMENTS ===== */}
//       <Section title="Accomplishments" />

//       <ul className="list-disc ml-6 space-y-2">
//         <li>Increased enrollment by 15% in six months</li>
//         <li>Developed award-winning educational game</li>
//       </ul>
//     </div>
//   );
// }

// /* ===== SECTION COMPONENT ===== */
// function Section({ title }) {
//   return (
//     <div className="flex items-center mb-3">
//       <h2 className="text-teal-600 font-semibold uppercase mr-4">
//         {title}
//       </h2>
//       <div className="flex-1 h-[2px] bg-teal-500"></div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { TEMPLATES_API_END_POINT } from "@/utils/constant";
import { defaultResumeTemplate } from "./defaultResume";

export default function TemplateProfessional7() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const res = await axios.get(`${TEMPLATES_API_END_POINT}/7`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setData(defaultResumeTemplate);
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="bg-white max-w-[1000px] mx-auto px-12 py-10 text-[14px] font-sans text-gray-800">

      {/* ===== NAME ===== */}
      <h1 className="text-3xl font-bold text-center text-teal-600 mb-1">
        {data.name}
      </h1>

      {/* ===== CONTACT ===== */}
      <p className="text-center mb-8">
        {data.contact?.location} <br />
        {data.contact?.phone} - {data.contact?.email}
      </p>

      {/* ===== OBJECTIVE ===== */}
      <Section title="Resume Objective" />

      <p className="ml-6 mb-8 leading-relaxed">
        {data.summary}
      </p>

      {/* ===== EDUCATION ===== */}
      <Section title="Education" />

      <div className="space-y-5 mb-8">
        {data.education?.map((edu, i) => (
          <div key={i} className="flex">
            <span className="w-24">{edu.year}</span>
            <div>
              <p className="font-semibold">
                {edu.degree}
              </p>
              <p>
                {edu.institute}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== SKILLS ===== */}
      <Section title="Skills" />

      <div className="grid grid-cols-2 gap-6 mb-8">
        {data.skills?.map((skill, i) => (
          <div key={i}>
            <p className="mb-1">{skill.name}</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className={`h-2 w-8 ${
                    n <= skill.level ? "bg-teal-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ===== WORK HISTORY ===== */}
      <Section title="Work History" />

      <div className="space-y-6 mb-8">
        {data.workHistory?.map((job, i) => (
          <div key={i} className="flex">
            <span className="w-36">{job.duration}</span>
            <div>
              <p className="font-semibold">{job.title}</p>
              <p className="font-semibold">
                {job.company}
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                {job.points?.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* ===== ACCOMPLISHMENTS ===== */}
      <Section title="Accomplishments" />

      <ul className="list-disc ml-6 space-y-2">
        {data.accomplishments?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/* ===== SECTION COMPONENT ===== */
function Section({ title }) {
  return (
    <div className="flex items-center mb-3">
      <h2 className="text-teal-600 font-semibold uppercase mr-4">
        {title}
      </h2>
      <div className="flex-1 h-[2px] bg-teal-500"></div>
    </div>
  );
}
