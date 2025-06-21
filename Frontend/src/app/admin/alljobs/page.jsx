"use client";
import React, { useState, useEffect } from "react";
import { Edit, Trash2, X, CheckCircle, ClipboardList } from "lucide-react";
import JobCard from "./component/JobCard";
import { DUMMY_JOBS } from "../utils/constant";

export default function AllJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Load from localStorage (or use dummy on first run)
  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("jobs") || "[]");
    if (stored.length === 0 && DUMMY_JOBS) {
      localStorage.setItem("jobs", JSON.stringify(DUMMY_JOBS));
      stored = DUMMY_JOBS;
    }
    setJobs(stored);
  }, []);

  // Edit helpers
  const openEdit = (job) => {
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
    });
    setEditing(job);
    setShowModal(true);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const updatedJobs = jobs.map((j) =>
      j.id === editing.id ? { ...editing, ...form } : j
    );
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setIsProcessing(false);
    setShowModal(false);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const filtered = jobs.filter((j) => j.id !== id);
      setJobs(filtered);
      localStorage.setItem("jobs", JSON.stringify(filtered));
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <ClipboardList className="mr-2 h-6 w-6 text-[#4640DE]" />
          All Jobs
        </h1>
      </div>

      {/* Responsive Cards for Mobile */}
      <div className="sm:hidden">
        {jobs.length === 0 && (
          <div className="text-center text-gray-500 py-8">No jobs found.</div>
        )}
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Responsive Table for Desktop */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto max-w-full">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobs.map((j) => (
                <tr key={j.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {j.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {j.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {j.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        j.type === "Full-time"
                          ? "bg-green-100 text-green-800"
                          : j.type === "Part-time"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {j.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-6">
                      <button
                        onClick={() => openEdit(j)}
                        className="text-[#4640DE] hover:text-[#3a35c7] flex items-center"
                      >
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(j.id)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Job Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Edit Job</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="job-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Title
                </label>
                <input
                  id="job-title"
                  name="title"
                  placeholder="Frontend Developer"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-all"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="job-company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company
                </label>
                <input
                  id="job-company"
                  name="company"
                  placeholder="NestNepal"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-all"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="job-location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  id="job-location"
                  name="location"
                  placeholder="Kathmandu or Remote"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-all"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="job-type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Type
                </label>
                <select
                  id="job-type"
                  name="type"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-all"
                  value={form.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2.5 bg-[#4640DE] hover:bg-[#3a35c7] text-white font-medium rounded-lg transition-colors disabled:opacity-70 flex items-center"
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Update Job
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
