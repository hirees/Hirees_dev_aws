
// // import { useEffect, useState } from "react";
// // import axios from "axios";
import { TEMPLATES_API_END_POINT } from "@/utils/constant";
import { defaultResumeTemplate } from "./defaultResume";

// // export default function TemplateProfessional4() {
// //   const [data, setData] = useState(null);

// //   useEffect(() => {
// //     fetchTemplate();
// //   }, []);

// //   const fetchTemplate = async () => {
// //     try {
// //       const res = await axios.get(`${TEMPLATES_API_END_POINT}/4`);
// //       setData(res.data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   if (!data) return <p>Loading...</p>;

// //   return (
// //     <div className="max-w-[1100px] mx-auto bg-white flex text-[14px] font-sans text-gray-800">

// //       {/* ===== LEFT SIDEBAR ===== */}
// //       <div className="w-[30%] bg-purple-600 text-white p-6">

// //         {/* LOGO */}
// //         <div className="flex justify-center mb-6">
// //           <div className="border-2 border-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
// //             {data.name
// //               ?.split(" ")
// //               .map((n) => n[0])
// //               .join(" ")}
// //           </div>
// //         </div>

// //         {/* NAME */}
// //         <h1 className="text-3xl font-bold mb-6 leading-tight">
// //           {data.name?.split(" ")[0]} <br /> {data.name?.split(" ")[1]}
// //         </h1>

// //         {/* CONTACT */}
// //         <div className="mb-6">
// //           <h2 className="font-semibold mb-2 border-b border-white pb-1">
// //             Contact
// //           </h2>

// //           <p className="mt-2 font-semibold">Address</p>
// //           <p>{data.contact?.location}</p>

// //           <p className="mt-2 font-semibold">Phone</p>
// //           <p>{data.contact?.phone}</p>

// //           <p className="mt-2 font-semibold">E-mail</p>
// //           <p>{data.contact?.email}</p>
// //         </div>

// //         {/* SKILLS */}
// //         <div className="mb-6">
// //           <h2 className="font-semibold mb-2 border-b border-white pb-1">
// //             Skills
// //           </h2>

// //           {data.skills?.map((skill, i) => (
// //             <div key={i} className="mt-3">
// //               <p>{skill.name}</p>
// //               <div className="h-2 bg-purple-300 mt-1">
// //                 <div
// //                   className="h-2 bg-white"
// //                   style={{ width: `${(skill.level / 5) * 100}%` }}
// //                 ></div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* LANGUAGES */}
// //         <div>
// //           <h2 className="font-semibold mb-2 border-b border-white pb-1">
// //             Languages
// //           </h2>

// //           {data.languages?.map((lang, i) => (
// //             <div key={i} className="mt-2">
// //               <p>{lang.name}</p>
// //               <p className="text-sm">{lang.level}</p>
// //               <div className="h-2 bg-purple-300 mt-1">
// //                 <div
// //                   className="h-2 bg-white"
// //                   style={{ width: `${(lang.score || 3) * 20}%` }}
// //                 ></div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* ===== RIGHT CONTENT ===== */}
// //       <div className="w-[70%] p-8">

// //         {/* SUMMARY */}
// //         <p className="mb-6">
// //           {data.summary}
// //         </p>

// //         {/* EDUCATION */}
// //         <h2 className="text-purple-700 font-semibold text-lg mb-3 border-b pb-1">
// //           Education
// //         </h2>

// //         <div className="mb-6 space-y-4">
// //           {data.education?.map((edu, i) => (
// //             <div key={i} className="flex">
// //               <span className="w-24">{edu.year}</span>
// //               <div>
// //                 <p className="font-semibold">
// //                   {edu.degree}
// //                 </p>
// //                 <p className="italic">
// //                   {edu.institute}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* WORK HISTORY (reused instead of Volunteer Experience) */}
// //         <h2 className="text-purple-700 font-semibold text-lg mb-3 border-b pb-1">
// //           Volunteer Experience
// //         </h2>

// //         <div className="space-y-6 mb-6">
// //           {data.workHistory?.map((job, i) => (
// //             <div key={i} className="flex">
// //               <span className="w-28">{job.duration}</span>
// //               <div>
// //                 <p className="font-semibold">{job.title}</p>
// //                 <p className="italic">
// //                   {job.company}
// //                 </p>
// //                 <ul className="list-disc ml-6 mt-2 space-y-1">
// //                   {job.points?.map((point, idx) => (
// //                     <li key={idx}>{point}</li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* ACCOMPLISHMENTS */}
// //         <h2 className="text-purple-700 font-semibold text-lg mb-3 border-b pb-1">
// //           Accomplishments
// //         </h2>

// //         <ul className="list-disc ml-6 space-y-2">
// //           {data.accomplishments?.map((item, i) => (
// //             <li key={i}>{item}</li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import html2pdf from "html2pdf.js";

// export default function TemplateProfessional4() {
//   const [data, setData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const resumeRef = useRef();

//   useEffect(() => {
//     fetchTemplate();
//   }, []);

//   const fetchTemplate = async () => {
//     try {
//       const res = await axios.get(`${TEMPLATES_API_END_POINT}/4`);
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!data) return <p>Loading...</p>;

//   // ===== PDF FUNCTION =====
//   const downloadPDF = () => {
//     if (isEditing) setIsEditing(false);

//     setTimeout(() => {
//       const element = resumeRef.current;

//       const opt = {
//         margin: 0,
//         filename: "resume.pdf",
//         image: { type: "jpeg", quality: 1 },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           allowTaint: true,
//           windowWidth: 794,
//         },
//         jsPDF: {
//           unit: "mm",
//           format: "a4",
//           orientation: "portrait",
//         },
//         pagebreak: { mode: ["avoid-all", "css", "legacy"] },
//       };

//       html2pdf().set(opt).from(element).save();
//     }, 300);
//   };

//   // ===== UPDATE FUNCTIONS =====
//   const updateField = (field, value) => {
//     setData({ ...data, [field]: value });
//   };

//   const updateContact = (field, value) => {
//     setData({
//       ...data,
//       contact: { ...data.contact, [field]: value },
//     });
//   };

//   const updateArray = (key, index, value) => {
//     const updated = [...data[key]];
//     updated[index] = value;
//     setData({ ...data, [key]: updated });
//   };

//   const updateWorkHistory = (index, field, value) => {
//     const updated = [...data.workHistory];
//     updated[index][field] = value;
//     setData({ ...data, workHistory: updated });
//   };

//   const updatePoint = (jobIndex, pointIndex, value) => {
//     const updated = [...data.workHistory];
//     updated[jobIndex].points[pointIndex] = value;
//     setData({ ...data, workHistory: updated });
//   };

//   const updateEducation = (index, field, value) => {
//     const updated = [...data.education];
//     updated[index][field] = value;
//     setData({ ...data, education: updated });
//   };

//   return (
//     <div className="max-w-[1100px] mx-auto">

//       {/* ===== BUTTONS ===== */}
//       <div className="px-6 mb-4">
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
//         >
//           {isEditing ? "Preview" : "Edit Resume"}
//         </button>

//         <button
//           onClick={downloadPDF}
//           className="px-4 py-2 bg-red-500 text-white rounded"
//         >
//           Download PDF
//         </button>
//       </div>

//       {/* ===== PDF CONTENT ===== */}
//       <div
//         ref={resumeRef}
//         style={{ width: "794px", display: "flex" }}
//         className="bg-white text-[14px] font-sans text-gray-800 mx-auto"
//       >

//         {/* ===== LEFT SIDEBAR ===== */}
//         <div
//           style={{ width: "30%", backgroundColor: "#7c3aed", color: "#fff", padding: "24px" }}
//         >

//           {/* LOGO */}
//           <div className="flex justify-center mb-7">
//             <div className="border-2 border-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
//               {data.name
//                 ?.split(" ")
//                 .map((n) => n[0])
//                 .join(" ")}
//             </div>
//           </div>

//           {/* NAME */}
//           <h1 className="text-3xl font-bold mb-6 leading-tight">
//             <span
//               contentEditable={isEditing}
//               suppressContentEditableWarning
//               onBlur={(e) => {
//                 const last = data.name?.split(" ")[1] || "";
//                 updateField("name", e.target.innerText + " " + last);
//               }}
//             >
//               {data.name?.split(" ")[0]}
//             </span>
//             <br />
//             <span
//               contentEditable={isEditing}
//               suppressContentEditableWarning
//               onBlur={(e) => {
//                 const first = data.name?.split(" ")[0] || "";
//                 updateField("name", first + " " + e.target.innerText);
//               }}
//             >
//               {data.name?.split(" ")[1]}
//             </span>
//           </h1>

//           {/* CONTACT */}
//           <div className="mb-6">
//             <h2 className="font-semibold mb-2 border-b border-white pb-1">
//               Contact
//             </h2>

//             <p className="mt-2 font-semibold">Address</p>
//             <p
//               contentEditable={isEditing}
//               suppressContentEditableWarning
//               onBlur={(e) => updateContact("location", e.target.innerText)}
//             >
//               {data.contact?.location}
//             </p>

//             <p className="mt-2 font-semibold">Phone</p>
//             <p
//               contentEditable={isEditing}
//               suppressContentEditableWarning
//               onBlur={(e) => updateContact("phone", e.target.innerText)}
//             >
//               {data.contact?.phone}
//             </p>

//             <p className="mt-2 font-semibold">E-mail</p>
//             <p
//               contentEditable={isEditing}
//               suppressContentEditableWarning
//               onBlur={(e) => updateContact("email", e.target.innerText)}
//             >
//               {data.contact?.email}
//             </p>
//           </div>

//           {/* SKILLS */}
//           <div className="mb-6">
//             <h2 className="font-semibold mb-2 border-b border-white pb-1">
//               Skills
//             </h2>

//             {data.skills?.map((skill, i) => (
//               <div key={i} className="mt-3">
//                 <p
//                   contentEditable={isEditing}
//                   suppressContentEditableWarning
//                   onBlur={(e) => {
//                     const updated = [...data.skills];
//                     updated[i].name = e.target.innerText;
//                     setData({ ...data, skills: updated });
//                   }}
//                 >
//                   {skill.name}
//                 </p>

//                 <div style={{ height: "8px", backgroundColor: "#c4b5fd", marginTop: "4px" }}>
//                   <div
//                     style={{
//                       height: "8px",
//                       backgroundColor: "#ffffff",
//                       width: `${(skill.level / 5) * 100}%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* LANGUAGES */}
//           <div>
//             <h2 className="font-semibold mb-2 border-b border-white pb-1">
//               Languages
//             </h2>

//             {data.languages?.map((lang, i) => (
//               <div key={i} className="mt-2">
//                 <p
//                   contentEditable={isEditing}
//                   suppressContentEditableWarning
//                   onBlur={(e) => {
//                     const updated = [...data.languages];
//                     updated[i].name = e.target.innerText;
//                     setData({ ...data, languages: updated });
//                   }}
//                 >
//                   {lang.name}
//                 </p>

//                 <p
//                   className="text-sm"
//                   contentEditable={isEditing}
//                   suppressContentEditableWarning
//                   onBlur={(e) => {
//                     const updated = [...data.languages];
//                     updated[i].level = e.target.innerText;
//                     setData({ ...data, languages: updated });
//                   }}
//                 >
//                   {lang.level}
//                 </p>

//                 <div style={{ height: "8px", backgroundColor: "#c4b5fd", marginTop: "4px" }}>
//                   <div
//                     style={{
//                       height: "8px",
//                       backgroundColor: "#ffffff",
//                       width: `${(lang.score || 3) * 20}%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ===== RIGHT SIDE ===== */}
//         <div style={{ width: "70%", padding: "24px" }}>

//           {/* SUMMARY */}
//           <p
//             className="mb-6"
//             contentEditable={isEditing}
//             suppressContentEditableWarning
//             onBlur={(e) => updateField("summary", e.target.innerText)}
//           >
//             {data.summary}
//           </p>

//           {/* EDUCATION */}
//           <h2 className="text-purple-700 font-semibold text-lg mb-3 border-b pb-1">
//             Education
//           </h2>

//           <div className="mb-6 space-y-4">
//             {data.education?.map((edu, i) => (
//               <div key={i} className="flex break-inside-avoid">
//                 <span
//                   className="w-24"
//                   contentEditable={isEditing}
//                   suppressContentEditableWarning
//                   onBlur={(e) => updateEducation(i, "year", e.target.innerText)}
//                 >
//                   {edu.year}
//                 </span>

//                 <div>
//                   <p
//                     className="font-semibold"
//                     contentEditable={isEditing}
//                     suppressContentEditableWarning
//                     onBlur={(e) => updateEducation(i, "degree", e.target.innerText)}
//                   >
//                     {edu.degree}
//                   </p>

//                   <p
//                     className="italic"
//                     contentEditable={isEditing}
//                     suppressContentEditableWarning
//                     onBlur={(e) =>
//                       updateEducation(i, "institute", e.target.innerText)
//                     }
//                   >
//                     {edu.institute}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* WORK HISTORY */}
//           <h2 className="text-purple-700 font-semibold text-lg mb-3 border-b pb-1">
//             Volunteer Experience
//           </h2>

//           <div className="space-y-6 mb-6">
//             {data.workHistory?.map((job, i) => (
//               <div key={i} className="flex break-inside-avoid">
//                 <span
//                   className="w-28"
//                   contentEditable={isEditing}
//                   suppressContentEditableWarning
//                   onBlur={(e) =>
//                     updateWorkHistory(i, "duration", e.target.innerText)
//                   }
//                 >
//                   {job.duration}
//                 </span>

//                 <div>
//                   <p
//                     className="font-semibold"
//                     contentEditable={isEditing}
//                     suppressContentEditableWarning
//                     onBlur={(e) =>
//                       updateWorkHistory(i, "title", e.target.innerText)
//                     }
//                   >
//                     {job.title}
//                   </p>

//                   <p
//                     className="italic"
//                     contentEditable={isEditing}
//                     suppressContentEditableWarning
//                     onBlur={(e) =>
//                       updateWorkHistory(i, "company", e.target.innerText)
//                     }
//                   >
//                     {job.company}
//                   </p>

//                   <ul className="list-disc ml-6 mt-2 space-y-1">
//                     {job.points?.map((point, idx) => (
//                       <li
//                         key={idx}
//                         contentEditable={isEditing}
//                         suppressContentEditableWarning
//                         onBlur={(e) =>
//                           updatePoint(i, idx, e.target.innerText)
//                         }
//                       >
//                         {point}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ACCOMPLISHMENTS */}
//           <h2 className="text-purple-700 font-semibold text-lg mb-3 border-b pb-1">
//             Accomplishments
//           </h2>

//           <ul className="list-disc ml-6 space-y-2">
//             {data.accomplishments?.map((item, i) => (
//               <li
//                 key={i}
//                 contentEditable={isEditing}
//                 suppressContentEditableWarning
//                 onBlur={(e) =>
//                   updateArray("accomplishments", i, e.target.innerText)
//                 }
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

export default function TemplateProfessional4() {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const resumeRef = useRef();

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const res = await axios.get(`${TEMPLATES_API_END_POINT}/4`);
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
          // FIX: ensure full height is captured, no clipping
          scrollY: 0,
          scrollX: 0,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        // FIX: removed "avoid-all" which caused blank space at bottom
        pagebreak: { mode: ["css", "legacy"] },
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
        style={{
          width: "794px",
          display: "flex",
          // FIX: exact A4 height - prevents any overflow creating a 2nd page
          height: "1123px",
          maxHeight: "1123px",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
        className="bg-white text-[14px] font-sans text-gray-800 mx-auto"
      >

        {/* ===== LEFT SIDEBAR ===== */}
        <div
          style={{
            width: "30%",
            backgroundColor: "#7c3aed",
            color: "#fff",
            // FIX: reduced padding to give sidebar content more room
            padding: "18px 18px",
            display: "block",
            boxSizing: "border-box",
            alignSelf: "stretch",
            // FIX: hide any overflow strictly within sidebar
            overflow: "hidden",
          }}
        >

          {/* LOGO */}
          <div
            style={{
              display: "block",
              textAlign: "center",
              // FIX: reduced margin to save vertical space
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid white",
                borderRadius: "50%",
                width: "56px",
                height: "56px",
                fontSize: "16px",
                fontWeight: "bold",
                lineHeight: "1",
                verticalAlign: "middle",
              }}
            >
              {data.name
                ?.split(" ")
                .map((n) => n[0])
                .join(" ")}
            </div>
          </div>

          {/* NAME */}
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", lineHeight: "1.2" }}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => {
                const last = data.name?.split(" ")[1] || "";
                updateField("name", e.target.innerText + " " + last);
              }}
            >
              {data.name?.split(" ")[0]}
            </span>
            <br />
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => {
                const first = data.name?.split(" ")[0] || "";
                updateField("name", first + " " + e.target.innerText);
              }}
            >
              {data.name?.split(" ")[1]}
            </span>
          </h1>

          {/* CONTACT */}
          <div style={{ marginBottom: "14px" }}>
            <h2 style={{ fontWeight: "600", marginBottom: "6px", borderBottom: "1px solid white", paddingBottom: "3px" }}>
              Contact
            </h2>

            <p style={{ marginTop: "5px", fontWeight: "600" }}>Address</p>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => updateContact("location", e.target.innerText)}
            >
              {data.contact?.location}
            </p>

            <p style={{ marginTop: "5px", fontWeight: "600" }}>Phone</p>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => updateContact("phone", e.target.innerText)}
            >
              {data.contact?.phone}
            </p>

            <p style={{ marginTop: "5px", fontWeight: "600" }}>E-mail</p>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => updateContact("email", e.target.innerText)}
            >
              {data.contact?.email}
            </p>
          </div>

          {/* SKILLS */}
          <div style={{ marginBottom: "14px" }}>
            <h2 style={{ fontWeight: "600", marginBottom: "6px", borderBottom: "1px solid white", paddingBottom: "3px" }}>
              Skills
            </h2>

            {data.skills?.map((skill, i) => (
              <div key={i} style={{ marginTop: "8px" }}>
                <p
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

                <div style={{ height: "8px", backgroundColor: "#c4b5fd", marginTop: "4px" }}>
                  <div
                    style={{
                      height: "8px",
                      backgroundColor: "#ffffff",
                      width: `${(skill.level / 5) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* LANGUAGES */}
          <div>
            <h2 style={{ fontWeight: "600", marginBottom: "6px", borderBottom: "1px solid white", paddingBottom: "3px" }}>
              Languages
            </h2>

            {data.languages?.map((lang, i) => (
              <div key={i} style={{ marginTop: "6px" }}>
                <p
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const updated = [...data.languages];
                    updated[i].name = e.target.innerText;
                    setData({ ...data, languages: updated });
                  }}
                >
                  {lang.name}
                </p>

                <p
                  style={{ fontSize: "12px" }}
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const updated = [...data.languages];
                    updated[i].level = e.target.innerText;
                    setData({ ...data, languages: updated });
                  }}
                >
                  {lang.level}
                </p>

                <div style={{ height: "8px", backgroundColor: "#c4b5fd", marginTop: "4px" }}>
                  <div
                    style={{
                      height: "8px",
                      backgroundColor: "#ffffff",
                      width: `${(lang.score || 3) * 20}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RIGHT SIDE ===== */}
        <div style={{ width: "70%", padding: "24px", boxSizing: "border-box" }}>

          {/* SUMMARY */}
          <p
            style={{ marginBottom: "24px" }}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => updateField("summary", e.target.innerText)}
          >
            {data.summary}
          </p>

          {/* EDUCATION */}
          <h2 style={{ color: "#7c3aed", fontWeight: "600", fontSize: "18px", marginBottom: "12px", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px" }}>
            Education
          </h2>

          <div style={{ marginBottom: "24px" }}>
            {data.education?.map((edu, i) => (
              <div key={i} style={{ display: "flex", marginBottom: "16px" }}>
                <span
                  style={{ width: "96px", flexShrink: 0 }}
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => updateEducation(i, "year", e.target.innerText)}
                >
                  {edu.year}
                </span>

                <div>
                  <p
                    style={{ fontWeight: "600" }}
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => updateEducation(i, "degree", e.target.innerText)}
                  >
                    {edu.degree}
                  </p>

                  <p
                    style={{ fontStyle: "italic" }}
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => updateEducation(i, "institute", e.target.innerText)}
                  >
                    {edu.institute}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* WORK HISTORY */}
          <h2 style={{ color: "#7c3aed", fontWeight: "600", fontSize: "18px", marginBottom: "12px", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px" }}>
            Volunteer Experience
          </h2>

          <div style={{ marginBottom: "24px" }}>
            {data.workHistory?.map((job, i) => (
              <div key={i} style={{ display: "flex", marginBottom: "24px" }}>
                <span
                  style={{ width: "112px", flexShrink: 0 }}
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => updateWorkHistory(i, "duration", e.target.innerText)}
                >
                  {job.duration}
                </span>

                <div>
                  <p
                    style={{ fontWeight: "600" }}
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => updateWorkHistory(i, "title", e.target.innerText)}
                  >
                    {job.title}
                  </p>

                  <p
                    style={{ fontStyle: "italic" }}
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => updateWorkHistory(i, "company", e.target.innerText)}
                  >
                    {job.company}
                  </p>

                  <ul style={{ listStyleType: "disc", marginLeft: "24px", marginTop: "8px" }}>
                    {job.points?.map((point, idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: "4px" }}
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={(e) => updatePoint(i, idx, e.target.innerText)}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* ACCOMPLISHMENTS */}
          <h2 style={{ color: "#7c3aed", fontWeight: "600", fontSize: "18px", marginBottom: "12px", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px" }}>
            Accomplishments
          </h2>

          <ul style={{ listStyleType: "disc", marginLeft: "24px" }}>
            {data.accomplishments?.map((item, i) => (
              <li
                key={i}
                style={{ marginBottom: "8px" }}
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => updateArray("accomplishments", i, e.target.innerText)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
