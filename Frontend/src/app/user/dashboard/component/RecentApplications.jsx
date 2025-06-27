import { ArrowRight, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

export default function RecentApplications({ applications = [] }) {
  const getStatusColor = (status = "") => {
    switch (status.toLowerCase()) {
      case "applied":
        return "text-blue-600 border border-blue-200";
      case "shortlisted":
        return "text-cyan-600 border border-cyan-200";
      case "interview":
        return "text-amber-600 border border-amber-200";
      case "rejected":
        return "text-red-500 border border-red-200";
      case "hired":
        return "text-green-600 border border-green-200";
      default:
        return "text-gray-500 border border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="mb-6 font-epilogue font-semibold text-xl text-[#25324B]">
        Recent Applications History
      </h3>
      <div className="h-[1px] bg-[#D6DDEB] w-full my-6" />

      <div className="space-y-2">
        {applications.slice(0, 5).map((app, index) => (
          <div
            key={app._id || index}
            className={`p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 ${
              index % 2 === 0 ? "bg-[#F8F8FD]" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <div className="mr-4 shrink-0">
                <Image
                  src={"/jobs/sample.png"}
                  alt="Company Logo"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div className="font-epilogue font-bold text-lg text-[#25324B] mb-1">
                  {app.job?.title || "Unknown Role"}
                </div>
                <div className="font-epilogue font-normal text-base text-[#7C8493]">
                  {app.job?.company || "Unknown Company"} • {app.job?.location || "Unknown"} • {app.job?.type || "Full-Time"}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end">
              <div className="font-epilogue font-medium text-base text-[#25324B] mb-1">
                Date Applied
              </div>
              <div className="font-epilogue font-normal text-base text-[#7C8493]">
                {app.appliedAt ? format(new Date(app.appliedAt), "dd MMM yyyy") : "N/A"}
              </div>
            </div>

            <div className="sm:self-center">
              <span className={`font-epilogue font-semibold text-sm px-3 py-2 rounded-full ${getStatusColor(app.status)}`}>
                {app.status || "Unknown"}
              </span>
            </div>

            <div className="sm:self-center hidden sm:block">
              <button className="p-1 text-[#25324B] hover:text-[#4f5ce1]">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Link href="/user/application" passHref>
  <button className="flex items-center font-epilogue font-semibold text-base text-[#4640DE]">
    View all applications history
    <ArrowRight size={16} className="ml-1" />
  </button>
</Link>
      </div>
    </div>
  );
}
