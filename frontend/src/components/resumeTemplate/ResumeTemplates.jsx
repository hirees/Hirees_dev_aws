import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const templates = [
  { id: 1, name: "Professional" },
  { id: 2, name: "Modern" },
  { id: 3, name: "Minimal" },
  { id: 4, name: "Creative" },
  { id: 5, name: "Simple" },
  { id: 6, name: "Classic" },
  { id: 7, name: "Elegant" },
  { id: 8, name: "Bold" },
];

export default function ResumeTemplates() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full bg-[#97C0FF]/30">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
            Free resume templates
          </h1>
          <p className="text-sm md:text-base text-gray-500 max-w-xl">
            Choose a layout, add your details, and download a PDF. These are
            starter templates, not a claim about hiring outcomes.
          </p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => navigate(`/resume-editor?template=${template.id}`)}
              className="rounded-xl border border-gray-200 bg-white p-6 text-left hover:shadow-lg hover:-translate-y-1 transition"
            >
              <p className="text-xs font-semibold text-[#0350C6]">Template {template.id}</p>
              <p className="mt-2 text-lg font-semibold text-gray-700">{template.name}</p>
              <p className="mt-2 text-sm text-gray-500">Open and edit</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
