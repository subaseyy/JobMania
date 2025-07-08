"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";

import StatsCards from "./components/StatsCards";
import DailyStatsChart from "./components/DailyStatsChart";
import RecentJobPosts from "./components/RecentJobPosts";
import RecentApplications from "./components/RecentApplications";

const API = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState({});
  const [dailyStats, setDailyStats] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [jobRes, appRes] = await Promise.all([
          fetch(`${API}/jobs/admin/jobs`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API}/jobApplications/company/applications`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const jobsData = await jobRes.json();
        const appsData = await appRes.json();

        const jobsList = jobsData.data || [];
        const appsList = appsData.data || [];

        setJobs(jobsList);
        setApplications(appsList);

        computeSummary(jobsList, appsList);
        setDailyStats(computeDailyStats(jobsList, appsList));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchData();
  }, [token]);

  const computeSummary = (jobs, applications) => {
    const totalJobs = jobs.length;
    const totalApplications = applications.length;

    const statusCount = applications.reduce((acc, app) => {
      const status = app.status || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    setSummary({
      totalJobs,
      totalApplications,
      ...statusCount,
    });
  };

  const computeDailyStats = (jobs, applications, daysBack = 7) => {
    const today = new Date();
    const result = [];

    for (let i = daysBack - 1; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const dayStr = format(day, "MMM d");

      const jobsPosted = jobs.filter(
        (job) =>
          format(new Date(job.createdAt), "MMM d") === dayStr
      ).length;

      const appsReceived = applications.filter(
        (app) =>
          format(new Date(app.createdAt), "MMM d") === dayStr
      ).length;

      result.push({ date: dayStr, jobsPosted, appsReceived });
    }

    return result;
  };

  return (
    <div className="p-6 font-epilogue bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-[#4640DE]">
        Employer Dashboard
      </h1>

      <StatsCards summary={summary} />

      <div className="mt-6">
        <DailyStatsChart data={dailyStats} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RecentJobPosts jobs={jobs} />
        <RecentApplications applications={applications} />
      </div>
    </div>
  );
}
