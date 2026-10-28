
// import { useEffect, useState } from "react";
// import axios from "axios";
import { TEMPLATES_API_END_POINT } from "@/utils/constant";
import { defaultResumeTemplate } from "./defaultResume";

// export default function TemplateProfessional2() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetchTemplate();
//   }, []);

//   const fetchTemplate = async () => {
//     try {
//       const res = await axios.get(`${TEMPLATES_API_END_POINT}/2`);
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!data) return <p>Loading...</p>;

//   return (
//     <div className="bg-white max-w-[1100px] mx-auto px-12 py-10 text-[14px] font-sans text-gray-800">

//       {/* ===== NAME ===== */}
//       <h1 className="text-5xl font-bold text-gray-600 text-center mb-2 tracking-wide">
//         {data.name}
//       </h1>

//       {/* ===== CONTACT ===== */}
//       <p className="text-center text-gray-600 mb-8">
//         {data.contact?.email} | {data.contact?.phone} | {data.contact?.location}
//       </p>

//       <div className="grid grid-cols-3 gap-12">

//         {/* LEFT SIDE */}
//         <div className="col-span-2">

//           {/* SUMMARY */}
//           <h2 className="font-bold tracking-wide mb-2">PROFESSIONAL SUMMARY</h2>
//           <p className="mb-8 leading-relaxed">
//             {data.summary}
//           </p>

//           {/* WORK HISTORY */}
//           <h2 className="font-bold tracking-wide mb-3">WORK HISTORY</h2>

//           {data.workHistory?.map((job, index) => (
//             <div key={index} className="mb-6">
//               <p className="text-gray-600 mb-1">{job.duration}</p>
//               <p className="font-semibold">
//                 {job.title} |{" "}
//                 <span className="font-normal">{job.company}</span>
//               </p>
//               <ul className="list-disc ml-6 mt-2 space-y-1">
//                 {job.points?.map((point, i) => (
//                   <li key={i}>{point}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//         </div>

//         {/* RIGHT SIDE */}
//         <div>

//           {/* ACCOMPLISHMENTS */}
//           <h2 className="font-bold tracking-wide mb-2">ACCOMPLISHMENTS</h2>
//           <ul className="list-disc ml-5 mb-6 space-y-2">
//             {data.accomplishments?.map((item, i) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>

//           {/* SKILLS */}
//           <h2 className="font-bold tracking-wide mb-2">SKILLS</h2>

//           {data.skills?.map((skill, i) => (
//             <div key={i} className="mb-3">
//               <p className="mb-1">{skill.name}</p>
//               <div className="flex gap-1">
//                 {[1, 2, 3, 4, 5].map((n) => (
//                   <div
//                     key={n}
//                     className={`h-2 w-8 ${
//                       n <= skill.level ? "bg-gray-700" : "bg-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}

//           {/* CERTIFICATIONS */}
//           <h2 className="font-bold tracking-wide mt-6 mb-2">CERTIFICATIONS</h2>
//           <ul className="list-disc ml-5 mb-6 space-y-2">
//             {data.certifications?.map((cert, i) => (
//               <li key={i}>{cert}</li>
//             ))}
//           </ul>

//           {/* EDUCATION */}
//           <h2 className="font-bold tracking-wide mb-2">EDUCATION</h2>

//           {data.education?.map((edu, i) => (
//             <div key={i} className="mb-4">
//               <p className="text-gray-600">{edu.year}</p>
//               <p>{edu.institute}</p>
//               <p className="font-semibold">{edu.degree}</p>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

export default function TemplateProfessional2() {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const resumeRef = useRef();

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const res = await axios.get(`${TEMPLATES_API_END_POINT}/2`);
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

  const updateArray = (key, index, value) => {
    const updated = [...data[key]];
    updated[index] = value;
    setData({ ...data, [key]: updated });
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
          className="text-5xl font-bold text-gray-600 text-center mb-4 tracking-wide"
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => updateField("name", e.target.innerText)}
        >
          {data.name}
        </h1>

        {/* ===== CONTACT ===== */}
        <p className="text-center text-gray-600 mb-8">
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => updateContact("email", e.target.innerText)}
          >
            {data.contact?.email}
          </span>{" "}
          |{" "}
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => updateContact("phone", e.target.innerText)}
          >
            {data.contact?.phone}
          </span>{" "}
          |{" "}
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => updateContact("location", e.target.innerText)}
          >
            {data.contact?.location}
          </span>
        </p>

        <div className="grid grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="col-span-2">

            {/* SUMMARY */}
            <h2 className="font-bold tracking-wide mb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p
              className="mb-8 leading-relaxed"
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => updateField("summary", e.target.innerText)}
            >
              {data.summary}
            </p>

            {/* WORK HISTORY */}
            <h2 className="font-bold tracking-wide mb-3">
              WORK HISTORY
            </h2>

            {data.workHistory?.map((job, index) => (
              <div key={index} className="mb-6 break-inside-avoid">

                <p
                  className="text-gray-600 mb-1"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateWorkHistory(index, "duration", e.target.innerText)
                  }
                >
                  {job.duration}
                </p>

                <p className="font-semibold">
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateWorkHistory(index, "title", e.target.innerText)
                    }
                  >
                    {job.title}
                  </span>{" "}
                  |{" "}
                  <span
                    className="font-normal"
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateWorkHistory(index, "company", e.target.innerText)
                    }
                  >
                    {job.company}
                  </span>
                </p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                  {job.points?.map((point, i) => (
                    <li
                      key={i}
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        updatePoint(index, i, e.target.innerText)
                      }
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* RIGHT */}
          <div>

            {/* ACCOMPLISHMENTS */}
            <h2 className="font-bold tracking-wide mb-2">
              ACCOMPLISHMENTS
            </h2>
            <ul className="list-disc ml-5 mb-6 space-y-2">
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

            {/* SKILLS */}
            <h2 className="font-bold tracking-wide mb-2">
              SKILLS
            </h2>

            {data.skills?.map((skill, i) => (
              <div key={i} className="mb-3">
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

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      style={{
                        height: "8px",
                        width: "28px",
                        backgroundColor:
                          n <= skill.level ? "#374151" : "#d1d5db",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* CERTIFICATIONS */}
            <h2 className="font-bold tracking-wide mt-6 mb-2">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc ml-5 mb-6 space-y-2">
              {data.certifications?.map((cert, i) => (
                <li
                  key={i}
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateArray("certifications", i, e.target.innerText)
                  }
                >
                  {cert}
                </li>
              ))}
            </ul>

            {/* EDUCATION */}
            <h2 className="font-bold tracking-wide mb-2">
              EDUCATION
            </h2>

            {data.education?.map((edu, i) => (
              <div key={i} className="mb-4 break-inside-avoid">
                <p
                  className="text-gray-600"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateEducation(i, "year", e.target.innerText)
                  }
                >
                  {edu.year}
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

                <p
                  className="font-semibold"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateEducation(i, "degree", e.target.innerText)
                  }
                >
                  {edu.degree}
                </p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}