import { ArrowRight, MoreHorizontal } from "lucide-react";
import Image from "next/image";

export default function RecentApplications() {
  const applications = [
    {
      position: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      date: "24 July 2021",
      status: "In Review",
      icon: "/jobs/sample.png",
    },
    {
      position: "Social Media Assistant",
      company: "Udacity",
      location: "New York, USA",
      type: "Full-Time",
      date: "23 July 2021",
      status: "Shortlisted",
      icon: "/jobs/sample.png",
    },
    {
      position: "Social Media Assistant",
      company: "Packer",
      location: "Madrid, Spain",
      type: "Full-Time",
      date: "22 July 2021",
      status: "Declined",
      icon: "/jobs/sample.png",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Review":
        return "border-[#FFB836] text-[#FFB836] border-[1px]";
      case "Shortlisted":
        return "text-[#4640DE] border-[#4640DE] border-[1px]";
      case "Declined":
        return "text-[#FF6550] border-[#FF6550] border-[1px]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="mb-6 font-epilogue font-semibold text-xl text-[#25324B]">
        Recent Applications History
      </h3>
      <div className="h-[1px] bg-[#D6DDEB] w-full my-6" />
      <div className="space-y-2">
        {applications.map((app, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 ${
              index % 2 === 0 ? "bg-[#F8F8FD]" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              <div className="mr-4 shrink-0">
                <Image
                  src={app.icon}
                  alt="Company Logo"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div className="font-epilogue font-bold text-lg text-[#25324B] mb-1">
                  {app.position}
                </div>
                <div className="font-epilogue font-normal text-base text-[#7C8493]">
                  {app.company} • {app.location} • {app.type}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end">
              <div className="font-epilogue font-medium text-base text-[#25324B] mb-1">
                Date Applied
              </div>
              <div className="font-epilogue font-normal text-base text-[#7C8493]">
                {app.date}
              </div>
            </div>

            <div className="sm:self-center">
              <span
                className={`font-epilogue font-semibold text-sm px-3 py-2 rounded-full ${getStatusColor(
                  app.status
                )}`}
              >
                {app.status}
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
        <button className="flex items-center font-epilogue font-semibold text-base text-[#4640DE]">
          View all applications history
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
