"use client";

import { useEffect, useState } from "react";
import { subDays } from "date-fns";
import axios from "axios";

import StatsCards from "./component/StatsCards";
import RecentApplications from "./component/RecentApplications";
import DateFilter from "./component/DateFilter";

// Helper to get token from cookies
const getTokenFromCookie = () => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const BASE_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export default function DashboardOverview() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(new Date(), 6),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = getTokenFromCookie();
      if (!token) {
        setError("Token not found. Please log in.");
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Get profile
        const profileRes = await axios.get(`${BASE_API_URL}/users/profile`, {
          headers,
        });
        setUser(profileRes.data.data.user);

        // Get applications
        const appsRes = await axios.get(
          `${BASE_API_URL}/jobApplications/my-applications`,
          { headers }
        );
        const apps = appsRes.data.data;
        setApplications(apps);

        // Compute stats
        const computedStats = apps.reduce(
          (acc, app) => {
            const status = app.status?.toLowerCase();
            acc.applied++;

            if (status === "interview") acc.interview++;
            if (status === "hired") acc.hired++;

            return acc;
          },
          { applied: 0, interview: 0, hired: 0 }
        );

        setStats(computedStats);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Authorization failed. Please log in again.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 container mx-auto py-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-between sm:flex-row flex-col">
        <div className="mb-6">
          <h2 className="font-clash font-semibold text-2xl text-[#25324B]">
            Good morning, {user?.full_name || "User"}
          </h2>
          <p className="text-base text-[#7C8493]">
            Here is what's happening with your job search applications.
          </p>
        </div>

        <DateFilter
          dateRange={dateRange}
          setDateRange={setDateRange}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
        />
      </div>

      <StatsCards stats={stats} dateRange={dateRange} />
      <RecentApplications applications={applications} />
    </div>
  );
}
