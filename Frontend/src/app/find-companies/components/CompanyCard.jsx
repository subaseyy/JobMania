"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { tagColors } from "../utils/constants";

export default function CompanyCard({ company, viewMode = "grid" }) {
  const isGrid = viewMode === "grid" || viewMode === "recommended";
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/find-companies/${company.id}/company-description`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative bg-white border border-[#D6DDEB] rounded-lg p-6 transition-all duration-300 cursor-pointer w-full
        ${
          isGrid
            ? "max-w-sm min-h-fit max-h-fit flex flex-col"
            : "flex gap-4 items-start min-h-fit max-h-fit"
        }
      `}
    >
      <Link
        href={`/find-jobs?company=${encodeURIComponent(company.name)}`}
        className="absolute top-4 right-4 text-sm font-semibold text-[#A88BFF] hover:underline hover:text-[#8a6eff] transition-colors"
        scroll={false}
        onClick={(e) => e.stopPropagation()}
      >
        {company.jobs.length} {company.jobs.length === 1 ? "Job" : "Jobs"}
      </Link>

      <Link
        href={`/find-jobs?company=${encodeURIComponent(company.name)}`}
        scroll={false}
        onClick={(e) => e.stopPropagation()}
        className={`${isGrid ? "mb-4" : "flex-shrink-0"}`}
      >
        <Image
          src={company.icon}
          alt={company.name}
          width={48}
          height={48}
          className="rounded"
        />
      </Link>

      <div className={`${isGrid ? "flex flex-col flex-1" : "flex-1"}`}>
        <Link
          href={`/find-jobs?company=${encodeURIComponent(company.name)}`}
          scroll={false}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-semibold text-lg text-[#25324B] mb-1 hover:underline">
            {company.name}
          </h3>
        </Link>
        <p
          className={`text-sm text-[#515B6F] leading-[1.5] mb-4 ${
            isGrid ? "line-clamp-3" : "line-clamp-4"
          }`}
        >
          {company.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {company.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                tagColors[tag] || "bg-gray-100 text-gray-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
