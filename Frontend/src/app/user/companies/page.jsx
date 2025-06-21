"use client";
import { useState } from "react";
import HeroSection from "@/app/find-companies/components/HeroSection";
import Search from "@/app/find-companies/components/Search";
import RecommendedCompanies from "@/app/find-companies/components/RecommendedCompanies";
import CompaniesByCategory from "@/app/find-companies/components/CompaniesByCategory";
import SearchBar from "@/app/find-companies/components/SearchBar";

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    const hasSearch = searchTerm.trim().length > 0;
    const hasLocation = locationTerm.trim().length > 0;

    if (hasSearch || hasLocation) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationTerm={locationTerm}
        setLocationTerm={setLocationTerm}
        onSearchClick={handleSearchClick}
      />

      {showSearch && (
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          locationTerm={locationTerm}
          setLocationTerm={setLocationTerm}
        />
      )}

      <RecommendedCompanies
        searchTerm={searchTerm}
        locationTerm={locationTerm}
      />
      <CompaniesByCategory />
    </div>
  );
}
