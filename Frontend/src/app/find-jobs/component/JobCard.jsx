"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ApplyPopup from "./ApplyPopup";

export default function JobCard({ job, viewMode, getCompanyByJobId, applied }) {
  const [showApplyPopup, setShowApplyPopup] = useState(false);

  const company = getCompanyByJobId?.(job._id) || {
    name: job.company,
    icon: job.icon,
    location: job.location,
  };

  const applyJob = () => setShowApplyPopup(true);
  const closePopup = () => setShowApplyPopup(false);

  const progressPercentage = job.capacity
    ? Math.min(100, Math.round((job.applicants / job.capacity) * 100))
    : 0;

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 border-[1px] border-[#D6DDEB] p-6 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer">
      <Link
        href={`/find-jobs?company=${encodeURIComponent(company.name)}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0">
          <Image
            src={company.icon || "/jobs/sample.png"}
            alt={company.name}
            width={64}
            height={64}
            className="rounded object-contain"
          />
        </div>
      </Link>
      <div className="flex-grow w-full">
        <h3 className="font-epilogue font-[600] text-lg !leading-[160%] text-[#25324B] hover:text-[#4640DE] transition-colors">
          {job.title}
        </h3>
        <div className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] pb-3 pt-1">
          <Link
            href={`/find-jobs?company=${encodeURIComponent(company.name)}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-[#4640DE] hover:underline transition-colors"
          >
            {company.name}
          </Link>
          <span> • {company.location}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {job.type && (
            <span className="font-epilogue font-[600] text-sm leading-[160%] bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
              {job.type}
            </span>
          )}
          {job.category && (
            <span className="font-epilogue font-[600] text-sm leading-[160%] bg-[#FFB8361A] text-[#FFB836] px-3 py-1 rounded-full">
              {job.category}
            </span>
          )}
          {job.level && (
            <span className="font-epilogue font-[600] text-sm leading-[160%] bg-[#E051511A] text-[#E05151] px-3 py-1 rounded-full">
              {job.level === "Entry"
                ? "Entry Level"
                : job.level === "Mid"
                ? "Mid Level"
                : "Senior Level"}
            </span>
          )}
          {job.salaryMin && (
            <span className="font-epilogue font-[600] text-sm leading-[160%] bg-[#4640DE1A] text-[#4640DE] px-3 py-1 rounded-full">
              Rs {job.salaryMin.toLocaleString()} -{" "}
              {job.salaryMax.toLocaleString()}
            </span>
          )}
          {(job.requirements || []).map((tag) => (
            <span
              key={tag}
              className="font-epilogue font-[600] text-sm leading-[160%] px-3 py-1 rounded-full bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between items-end w-full sm:w-auto sm:min-w-[180px] mt-4 sm:mt-0 font-epilogue font-[600] text-sm leading-[160%]">
        {applied ? (
          <span className="bg-gray-300 text-gray-700 font-medium w-full text-center py-2 rounded-sm cursor-default">
            Applied
          </span>
        ) : (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              applyJob();
            }}
            className="bg-[#4640DE] text-white font-medium w-full py-2 rounded-sm hover:bg-[#3932b8] transition-colors duration-300 ease-in-out cursor-pointer"
          >
            Apply Now
          </button>
        )}
      </div>
      {showApplyPopup && (
        <ApplyPopup job={job} company={company} onClose={closePopup} />
      )}
    </div>
  );
}
