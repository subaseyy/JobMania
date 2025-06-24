"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Users, Mail, Briefcase, CheckCircle } from "lucide-react";
import { useState } from "react";
import PostJobModal from "./components/PostJobModal ";

// Mock Data
const statsData = [
  { name: "Mon", view: 95, applied: 40 },
  { name: "Tue", view: 110, applied: 60 },
  { name: "Wed", view: 122, applied: 34 },
  { name: "Thu", view: 100, applied: 70 },
  { name: "Fri", view: 82, applied: 45 },
  { name: "Sat", view: 40, applied: 15 },
  { name: "Sun", view: 25, applied: 22 },
];

const jobUpdates = [
  {
    title: "Social Media Assistant",
    company: "Nomad · Paris, France",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 9,
    capacity: 10,
  },
  {
    title: "Brand Designer",
    company: "Nomad · Paris, France",
    type: "Full-Time",
    tags: ["Business", "Design"],
    applied: 3,
    capacity: 10,
  },
  {
    title: "Interactive Developer",
    company: "Terraform · Berlin, Germany",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 7,
    capacity: 8,
  },
  {
    title: "Product Designer",
    company: "ClassPass · Berlin, Germany",
    type: "Full-Time",
    tags: ["Business", "Design"],
    applied: 2,
    capacity: 5,
  },
];

export default function Dashboard() {
  const [range, setRange] = useState("Week");
  const [showModal, setShowModal] = useState(false);

  // handle submission to your backend API
  function handlePostJob(data) {
    console.log("Posting job:", data);
  }

  return (
    <div className="flex flex-col gap-6 px-8 py-8 bg-[#f8fafd] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start gap-6 flex-wrap">
        <div>
          <h1 className="font-clash font-[600] text-2xl leading-[130%] text-gray-900 mb-1">
            Good morning, Subas
          </h1>
          <p className="font-epilogue text-sm text-gray-600">
            Here is your job listings statistic report from July 19 - July 25.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Jul 19 - Jul 25</span>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            + Post a job
          </button>
          <PostJobModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handlePostJob}
          />
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex flex-col items-start p-5 bg-[#eceafe] rounded-2xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-[#4640DE]" />
            <span className="font-semibold text-3xl text-[#4640DE]">76</span>
          </div>
          <span className="font-medium text-gray-700">
            New candidates to review
          </span>
        </div>
        <div className="flex flex-col items-start p-5 bg-[#eafaf3] rounded-2xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-green-600" />
            <span className="font-semibold text-3xl text-green-600">3</span>
          </div>
          <span className="font-medium text-gray-700">Schedule for today</span>
        </div>
        <div className="flex flex-col items-start p-5 bg-[#eaf2fe] rounded-2xl shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="text-blue-600" />
            <span className="font-semibold text-3xl text-blue-600">24</span>
          </div>
          <span className="font-medium text-gray-700">Messages received</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Statistics */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Job statistics</span>
            <div className="space-x-1">
              <button
                className={`px-3 py-1 rounded-lg font-medium text-sm ${
                  range === "week"
                    ? "bg-[#eceafe] text-[#4640DE]"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
                onClick={() => setRange("week")}
              >
                Week
              </button>
              <button
                className={`px-3 py-1 rounded-lg font-medium text-sm ${
                  range === "month"
                    ? "bg-[#eceafe] text-[#4640DE]"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
                onClick={() => setRange("month")}
              >
                Month
              </button>
              <button
                className={`px-3 py-1 rounded-lg font-medium text-sm ${
                  range === "year"
                    ? "bg-[#eceafe] text-[#4640DE]"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
                onClick={() => setRange("year")}
              >
                Year
              </button>
            </div>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={statsData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar
                  dataKey="view"
                  fill="#FB923C"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
                <Bar
                  dataKey="applied"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <div className="font-bold text-lg text-gray-900">2,342</div>
              <div className="text-xs text-gray-500">
                Job Views <span className="text-green-600">6.4% ▲</span>
              </div>
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900">654</div>
              <div className="text-xs text-gray-500">
                Job Applied <span className="text-red-600">0.5% ▼</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Job Open */}
          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Jobs Opened</div>
          </div>

        {/* Applicants Summary */}
        <div className="p-5 bg-white rounded-2xl shadow-md">
          <div className="font-semibold mb-2">Applicants Summary</div>
          <div className="text-3xl font-bold text-gray-900 mb-2">67</div>
          <div className="mb-2">
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 bg-[#6A6AE4] rounded-full"></span>
              <span className="text-xs text-gray-600">Full Time: 45</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 bg-[#56C596] rounded-full"></span>
              <span className="text-xs text-gray-600">Part-Time: 24</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 bg-[#FFC542] rounded-full"></span>
              <span className="text-xs text-gray-600">Remote: 22</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 bg-[#FF6A55] rounded-full"></span>
              <span className="text-xs text-gray-600">Internship: 32</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-3 h-3 bg-[#2D9CDB] rounded-full"></span>
              <span className="text-xs text-gray-600">Contract: 30</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Updates */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Job Updates</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobUpdates.map((job, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  {job.type}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{job.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{job.company}</p>
              <div className="flex gap-2 mb-3">
                {job.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                {job.applied} applied of {job.capacity} capacity
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}