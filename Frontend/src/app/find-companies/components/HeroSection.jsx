"use client";
import Image from "next/image";
import SearchBar from "./SearchBar";

export default function HeroSection({
  searchTerm,
  setSearchTerm,
  locationTerm,
  setLocationTerm,
  onSearchClick,
  type = "job"
}) {
  return (
    <div className="bg-[#F8F8FD]">
      <div className="text-center py-12 flex flex-col justify-center">
        <h1 className="font-clash font-[600] text-5xl text-[#25324B] leading-[110%] pb-6">
          Find your{" "}
          <span className="relative">
            <span className="text-[#26A4FF] z-10 relative">
              {type === "job" ? "dream job" : "dream companies"}
            </span>
            <Image
              src="/home/Hero/underline.svg"
              alt="underline"
              width={type === "job" ? 355 : 395}
              height={39}
              className="absolute left-0 -bottom-4 object-contain"
            />
          </span>
        </h1>
        <p className="font-epilogue font-[400] text-lg leading-[160%] text-[#515B6F] mb-4">
          Find your next career at companies like HubSpot, Nike, and Dropbox
        </p>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          locationTerm={locationTerm}
          setLocationTerm={setLocationTerm}
          onSearchClick={onSearchClick}
          placeholder={type === "job" ? "Job title or keyword" : "Company name or keyword"}
          storageKey={type === "job" ? "recentJobSearches" : "recentCompanySearches"}
        />

        <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] text-center sm:text-left">
          Popular : {type === "job" 
            ? "UI Designer, UX Researcher, Android, Admin"
            : "Tech, Finance, Healthcare, E-commerce"}
        </p>
      </div>
    </div>
  );
}