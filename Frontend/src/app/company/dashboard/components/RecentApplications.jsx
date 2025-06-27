"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function RecentApplications() {
  const [applications, setApplications] = useState([]);
  const token = Cookies.get("token");
  const API = "http://localhost:5050/api";

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`${API}/jobApplications/company/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          const sorted = (data.data || []).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setApplications(sorted.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    if (token) fetchApplications();
  }, [token]);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold text-lg mb-4">Recent Applications</h2>
      <ul className="space-y-3">
        {applications.map((app) => (
          <li key={app._id} className="border-b pb-2">
            <div className="font-semibold text-gray-800">
              {app.applicant?.full_name || "Unknown"}
            </div>
            <div className="text-sm text-gray-500">
              Applied for: {app.job?.title || "Unknown job"}
            </div>
            <div className="text-xs text-gray-400">
              Date: {new Date(app.createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-blue-500 capitalize">
              Status: {app.status}
            </div>
          </li>
        ))}
        {applications.length === 0 && (
          <p className="text-sm text-gray-500">No recent applications.</p>
        )}
      </ul>
    </div>
  );
}
