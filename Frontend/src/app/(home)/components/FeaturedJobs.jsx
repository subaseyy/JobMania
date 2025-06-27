"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, ChevronRight } from "lucide-react";
import axios from "axios";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/jobs/jobs");
        setJobs(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  const visibleJobs = jobs.slice(0, 4);

  return (
    <section className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8">
        <h2 className="font-clash font-[600] text-5xl text-[#25324B]">
          Featured <span className="text-[#26A4FF]">jobs</span>
        </h2>
        <button
          onClick={() => router.push("/find-jobs")}
          className="hidden md:flex items-center font-epilogue font-[600] text-base text-[#4640DE]"
        >
          Show all jobs <ChevronRight className="ml-1" />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {visibleJobs.map((job) => (
          <div
            key={job._id}
            className="flex flex-col justify-between border border-[#D6DDEB] p-6"
          >
            <div>
              <div className="flex justify-between items-start pb-3">
                <Image
                  src="/home/feature/grid1.png"
                  alt={`${job.company} logo`}
                  width={48}
                  height={48}
                />
                <span className="text-[#4640DE] border border-[#4640DE] py-1 px-2 text-sm">
                  {job.type}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#25324B]">{job.title}</h3>
              <p className="text-sm text-[#515B6F] flex items-center pb-3">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                {job.company} ・ {job.location}
              </p>
              <p className="text-sm text-[#7C8493]">
                {job.description?.slice(0, 100)}...
              </p>
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
    </section>
  );
};

export default FeaturedJobs;
