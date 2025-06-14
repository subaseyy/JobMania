"use client";
import { Building2, Flame, MapPin, Users } from "lucide-react";
import Image from "next/image";

export const CompanyHeader = ({ company }) => {
  return (
    <div className="bg-[#F8F8FD]">
      <div className="container py-6 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-6 w-full">
            <div className="">
              <Image
                src="/jobs/sample.png"
                height={128}
                width={128}
                alt={`${company.name} logo`}
                className="w-20 h-20 sm:w-32 sm:h-32"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <h1 className="font-clash font-[600] text-3xl sm:text-4xl md:text-5xl leading-[110%] text-[#25324B]">
                  {company.name}
                </h1>
                <p className="border border-[#4640DE] px-2 py-1">
                  <span className="text-[#4640DE] font-epilogue font-[400] text-base leading-[160%]">
                    {company.jobs.length}{" "}
                    {company.jobs.length === 1 ? "Job" : "Jobs"}
                  </span>
                </p>
              </div>

              <a
                href="https://cloudfactory.com"
                className="text-[#4640DE] font-epilogue font-[600] text-base leading-[160%] block mt-1 sm:inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.name}.com
              </a>
              <div className="grid grid-cols-2 md:flex items-center gap-4 md:gap-16 mt-6 md:mt-8">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="bg-white rounded-full p-2">
                    <Flame className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-[#26A4FF]" />
                  </div>
                  <div>
                    <p className="font-epilogue font-[400] text-sm md:text-base leading-[160%] text-[#515B6F]">
                      Founded
                    </p>
                    <p className="font-epilogue font-[600] text-sm md:text-base leading-[160%] text-[#25324B]">
                      {company.founded}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="bg-white rounded-full p-2">
                    <Users className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-[#26A4FF]" />
                  </div>
                  <div>
                    <p className="font-epilogue font-[400] text-sm md:text-base leading-[160%] text-[#515B6F]">
                      Employees
                    </p>
                    <p className="font-epilogue font-[600] text-sm md:text-base leading-[160%] text-[#25324B]">
                      {company.employee}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="bg-white rounded-full p-2">
                    <MapPin className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-[#26A4FF]" />
                  </div>
                  <div>
                    <p className="font-epilogue font-[400] text-sm md:text-base leading-[160%] text-[#515B6F]">
                      Location
                    </p>
                    <p className="font-epilogue font-[600] text-sm md:text-base leading-[160%] text-[#25324B]">
                      {company.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="bg-white rounded-full p-2">
                    <Building2 className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-[#26A4FF]" />
                  </div>
                  <div>
                    <p className="font-epilogue font-[400] text-sm md:text-base leading-[160%] text-[#515B6F]">
                      Industry
                    </p>
                    <p className="font-epilogue font-[600] text-sm md:text-base leading-[160%] text-[#25324B]">
                      {company.industry}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};