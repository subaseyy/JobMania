"use client";
import { Filter } from "lucide-react";

export const MobileFilterButton = ({ setShowMobileFilters }) => {
  return (
    <div className="md:hidden">
      <button
        onClick={() => setShowMobileFilters(true)}
        className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
      >
        <Filter size={18} />
        <span>Filter Jobs</span>
      </button>
    </div>
  );
};