"use client";
import { useState } from "react";
import JobCard from "./JobCard";
import Pagination from "./Pagination";

export default function JobList({
  filteredJobs,
  sortOption,
  setSortOption,
  currentPage,
  setCurrentPage,
  setSearchTerm,
  setLocationTerm,
  setEmploymentTypes,
  setCategories,
  setJobLevels,
  setSalaryRanges,
}) {
  const [viewMode, setViewMode] = useState("list");
  const jobsPerPage = viewMode === "list" ? 5 : 6;
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOption === "Newest") {
      return b.id - a.id;
    } else {
      return b.applicants - a.applicants;
    }
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  return (
    <div className="col-span-3 flex flex-col min-h-[80vh]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-clash font-[600] text-[32px] leading-[120%] text-[#25324B] pb-1">
            All Jobs
          </h2>
          <p className="font-epilogue font-[400] text-base leading-[160%] text-[#7C8493]">
            Showing {filteredJobs.length} results
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="font-epilogue font-[400] text-base leading-[160%] text-[#7C8493]">
            Sort by:{" "}
            <select
              className="font-epilogue font-[500] text-base leading-[160%] text-[#25324B] focus:outline-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Most relevant</option>
              <option>Newest</option>
            </select>
          </div>
          <div className="hidden sm:block h-[24px] w-[1px] bg-[#202430]/50" />
          <div className="hidden sm:flex justify-center items-center space-x-2 p-1 rounded-md">
            <button
              className={`p-1 rounded ${
                viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-white"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <svg
                className={`w-8 h-8 ${
                  viewMode === "grid" ? "text-indigo-600" : "text-gray-400"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4h4v4H4V4zm0 6h4v4H4v-4zm6-6h4v4h-4V4zm0 6h4v4h-4v-4z" />
              </svg>
            </button>
            <button
              className={`p-1 rounded ${
                viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-white"
              }`}
              onClick={() => setViewMode("list")}
            >
              <svg
                className={`w-6 h-6 ${
                  viewMode === "list" ? "text-indigo-600" : "text-gray-400"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm0 6h14a1 1 0 100-2H3a1 1 0 100 2zm0 6h14a1 1 0 100-2H3a1 1 0 100 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Job Grid/List */}
      <div
        className={`flex-1 ${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-4"
            : "space-y-4"
        }`}
      >
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <JobCard key={job.id} job={job} viewMode={viewMode} />
          ))
        ) : (
          <div className="text-center py-10 col-span-2">
            <p className="text-gray-500">
              No jobs found matching your criteria
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                setSearchTerm("");
                setLocationTerm("");
                setEmploymentTypes([]);
                setCategories([]);
                setJobLevels([]);
                setSalaryRanges([]);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Below Job Cards */}
      {filteredJobs.length > jobsPerPage && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
