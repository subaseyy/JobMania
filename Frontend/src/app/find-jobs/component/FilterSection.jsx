"use client";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  getEmploymentTypeCounts,
  getSalaryRangeCounts,
} from "../utils/filters";

export const FilterSection = ({
  jobsData = [],
  showMobileFilters,
  setShowMobileFilters,
  employmentTypes,
  setEmploymentTypes,
  salaryRanges,
  setSalaryRanges,
  toggleFilter,
}) => {
  const [showEmployment, setShowEmployment] = useState(true);
  const [showSalaries, setShowSalaries] = useState(true);

  const employmentOptions = getEmploymentTypeCounts(jobsData);
  const salaryOptions = getSalaryRangeCounts(jobsData);

  const handleApplyFilters = () => setShowMobileFilters(false);
  const clearAllFilters = () => {
    setEmploymentTypes([]);
    setSalaryRanges([]);
  };

  const renderCheckboxList = (items, selected, setSelected, title, toggle, open) => (
    <div>
      <div
        onClick={toggle}
        className="flex justify-between items-center cursor-pointer mb-2"
      >
        <h3 className="font-bold text-[#25324B]">{title}</h3>
        <ChevronDown
          strokeWidth={2.5}
          className={`transition-transform h-4 w-4 ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && (
        <div className="space-y-2 mt-2">
          {items.map(({ label, value, count }) => (
            <div key={value} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={value}
                checked={selected.includes(value)}
                onChange={() => toggleFilter(selected, setSelected, value)}
                className="w-4 h-4 bg-[#4640DE] rounded"
              />
              <label htmlFor={value} className="text-[#515B6F] text-sm cursor-pointer">
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
      {/* Desktop Filter */}
      <div className="hidden md:block col-span-1 space-y-6 bg-white p-4 rounded-lg shadow-md">
        {renderCheckboxList(
          employmentOptions,
          employmentTypes,
          setEmploymentTypes,
          "Type of Employment",
          () => setShowEmployment(!showEmployment),
          showEmployment
        )}
        {renderCheckboxList(
          salaryOptions,
          salaryRanges,
          setSalaryRanges,
          "Salary Range",
          () => setShowSalaries(!showSalaries),
          showSalaries
        )}
      </div>

      {/* Mobile Drawer */}
      {showMobileFilters && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="md:hidden fixed left-0 top-0 h-full w-4/5 max-w-sm bg-white z-50 overflow-y-auto shadow-xl">
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

              {renderCheckboxList(
                employmentOptions,
                employmentTypes,
                setEmploymentTypes,
                "Type of Employment",
                () => setShowEmployment(!showEmployment),
                showEmployment
              )}
              {renderCheckboxList(
                salaryOptions,
                salaryRanges,
                setSalaryRanges,
                "Salary Range",
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
