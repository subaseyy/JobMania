import { ArrowRight } from "lucide-react";

export default function DashboardCard({
  title,
  children,
  viewAll,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
    >
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
        <button
          onClick={viewAll}
          className="text-sm text-[#4640DE] hover:text-[#3a35c7] flex items-center gap-1"
        >
          View all <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
