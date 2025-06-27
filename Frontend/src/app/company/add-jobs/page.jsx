"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, CheckCircle, X } from "lucide-react";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5050/api";

export default function AddJobCompanyPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    employer: "",
    company: "",
    location: "",
    type: "",
    salaryMin: "",
    salaryMax: "",
    currency: "NPR",
    description: "",
    requirements: [""],
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch company info
  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.data && data.data.user.role === "company") {
          setForm((prev) => ({
            ...prev,
            employer: data.data.user._id,
            company: data.data.user.full_name || "",
          }));
        } else {
          alert("Only company users can post jobs.");
          router.replace("/");
        }
      } catch (err) {
        alert("Failed to fetch profile.");
        router.replace("/");
      }
    }
    fetchProfile();
  }, [router]);

  // Handle form field changes (for non-array fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "isActive"
          ? value === "true"
          : name === "salaryMin" || name === "salaryMax"
          ? value.replace(/^0+/, "") // remove leading zeros
          : value,
    }));
  };

  // Handle requirements array changes
  const handleRequirementChange = (index, value) => {
    setForm((prev) => {
      const updated = [...prev.requirements];
      updated[index] = value;
      return { ...prev, requirements: updated };
    });
  };

  // Add new requirement field
  const addRequirement = () => {
    setForm((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  // Remove a requirement field
  const removeRequirement = (index) => {
    setForm((prev) => ({
      ...prev,
      requirements:
        prev.requirements.length === 1
          ? prev.requirements
          : prev.requirements.filter((_, i) => i !== index),
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = Cookies.get("token");
      const jobData = {
        ...form,
        salaryMin: form.salaryMin === "" ? undefined : Number(form.salaryMin),
        salaryMax: form.salaryMax === "" ? undefined : Number(form.salaryMax),
        requirements: form.requirements.map((r) => r.trim()).filter(Boolean),
      };

      const res = await fetch(`${API_URL}/jobs/create`, {
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
        setTimeout(() => router.push("/company/my-jobs"), 1500);
      } else {
        alert(data.message || "Failed to create job");
      }
    } catch (error) {
      alert("Job create error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <button
          onClick={() => router.push("/company/jobs")}
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
          <input type="hidden" name="employer" value={form.employer} />
          <input type="hidden" name="company" value={form.company} />

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
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>

          <div className="flex gap-4">
            <input
              name="salaryMin"
              type="number"
              min="0"
              placeholder="Minimum Salary"
              value={form.salaryMin}
              onChange={handleChange}
              className="w-1/2 border rounded px-4 py-2"
            />
            <input
              name="salaryMax"
              type="number"
              min="0"
              placeholder="Maximum Salary"
              value={form.salaryMax}
              onChange={handleChange}
              className="w-1/2 border rounded px-4 py-2"
            />
          </div>

          <select
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
            rows={3}
          ></textarea>

          <div>
            <label className="block mb-2 font-medium">
              Requirements (add skills or responsibilities)
            </label>
            {form.requirements.map((req, idx) => (
              <div className="flex gap-2 mb-2" key={idx}>
                <input
                  type="text"
                  value={req}
                  placeholder={`Requirement ${idx + 1}`}
                  onChange={(e) => handleRequirementChange(idx, e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                  required={idx === 0}
                />
                <button
                  type="button"
                  className="text-red-500 px-2"
                  onClick={() => removeRequirement(idx)}
                  disabled={form.requirements.length === 1}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="text-blue-600 text-xs"
            >
              + Add requirement
            </button>
          </div>

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
              onClick={() => router.push("/company/jobs")}
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
