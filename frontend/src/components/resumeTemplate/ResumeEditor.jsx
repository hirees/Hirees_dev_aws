// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import ResumePreview from "./ResumePreview";
// import axios from "axios";
// import { data } from "autoprefixer";

// export default function ResumeEditor() {
//   const [searchParams] = useSearchParams();
//   const templateId = searchParams.get("template") || "1";

//   const [resumeData, setResumeData] = useState(null);

//   useEffect(() => {
//     fetchResume();
//   }, []);

//   const fetchResume = async () => {
//     try {
//       const res = await axios.get("/api/resume/my", {
//         withCredentials: true,
//       });

//       if (res.data?.resume) {
//         setResumeData(res.data.resume.resumeData);
//       } else {
//         setResumeData({});
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!resumeData) return <div>Loading...</div>;
// console.log("RESUME DATA:", resumeData);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white shadow rounded-lg">
//         <ResumePreview
//           templateId={templateId}
//           resumeData={resumeData}
//         />
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResumePreview from "./ResumePreview";
import axios from "axios";
import { API_BASE } from "@/utils/constant";

export default function ResumeEditor() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template") || "1";

  const [resumeData, setResumeData] = useState(null);
  const [editableData, setEditableData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    const defaultData = {
      personalInfo: {
        firstName: "Alex",
        lastName: "Morgan",
        city: "City, State",
        phone: "(555) 555-0100",
        email: "you@email.com",
      },
      summary:
        "Replace this summary with your own experience. This starter copy is only a layout sample.",
      experience: [
        {
          title: "Job title",
          startDate: "2022",
          endDate: "Present",
          company: "Company name",
          location: "City, State",
          responsibilities: ["Describe a result you are proud of"],
        },
      ],
      skills: [{ name: "Skill", level: 3 }],
      education: [
        {
          degree: "Degree",
          year: "2020",
          university: "School",
        },
      ],
    };

    try {
      const res = await axios.get(`${API_BASE}/resume/my`, {
        withCredentials: true,
      });
      if (res.data?.resume?.resumeData) {
        setResumeData(res.data.resume.resumeData);
        setEditableData(res.data.resume.resumeData);
        return;
      }
    } catch (err) {
      console.error(err);
    }

    setResumeData(defaultData);
    setEditableData(defaultData);
  };

  if (!resumeData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-24 " >
      <div className="w-full">

      
        <ResumePreview
          templateId={templateId}
          data={isEditing ? editableData : resumeData}
          isEditing={isEditing}
          setEditableData={setEditableData}
        />
      </div>
    </div>
  );
}


