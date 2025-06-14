"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { companiesData } from "@/app/find-companies/utils/constants";
import { CompanyHeader } from "./component/CompanyHeader";
import { CompanyProfileSection } from "./component/CompanyProfileSection";
import { ServicesSection } from "./component/ServicesSection";
import { TeamSection } from "./component/TeamSection";
import { BenefitsSection } from "./component/BenefitsSection";
import { TechStackSection } from "./component/TechStackSection";
import { LocationSection } from "./component/LocationSection";
import { ContactSection } from "./component/ContactSection";
import { JobsSection } from "./component/JobsSection";

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const params = useParams();
  const companyId = params?.id;

  useEffect(() => {
    if (companyId) {
      const foundCompany = companiesData.find(
        (c) => c.id === parseInt(companyId)
      );
      setCompany(foundCompany);
    }
  }, [companyId]);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Dynamic data based on company
  const techStack = [
    { name: "HTML5", color: "bg-orange-500", icon: "🌐" },
    { name: "CSS3", color: "bg-blue-500", icon: "🎨" },
    { name: "JS", color: "bg-yellow-500", icon: "⚡" },
    { name: "React", color: "bg-cyan-500", icon: "⚛️" },
    { name: company.tags[0] || "Node.js", color: "bg-green-500", icon: "🟢" },
    { name: company.industry || "Python", color: "bg-blue-600", icon: "🐍" },
  ];

  const teamMembers = [
    { name: "Sarah Johnson", role: "CEO & Founder", avatar: "👩‍💼", rating: 4.9 },
    { name: "Mike Chen", role: "CTO", avatar: "👨‍💻", rating: 4.8 },
    { name: "Emily Davis", role: "Lead Designer", avatar: "👩‍🎨", rating: 4.9 },
  ];

  const services = [
    {
      icon: "💻",
      title: company.tags.includes("Fintech")
        ? "Payment Solutions"
        : "Web Development",
      desc: company.tags.includes("Fintech")
        ? "Secure digital payment platforms and financial services"
        : "Full-stack web applications using modern technologies",
    },
    {
      icon: company.tags.includes("E-commerce") ? "🛒" : "📱",
      title: company.tags.includes("E-commerce")
        ? "E-commerce Platform"
        : "Mobile Apps",
      desc: company.tags.includes("E-commerce")
        ? "Online marketplace with nationwide delivery"
        : "Native and cross-platform mobile development",
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      desc: "Scalable cloud infrastructure and deployment",
    },
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Salary",
      desc: "Above market rate compensation",
    },
    {
      icon: "🏠",
      title: company.location.includes("Remote")
        ? "Fully Remote"
        : "Hybrid Work",
      desc: company.location.includes("Remote")
        ? "Work from anywhere"
        : "Flexible remote and office options",
    },
    {
      icon: "🎓",
      title: "Learning Budget",
      desc: "$2000 annual learning allowance",
    },
  ];

  const jobListings = company.jobs.map((job) => ({
    title: `${company.name} ${job} Position`,
    type: "Full-time",
    location: company.location.split(",")[0],
    salary: "$80k - $120k",
    color: "bg-blue-100 text-blue-800",
    posted: "2 days ago",
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyHeader company={company} />

      <div className="px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <CompanyProfileSection company={company} />
            <ServicesSection services={services} />
            <TeamSection teamMembers={teamMembers} />
            <BenefitsSection benefits={benefits} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TechStackSection techStack={techStack} />
            <LocationSection company={company} />
            <ContactSection company={company} />
          </div>
        </div>

        <JobsSection jobListings={jobListings} />
      </div>
    </div>
  );
};

export default CompanyProfile;
