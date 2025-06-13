"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, ChevronUp, ChevronDown } from "lucide-react";

const FeaturedJobs = () => {
  const [showAll, setShowAll] = useState(false);

  const jobs = [
    {
      id: 1,
      company: "Revolut",
      location: "Madrid, Spain",
      position: "Email Marketing",
      type: "Full Time",
      tags: ["Marketing", "Design"],
    },
    {
      id: 2,
      company: "Dropbox",
      location: "San Francisco, US",
      position: "Brand Designer",
      type: "Full Time",
      tags: ["Design", "Business"],
    },
    {
      id: 3,
      company: "Pitch",
      location: "Berlin, Germany",
      position: "Email Marketing",
      type: "Full Time",
      tags: ["Marketing"],
    },
    {
      id: 4,
      company: "Blinkist",
      location: "Granada, Spain",
      position: "Visual Designer",
      type: "Full Time",
      tags: ["Design"],
    },
    {
      id: 5,
      company: "ClassPass",
      location: "Manchester, UK",
      position: "Product Designer",
      type: "Full Time",
      tags: ["Marketing", "Design"],
    },
    {
      id: 6,
      company: "Canva",
      location: "Ontario, Canada",
      position: "Lead Designer",
      type: "Full Time",
      tags: ["Design", "Business"],
    },
    {
      id: 7,
      company: "GoDaddy",
      location: "Marseille, France",
      position: "Brand Strategist",
      type: "Full Time",
      tags: ["Marketing"],
    },
    {
      id: 8,
      company: "Twitter",
      location: "San Diego, US",
      position: "Data Analyst",
      type: "Full Time",
      tags: ["Technology"],
    },
  ];

  const tagColors = {
    Marketing: "bg-[#EB85331A] text-[#FFB836]",
    Design: "bg-[#56CDAD1A] text-[#56CDAD]",
    Business: "bg-[#4640DE1A] text-[#4640DE]",
    Technology: "bg-[#FF65501A] text-[#FF6550]",
  };

  const visibleJobs = showAll ? jobs : jobs.slice(0, 4);

  return (
    <section className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8">
        <h2 className="font-clash font-[600] text-5xl leading-[110%] text-[#25324B]">
          Featured <span className="text-[#26A4FF]">jobs</span>
        </h2>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {visibleJobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col justify-between border-[1px] border-[#D6DDEB] p-6 hover:scale-[1.03] transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div>
              <div className="flex justify-between items-start pb-3">
                <Image
                  src={`/home/feature/grid${job.id}.png`}
                  alt={`${job.company} logo`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <span className="font-epilogue font-[400] text-base leading-[160%] text-[#4640DE] border-[1px] border-[#4640DE] py-1 px-2">
                  {job.type}
                </span>
              </div>
              <h3 className="font-epilogue font-[600] text-lg leading-[160%] text-[#25324B]">
                {job.position}
              </h3>
              <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] pb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                {job.company} ・ {job.location}
              </p>
              <p className="font-epilogue font-[400] text-base leading-[160%] text-[#7C8493] pb-3">
                {job.company} is looking for {job.position} to help the team ...
              </p>
            </div>
            <div className="flex gap-2">
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
    </section>
  );
};

export default FeaturedJobs;
