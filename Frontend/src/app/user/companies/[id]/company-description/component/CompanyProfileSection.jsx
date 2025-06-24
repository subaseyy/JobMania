"use client";

export const CompanyProfileSection = ({ company }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        {company.description}
      </p>
      <p className="text-gray-600 leading-relaxed">
        Founded in {company.established || "2020"}, we've grown from a small
        startup to a team of {company.companySize} talented professionals
        dedicated to delivering exceptional products and services in the{" "}
        {company.industry} industry.
      </p>
    </div>
  );
};