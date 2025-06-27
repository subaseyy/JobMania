"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/jobs/jobs");
        setJobs(res.data.data || []);
      } catch (err) {
        console.error("Failed to load jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  const visibleJobs = jobs.slice(0, 4);

  return (
    <div className="bg-[#F8F8FD] relative z-[1]">
      <div className="container py-12">
        <div className="flex justify-between items-center pb-6">
          <h2 className="font-clash font-[600] text-5xl text-[#25324B]">
            Featured <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <button
            onClick={() => router.push("/find-jobs")}
            className="hidden md:flex items-center font-epilogue font-[600] text-base text-[#4640DE]"
          >
            Show all jobs <ChevronRight className="ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 z-[3]">
          {visibleJobs.map((job) => (
            <div key={job._id} className="flex items-start gap-4 border p-6">
              <Image
                src="/home/open/grid1.png"
                alt={job.company}
                width={64}
                height={64}
              />
              <div>
                <h3 className="text-lg font-semibold text-[#25324B]">{job.title}</h3>
                <p className="text-sm text-[#515B6F] pb-3">
                  {job.company} • {job.location}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-[#56CDAD1A] text-[#56CDAD] text-xs px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                  {job.requirements?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border text-gray-500 border-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex md:hidden justify-center mt-8">
          <button
            onClick={() => router.push("/find-jobs")}
            className="flex items-center font-epilogue font-[600] text-base text-[#4640DE]"
          >
            Show all jobs <ChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobList;
