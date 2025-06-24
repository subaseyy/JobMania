"use client";
import { MapPin, Globe } from "lucide-react";

export const LocationSection = ({ company }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Office Location</h3>
      <div className="space-y-3">
        {company.location.split(",").map((loc, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-gray-600"
          >
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-sm">{loc.trim()}</span>
          </div>
        ))}
        {company.tags.includes("Remote") && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Globe className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Remote Worldwide</span>
          </div>
        )}
      </div>
    </div>
  );
};