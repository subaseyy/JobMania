"use client";

import { format } from "date-fns";

export default function StatsCards({ stats = {}, dateRange = [] }) {
  const hasDateRange = Array.isArray(dateRange) && dateRange.length > 0;

  const formatRange = () => {
    if (!hasDateRange || !dateRange[0].startDate || !dateRange[0].endDate) return "";
    return `(${format(dateRange[0].startDate, "MMM d")} - ${format(dateRange[0].endDate, "MMM d")})`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-gray-600 font-medium mb-2">Applications {formatRange()}</h3>
        <div className="text-3xl font-bold text-gray-800">{stats.applied || 0}</div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-gray-600 font-medium mb-2">Interviews {formatRange()}</h3>
        <div className="text-3xl font-bold text-gray-800">{stats.interview || 0}</div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-gray-600 font-medium mb-2">Hired {formatRange()}</h3>
        <div className="text-3xl font-bold text-gray-800">{stats.hired || 0}</div>
      </div>
    </div>
  );
}
