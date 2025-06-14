"use client";
import { useState } from "react";
import HeroSection from "./components/HeroSection";
import Search from "./components/Search";
import RecommendedCompanies from "./components/RecommendedCompanies";
import CompaniesByCategory from "./components/CompaniesByCategory";

export default function CompanyBoard() {
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
      <HeroSection
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
