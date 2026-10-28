
import { useEffect, useState } from "react";
import axios from "axios";
import { TEMPLATES_API_END_POINT } from "@/utils/constant";
import { defaultResumeTemplate } from "./defaultResume";

export default function TemplateProfessional6() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const res = await axios.get(`${TEMPLATES_API_END_POINT}/6`);
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
      <h1 className="text-4xl font-bold text-center text-green-700 mb-2">
        {data.name}
      </h1>

      {/* ===== CONTACT ===== */}
      <p className="text-center mb-8">
        {data.contact?.location} <br />
        {data.contact?.phone} - {data.contact?.email}
      </p>

      {/* ===== PROFESSIONAL SUMMARY ===== */}
      <div className="mb-6">
        <h2 className="text-green-700 font-semibold uppercase mb-2 border-b-2 border-green-500 pb-1">
          Professional Summary
        </h2>
        <p className="leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* ===== WORK HISTORY ===== */}
      <div className="mb-6">
        <h2 className="text-green-700 font-semibold uppercase mb-3 border-b-2 border-green-500 pb-1">
          Work History
        </h2>

        {data.workHistory?.map((job, i) => (
          <div key={i} className="flex mb-5">
            <span className="w-36">{job.duration}</span>
            <div>
              <p className="font-semibold">
                {job.title}
              </p>
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
      <div className="mb-6">
        <h2 className="text-green-700 font-semibold uppercase mb-2 border-b-2 border-green-500 pb-1">
          Accomplishments
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          {data.accomplishments?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ===== SKILLS ===== */}
      <div className="mb-6">
        <h2 className="text-green-700 font-semibold uppercase mb-2 border-b-2 border-green-500 pb-1">
          Skills
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {data.skills?.map((skill, i) => (
            <div key={i}>
              <p className="mb-1">{skill.name}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={`h-2 w-8 ${
                      n <= skill.level ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CERTIFICATIONS ===== */}
      <div className="mb-6">
        <h2 className="text-green-700 font-semibold uppercase mb-2 border-b-2 border-green-500 pb-1">
          Certifications
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          {data.certifications?.map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
      </div>

      {/* ===== EDUCATION ===== */}
      <div>
        <h2 className="text-green-700 font-semibold uppercase mb-2 border-b-2 border-green-500 pb-1">
          Education
        </h2>

        <div className="space-y-4">
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
      </div>
    </div>
  );
}
