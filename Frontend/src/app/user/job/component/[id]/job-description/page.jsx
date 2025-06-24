"use client";
import React, { useState } from "react";
import { use } from "react";
import { JobHeader } from "./components/JobHeader";
import { JobDetails } from "./components/JobDetails";
import { JobSidebar } from "./components/JobSidebar";
import { PerksBenefits } from "./components/PerksBenefits";
import { CompanyInfo } from "./components/CompanyInfo";
import { jobsData,tagColors } from "@/app/find-jobs/utils/constants";


export default function Description({ params }) {
  const unwrappedParams = use(params);
  const [isApplied, setIsApplied] = useState(false);
  const jobId = parseInt(unwrappedParams.id);
  const job = jobsData.find((job) => job.id === jobId);

  if (!job) {
    return <div className="container p-8">Job not found</div>;
  }

  const handleApply = () => {
    setIsApplied(true);
    setTimeout(() => setIsApplied(false), 3000);
  };

  return (
    <div className="container">
      <JobHeader job={job} handleApply={handleApply} isApplied={isApplied} />
      
      <div className="flex flex-col xl:flex-row">
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <JobDetails job={job} />
            <JobSidebar job={job} tagColors={tagColors} />
          </div>
          
          <PerksBenefits />
          <CompanyInfo job={job} />
        </div>
      </div>
    </div>
  );
}