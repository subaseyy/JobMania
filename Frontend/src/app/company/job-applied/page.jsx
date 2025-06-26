  "use client";
  import { useState, useEffect, useMemo } from "react";
  import Cookies from "js-cookie";

  export default function CompanyApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const API_URL = "http://localhost:5050/api";
    const token = Cookies.get("token");

    useEffect(() => {
      async function fetchApplications() {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(`${API_URL}/company/jobApplications`, {
            headers: { Authorization: `Bearer ${token}` },
          });
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

    const filteredApplications = useMemo(() => {
      return applications.filter(
        (app) =>
          app.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
          app.applicant?.full_name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          app.status?.toLowerCase().includes(search.toLowerCase())
      );
    }, [applications, search]);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Job Applications Received</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by job title, applicant, or status..."
            className="border rounded px-3 py-2 w-full max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
        )}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs">Job Title</th>
                <th className="px-4 py-2 text-left text-xs">Applicant</th>
                <th className="px-4 py-2 text-left text-xs">Email</th>
                <th className="px-4 py-2 text-left text-xs">Status</th>
                <th className="px-4 py-2 text-left text-xs">Profile</th>
                <th className="px-4 py-2 text-left text-xs">Resume</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    Loading...
                  </td>
                </tr>
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app._id}>
                    <td className="px-4 py-2">{app.job?.title}</td>
                    <td className="px-4 py-2">{app.applicant?.full_name}</td>
                    <td className="px-4 py-2">{app.applicant?.email}</td>
                    <td className="px-4 py-2 capitalize">{app.status}</td>
                    <td className="px-4 py-2">
                      {app.profile ? (
                        <a
                          href={`/profiles/${app.profile._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Profile
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {app.resume && app.resume !== "no_resume" ? (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
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
      </div>
    );
  }
