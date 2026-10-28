
// import { useEffect, useState } from "react";
// import axios from "axios";
import { TEMPLATES_API_END_POINT } from "@/utils/constant";
import { defaultResumeTemplate } from "./defaultResume";

// export default function TemplateProfessional3() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetchTemplate();
//   }, []);

//   const fetchTemplate = async () => {
//     try {
//       const res = await axios.get(`${TEMPLATES_API_END_POINT}/3`);
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!data) return <p>Loading...</p>;

//   return (
//     <div className="bg-white max-w-[1000px] mx-auto px-12 py-10 text-[14px] font-sans text-gray-800">

//       {/* ===== NAME ===== */}
//       <h1 className="text-4xl font-bold text-center text-teal-600 tracking-wide mb-2">
//         {data.name}
//       </h1>

//       {/* ===== CONTACT ===== */}
//       <p className="text-center mb-8">
//         {data.contact?.location} <br />
//         {data.contact?.phone} - {data.contact?.email}
//       </p>

//       {/* ===== RESUME OBJECTIVE ===== */}
//       <div className="flex items-center mb-2">
//         <h2 className="text-teal-600 font-semibold uppercase mr-4">
//           Resume Objective
//         </h2>
//         <div className="flex-1 h-[2px] bg-teal-500"></div>
//       </div>

//       <p className="ml-6 mb-8 leading-relaxed">
//         {data.summary}
//       </p>

//       {/* ===== EDUCATION ===== */}
//       <div className="flex items-center mb-3">
//         <h2 className="text-teal-600 font-semibold uppercase mr-4">
//           Education
//         </h2>
//         <div className="flex-1 h-[2px] bg-teal-500"></div>
//       </div>

//       <div className="mb-6 space-y-4">
//         {data.education?.map((edu, i) => (
//           <div key={i} className="flex">
//             <span className="w-24">{edu.year}</span>
//             <div>
//               <p className="font-semibold">
//                 {edu.degree}
//               </p>
//               <p>
//                 {edu.institute}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ===== SKILLS ===== */}
//       <div className="flex items-center mb-3">
//         <h2 className="text-teal-600 font-semibold uppercase mr-4">
//           Skills
//         </h2>
//         <div className="flex-1 h-[2px] bg-teal-500"></div>
//       </div>

//       <div className="grid grid-cols-2 gap-6 mb-8">
//         {data.skills?.map((skill, i) => (
//           <div key={i}>
//             <p className="mb-1">{skill.name}</p>
//             <div className="flex gap-1">
//               {[1, 2, 3, 4, 5, 6].map((n) => (
//                 <div
//                   key={n}
//                   className={`h-2 w-10 ${
//                     n <= skill.level ? "bg-teal-500" : "bg-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ===== WORK HISTORY ===== */}
//       <div className="flex items-center mb-3">
//         <h2 className="text-teal-600 font-semibold uppercase mr-4">
//           Work History
//         </h2>
//         <div className="flex-1 h-[2px] bg-teal-500"></div>
//       </div>

//       <div className="space-y-6 mb-8">
//         {data.workHistory?.map((job, i) => (
//           <div key={i} className="flex">
//             <span className="w-40">{job.duration}</span>
//             <div>
//               <p className="font-semibold">{job.title}</p>
//               <p className="font-semibold">
//                 {job.company}
//               </p>
//               <ul className="list-disc ml-6 mt-2 space-y-1">
//                 {job.points?.map((point, index) => (
//                   <li key={index}>{point}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ===== ACCOMPLISHMENTS ===== */}
//       <div className="flex items-center mb-3">
//         <h2 className="text-teal-600 font-semibold uppercase mr-4">
//           Accomplishments
//         </h2>
//         <div className="flex-1 h-[2px] bg-teal-500"></div>
//       </div>

//       <ul className="list-disc ml-6 space-y-2">
//         {data.accomplishments?.map((item, i) => (
//           <li key={i}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

export default function TemplateProfessional3() {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const resumeRef = useRef();

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const res = await axios.get(`${TEMPLATES_API_END_POINT}/3`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setData(defaultResumeTemplate);
    }
  };

  if (!data) return <p>Loading...</p>;

  // ===== PDF FUNCTION =====
  const downloadPDF = () => {
    if (isEditing) setIsEditing(false);

    setTimeout(() => {
      const element = resumeRef.current;

      const opt = {
        margin: 0,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          windowWidth: 794,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      html2pdf().set(opt).from(element).save();
    }, 300);
  };

  // ===== UPDATE FUNCTIONS =====
  const updateField = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const updateContact = (field, value) => {
    setData({
      ...data,
      contact: { ...data.contact, [field]: value },
    });
  };

  const updateArray = (key, index, value) => {
    const updated = [...data[key]];
    updated[index] = value;
    setData({ ...data, [key]: updated });
  };

  const updateWorkHistory = (index, field, value) => {
    const updated = [...data.workHistory];
    updated[index][field] = value;
    setData({ ...data, workHistory: updated });
  };

  const updatePoint = (jobIndex, pointIndex, value) => {
    const updated = [...data.workHistory];
    updated[jobIndex].points[pointIndex] = value;
    setData({ ...data, workHistory: updated });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data.education];
    updated[index][field] = value;
    setData({ ...data, education: updated });
  };

  return (
    <div className="max-w-[1100px] mx-auto">

      {/* ===== BUTTONS ===== */}
      <div className="px-12">
    <div className="flex gap-3 mb-4 ml-24">
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isEditing ? "Preview" : "Edit Resume"}
      </button>

      <button
        onClick={downloadPDF}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Download PDF
      </button>
    </div>
  </div>

      {/* ===== PDF CONTENT ===== */}
      <div
        ref={resumeRef}
        style={{ width: "794px", boxSizing: "border-box" }}
        className="bg-white px-12 py-10 text-[14px] font-sans text-gray-800 mx-auto"
      >

        {/* ===== NAME ===== */}
        <h1
          className="text-4xl font-bold text-center text-teal-600 tracking-wide mb-2"
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => updateField("name", e.target.innerText)}
        >
          {data.name}
        </h1>

        {/* ===== CONTACT ===== */}
        <p className="text-center mb-8">
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => updateContact("location", e.target.innerText)}
          >
            {data.contact?.location}
          </span>{" "}
          <br />
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => updateContact("phone", e.target.innerText)}
          >
            {data.contact?.phone}
          </span>{" "}
          -{" "}
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => updateContact("email", e.target.innerText)}
          >
            {data.contact?.email}
          </span>
        </p>

        {/* ===== SUMMARY ===== */}
        <div className="flex items-center mb-2">
          <h2 className="text-teal-600 font-semibold uppercase mr-4">
            Resume Objective
          </h2>
          <div style={{ height: "2px", backgroundColor: "#14b8a6", flex: 1 }}></div>
        </div>

        <p
          className="ml-6 mb-8 leading-relaxed"
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => updateField("summary", e.target.innerText)}
        >
          {data.summary}
        </p>

        {/* ===== EDUCATION ===== */}
        <div className="flex items-center mb-3">
          <h2 className="text-teal-600 font-semibold uppercase mr-4">
            Education
          </h2>
          <div style={{ height: "2px", backgroundColor: "#14b8a6", flex: 1 }}></div>
        </div>

        <div className="mb-6 space-y-4">
          {data.education?.map((edu, i) => (
            <div key={i} className="flex break-inside-avoid">
              <span
                className="w-24"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => updateEducation(i, "year", e.target.innerText)}
              >
                {edu.year}
              </span>

              <div>
                <p
                  className="font-semibold"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => updateEducation(i, "degree", e.target.innerText)}
                >
                  {edu.degree}
                </p>

                <p
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateEducation(i, "institute", e.target.innerText)
                  }
                >
                  {edu.institute}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== SKILLS ===== */}
        <div className="flex items-center mb-3">
          <h2 className="text-teal-600 font-semibold uppercase mr-4">
            Skills
          </h2>
          <div style={{ height: "2px", backgroundColor: "#14b8a6", flex: 1 }}></div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {data.skills?.map((skill, i) => (
            <div key={i}>
              <p
                className="mb-1"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const updated = [...data.skills];
                  updated[i].name = e.target.innerText;
                  setData({ ...data, skills: updated });
                }}
              >
                {skill.name}
              </p>

              <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    style={{
                      height: "8px",
                      width: "30px",
                      backgroundColor:
                        n <= skill.level ? "#14b8a6" : "#d1d5db",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ===== WORK HISTORY ===== */}
        <div className="flex items-center mb-3">
          <h2 className="text-teal-600 font-semibold uppercase mr-4">
            Work History
          </h2>
          <div style={{ height: "2px", backgroundColor: "#14b8a6", flex: 1 }}></div>
        </div>

        <div className="space-y-6 mb-8">
          {data.workHistory?.map((job, i) => (
            <div key={i} className="flex break-inside-avoid">
              <span
                className="w-40"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) =>
                  updateWorkHistory(i, "duration", e.target.innerText)
                }
              >
                {job.duration}
              </span>

              <div>
                <p
                  className="font-semibold"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateWorkHistory(i, "title", e.target.innerText)
                  }
                >
                  {job.title}
                </p>

                <p
                  className="font-semibold"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateWorkHistory(i, "company", e.target.innerText)
                  }
                >
                  {job.company}
                </p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                  {job.points?.map((point, index) => (
                    <li
                      key={index}
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        updatePoint(i, index, e.target.innerText)
                      }
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ===== ACCOMPLISHMENTS ===== */}
        <div className="flex items-center mb-3">
          <h2 className="text-teal-600 font-semibold uppercase mr-4">
            Accomplishments
          </h2>
          <div style={{ height: "2px", backgroundColor: "#14b8a6", flex: 1 }}></div>
        </div>

        <ul className="list-disc ml-6 space-y-2">
          {data.accomplishments?.map((item, i) => (
            <li
              key={i}
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) =>
                updateArray("accomplishments", i, e.target.innerText)
              }
            >
              {item}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}