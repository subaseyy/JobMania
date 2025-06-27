import React from "react";

export default function StatsCards({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      <Card title="Jobs Posted" count={summary.totalJobs || 0} color="blue" />
      <Card title="Total Applications" count={summary.totalApplications || 0} color="green" />
      <Card title="Hired" count={summary.hired || 0} color="purple" />
    </div>
  );
}

function Card({ title, count, color }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    purple: "text-purple-600 bg-purple-100",
  };
  return (
    <div className={`p-4 rounded-xl ${colorMap[color]} shadow-sm`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="text-3xl font-bold">{count}</div>
    </div>
  );
}
