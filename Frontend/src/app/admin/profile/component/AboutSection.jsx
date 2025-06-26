"use client";
import React, { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";
import { getProfile, updateProfile } from "@/lib/api/Auth";

const AboutSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState("");
  const [tempAboutText, setTempAboutText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile();
        const { profile } = res.data;
        const about = profile.about || "";
        setAboutText(about);
        setTempAboutText(about);
      } catch (err) {
        console.error("Failed to fetch about section", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await updateProfile({ about: tempAboutText });
      setAboutText(tempAboutText);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update about section", error);
      alert("Update failed. Please try again.");
    }
  };

  const handleCancel = () => {
    setTempAboutText(aboutText);
    setIsEditing(false);
  };

  const handleTextChange = (e) => {
    setTempAboutText(e.target.value);
  };

  if (loading) {
    return <div className="p-6">Loading About section...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-epilogue font-[600] text-xl lead-[120%] text-[#25324B]">
          About Me
        </h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2.5 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE] transition-colors duration-200"
          >
            <SquarePen size={16} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-epilogue font-[600] text-white bg-[#4640DE] hover:bg-[#3730c4] rounded transition-colors duration-200"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-epilogue font-[600] text-[#4640DE] border border-[#CCCCF5] hover:bg-[#f0f0ff] rounded transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={tempAboutText}
          onChange={handleTextChange}
          className="w-full font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] border border-[#D6DDEB] p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#4640DE] min-h-[200px]"
        />
      ) : (
        <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] whitespace-pre-line">
          {aboutText || "No About section added yet."}
        </p>
      )}
    </div>
  );
};

export default AboutSection;
