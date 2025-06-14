"use client";
import React, { useState } from "react";
import { Instagram, Twitter, Globe, SquarePen } from "lucide-react";

const SocialLinks = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [links, setLinks] = useState({
    instagram: "https://instagram.com/nishant-neupane",
    twitter: "https://twitter.com/nishant-neupane",
    website: "https://nishantneupane488.com.np",
  });

  const handleChange = (platform, value) => {
    setLinks((prev) => ({ ...prev, [platform]: value }));
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const getDisplayUrl = (url) => {
    return url.replace(/^https?:\/\//, "");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-epilogue font-[600] text-xl lead-[120%] text-[#25324B]">
          Social Links
        </h3>
        <button
          onClick={toggleEdit}
          className="p-2.5 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE] transition"
        >
          <SquarePen size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Instagram */}
        <div className="flex space-x-2">
          <Instagram size={20} className="text-[#7C8493] mt-1" />
          <div className="flex flex-col w-full">
            <label className="font-epilogue text-base text-[#7C8493]">
              Instagram
            </label>
            {isEditing ? (
              <input
                type="text"
                value={links.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
                className="border border-[#D6DDEB] px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
              />
            ) : (
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4640DE] hover:underline text-base"
              >
                {getDisplayUrl(links.instagram)}
              </a>
            )}
          </div>
        </div>

        {/* Twitter */}
        <div className="flex space-x-2">
          <Twitter size={20} className="text-[#7C8493] mt-1" />
          <div className="flex flex-col w-full">
            <label className="font-epilogue text-base text-[#7C8493]">
              Twitter
            </label>
            {isEditing ? (
              <input
                type="text"
                value={links.twitter}
                onChange={(e) => handleChange("twitter", e.target.value)}
                className="border border-[#D6DDEB] px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
              />
            ) : (
              <a
                href={links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4640DE] hover:underline text-base"
              >
                {getDisplayUrl(links.twitter)}
              </a>
            )}
          </div>
        </div>

        {/* Website */}
        <div className="flex space-x-2">
          <Globe size={20} className="text-[#7C8493] mt-1" />
          <div className="flex flex-col w-full">
            <label className="font-epilogue text-base text-[#7C8493]">
              Website
            </label>
            {isEditing ? (
              <input
                type="text"
                value={links.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="border border-[#D6DDEB] px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
              />
            ) : (
              <a
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4640DE] hover:underline text-base"
              >
                {getDisplayUrl(links.website)}
              </a>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end mt-4">
          <button
            onClick={toggleEdit}
            className="bg-[#4640DE] text-white px-4 py-2 rounded-md hover:bg-[#3730a3] transition"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialLinks;
