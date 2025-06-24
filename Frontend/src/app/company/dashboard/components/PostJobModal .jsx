import { useState } from 'react';

export default function PostJobModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    type: 'full-time',
    salaryMin: '',
    salaryMax: '',
    currency: 'NPR',
    requirements: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRequirementsChange(e) {
    setForm({ ...form, requirements: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Send as array
    const payload = {
      ...form,
      salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
      salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
      requirements: form.requirements.split('\n').filter(Boolean),
    };
    onSubmit(payload);
    onClose();
    setForm({
      title: '',
      company: '',
      description: '',
      location: '',
      type: 'full-time',
      salaryMin: '',
      salaryMax: '',
      currency: 'NPR',
      requirements: '',
    });
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Post a Job</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            type="text"
            required
            placeholder="Job Title"
            className="border rounded-lg px-3 py-2"
            value={form.title}
            onChange={handleChange}
          />
          <input
            name="company"
            type="text"
            required
            placeholder="Company"
            className="border rounded-lg px-3 py-2"
            value={form.company}
            onChange={handleChange}
          />
          <textarea
            name="description"
            required
            placeholder="Job Description"
            className="border rounded-lg px-3 py-2"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
          <input
            name="location"
            type="text"
            required
            placeholder="Location"
            className="border rounded-lg px-3 py-2"
            value={form.location}
            onChange={handleChange}
          />
          <select
            name="type"
            required
            className="border rounded-lg px-3 py-2"
            value={form.type}
            onChange={handleChange}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>
          <div className="flex gap-2">
            <input
              name="salaryMin"
              type="number"
              placeholder="Min Salary"
              className="border rounded-lg px-3 py-2 w-1/2"
              value={form.salaryMin}
              onChange={handleChange}
              min={0}
            />
            <input
              name="salaryMax"
              type="number"
              placeholder="Max Salary"
              className="border rounded-lg px-3 py-2 w-1/2"
              value={form.salaryMax}
              onChange={handleChange}
              min={0}
            />
          </div>
          <input
            name="currency"
            type="text"
            placeholder="Currency"
            className="border rounded-lg px-3 py-2"
            value={form.currency}
            onChange={handleChange}
          />
          <textarea
            name="requirements"
            placeholder="Requirements (one per line)"
            className="border rounded-lg px-3 py-2"
            value={form.requirements}
            onChange={handleRequirementsChange}
            rows={2}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#4640DE] text-white font-semibold hover:bg-[#342bb3]"
            >
              Post Job
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}
