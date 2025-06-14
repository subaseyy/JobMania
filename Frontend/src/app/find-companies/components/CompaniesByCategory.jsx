import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { createCategoryData } from "../utils/categoryData";
import CategoryTabs from "./CategoryTabs";

export default function CompaniesByCategory() {
  const categoryData = createCategoryData();
  const [activeCategory, setActiveCategory] = useState(
    categoryData[0]?.id || "Design"
  );
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const companiesRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const activeCategoryData =
    categoryData.find((cat) => cat.id === activeCategory) || categoryData[0];

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();
    return () => container?.removeEventListener("scroll", checkScrollPosition);
  }, []);

  useEffect(() => {
    if (companiesRef.current) {
      gsap.fromTo(
        companiesRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power1.out",
        }
      );
    }
  }, [activeCategory]);

  return (
    <div className="bg-[#F8F8FD] relative">
      <div className="container mx-auto py-12 rounded-lg shadow-sm">
        <div className="absolute top-0 left-0 hidden lg:flex rotate-180">
          <Image
            src="/home/hero/ractangle.png"
            width={150}
            height={150}
            alt=""
          />
        </div>

        <h2 className="font-clash font-[600] text-[32px] leading-[120%] text-[#25324B] mb-6">
          Companies by Category
        </h2>

        <CategoryTabs
          categories={categoryData}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
          showLeftButton={showLeftButton}
          showRightButton={showRightButton}
          scrollLeft={() => scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
          scrollRight={() => scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
          scrollContainerRef={scrollContainerRef}
        />

        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
            {React.createElement(activeCategoryData.icon, {
              size: 24,
              className: "text-[#4640DE]",
            })}
          </span>
          <span className="font-[600] font-clash text-2xl leading-[120%] text-[#202430]">
            {activeCategoryData.companies.length} Results
          </span>
        </div>

        <div
          ref={companiesRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {activeCategoryData.companies.map((company) => (
            <Link
              key={company.id}
              href={`/find-jobs?company=${encodeURIComponent(company.name)}`}
              passHref
            >
              <span className="block bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 ${company.color} rounded-full flex items-center justify-center text-white font-bold`}
                  >
                    {company.logo}
                  </div>
                  <h3 className="font-[600] font-clash text-2xl leading-[120%] text-[#25324B] py-6">
                    {company.name}
                  </h3>
                  <p className="text-[#4640DE] font-epilogue font-[400] text-base leading-[160%]">
                    {company.jobs} jobs
                  </p>
                </div>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-[#4640DE] font-epilogue font-[600] text-base leading-[160%]">
          <a
            href={`/find-jobs?category=${encodeURIComponent(
              activeCategoryData.name
            )}`}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            View more {activeCategoryData.name} companies{" "}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
