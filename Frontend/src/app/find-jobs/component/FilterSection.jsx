"use client";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  getEmploymentTypeCounts,
  getCategoryCounts,
  getJobLevelCounts,
  getSalaryRangeCounts,
} from "../utils/filters";
import { jobsData } from "../utils/constants";

export const FilterSection = ({
  showMobileFilters,
  setShowMobileFilters,
  employmentTypes,
  setEmploymentTypes,
  categories,
  setCategories,
  jobLevels,
  setJobLevels,
  salaryRanges,
  setSalaryRanges,
  toggleFilter,
}) => {
  const [showEmployment, setShowEmployment] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  const [showJobLevels, setShowJobLevels] = useState(true);
  const [showSalaries, setShowSalaries] = useState(true);

  const employmentOptions = getEmploymentTypeCounts(jobsData);
  const categoryOptions = getCategoryCounts(jobsData);
  const jobLevelOptions = getJobLevelCounts(jobsData);
  const salaryOptions = getSalaryRangeCounts(jobsData);

  const handleApplyFilters = () => setShowMobileFilters(false);

  const clearAllFilters = () => {
    setEmploymentTypes([]);
    setCategories([]);
    setJobLevels([]);
    setSalaryRanges([]);
  };

  const renderSection = (
    title,
    items,
    selected,
    setSelected,
    toggleSection,
    isOpen
  ) => (
    <div>
      <div
        onClick={toggleSection}
        className="flex justify-between items-center cursor-pointer mb-2"
      >
        <h3 className="font-epilogue font-[700] text-base leading-[150%] text-[#25324B]">
          {title}
        </h3>
        <ChevronDown
          strokeWidth={3}
          className={`transition-transform h-4 w-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="space-y-2 mt-2">
          {items.map(({ label, count }) => (
            <div key={label} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={label}
                checked={selected.includes(label)}
                onChange={() => toggleFilter(selected, setSelected, label)}
                className="w-4 h-4 bg-[#4640DE] rounded"
              />
              <label
                htmlFor={label}
                className={`font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] px-2 py-0.5 rounded cursor-pointer`}
              >
                {label} ({count})
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden md:block col-span-1 space-y-6 bg-white p-4 rounded-lg shadow-md">
        {renderSection(
          "Type of Employment",
          employmentOptions,
          employmentTypes,
          setEmploymentTypes,
          () => setShowEmployment(!showEmployment),
          showEmployment
        )}

        {renderSection(
          "Categories",
          categoryOptions,
          categories,
          setCategories,
          () => setShowCategories(!showCategories),
          showCategories
        )}

        {renderSection(
          "Job Level",
          jobLevelOptions,
          jobLevels,
          setJobLevels,
          () => setShowJobLevels(!showJobLevels),
          showJobLevels
        )}

        {renderSection(
          "Salary Range",
          salaryOptions,
          salaryRanges,
          setSalaryRanges,
          () => setShowSalaries(!showSalaries),
          showSalaries
        )}
      </div>

      {showMobileFilters && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="md:hidden fixed left-0 top-0 h-full w-4/5 max-w-sm bg-white z-50 overflow-y-auto transition-transform duration-300 ease-in-out shadow-xl">
            <div className="p-5 space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {renderSection(
                "Type of Employment",
                employmentOptions,
                employmentTypes,
                setEmploymentTypes,
                () => setShowEmployment(!showEmployment),
                showEmployment
              )}

              {renderSection(
                "Categories",
                categoryOptions,
                categories,
                setCategories,
                () => setShowCategories(!showCategories),
                showCategories
              )}

              {renderSection(
                "Job Level",
                jobLevelOptions,
                jobLevels,
                setJobLevels,
                () => setShowJobLevels(!showJobLevels),
                showJobLevels
              )}

              {renderSection(
                "Salary Range",
                salaryOptions,
                salaryRanges,
                setSalaryRanges,
                () => setShowSalaries(!showSalaries),
                showSalaries
              )}

              <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white pb-4">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 border border-gray-300 py-3 rounded-lg font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};