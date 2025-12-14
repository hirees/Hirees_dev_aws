
import React, { useState } from "react";
import { CalendarDays, Clock, XCircle } from "lucide-react";

const VALID_JOB_TYPES = [
  "Full-Time",
  "Part-Time",
  "Internship",
  "Freelance",
  "Contract",
  "Contact to Hire",
];

function FilterCard({ onFilterChange }) {
  const [filters, setFilters] = useState({
    timeRange: "",
    jobType: "",
  });

  const filterData = [
    {
      name: "Time Range",
      options: [
        {
          label: "Today",
          value: "today",
          icon: <Clock className="w-4 h-4 text-blue-600" />,
        },
        {
          label: "Last 3 Days",
          value: "last3days",
          icon: <Clock className="w-4 h-4 text-blue-600" />,
        },
        {
          label: "Last 7 Days",
          value: "last7days",
          icon: <Clock className="w-4 h-4 text-blue-600" />,
        },
      ],
      filterKey: "timeRange",
    },
    {
      name: "Job Type",
      options: [
        {
          label: "Full Time",
          value: "Full-Time",
          icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
        },
        {
          label: "Contract",
          value: "Contract",
          icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
        },
        {
          label: "Contract to Hire",
          value: "Contract",
          icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
        },
        {
          label: "Part Time",
          value: "Part-Time",
          icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
        },
        {
          label: "Internship",
          value: "Internship",
          icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
        },
        {
          label: "Freelance",
          value: "Freelance",
          icon: <CalendarDays className="w-4 h-4 text-blue-600" />,
        },
      ],
      filterKey: "jobType",
    },
  ];

  const handleChange = (filterKey, value) => {
    if (filterKey === "jobType" && !VALID_JOB_TYPES.includes(value)) {
      console.warn(`Invalid job type selected: ${value}`);
      return;
    }

    const updatedFilters = {
      ...filters,
      [filterKey]: value === filters[filterKey] ? "" : value,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearAll = (e) => {
    e.preventDefault();
    const clearedFilters = { timeRange: "", jobType: "" };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const isAnyFilterApplied = Object.values(filters).some(
    (value) => value !== ""
  );

  return (
    <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900">Filters</h1>
        {isAnyFilterApplied && (
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 group"
          >
            <XCircle className="w-4 h-4" />
            Clear filters
          </button>
        )}
      </div>

      <div className="space-y-6">
        {filterData.map((filter) => (
          <div key={filter.name}>
            <h2 className="text-sm font-medium text-gray-700 mb-3">
              {filter.name}
            </h2>
            <div className="flex flex-col space-y-2">
              {filter.options.map((option) => {
                const isSelected = filters[filter.filterKey] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleChange(filter.filterKey, option.value)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-md text-sm
                      transition-all duration-200 border w-full justify-start
                      ${
                        isSelected
                          ? "bg-blue-50 border-blue-200 text-blue-700 font-medium"
                          : "bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/50"
                      }
                    `}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCard;