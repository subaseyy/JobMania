import { ChevronRight } from "lucide-react";

export default function ListItem({ title, subtitle, meta, status, onClick }) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    admin: "bg-blue-100 text-blue-800",
    user: "bg-purple-100 text-purple-800",
  };

  return (
    <div
      onClick={onClick}
      className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#4640DE]">
            {title}
          </h3>
          {status && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                statusColors[status?.toLowerCase()] ||
                "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 truncate">{subtitle}</p>
        {meta && <p className="text-xs text-gray-400 mt-1 truncate">{meta}</p>}
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#4640DE]" />
    </div>
  );
}
