import { resumeTemplates } from "../data/resumeTemplates.js";

export const getTemplate = (req, res) => {
  const template = resumeTemplates[String(req.params.id)];
  if (!template) {
    return res.status(404).json({
      success: false,
      message: "Template not found",
    });
  }
  return res.status(200).json(template);
};
