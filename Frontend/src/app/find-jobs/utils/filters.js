// Utility functions for filtering
export const getEmploymentTypeCounts = (jobs) => {
  const counts = {};
  jobs.forEach((job) => {
    counts[job.type] = (counts[job.type] || 0) + 1;
  });
  return ["Full Time", "Part Time", "Remote", "Internship", "Contract"].map(
    (type) => ({
      label: type,
      count: counts[type] || 0,
    })
  );
};

export const getCategoryCounts = (jobs) => {
  const counts = {};
  jobs.forEach((job) => {
    counts[job.category] = (counts[job.category] || 0) + 1;
  });
  return [
    "Design",
    "Sales",
    "Marketing",
    "Business",
    "Human Resource",
    "Finance",
    "Engineering",
    "Technology",
  ].map((category) => ({
    label: category,
    count: counts[category] || 0,
  }));
};

export const getJobLevelCounts = (jobs) => {
  const counts = {};
  jobs.forEach((job) => {
    counts[job.level] = (counts[job.level] || 0) + 1;
  });
  return ["Entry", "Mid", "Senior", "Director", "VP or Above"].map((level) => ({
    label:
      level === "Entry"
        ? "Entry Level"
        : level === "Mid"
        ? "Mid Level"
        : level === "Senior"
        ? "Senior Level"
        : level === "VP or Above"
        ? "VP or Above"
        : level,
    count: counts[level] || 0,
  }));
};

export const getSalaryRangeCounts = (jobs) => {
  const ranges = [
    { label: "Rs 70,000 - Rs 100,000", min: 70000, max: 100000 },
    { label: "Rs 100,000 - Rs 150,000", min: 100000, max: 150000 },
    { label: "Rs 150,000 - Rs 200,000", min: 150000, max: 200000 },
    { label: "Rs 300,000 or above", min: 300000, max: Infinity },
  ];

  return ranges.map((range) => ({
    label: range.label,
    count: jobs.filter(
      (job) => job.salary >= range.min && job.salary <= range.max
    ).length,
  }));
};

// Main filter function
export const filterJobs = (
  jobs,
  {
    searchTerm,
    locationTerm,
    employmentTypes,
    categories,
    jobLevels,
    salaryRanges,
    company,
  }
) => {
  return jobs.filter((job) => {
    const matchesCompany = !company || job.company === company;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = job.location
      .toLowerCase()
      .includes(locationTerm.toLowerCase());

    const matchesEmploymentType =
      employmentTypes.length === 0 || employmentTypes.includes(job.type);

    const matchesCategory =
      categories.length === 0 || categories.includes(job.category);

    const matchesJobLevel =
      jobLevels.length === 0 ||
      jobLevels.some((level) => {
        if (level === "Entry Level") return job.level === "Entry";
        if (level === "Mid Level") return job.level === "Mid";
        if (level === "Senior Level") return job.level === "Senior";
        return job.level === level;
      });

    const matchesSalaryRange =
      salaryRanges.length === 0 ||
      (salaryRanges.includes("Rs 70,000 - Rs 100,000") &&
        job.salary >= 70000 &&
        job.salary <= 100000) ||
      (salaryRanges.includes("Rs 100,000 - Rs 150,000") &&
        job.salary >= 100000 &&
        job.salary <= 150000) ||
      (salaryRanges.includes("Rs 150,000 - Rs 200,000") &&
        job.salary >= 150000 &&
        job.salary <= 200000) ||
      (salaryRanges.includes("Rs 300,000 or above") && job.salary >= 300000);

    return (
      matchesCompany &&
      matchesSearch &&
      matchesLocation &&
      matchesEmploymentType &&
      matchesCategory &&
      matchesJobLevel &&
      matchesSalaryRange
    );
  });
};
