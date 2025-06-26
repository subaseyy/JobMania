// Employment Type Count
export const getEmploymentTypeCounts = (jobs) => {
  const counts = {};
  jobs.forEach((job) => {
    const key = job.type?.toLowerCase(); // e.g., 'remote'
    if (key) counts[key] = (counts[key] || 0) + 1;
  });

  const types = ['full-time', 'part-time', 'remote', 'internship', 'contract'];
  return types.map((type) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '),
    value: type,
    count: counts[type] || 0,
  }));
};

// Salary Range Count
export const getSalaryRangeCounts = (jobs) => {
  const ranges = [
    { label: 'Rs 10,000 - Rs 20,000', min: 10000, max: 20000 },
    { label: 'Rs 20,000 - Rs 40,000', min: 20000, max: 40000 },
    { label: 'Rs 40,000 - Rs 60,000', min: 40000, max: 60000 },
    { label: 'Rs 60,000 or above', min: 60000, max: Infinity },
  ];

  return ranges.map((range) => ({
    label: range.label,
    value: range.label,
    count: jobs.filter(
      (job) =>
        Number(job.salaryMin) >= range.min &&
        Number(job.salaryMax) <= range.max
    ).length,
  }));
};
