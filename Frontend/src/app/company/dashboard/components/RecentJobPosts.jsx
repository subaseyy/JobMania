"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function RecentJobPosts() {
  const [jobs, setJobs] = useState([]);
  const token = Cookies.get("token");
  const API = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API}/jobs/admin/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          const sorted = (data.data || []).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setJobs(sorted.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    if (token) fetchJobs();
  }, [token]);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold text-lg mb-4">Recent Job Posts</h2>
      <ul className="space-y-3">
        {jobs.map((job) => (
          <li key={job._id} className="border-b pb-2">
            <div className="font-semibold text-gray-800">{job.title}</div>
            <div className="text-sm text-gray-500">
              {job.company} ・ {job.location}
            </div>
            <div className="text-xs text-gray-400">
              Posted: {new Date(job.createdAt).toLocaleDateString()}
            </div>
          </li>
        ))}
        {jobs.length === 0 && (
          <p className="text-sm text-gray-500">No recent job posts.</p>
        )}
      </ul>
    </div>
  );
}
