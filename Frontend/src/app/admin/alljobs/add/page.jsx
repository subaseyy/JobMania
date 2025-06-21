"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, CheckCircle } from "lucide-react";

export default function AddJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [companies, setCompanies] = useState([]);

  // Fetch existing companies on component mount
  useEffect(() => {
    // Replace this with your actual API call to fetch companies
    const fetchCompanies = async () => {
      try {
        // Simulated data - replace with real API call
        const mockCompanies = [
          { id: 1, name: "NestNepal" },
          { id: 2, name: "TechCorp" },
          { id: 3, name: "DesignHub" },
        ];
        setCompanies(mockCompanies);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that a company is selected
    if (!form.company) {
      alert("Please select a company from the list");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Get current jobs from localStorage
    const existing = JSON.parse(localStorage.getItem("jobs") || "[]");
    const newJob = {
      ...form,
      id: Date.now(), // Unique id
    };

    // Save to localStorage
    localStorage.setItem("jobs", JSON.stringify([...existing, newJob]));

    setSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => router.push("/admin/alljobs"), 1500);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/alljobs")}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Jobs
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#4640DE] to-[#6A64F1]">
          <h1 className="text-xl font-semibold text-white flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Add New Job
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Title
            </label>
            <input
              id="title"
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
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company
            </label>
            <select
              id="company"
              name="company"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-all"
              value={form.company}
              onChange={handleChange}
              required
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Only existing companies can be selected
            </p>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              id="location"
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
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Type
            </label>
            <select
              id="type"
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
              onClick={() => router.push("/admin/all-jobs")}
              className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#4640DE] hover:bg-[#3a35c7] text-white font-medium rounded-lg transition-colors disabled:opacity-70 flex items-center"
            >
              {isSubmitting ? (
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
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Job
                </>
              )}
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
