"use client";
import {
  PencilRuler,
  Megaphone,
  Wallet,
  Monitor,
  Briefcase,
  Users,
  ArrowRight,
  ChartNoAxesCombined,
  Code,
  Stethoscope,
  BookOpen,
  Gavel,
  Headset,
} from "lucide-react";
import React, { useState } from "react";

const Category = () => {
  const [showAll, setShowAll] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Design",
      jobs: 235,
      icon: (
        <PencilRuler
          size={36}
          className="text-[#4640DE] group-hover:text-white"
        />
      ),
    },
    {
      id: 2,
      name: "Sales",
      jobs: 756,
      icon: (
        <ChartNoAxesCombined
          size={36}
          className="text-[#4640DE] group-hover:text-white"
        />
      ),
    },
    {
      id: 3,
      name: "Marketing",
      jobs: 140,
      icon: (
        <Megaphone
          size={36}
          className="text-[#4640DE] group-hover:text-white"
        />
      ),
    },
    {
      id: 4,
      name: "Finance",
      jobs: 325,
      icon: (
        <Wallet size={36} className="text-[#4640DE] group-hover:text-white" />
      ),
    },
    {
      id: 5,
      name: "Technology",
      jobs: 436,
      icon: (
        <Monitor size={36} className="text-[#4640DE] group-hover:text-white" />
      ),
    },
    {
      id: 6,
      name: "Engineering",
      jobs: 542,
      icon: (
        <Code size={36} className="text-[#4640DE] group-hover:text-white" />
      ),
    },
    {
      id: 7,
      name: "Business",
      jobs: 211,
      icon: (
        <Briefcase
          size={36}
          className="text-[#4640DE] group-hover:text-white"
        />
      ),
    },
    {
      id: 8,
      name: "Human Resource",
      jobs: 346,
      icon: (
        <Users size={36} className="text-[#4640DE] group-hover:text-white" />
      ),
    },
    {
      id: 9,
      name: "Healthcare",
      jobs: 278,
      icon: (
        <Stethoscope
          size={36}
          className="text-[#4640DE] group-hover:text-white"
        />
      ),
    },
    {
      id: 10,
      name: "Education",
      jobs: 198,
      icon: (
        <BookOpen size={36} className="text-[#4640DE] group-hover:text-white" />
      ),
    },
    {
      id: 11,
      name: "Legal",
      jobs: 115,
      icon: (
        <Gavel size={36} className="text-[#4640DE] group-hover:text-white" />
      ),
    },
    {
      id: 12,
      name: "Customer Support",
      jobs: 302,
      icon: (
        <Headset size={36} className="text-[#4640DE] group-hover:text-white" />
      ),
    },
  ];

  const displayedCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="font-clash font-[600] text-5xl leading-[110%] text-[#25324B]">
          Explore by <span className="text-[#26A4FF]">Category</span>
        </h1>
        <button
          onClick={() => setShowAll(!showAll)}
          className="hidden md:flex items-center font-epilogue text-base leading-[160%] text-[#4640DE] hover:scale-[1.03] transition-all duration-300 ease-in-out"
        >
          {showAll ? "Show less" : "Show all jobs"}
          <span className="ml-1">{showAll ? "↑" : "↓"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedCategories.map((category) => (
          <div
            key={category.id}
            className={`cursor-pointer group p-8 rounded-lg border-[1px] border-[#D6DDEB] transition-all duration-300 flex flex-col bg-white hover:bg-[#4640DE] text-gray-800 hover:text-white`}
          >
            <div className="flex justify-between items-start">
              <div className="text-3xl mb-4">{category.icon}</div>
            </div>
            <h3 className="font-clash font-[600] text-2xl leading-[120%] group-hover:text-white pt-2">
              {category.name}
            </h3>
            <p
              className={`font-epilogue font-[400] text-lg leading-[160%] text-[#7C8493] group-hover:text-white flex justify-between items-center pt-2`}
            >
              {category.jobs} jobs available{" "}
              <ArrowRight className="text-[#25324B] group-hover:text-white" />
            </p>
          </div>
        ))}
      </div>
      <div className="flex md:hidden justify-center md:justify-end mt-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center font-epilogue text-base leading-[160%] text-[#4640DE] hover:scale-[1.03] transition-all duration-300 ease-in-out"
        >
          {showAll ? "Show less" : "Show all jobs"}
          <span className="ml-1">{showAll ? "↑" : "↓"}</span>
        </button>
      </div>
    </div>
  );
};

export default Category;
