import React from 'react';
import { AlertCircle, Eye } from 'lucide-react';

// More compact version of the ViewCreditsAlert component
const ViewCreditsAlert = ({ companyViews, personalViews, recruiterName }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-sm border-b">
      <div className="flex items-center">
        <AlertCircle className={companyViews < 10 ? "text-amber-500 mr-2 h-4 w-4" : "text-green-500 mr-2 h-4 w-4"} />
        <span>
          Company View Credits: <strong>{companyViews}</strong>
        </span>
      </div>

      <div className="flex items-center">
        <Eye className="text-blue-500 mr-2 h-4 w-4" />
        <span>
          <strong>{recruiterName}</strong> has viewed <strong>{personalViews}</strong> profiles
        </span>
      </div>
    </div>
  );
};

export default ViewCreditsAlert;