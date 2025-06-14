import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CategoryTabs({
  categories,
  activeCategory,
  onChange,
  showLeftButton,
  showRightButton,
  scrollLeft,
  scrollRight,
  scrollContainerRef,
}) {
  return (
    <div className="relative">
      {showLeftButton && (
        <button
          onClick={scrollLeft}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-[#4640DE] p-2 shadow-md hover:bg-gray-100"
        >
          <ArrowLeft color="#FFFFFF" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-8 pb-4 mb-6 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.scroll-smooth::-webkit-scrollbar { display: none; }`}</style>
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onChange(category.id)}
              className={`flex flex-col justify-center items-start min-w-[274px] min-h-[173px] p-6 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-[#4640DE] text-white shadow-md"
                  : "bg-white text-[#25324B] hover:bg-gray-100"
              }`}
            >
              <Icon size={48} />
              <span className="font-[600] font-clash text-2xl leading-[120%] pt-6">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>

      {showRightButton && (
        <button
          onClick={scrollRight}
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-[#4640DE] p-2 shadow-md hover:bg-gray-100"
        >
          <ArrowRight color="#FFFFFF" />
        </button>
      )}
    </div>
  );
}
