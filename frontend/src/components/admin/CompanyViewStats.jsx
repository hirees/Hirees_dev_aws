import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { USER_API_END_POINT } from '@/utils/constant';

const CompanyViewStats = ({ companyId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${USER_API_END_POINT}/companies/${companyId}/view-stats`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Email': localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : null
          }
        });

        const data = await response.json();

        if (data.success) {
          setStatsData(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch company view statistics");
        }
      } catch (error) {
        console.error("Error fetching view stats:", error);
        setError(error.message || "Failed to load view statistics");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchStats();
    }
  }, [companyId]);

  if (loading) {
    return <div className="text-center py-4 text-sm text-gray-500">Loading view statistics...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="text-sm">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!statsData) {
    return <div className="text-center py-4 text-sm text-gray-500">No statistics available</div>;
  }

  const usedViews = statsData.initialViewCount - statsData.remainingViews;
  const viewPercentage = statsData.initialViewCount > 0
    ? Math.round((usedViews / statsData.initialViewCount) * 100)
    : 0;

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded border shadow-sm">
        <h3 className="text-sm font-medium mb-3 text-gray-700">Company View Usage</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-50 p-3 rounded border">
            <p className="text-xs text-gray-500">Total Views</p>
            <p className="text-lg font-semibold">{statsData.initialViewCount}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded border">
            <p className="text-xs text-gray-500">Used</p>
            <p className="text-lg font-semibold">{usedViews}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded border">
            <p className="text-xs text-gray-500">Remaining</p>
            <p className="text-lg font-semibold">{statsData.remainingViews}</p>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between mb-1">
            <span className="text-xs">{viewPercentage}% used</span>
            <span className="text-xs">{statsData.remainingViews} remaining</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${viewPercentage > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${viewPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded border shadow-sm">
        <h3 className="text-sm font-medium mb-3 text-gray-700">Recruiter Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recruiter</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profiles Viewed</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Candidates</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {statsData.recruiters.map((recruiter, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-3 py-2 whitespace-nowrap text-xs">{recruiter.fullname}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs">{recruiter.viewCount}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs">{recruiter.uniqueCandidatesViewed}</td>
                </tr>
              ))}
              {statsData.recruiters.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-3 py-2 text-center text-xs text-gray-500">No recruiter activity yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyViewStats;