"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const JobList = () => {
  const [showAll, setShowAll] = useState(false);

  const jobs = [
    {
      id: 1,
      company: "Nomad",
      title: "Social Media Assistant",
      location: "Paris, France",
      type: "Full Time",
      tags: ["Marketing", "Design"],
      icon: "/home/open/grid1.png",
    },
    {
      id: 2,
      company: "Netlify",
      title: "Social Media Assistant",
      location: "Paris, France",
      type: "Full Time",
      tags: ["Marketing", "Design"],
      icon: "/home/open/grid1.png",
    },
    {
      id: 3,
      company: "Dropbox",
      title: "Brand Designer",
      location: "Bhaktapur, Nepal",
      type: "Full Time",
      tags: ["Marketing", "Design"],
      icon: "/home/open/grid1.png",
    },
    {
      id: 4,
      company: "Macro",
      title: "Brand Designer",
      location: "Bhaktapur, Nepal",
      type: "Full Time",
      tags: ["Marketing", "Design"],
      icon: "/home/open/grid1.png",
    },
    {
      id: 5,
      company: "Trafalgar",
      title: "Interactive Developer",
      location: "Lalitpur, Nepal",
      type: "Full Time",
      tags: ["Marketing", "Design"],
      icon: "/home/open/grid1.png",
    },
    {
      id: 6,
      company: "Udacity",
      title: "Interactive Developer",
      location: "Lalitpur, Nepal",
      type: "Full Time",
      tags: ["Marketing", "Design"],
      icon: "/home/open/grid1.png",
    },
    {
      id: 7,
      company: "Packer",
      title: "HR Manager",
      location: "Kathmandu, Nepal",
      type: "Full Time",
      tags: ["Marketing", "Design"],
      icon: "/home/open/grid1.png",
    },
    {
      id: 8,
      company: "Webflow",
      title: "HR Manager",
      location: "Kathmandu, Nepal",
      type: "Full Time",
      tags: ["Marketing", "Design"],
      icon: "/home/open/grid1.png",
    },
  ];
  const tagColors = {
    Marketing: "border-[#FFB836] border-[1px] text-[#FFB836]",
    Design: "border-[#4640DE] border-[1px] text-[#4640DE]",
  };

  const visibleJobs = showAll ? jobs : jobs.slice(0, 4);

  return (
    <div className="bg-[#F8F8FD] relative z-[1]">
      <div className="container py-12">
        <div className="flex justify-between items-center pb-6">
          <h2 className="font-clash font-[600] text-5xl leading-[110%] text-[#25324B]">
            Featured <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <div className="absolute -top-1 -left-1 hidden lg:flex rotate-180">
            <Image src="/hero/ractangle.png" width={200} height={716} alt="" />
          </div>
          {/* <div className="absolute right-0 z-[2] top-0 hidden lg:flex w-[800px] h-[716px] bg-[url('/home/open/ractangle.png')] bg-cover bg-no-repeat" /> */}

          <button
            onClick={() => setShowAll(!showAll)}
            className="hidden md:flex items-center font-epilogue font-[600] text-base leading-[160%] text-[#4640DE] hover:scale-[1.03] transition-all duration-300"
          >
            {showAll ? "Show less" : "Show all jobs"}
            {showAll ? (
              <ChevronUp className="ml-1" />
            ) : (
              <ChevronDown className="ml-1" />
            )}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 z-[3]">
          {visibleJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-start gap-4 border-[1px] border-[#D6DDEB] p-6 hover:scale-[1.03] transition-all duration-300 ease-in-out cursor-pointer"
            >
              <Image
                src={job.icon}
                alt={job.company}
                width={64}
                height={64}
                className="rounded"
              />
              <div>
                <h3 className="font-epilogue font-[600] text-lg leading-[160%] text-[#25324B]">
                  {job.title}
                </h3>
                <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] pb-3 flex items-center">
                  {job.company} • {job.location}
                </p>
                <div className="flex gap-2 justify-center items-center divide-x-2 divide-[#D6DDEB]">
                  <span className="font-epilogue font-[600] text-sm leading-[160%] bg-[#56CDAD1A] text-[#56CDAD] px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                  <div className="flex flex-col sm:flex-row gap-2 pl-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`font-epilogue font-[600] text-sm leading-[160%] px-3 py-1 rounded-full ${tagColors[tag]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex md:hidden justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center font-epilogue font-[600] text-base leading-[160%] text-[#4640DE] hover:scale-[1.03] transition-all duration-300"
          >
            {showAll ? "Show less" : "Show all jobs"}
            {showAll ? (
              <ChevronUp className="ml-1" />
            ) : (
              <ChevronDown className="ml-1" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobList;
