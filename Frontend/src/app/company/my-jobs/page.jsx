"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Edit, Trash2, ClipboardList, X } from "lucide-react";
import JobCard from "@/app/find-jobs/component/JobCard";
import Cookies from "js-cookie";

export default function MyJobs({
  jobs = [],
  companyName = "",
  loading = false,
  error = "",
}) {
  const [jobsState, setJobsState] = useState(jobs);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Edit modal states
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    location: "",
    description: "",
    type: "full-time",
    company: "",
    salaryMin: "",
    salaryMax: "",
    currency: "NPR",
    requirements: [""],
    isActive: true,
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const itemsPerPage = 25;
  const API_URL = "http://localhost:5050/api";
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) return;
    setFetchLoading(true);
    setFetchError("");
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/jobs/admin/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setJobsState(data.data || []);
        } else {
          setFetchError(data.message || "Failed to load jobs.");
        }
      } catch (error) {
        setFetchError(error?.message || "Error fetching jobs.");
      } finally {
        setFetchLoading(false);
      }
    };
    fetchJobs();
  }, [token]);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (editingJob) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // On component unmount, clean up (safety)
    return () => {
      document.body.style.overflow = "";
    };
  }, [editingJob]);

  // --- Edit function ---
  const onEdit = (job) => {
    setEditingJob(job);
    setEditForm({
      title: job.title || "",
      location: job.location || "",
      description: job.description || "",
      type: job.type || "full-time",
      company: job.company || "",
      salaryMin: job.salaryMin ?? "",
      salaryMax: job.salaryMax ?? "",
      currency: job.currency || "NPR",
      requirements: job.requirements?.length ? [...job.requirements] : [""],
      isActive: job.isActive ?? true,
    });
    setEditError("");
  };

  // --- Delete function ---
  const onDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      setFetchLoading(true);
      setFetchError("");
      const res = await fetch(`${API_URL}/jobs/admin/jobs/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setJobsState((jobs) =>
          jobs.filter((j) => j._id?.$oid !== jobId && j._id !== jobId)
        );
      } else {
        setFetchError(data.message || "Delete failed");
      }
    } catch (err) {
      setFetchError(err?.message || "Error deleting job.");
    } finally {
      setFetchLoading(false);
    }
  };

  // --- Status toggle ---
  const handleToggleStatus = async (job) => {
    const jobId = job._id?.$oid || job._id;
    const newStatus = !job.isActive;
    try {
      setFetchLoading(true);
      setFetchError("");
      const res = await fetch(`${API_URL}/jobs/admin/jobs/${jobId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setJobsState((jobs) =>
          jobs.map((j) =>
            j._id?.$oid === jobId || j._id === jobId
              ? { ...j, isActive: newStatus }
              : j
          )
        );
      } else {
        setFetchError(data.message || "Status update failed");
      }
    } catch (err) {
      setFetchError(err?.message || "Error updating status.");
    } finally {
      setFetchLoading(false);
    }
  };

  // --- Filter and paginate ---
  const filteredJobs = useMemo(() => {
    return jobsState.filter(
      (job) =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobsState, searchTerm]);

  const paginatedJobs = useMemo(() => {
    return filteredJobs.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredJobs, currentPage, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage));
  const isLoading = loading || fetchLoading;
  const displayError = error || fetchError;

  // --- Edit Modal JSX ---
  const EditModal = editingJob && (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={() => setEditingJob(null)}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="font-bold text-lg mb-4">Edit Job</h2>
        {editError && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded mb-2">
            {editError}
          </div>
        )}

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={editForm.title}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, title: e.target.value }))
          }
          className="border mb-2 px-3 py-2 rounded w-full"
          required
        />

        {/* Company */}
        <input
          type="text"
          placeholder="Company"
          value={editForm.company}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, company: e.target.value }))
          }
          className="border mb-2 px-3 py-2 rounded w-full"
          required
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={editForm.location}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, location: e.target.value }))
          }
          className="border mb-2 px-3 py-2 rounded w-full"
          required
        />

        {/* Type */}
        <select
          value={editForm.type}
          onChange={(e) => setEditForm((f) => ({ ...f, type: e.target.value }))}
          className="border mb-2 px-3 py-2 rounded w-full"
          required
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
        </select>

        {/* Status */}
        <label className="flex items-center mb-2 space-x-2">
          <input
            type="checkbox"
            checked={editForm.isActive}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, isActive: e.target.checked }))
            }
          />
          <span>Active</span>
        </label>

        {/* Salary Range */}
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Salary Min"
            value={editForm.salaryMin}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, salaryMin: e.target.value }))
            }
            className="border px-3 py-2 rounded w-1/2"
          />
          <input
            type="number"
            placeholder="Salary Max"
            value={editForm.salaryMax}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, salaryMax: e.target.value }))
            }
            className="border px-3 py-2 rounded w-1/2"
          />
        </div>

        {/* Currency */}
        <input
          type="text"
          placeholder="Currency"
          value={editForm.currency}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, currency: e.target.value }))
          }
          className="border mb-2 px-3 py-2 rounded w-full"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={editForm.description}
          onChange={(e) =>
            setEditForm((f) => ({ ...f, description: e.target.value }))
          }
          className="border mb-2 px-3 py-2 rounded w-full"
          rows={3}
          required
        />

        {/* Requirements */}
        <div className="mb-2">
          <label className="block font-medium text-sm mb-1">Requirements</label>
          {editForm.requirements.map((req, idx) => (
            <div className="flex mb-1 gap-2" key={idx}>
              <input
                type="text"
                value={req}
                onChange={(e) =>
                  setEditForm((f) => {
                    const updated = [...f.requirements];
                    updated[idx] = e.target.value;
                    return { ...f, requirements: updated };
                  })
                }
                className="border px-2 py-1 rounded w-full"
              />
              <button
                type="button"
                className="text-red-500 px-2"
                disabled={editForm.requirements.length <= 1}
                onClick={() =>
                  setEditForm((f) => ({
                    ...f,
                    requirements: f.requirements.filter((_, i) => i !== idx),
                  }))
                }
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 text-xs mt-1"
            onClick={() =>
              setEditForm((f) => ({
                ...f,
                requirements: [...f.requirements, ""],
              }))
            }
          >
            + Add requirement
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={() => setEditingJob(null)}
            disabled={editLoading}
          >
            Cancel
          </button>
          <button
            className="bg-[#4640DE] text-white px-4 py-2 rounded"
            disabled={editLoading}
            onClick={async () => {
              setEditLoading(true);
              setEditError("");
              try {
                const jobId = editingJob._id?.$oid || editingJob._id;
                // Convert salary fields to numbers if not empty string
                const updatedForm = {
                  ...editForm,
                  salaryMin:
                    editForm.salaryMin === ""
                      ? undefined
                      : Number(editForm.salaryMin),
                  salaryMax:
                    editForm.salaryMax === ""
                      ? undefined
                      : Number(editForm.salaryMax),
                };
                const res = await fetch(`${API_URL}/jobs/admin/jobs/${jobId}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(updatedForm),
                });
                const data = await res.json();
                if (res.ok) {
                  setJobsState((jobs) =>
                    jobs.map((job) =>
                      job._id?.$oid === jobId || job._id === jobId
                        ? data.data
                        : job
                    )
                  );
                  setEditingJob(null);
                } else {
                  setEditError(data.message || "Update failed");
                }
              } catch (err) {
                setEditError(err?.message || "Error updating job.");
              } finally {
                setEditLoading(false);
              }
            }}
          >
            {editLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );

  // --- Render ---
  return (
    <div className="p-4 sm:p-6">
      {EditModal}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <ClipboardList className="mr-2 h-6 w-6 text-[#4640DE]" />
          My Jobs {companyName && `- ${companyName}`}
        </h1>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchTerm(e.target.value);
          }}
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {displayError && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded mb-4">
          {displayError}
        </div>
      )}

      <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Company
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Salary Range
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Currency
              </th>
              {/* <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Requirements
              </th> */}
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={10} className="text-center py-8 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : paginatedJobs.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-8 text-gray-500">
                  No jobs posted yet.
                </td>
              </tr>
            ) : (
              paginatedJobs.map((job) => (
                <tr
                  key={job._id?.$oid || job._id || Math.random()}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-4 whitespace-nowrap font-medium text-gray-900">
                    {job.title}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-gray-600">
                    {job.company}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-gray-600">
                    {job.location}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-gray-700">
                    {job.salaryMin ?? "-"} – {job.salaryMax ?? "-"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-gray-700">
                    {job.currency || "-"}
                  </td>
                  {/* <td
                    className="px-3 py-4 whitespace-nowrap text-gray-700 max-w-xs truncate"
                    title={job.description}
                  >
                    {job.description}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-gray-700 max-w-xs truncate"
                    title={job.requirements?.join(", ")}
                  >
                    {job.requirements?.join(", ") || "-"}
                  </td> */}
                  <td className="px-3 py-4 whitespace-nowrap">
                    <button
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                        job.isActive
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                      onClick={() => handleToggleStatus(job)}
                      disabled={fetchLoading}
                      title={`Mark as ${job.isActive ? "Inactive" : "Active"}`}
                    >
                      {job.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => onEdit(job)}
                        className="text-[#4640DE] hover:text-[#3a35c7] flex items-center"
                      >
                        <Edit className="mr-1 h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => onDelete(job._id?.$oid || job._id)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="block sm:hidden">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : paginatedJobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No jobs posted yet.
          </div>
        ) : (
          paginatedJobs.map((job) => (
            <JobCard
              key={job._id?.$oid || job._id || Math.random()}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      <div className="flex justify-end mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        <span className="text-sm text-gray-700 pt-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
