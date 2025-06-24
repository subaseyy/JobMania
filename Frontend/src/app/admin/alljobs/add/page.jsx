"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, CheckCircle } from "lucide-react";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5050/api";

export default function AddJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    employer: "", // this holds the user ID
    company: "",
    location: "",
    type: "",
    salaryMin: "",
    salaryMax: "",
    currency: "NPR",
    description: "",
    requirements: "",
    isActive: true,
  });

  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${API_URL}/users/admin/profiles/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      }
    }
    fetchUsers();
  }, []);

  const companies = Array.isArray(users)
    ? users.filter((u) => u.user?.role === "company")
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Auto-fill company name if employer is selected
    if (name === "employer") {
      const selectedCompany = companies.find((c) => c._id === value);
      setForm((prev) => ({
        ...prev,
        employer: value,
        company: selectedCompany?.user?.full_name || "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: name === "isActive" ? value === "true" : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = Cookies.get("token");

      const jobData = {
        ...form,
        salaryMin: Number(form.salaryMin),
        salaryMax: Number(form.salaryMax),
        requirements: form.requirements
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean),
      };

      const res = await fetch(`${API_URL}/jobs/admin/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/alljobs"), 1500);
      } else {
        alert(data.message || "Failed to create job");
      }
    } catch (error) {
      console.error("Job create error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/all-jobs")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Jobs
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-[#4640DE] to-[#6A64F1]">
          <h1 className="text-xl font-semibold text-white flex items-center">
            <Plus className="mr-2 h-5 w-5" /> Add New Job
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />

          {/* Company dropdown (sets employer + company name) */}
          <select
            name="employer"
            value={form.employer}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select a company</option>
            {companies.map((c) => (
              <option key={c._id} value={c._id}>
                {c.user.full_name} ({c.user.email})
              </option>
            ))}
          </select>

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
          </select>

          <input
            name="salaryMin"
            type="number"
            placeholder="Minimum Salary"
            value={form.salaryMin}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />

          <input
            name="salaryMax"
            type="number"
            placeholder="Maximum Salary"
            value={form.salaryMax}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />

           <select
                  id="currency"
                  name="currency"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  value={form.currency}
                  onChange={handleChange}
                >
                  <option value="NPR">NPR</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>

          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          ></textarea>

          <textarea
            name="requirements"
            placeholder="Comma-separated skills (e.g., HTML, CSS, JS)"
            value={form.requirements}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          ></textarea>

          <select
            name="isActive"
            value={form.isActive ? "true" : "false"}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/all-jobs")}
              className="px-5 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#4640DE] text-white rounded"
            >
              {isSubmitting ? "Creating..." : "Create Job"}
            </button>
          </div>

          {success && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              <span>Job created successfully! Redirecting...</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
