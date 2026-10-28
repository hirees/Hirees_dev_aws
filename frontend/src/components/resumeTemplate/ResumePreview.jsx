// // import TemplateProfessional1 from "./TemplateProfessional1";

// // export default function ResumeEditor({ templateId, resumeData }) {
// //   switch (templateId) {
// //     case "1":
// //       return <TemplateProfessional1 data={resumeData} />;

// //     default:
// //       return <TemplateProfessional1 data={resumeData} />;
// //   }
// // }


// import TemplateProfessional1 from "./TemplateProfessional1";

// export default function ResumePreview({
//   templateId,
//   data,
//   isEditing,
//   setEditableData,
// }) {
//   switch (templateId) {
//     case "1":
//       return (
//         <TemplateProfessional1
//           data={data}
//           isEditing={isEditing}
//           setEditableData={setEditableData}
//         />
//       );

//     default:
//       return (
//         <TemplateProfessional1
//           data={data}
//           isEditing={isEditing}
//           setEditableData={setEditableData}
//         />
//       );
//   }
// }


import TemplateProfessional1 from "./TemplateProfessional1";
import TemplateProfessional2 from "./TemplateProfessional2";
import TemplateProfessional3 from "./TemplateProfessional3";
import TemplateProfessional4 from "./TemplateProfessional4";
import TemplateProfessional5 from "./TemplateProfessional5";
import TemplateProfessional6 from "./TemplateProfessional6";
import TemplateProfessional7 from "./TemplateProfessional7";
import TemplateProfessional8 from "./TemplateProfessional8";


const templates = {
  "1": TemplateProfessional1,
  "2": TemplateProfessional2,
  "3": TemplateProfessional3,
  "4": TemplateProfessional4,
  "5": TemplateProfessional5,
  "6": TemplateProfessional6,
  "7": TemplateProfessional7,
  "8": TemplateProfessional8,
 
};

export default function ResumePreview({
  templateId,
  data,
  isEditing,
  setEditableData,
}) {
  const SelectedTemplate =
    templates[templateId] || TemplateProfessional1;

  return (
    <SelectedTemplate
      data={data}
      isEditing={isEditing}
      setEditableData={setEditableData}
    />
  );
}
