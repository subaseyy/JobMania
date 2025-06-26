"use client";
import React, { useEffect, useState } from "react";
import { Instagram, Twitter, Globe, SquarePen } from "lucide-react";
import { getProfile, updateProfile } from "@/lib/api/Auth";

const SocialLinks = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [links, setLinks] = useState({
    instagram: "",
    twitter: "",
    website: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await getProfile();
        const { profile } = res.data;
        const social = profile.social_links || {};
        setLinks({
          instagram: social.instagram || "",
          twitter: social.twitter || "",
          website: social.website || "",
        });
      } catch (err) {
        console.error("Failed to fetch social links", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleChange = (platform, value) => {
    setLinks((prev) => ({ ...prev, [platform]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile({ social_links: links });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update social links", err);
      alert("Update failed. Please try again.");
    }
  };

  const getDisplayUrl = (url) => url.replace(/^https?:\/\//, "");

  if (loading) {
    return <div className="p-6">Loading social links...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-epilogue font-[600] text-xl lead-[120%] text-[#25324B]">
          Social Links
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2.5 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE] transition"
          >
            <SquarePen size={16} />
          </button>
        )}
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
              links.instagram && (
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4640DE] hover:underline text-base"
                >
                  {getDisplayUrl(links.instagram)}
                </a>
              )
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
              links.twitter && (
                <a
                  href={links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4640DE] hover:underline text-base"
                >
                  {getDisplayUrl(links.twitter)}
                </a>
              )
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
              links.website && (
                <a
                  href={links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4640DE] hover:underline text-base"
                >
                  {getDisplayUrl(links.website)}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
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
