"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, X } from "lucide-react";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  locationTerm,
  setLocationTerm,
}) {
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const searchRef = useRef(null);
  const locationRef = useRef(null);
  const router = useRouter();

  const locations = [
    "Kathmandu, Nepal",
    "Lalitpur, Nepal",
    "Bhaktapur, Nepal",
    "Pokhara, Nepal",
    "Biratnagar, Nepal",
    "Birgunj, Nepal",
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const trimmed = searchTerm.trim();
      if (!recentSearches.includes(trimmed)) {
        const updated = [trimmed, ...recentSearches.slice(0, 4)];
        setRecentSearches(updated);
        localStorage.setItem("recentJobSearches", JSON.stringify(updated));
      }
    }

    setShowRecentSearches(false);
    setShowLocationDropdown(false);

    const query = `?search=${encodeURIComponent(
      searchTerm
    )}&location=${encodeURIComponent(locationTerm)}`;
    router.push(`/search${query}`);
  };

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    setShowRecentSearches(false);
  };

  const handleLocationSelect = (location) => {
    setLocationTerm(location);
    setShowLocationDropdown(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    searchRef.current?.focus();
  };

  const clearLocation = () => {
    setLocationTerm("");
    locationRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setShowRecentSearches(false);
      }
      if (!locationRef.current?.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("recentJobSearches");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed);
        }
      } catch (e) {
        console.error("Error parsing recent searches:", e);
      }
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center pt-6 pb-3">
      <div
        className="flex flex-col md:flex-row items-stretch justify-between bg-white px-6 py-6 w-full gap-4 md:gap-2"
        style={{
          boxShadow: `
            0px 2.71px 4.4px 0px #C0C0C007,
            0px 6.86px 11.12px 0px #C0C0C00A,
            0px 14px 22.68px 0px #C0C0C00C,
            0px 28.84px 46.72px 0px #C0C0C00F,
            0px 79px 128px 0px #C0C0C017
          `,
        }}
      >
        {/* Search Input */}
        <div className="flex-1 relative" ref={searchRef}>
          <div className="flex items-center w-full border-b border-[#D6DDEB] pb-2">
            <Search className="min-w-5 text-[#25324B]" />
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full p-2 pl-3 outline-none text-[#25324B]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowRecentSearches(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={16} className="text-[#25324B]" />
              </button>
            )}
          </div>

          {showRecentSearches && recentSearches.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg py-2 max-h-60 overflow-auto">
              <p className="px-4 py-1 text-xs font-medium text-gray-500 uppercase">
                Recent Searches
              </p>
              {recentSearches.map((term, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleRecentSearchClick(term)}
                >
                  <Search size={14} className="mr-2 text-[#25324B]" />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Input */}
        <div className="flex-1 relative" ref={locationRef}>
          <div className="flex items-center w-full border-b border-[#D6DDEB] pb-2">
            <MapPin className="min-w-5 text-[#25324B]" />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-2 pl-3 outline-none text-[#25324B]"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              onFocus={() => setShowLocationDropdown(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {locationTerm && (
              <button
                onClick={clearLocation}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>

          {showLocationDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg py-2 max-h-60 overflow-auto">
              {locations
                .filter((loc) =>
                  loc.toLowerCase().includes(locationTerm.toLowerCase())
                )
                .map((location, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <MapPin size={14} className="mr-2 text-gray-400" />
                    <span>{location}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#4640DE] hover:bg-[#3530C0] transition-colors duration-300 text-white px-6 py-3 font-medium flex items-center justify-center gap-2"
        >
          <Search size={18} />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}
