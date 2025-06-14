import { companiesData } from "../utils/constants";
import { jobsData } from "@/app/find-jobs/utils/constants";
import { PencilRuler, Briefcase, Globe, Building2, Code } from "lucide-react";

export const createCategoryData = () => {
  const uniqueCategories = [...new Set(jobsData.map((job) => job.category))];

  return uniqueCategories.map((category) => {
    let icon;
    switch (category) {
      case "Design":
        icon = PencilRuler;
        break;
      case "Marketing":
        icon = Globe;
        break;
      case "Technology":
        icon = Code;
        break;
      case "Sales":
        icon = Building2;
        break;
      default:
        icon = Briefcase;
    }

    const companyJobCounts = {};
    jobsData
      .filter((job) => job.category === category)
      .forEach((job) => {
        companyJobCounts[job.company] =
          (companyJobCounts[job.company] || 0) + 1;
      });

    const companiesInCategory = Object.keys(companyJobCounts)
      .map((companyName) => {
        const company = companiesData.find((c) => c.name === companyName);
        if (!company) return null;

        const logo = companyName.charAt(0);
        const colorHash =
          Math.abs(
            companyName
              .split("")
              .reduce((acc, char) => acc + char.charCodeAt(0), 0)
          ) % 4;

        const bgColor = [
          "bg-blue-500",
          "bg-purple-500",
          "bg-green-500",
          "bg-orange-500",
        ][colorHash];

        return {
          id: company.name.replace(/\s+/g, "-").toLowerCase(),
          name: company.name,
          jobs: companyJobCounts[companyName],
          logo,
          color: bgColor,
        };
      })
      .filter(Boolean);

    companiesInCategory.sort((a, b) => b.jobs - a.jobs);

    return {
      id: category,
      name: category,
      icon,
      companies: companiesInCategory,
    };
  });
};
