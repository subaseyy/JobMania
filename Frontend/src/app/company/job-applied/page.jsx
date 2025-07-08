"use client";
import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

export default function CompanyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  // Pagination states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;
  const token = Cookies.get("token");

  // Fetch company jobs
  useEffect(() => {
    async function fetchCompanyJobs() {
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/jobs/admin/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setCompanyJobs(data.data || []);
        }
      } catch (err) {
        // Optional: set an error state here
      }
    }
    fetchCompanyJobs();
  }, [token]);

  // Fetch applications
  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${API_URL}/jobApplications/company/applications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setApplications(data.data || []);
        } else {
          setError(data.message || "Failed to load applications.");
        }
      } catch (err) {
        setError(err.message || "Failed to load.");
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchApplications();
  }, [token]);

  // Unique job titles for filter dropdown
  const jobTitles = useMemo(() => {
    const titles = companyJobs.map((job) => job.title).filter(Boolean);
    return Array.from(new Set(titles));
  }, [companyJobs]);

  // Filtered applications (search and job title)
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (selectedJobTitle && app.job?.title !== selectedJobTitle) {
        return false;
      }
      return (
        app.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
        app.applicant?.full_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        app.status?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [applications, search, selectedJobTitle]);

  // Reset to first page when filters/search/data changes
  useEffect(() => {
    setPage(1);
  }, [search, selectedJobTitle, applications.length]);

  // Pagination calculations
  const totalResults = filteredApplications.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const paginatedApplications = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredApplications.slice(start, start + pageSize);
  }, [filteredApplications, page, pageSize]);

  // Show applicant profile modal
  const handleShowProfile = (application) => {
    setSelectedApplication(application);
    setShowProfile(true);
  };

  // Close profile modal
  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedApplication(null);
  };

  // Status update handler
  const handleStatusChange = async (newStatus) => {
    if (!selectedApplication) return;
    setStatusUpdating(true);
    try {
      const res = await fetch(
        `${API_URL}/jobApplications/applications/${selectedApplication._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSelectedApplication((prev) =>
          prev ? { ...prev, status: newStatus } : prev
        );
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApplication._id
              ? { ...app, status: newStatus }
              : app
          )
        );
      } else {
        alert(data.message || "Failed to update status.");
      }
    } catch (err) {
      alert("Failed to update status.");
    } finally {
      setStatusUpdating(false);
    }
  };

  return (
    <div className="p-6 font-epilogue bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 font-clash text-[#4640DE]">
        Job Applications Received
      </h1>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          placeholder="Search by job title, applicant, or status..."
          className="border rounded px-3 py-2 w-full max-w-md font-medium font-epilogue"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 w-full max-w-xs font-medium font-epilogue"
          value={selectedJobTitle}
          onChange={(e) => setSelectedJobTitle(e.target.value)}
        >
          <option value="">All Jobs</option>
          {jobTitles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4 font-semibold font-epilogue">
          {error}
        </div>
      )}

      {/* ===== PAGINATION CONTROLS (TOP) ===== */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-700 text-sm font-epilogue">
          Showing {totalResults === 0 ? 0 : (page - 1) * pageSize + 1}
          {"–"}
          {Math.min(page * pageSize, totalResults)}
          {" of "}
          {totalResults} applications
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 font-semibold text-gray-600 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Previous
          </button>
          <span className="font-medium">
            Page {page} / {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-200 font-semibold text-gray-600 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
          <select
            className="ml-2 border rounded px-2 py-1 font-epilogue"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full min-w-[700px] text-sm font-epilogue">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold text-gray-700 font-epilogue">
              <th className="px-4 py-2 text-left">Job Title</th>
              <th className="px-4 py-2 text-left">Applicant</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Profile</th>
              <th className="px-4 py-2 text-left">Resume</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 font-medium font-epilogue"
                >
                  Loading...
                </td>
              </tr>
            ) : paginatedApplications.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 font-medium font-epilogue"
                >
                  No applications found.
                </td>
              </tr>
            ) : (
              paginatedApplications.map((app, idx) => (
                <tr key={app._id || idx} className="font-medium font-epilogue">
                  <td className="px-4 py-2">{app.job?.title || "-"}</td>
                  <td className="px-4 py-2">
                    {app.applicant?.full_name || "-"}
                  </td>
                  <td className="px-4 py-2">{app.applicant?.email || "-"}</td>
                  <td className="px-4 py-2 capitalize">{app.status || "-"}</td>
                  <td className="px-4 py-2">
                    {app.profile ? (
                      <button
                        onClick={() => handleShowProfile(app)}
                        className="text-blue-600 underline font-semibold font-epilogue"
                      >
                        View Profile
                      </button>
                    ) : (
                      <span className="text-gray-400">No profile</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {app.resume && app.resume !== "no_resume" ? (
                      <a
                        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${app.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline font-epilogue"
                      >
                        Download
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION CONTROLS (BOTTOM, optional) ===== */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div />
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded bg-gray-200 font-semibold text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Previous
            </button>
            <span className="font-medium">
              Page {page} / {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-200 font-semibold text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Applicant Profile Modal */}
      {showProfile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center font-epilogue"
          onClick={handleCloseProfile}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            {statusUpdating && (
              <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded-xl z-10">
                <div className="text-[#4640DE] font-bold text-lg">
                  Updating...
                </div>
              </div>
            )}

            <button
              onClick={handleCloseProfile}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-[#4640DE] font-clash">
              Applicant Profile
            </h2>
            {!selectedApplication ? (
              <div className="text-center py-8 text-red-600 font-epilogue">
                Failed to load applicant profile.
              </div>
            ) : (
              <div className="space-y-2 text-gray-800 font-epilogue">
                {/* User Info */}
                <div>
                  <span className="font-semibold">Full Name: </span>
                  {selectedApplication.applicant?.full_name || "-"}
                </div>
                <div>
                  <span className="font-semibold">Email: </span>
                  {selectedApplication.applicant?.email || "-"}
                </div>
                <div>
                  <span className="font-semibold">Role: </span>
                  {selectedApplication.applicant?.role || "-"}
                </div>

                {/* Profile Details */}
                {selectedApplication.profile && (
                  <>
                    <div>
                      <span className="font-semibold">Title: </span>
                      {selectedApplication.profile.title || "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Contact: </span>
                      {selectedApplication.profile.contact_number || "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Location: </span>
                      {selectedApplication.profile.location || "-"}
                    </div>
                    <div>
                      <span className="font-semibold">About: </span>
                      {selectedApplication.profile.about || "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Skills: </span>
                      {Array.isArray(selectedApplication.profile.skills)
                        ? selectedApplication.profile.skills.join(", ")
                        : "-"}
                    </div>
                    <div>
                      <span className="font-semibold">Education: </span>
                      {selectedApplication.profile.education || "-"}
                    </div>
                    {/* === STATUS SECTION WITH DROPDOWN === */}
                    <div>
                      <span className="font-semibold">Status: </span>
                      <select
                        className="border px-2 py-1 rounded ml-2"
                        value={selectedApplication.status}
                        disabled={statusUpdating}
                        onChange={(e) => handleStatusChange(e.target.value)}
                      >
                        {[
                          "applied",
                          "shortlisted",
                          "interview",
                          "rejected",
                          "hired",
                        ].map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* OK Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleCloseProfile}
                    className="bg-[#4640DE] hover:bg-[#3731c8] text-white font-semibold px-6 py-2 rounded-lg"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
