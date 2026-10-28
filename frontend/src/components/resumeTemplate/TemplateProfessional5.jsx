import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { TEMPLATES_API_END_POINT } from "@/utils/constant";
import { defaultResumeTemplate } from "./defaultResume";
import html2pdf from "html2pdf.js";

export default function TemplateProfessional5() {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const resumeRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const res = await axios.get(`${TEMPLATES_API_END_POINT}/5`);
      setData(res.data);
      // Set initial profile image from API if available
      if (res.data.profileImage) {
        setProfileImage(res.data.profileImage);
      }
    } catch (err) {
      console.error(err);
      setData(defaultResumeTemplate);
    }
  };

  if (!data) return <p>Loading...</p>;

  // ===== PROFILE PHOTO UPLOAD =====
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfileImage(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

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

        {/* PHOTO UPLOAD BUTTON - outside PDF area so it won't appear in PDF */}
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          📷 Upload Photo
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhotoUpload}
        />
        {profileImage && (
          <button
            onClick={() => setProfileImage(null)}
            className="px-4 py-2 bg-gray-400 text-white rounded text-sm"
          >
            Remove Photo
          </button>
        )}
      </div>
      </div>
      {/* ===== PDF CONTENT ===== */}
      <div
        ref={resumeRef}
        style={{
          width: "794px",
          display: "flex",
          // FIX: exact A4 height clamp — prevents blank 2nd page
          height: "1123px",
          maxHeight: "1123px",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
        className="bg-white mx-auto text-[14px] font-sans text-gray-800"
      >

        {/* ===== LEFT SIDEBAR ===== */}
        <div
          style={{
            width: "30%",
            backgroundColor: "#7c3aed",
            color: "#fff",
            display: "block",
            boxSizing: "border-box",
            alignSelf: "stretch",
            overflow: "hidden",
          }}
        >

          {/* PROFILE IMAGE */}
          <div style={{ textAlign: "center", padding: "20px 0 12px" }}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid white",
                  display: "inline-block",
                }}
              />
            ) : (
              // Fallback: initials circle if no photo uploaded
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "3px solid white",
                  borderRadius: "50%",
                  width: "96px",
                  height: "96px",
                  fontSize: "22px",
                  fontWeight: "bold",
                  lineHeight: "1",
                  cursor: "pointer",
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                title="Click Upload Photo button above to add your photo"
              >
                {data.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          {/* NAME */}
          <div style={{ padding: "0 20px 16px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: "bold", lineHeight: "1.2" }}>
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
          </div>

          {/* CONTACT HEADER */}
          <div style={{ backgroundColor: "#6d28d9", padding: "8px 20px", fontWeight: "600" }}>
            Contact
          </div>

          {/* CONTACT CONTENT */}
          <div style={{ padding: "12px 20px" }}>
            <p style={{ fontWeight: "600" }}>Address</p>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => updateContact("location", e.target.innerText)}
            >
              {data.contact?.location}
            </p>

            <p style={{ marginTop: "8px", fontWeight: "600" }}>Phone</p>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => updateContact("phone", e.target.innerText)}
            >
              {data.contact?.phone}
            </p>

            <p style={{ marginTop: "8px", fontWeight: "600" }}>E-mail</p>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => updateContact("email", e.target.innerText)}
            >
              {data.contact?.email}
            </p>
          </div>

          {/* SKILLS HEADER */}
          <div style={{ backgroundColor: "#6d28d9", padding: "8px 20px", fontWeight: "600" }}>
            Skills
          </div>

          {/* SKILLS CONTENT */}
          <div style={{ padding: "12px 20px" }}>
            {data.skills?.map((skill, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
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
                      backgroundColor: "#fff",
                      width: `${skill.level * 20}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RIGHT SIDE ===== */}
        <div style={{ width: "70%", padding: "24px 28px", boxSizing: "border-box" }}>

          {/* SUMMARY */}
          <p
            style={{ marginBottom: "20px" }}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => updateField("summary", e.target.innerText)}
          >
            {data.summary}
          </p>

          {/* EDUCATION */}
          <h2 style={{ color: "#7c3aed", fontWeight: "600", fontSize: "17px", marginBottom: "10px", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px" }}>
            Education
          </h2>

          <div style={{ marginBottom: "20px" }}>
            {data.education?.map((edu, i) => (
              <div key={i} style={{ display: "flex", marginBottom: "14px" }}>
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
          <h2 style={{ color: "#7c3aed", fontWeight: "600", fontSize: "17px", marginBottom: "10px", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px" }}>
            Work History
          </h2>

          <div style={{ marginBottom: "20px" }}>
            {data.workHistory?.map((job, i) => (
              <div key={i} style={{ display: "flex", marginBottom: "18px" }}>
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

                  <ul style={{ listStyleType: "disc", marginLeft: "24px", marginTop: "6px" }}>
                    {job.points?.map((point, idx) => (
                      <li
                        key={idx}
                        style={{ marginBottom: "3px" }}
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
          <h2 style={{ color: "#7c3aed", fontWeight: "600", fontSize: "17px", marginBottom: "10px", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px" }}>
            Accomplishments
          </h2>

          <ul style={{ listStyleType: "disc", marginLeft: "24px" }}>
            {data.accomplishments?.map((item, i) => (
              <li
                key={i}
                style={{ marginBottom: "6px" }}
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