"use client";
import { useState, useEffect } from "react";
import HeroSection from "./component/HeroSection";
import JobList from "./component/JobList";
import { FilterSection } from "./component/FilterSection";
import { MobileFilterButton } from "./component/MobileFilterButton";
import { companiesData } from "../find-companies/utils/constants";
import { useSearchParams } from "next/navigation";

export default function JobBoard() {
  const searchParams = useSearchParams();
  const companyParam = searchParams?.get("company") || "";
  const categoryParam = searchParams?.get("category") || "";

  const [allJobs, setAllJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [jobLevels, setJobLevels] = useState([]);
  const [salaryRanges, setSalaryRanges] = useState([]);

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/jobs/jobs");
        const data = await res.json();
        if (res.ok) {
          setAllJobs(data.data);
        } else {
          console.error("Failed to fetch jobs:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchJobs();
  }, []);

  const getCompanyByJobId = (jobId) => {
    return companiesData.find((company) => company.jobs.includes(jobId));
  };

  const toggleFilter = (filterArray, setFilterArray, value) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter((item) => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  const filteredJobs = allJobs.filter((job) => {
  // Must be active
  if (!job.isActive) return false;

  // Filter by company param from URL
  if (
    companyParam &&
    job.company?.toLowerCase() !== companyParam.toLowerCase()
  ) {
    return false;
  }

  // Filter by category param from URL
  if (
    categoryParam &&
    job.category?.toLowerCase() !== categoryParam.toLowerCase()
  ) {
    return false;
  }

  // Search term: title or company
  const matchesSearch =
    searchTerm === "" ||
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase());

  // Location match
  const matchesLocation =
    locationTerm === "" ||
    job.location?.toLowerCase().includes(locationTerm.toLowerCase());

  // Employment Type
  const matchesEmploymentType =
    employmentTypes.length === 0 || employmentTypes.includes(job.type);

  // Category (from UI filters)
  const matchesCategory =
    categories.length === 0 || categories.includes(job.category || "");

  // Job Level
  const matchesJobLevel =
    jobLevels.length === 0 ||
    jobLevels.some((level) => {
      if (level === "Entry Level") return job.level === "Entry";
      if (level === "Mid Level") return job.level === "Mid";
      if (level === "Senior Level") return job.level === "Senior";
      return false;
    });

  // Salary Range
const matchesSalaryRange =
  salaryRanges.length === 0 ||
  (salaryRanges.includes("Rs 10,000 - Rs 20,000") &&
    job.salaryMin >= 10000 &&
    job.salaryMax <= 20000) ||
  (salaryRanges.includes("Rs 20,000 - Rs 40,000") &&
    job.salaryMin >= 20000 &&
    job.salaryMax <= 40000) ||
  (salaryRanges.includes("Rs 40,000 - Rs 60,000") &&
    job.salaryMin >= 40000 &&
    job.salaryMax <= 60000) ||
  (salaryRanges.includes("Rs 60,000 or above") &&
    job.salaryMin >= 60000);

  // Final return if all matched
  return (
    matchesSearch &&
    matchesLocation &&
    matchesEmploymentType &&
    matchesCategory &&
    matchesJobLevel &&
    matchesSalaryRange
  );
});


  useEffect(() => {
    if (companyParam) setSearchTerm(companyParam);
    if (categoryParam) setCategories([categoryParam]);
  }, [companyParam, categoryParam]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    locationTerm,
    employmentTypes,
    categories,
    jobLevels,
    salaryRanges,

    companyParam,
    categoryParam,
  ]);

  useEffect(() => {
    document.body.style.overflow = showMobileFilters ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileFilters]);

  return (
    <div className="px-4">
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationTerm={locationTerm}
        setLocationTerm={setLocationTerm}
        companyFilter={companyParam}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-6 pt-12">
        <MobileFilterButton
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
        />

        <FilterSection
  showMobileFilters={showMobileFilters}
  setShowMobileFilters={setShowMobileFilters}
  employmentTypes={employmentTypes}
  setEmploymentTypes={setEmploymentTypes}
  salaryRanges={salaryRanges}
  setSalaryRanges={setSalaryRanges}
  toggleFilter={toggleFilter}
  jobsData={allJobs}
/>

        <JobList
          filteredJobs={filteredJobs}


          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSearchTerm={setSearchTerm}
          setLocationTerm={setLocationTerm}
          setEmploymentTypes={setEmploymentTypes}
          setCategories={setCategories}
          setJobLevels={setJobLevels}
          setSalaryRanges={setSalaryRanges}
          getCompanyByJobId={getCompanyByJobId}
          companyFilter={companyParam}
        />
      </div>
    </div>
  );
}
