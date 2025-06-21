"use client";
import { Share2 } from "lucide-react";
import Image from "next/image";

export const JobHeader = ({ job, handleApply, isApplied }) => {
  return (
    <div className="bg-[#F8F8FD] p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white border border-[#D6DDEB] gap-4">
        <div className="flex items-start sm:items-center space-x-4 w-full sm:w-auto">
          <div className="hidden sm:block min-w-[64px]">
            <Image
              src={job.icon || "/logo.png"}
              alt="Company Logo"
              width={64}
              height={64}
              className="object-cover w-12 h-12 sm:w-16 sm:h-16"
            />
          </div>
          <div className="flex-1 sm:flex-none">
            <h1 className="font-clash font-[600] text-xl sm:text-[32px] leading-[120%] text-[#25324B]">
              {job.title}
            </h1>
            <p className="font-epilogue font-[400] text-sm sm:text-xl leading-[160%] text-[#515B6F]">
              {job.company} • {job.location} • {job.type}
            </p>
          </div>
        </div>
        <div className="flex justify-between sm:justify-center items-center w-full sm:w-auto space-x-2 sm:space-x-6 border-t sm:border-t-0 pt-4 sm:pt-0">
          <button
            onClick={() => alert("Location feature coming soon!")}
            className="p-2 transition-colors text-[#7C8493]"
          >
            <Share2 size={20} />
          </button>
          <hr className="hidden sm:block h-[32px] w-[1px] bg-[#D6DDEB]" />
          <button
            onClick={handleApply}
            className={`px-4 sm:px-8 py-2 text-sm sm:text-base font-semibold transition-all ${
              isApplied
                ? "bg-green-500 text-white"
                : "bg-[#4640DE] text-white hover:bg-gray-50"
            }`}
          >
            {isApplied ? "Applied!" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};