"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DailyStatsChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold text-lg mb-4">Daily Stats</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jobsPosted" fill="#60A5FA" />
            <Bar dataKey="appsReceived" fill="#34D399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
