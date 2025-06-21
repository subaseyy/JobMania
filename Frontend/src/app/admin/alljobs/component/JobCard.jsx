import { Edit, Trash2 } from "lucide-react";

export default function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="block sm:hidden bg-white rounded-lg shadow p-4 mb-4 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-lg text-gray-800">{job.title}</div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(job)}
            className="text-[#4640DE] hover:text-[#3a35c7] flex items-center"
            aria-label="Edit job"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="text-red-600 hover:text-red-800 flex items-center"
            aria-label="Delete job"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-1">
        <span className="font-semibold">Company:</span> {job.company}
      </div>
      <div className="text-sm text-gray-500 mb-1">
        <span className="font-semibold">Location:</span> {job.location}
      </div>
      <div className="text-sm">
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            job.type === "Full-time"
              ? "bg-green-100 text-green-800"
              : job.type === "Part-time"
              ? "bg-blue-100 text-blue-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {job.type}
        </span>
      </div>
    </div>
  );
}