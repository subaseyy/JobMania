"use client";

import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import Pagination from "./Pagination";
import { companiesData } from "../utils/constants";

const RecommendedCompanies = () => {
  const [industries, setIndustries] = useState([]);
  const [companySizes, setCompanySizes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Most relevant");

  const companiesPerPage = 6;
  const filteredCompanies = companiesData.filter((company) => {
    const matchesIndustry =
      industries.length === 0 || industries.includes(company.industry);
    const matchesCompanySize =
      companySizes.length === 0 || companySizes.includes(company.size);

    return matchesIndustry && matchesCompanySize;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortOption === "Newest") {
      return b.id - a.id;
    } else if (sortOption === "Highest rated") {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = sortedCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const totalPages = Math.ceil(sortedCompanies.length / companiesPerPage);

  useEffect(() => {}, [industries, companySizes, sortOption]);

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-clash font-[600] text-[32px] leading-[120%] text-[#25324B]">
            Recommended Companies
          </h2>
          <p className="font-epilogue font-[400] text-base text-[160%] text-[#7C8493] pt-2">
            Based on your profile, company preferences, and recent activity
          </p>
        </div>

        <div className="hidden sm:block">
          <label className="mr-2 text-sm text-gray-600">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option>Most relevant</option>
            <option>Newest</option>
            <option>Highest rated</option>
          </select>
        </div>
      </div>

      {currentCompanies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentCompanies.map((company, index) => (
            <CompanyCard key={index} company={company} viewMode="recommended" />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          No recommended companies found.
        </div>
      )}

      {sortedCompanies.length > companiesPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default RecommendedCompanies;
