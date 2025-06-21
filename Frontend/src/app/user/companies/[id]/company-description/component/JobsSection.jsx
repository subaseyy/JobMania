"use client";
import { MapPin, ExternalLink } from "lucide-react";

export const JobsSection = ({ jobListings }) => {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Open Jobs</h2>
        <span className="text-blue-600 text-sm cursor-pointer hover:underline">
          View all
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobListings.map((job, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${job.color}`}
                  >
                    {job.type}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {job.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    {job.salary}
                  </span>
                  <span className="text-xs text-gray-500">{job.posted}</span>
                </div>
              </div>
              <button className="ml-4 p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};