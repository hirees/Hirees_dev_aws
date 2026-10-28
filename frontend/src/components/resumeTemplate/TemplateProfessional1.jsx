import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { TEMPLATES_API_END_POINT } from "@/utils/constant";
import { defaultResumeTemplate } from "./defaultResume";
import html2pdf from "html2pdf.js";

export default function TemplateProfessional1() {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const resumeRef = useRef();

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const res = await axios.get(`${TEMPLATES_API_END_POINT}/1`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setData(defaultResumeTemplate);
    }
  };

  if (!data) return <p>Loading...</p>;

  // ===== PDF FUNCTION (FIXED) =====
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
          logging: false,
          windowWidth: 794,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { mode: "avoid-all" },
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

      {/* ===== BUTTONS (OUTSIDE PDF) ===== */}
      {/* BUTTONS */}
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
        className="bg-white px-12 py-10 text-[14px] font-sans text-gray-900 w-[794px] mx-auto"
      >

        {/* ===== NAME ===== */}
        <h1 className="text-5xl font-bold uppercase mb-5 leading-[1.2]">
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => {
              const last = data.name?.split(" ")[1] || "";
              updateField("name", e.target.innerText + " " + last);
            }}
          >
            {data.name?.split(" ")[0]}
          </span>{" "}
          <span
            style={{ color: "#fb923c" }}
            className="text-orange-400"
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

        {/* ===== CONTACT ===== */}
        <div
          style={{ backgroundColor: "#000", color: "#fff" }}
          className="bg-black text-white text-sm px-6 py-3 mb-8"
        >
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => updateContact("location", e.target.innerText)}
          >
            {data.contact?.location}
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
            onBlur={(e) => updateContact("email", e.target.innerText)}
          >
            {data.contact?.email}
          </span>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "3rem" }}
          className="grid grid-cols-3 gap-12"
        >

          {/* LEFT */}
          <div>

            <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
            <div
              style={{ height: "2px", backgroundColor: "#fdba74", marginBottom: "0.75rem", width: "100%" }}
            ></div>

            <p
              className="mb-8 leading-relaxed"
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => updateField("summary", e.target.innerText)}
            >
              {data.summary}
            </p>

            <h2 className="text-xl font-semibold mb-2">Work History</h2>
            <div
              style={{ height: "2px", backgroundColor: "#fdba74", marginBottom: "1rem", width: "100%" }}
            ></div>

            {data.workHistory?.map((job, index) => (
              <div key={index} className="mb-6 break-inside-avoid">
                <div
                  style={{ display: "flex", justifyContent: "space-between", fontWeight: "600" }}
                >
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateWorkHistory(index, "title", e.target.innerText)
                    }
                  >
                    {job.title}
                  </span>

                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateWorkHistory(index, "duration", e.target.innerText)
                    }
                  >
                    {job.duration}
                  </span>
                </div>

                <p
                  className="italic mb-2"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateWorkHistory(index, "company", e.target.innerText)
                  }
                >
                  {job.company}
                </p>

                <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }} className="space-y-1">
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

            <h2 className="text-xl font-semibold mb-2">Accomplishments</h2>
            <div
              style={{ height: "2px", backgroundColor: "#fdba74", marginBottom: "1rem", width: "100%" }}
            ></div>

            <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem" }} className="space-y-2 mb-6">
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

            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div
              style={{ height: "2px", backgroundColor: "#fdba74", marginBottom: "1rem", width: "100%" }}
            ></div>

            {data.skills?.map((skill, i) => (
              <div key={i} style={{ marginBottom: "12px", display: "block" }}>
                <p
                  style={{ display: "block", marginBottom: "4px", lineHeight: "1.4" }}
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

                {/* FIXED: inline styles so html2canvas renders correctly */}
                <div style={{ display: "flex", flexDirection: "row", gap: "4px", marginTop: "2px" }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      style={{
                        height: "8px",
                        width: "28px",
                        backgroundColor: n <= skill.level ? "#fb923c" : "#d1d5db",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}

            <h2 className="text-xl font-semibold mt-6 mb-2">Certifications</h2>
            <div
              style={{ height: "2px", backgroundColor: "#fdba74", marginBottom: "1rem", width: "100%" }}
            ></div>

            <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem" }} className="space-y-2 mb-6">
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

            <h2 className="text-xl font-semibold mb-2">Education</h2>
            <div
              style={{ height: "2px", backgroundColor: "#fdba74", marginBottom: "1rem", width: "100%" }}
            ></div>

            {data.education?.map((edu, i) => (
              <div key={i} className="mb-4 break-inside-avoid">
                <div
                  style={{ display: "flex", justifyContent: "space-between", fontWeight: "600" }}
                >
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateEducation(i, "degree", e.target.innerText)
                    }
                  >
                    {edu.degree}
                  </span>

                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateEducation(i, "year", e.target.innerText)
                    }
                  >
                    {edu.year}
                  </span>
                </div>

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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
