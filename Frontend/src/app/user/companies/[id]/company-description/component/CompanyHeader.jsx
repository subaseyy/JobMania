"use client";
import { Heart, Share2 } from "lucide-react";
import { Building2, Flame, MapPin, Users } from "lucide-react";
import Image from "next/image";

export const CompanyHeader = ({ company }) => {
  return (
    <div className="bg-[#F8F8FD]">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <Image
                src="/jobs/sample.png"
                height={64}
                width={64}
                alt={`${company.name} logo`}
              />
            </div>
            <div>
              <h1 className="font-clash font-[600] text-5xl leading-[110%] text-[#25324B]">
                {company.name}
              </h1>
              <p className="text-gray-600">{company.industry} Company</p>
              <div className="flex items-center gap-6 mt-3 text-sm text-[#25324B]">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Founded</p>
                    <p className="font-semibold">{company.founded}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Employees</p>
                    <p className="font-semibold">{company.employees}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold">{company.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Industry</p>
                    <p className="font-semibold">{company.industry}</p>
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
