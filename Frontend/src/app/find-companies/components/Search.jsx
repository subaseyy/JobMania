import React, { useEffect, useState } from "react";
import { MobileFilterButton } from "./MobileFilterButton";
import { FilterSection } from "./FilterSection";
import CompanyList from "./CompanyList";
import { companiesData } from "../utils/constants";

const Search = ({
  searchTerm,
  setSearchTerm,
  locationTerm,
  setLocationTerm,
}) => {
  const [industries, setIndustries] = useState([]);
  const [companySizes, setCompanySizes] = useState([]);
  const [sortOption, setSortOption] = useState("Most relevant");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilter = (filterArray, setFilterArray, value) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter((item) => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  const filteredCompanies = companiesData.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationTerm === "" ||
      company.location?.toLowerCase().includes(locationTerm.toLowerCase());

    const matchesIndustry =
      industries.length === 0 || industries.includes(company.industry);

    const matchesCompanySize =
      companySizes.length === 0 || companySizes.includes(company.size);

    return (
      matchesSearch && matchesLocation && matchesIndustry && matchesCompanySize
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, locationTerm, industries, companySizes, sortOption]);

  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileFilters]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-6 pt-12">
        <MobileFilterButton
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
        />

        <FilterSection
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
          industries={industries}
          setIndustries={setIndustries}
          companySizes={companySizes}
          setCompanySizes={setCompanySizes}
          toggleFilter={toggleFilter}
        />

        <CompanyList
          filteredCompanies={filteredCompanies}
          sortOption={sortOption}
          setSortOption={setSortOption}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSearchTerm={setSearchTerm}
          setLocationTerm={setLocationTerm}
          setIndustries={setIndustries}
          setCompanySizes={setCompanySizes}
        />
      </div>
    </div>
  );
};

export default Search;
