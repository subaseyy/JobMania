import { jobsData } from "@/app/find-jobs/utils/constants";

const logoColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-pink-500",
];

export const fetchApplications = () => {
  const appliedJobs = jobsData.filter((job) => job.applied);

  return appliedJobs.map((job, index) => ({
    id: job.id,
    company: job.company,
    role: job.title,
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: job.status || "In Review", // fallback if missing
    logoColor: logoColors[index % logoColors.length],
  }));
};
