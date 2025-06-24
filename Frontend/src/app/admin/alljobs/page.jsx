"use client";
import React, { useState, useEffect } from "react";
import { Edit, Trash2, X, CheckCircle, ClipboardList } from "lucide-react";
import JobCard from "./component/JobCard";
import Cookies from "js-cookie";

export default function AllJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "",
    salaryMin: "",
    salaryMax: "",
    currency: "NPR",
    description: "",
    requirements: "",
    isActive: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const API_URL = "http://localhost:5050/api";
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/jobs/admin/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setJobs(data.data || []);
        } else {
          console.error("Failed to load jobs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [token]);

  const openEdit = (job) => {
    setForm({
      title: job.title || "",
      location: job.location || "",
      type: job.type || "",
      salaryMin: job.salaryMin || "",
      salaryMax: job.salaryMax || "",
      currency: job.currency || "NPR",
      description: job.description || "",
      requirements: (job.requirements || []).join(", ") || "",
      isActive: job.isActive ?? true,
    });
    setEditing(job);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await fetch(`${API_URL}/jobs/admin/jobs/${editing._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          requirements: form.requirements.split(",").map((r) => r.trim()),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const updatedJobs = jobs.map((j) =>
          j._id === editing._id ? data.data : j
        );
        setJobs(updatedJobs);
        setShowModal(false);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating job:", err);
    }
    setIsProcessing(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const res = await fetch(`${API_URL}/jobs/admin/jobs/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          setJobs(jobs.filter((j) => j._id !== id));
        } else {
          const data = await res.json();
          alert(data.message || "Failed to delete job");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <ClipboardList className="mr-2 h-6 w-6 text-[#4640DE]" />
          All Jobs
        </h1>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto max-w-full">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedJobs.map((j) => (
                <tr key={j._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{j.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{j.company || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{j.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{j.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${j.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{j.isActive ? "Active" : "Inactive"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-6">
                      <button onClick={() => openEdit(j)} className="text-[#4640DE] hover:text-[#3a35c7] flex items-center">
                        <Edit className="mr-1 h-4 w-4" /> Edit
                      </button>
                      <button onClick={() => handleDelete(j._id)} className="text-red-600 hover:text-red-800 flex items-center">
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       <div className="flex justify-end mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        <span className="text-sm text-gray-700 pt-2">Page {currentPage} of {totalPages}</span>
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
