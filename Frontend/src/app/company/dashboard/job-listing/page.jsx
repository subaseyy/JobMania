"use client";
import React from "react";

// Accepts props: jobs (array of job objects), onRowClick (callback)
export default function JobListingPage({ jobs, onRowClick }) {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold mb-1">Job Listings</div>
            <div className="text-gray-500 text-sm">
              View and manage all open positions.
            </div>
          </div>
          {/* You can add a "Post Job" button here */}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Role
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Department
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Type
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Posted
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Due
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Applicants
                </th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700">
                  Hired
                </th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {jobs && jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-indigo-50 transition cursor-pointer"
                    onClick={() => onRowClick(job)}
                  >
                    <td className="py-3 px-6">{job.role}</td>
                    <td className="py-3 px-6">{job.department}</td>
                    <td className="py-3 px-6">{job.type}</td>
                    <td className="py-3 px-6">
                      <span
                        className={
                          job.status === "Live"
                            ? "text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs"
                            : "text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs"
                        }
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">{job.posted}</td>
                    <td className="py-3 px-6">{job.due}</td>
                    <td className="py-3 px-6">{job.applicants}</td>
                    <td className="py-3 px-6">
                      {job.hired} / {job.total}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button
                        className="text-[#4640DE] hover:underline text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(job);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-400">
                    No jobs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
