"use client";
import { CircleCheck } from "lucide-react";

export const JobSidebar = ({ job, tagColors }) => {
  const progressPercentage = Math.min(
    100,
    Math.round((job.applicants / job.capacity) * 100)
  );

  return (
    <div className="w-full lg:w-80">
      <div className="border-b border-[#D6DDEB] p-4 sm:p-6">
        <h3 className="font-clash font-[600] text-xl sm:text-2xl leading-[120%] text-[#25324B] mb-4">
          About this role
        </h3>
        <div className="space-y-3 text-sm">
          <div className="py-4 sm:py-6 px-4 w-full bg-[#F8F8FD] rounded">
            <p className="mb-3 sm:mb-4">
              <span className="font-epilogue font-[600] text-sm sm:text-base leading-[160%] text-[#25324B]">
                {job.applicants} Applied
              </span>{" "}
              <span className="font-[400] text-[#7C8493]">
                of {job.capacity} capacity
              </span>
            </p>
            <div className="w-full h-2 bg-[#D6DDEB] rounded-full">
              <div
                className="h-full bg-[#56CDAD] rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between py-2 ">
            <span className="font-epilogue font-[400] text-sm sm:text-base leading-[160%] text-[#515B6F]">
              Apply Before
            </span>
            <span className="font-epilogue font-[600] text-sm sm:text-base leading-[160%] text-[#25324B]">
              {job.type}
            </span>
          </div>
          <div className="flex justify-between py-2 ">
            <span className="font-epilogue font-[400] text-sm sm:text-base leading-[160%] text-[#515B6F]">
              Job Posted On
            </span>
            <span className="font-epilogue font-[600] text-sm sm:text-base leading-[160%] text-[#25324B]">
              {job.level}
            </span>
          </div>
          <div className="flex justify-between py-2 ">
            <span className="font-epilogue font-[400] text-sm sm:text-base leading-[160%] text-[#515B6F]">
              Job Type
            </span>
            <span className="font-epilogue font-[600] text-sm sm:text-base leading-[160%] text-[#25324B]">
              {job.type}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-epilogue font-[400] text-sm sm:text-base leading-[160%] text-[#515B6F]">
              Salary
            </span>
            <span className="font-epilogue font-[600] text-sm sm:text-base leading-[160%] text-[#25324B]">
              Rs. {job.salary}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 border-b border-[#D6DDEB]">
        <h3 className="font-clash font-[600] text-xl sm:text-2xl leading-[120%] text-[#25324B] mb-4">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className={`font-epilogue font-[600] text-xs sm:text-sm leading-[160%] px-2 sm:px-3 py-1 rounded-full ${
                tagColors[tag] || "bg-gray-100 text-gray-800"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-[#D6DDEB] p-4 sm:p-6 mb-6">
        <h3 className="font-clash font-[600] text-xl sm:text-2xl leading-[120%] text-[#25324B] mb-4">
          Required Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            ...(job.category === "Technology"
              ? ["Programming", "Problem Solving"]
              : ["Creativity", "UI/UX"]),
            "Communication",
            "Teamwork",
          ].map((skill) => (
            <span
              key={skill}
              className="inline-block px-2 sm:px-3 py-1 font-epilogue font-[400] text-sm sm:text-base leading-[160%] text-[#4640DE] bg-[#F8F8FD] rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};