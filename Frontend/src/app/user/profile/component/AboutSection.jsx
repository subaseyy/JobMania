"use client";
import React, { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";

/**
 * @param {object} props
 * @param {string} props.about - The user's about text
 * @param {function} props.onUpdate - Callback to update the about text (receives { about })
 */
const AboutSection = ({ about = "", onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(about);
  const [tempAboutText, setTempAboutText] = useState(about);

  // Sync with parent updates
  useEffect(() => {
    setAboutText(about);
    setTempAboutText(about);
  }, [about]);

  const handleSave = async () => {
    try {
      await onUpdate({ about: tempAboutText });
      setAboutText(tempAboutText); // local sync
      setIsEditing(false);
    } catch (error) {
      alert("Update failed. Please try again.");
    }
  };

  const handleCancel = () => {
    setTempAboutText(aboutText);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-epilogue font-[600] text-xl lead-[120%] text-[#25324B]">
          About Me
        </h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2.5 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE] transition"
          >
            <SquarePen size={16} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm text-white bg-[#4640DE] hover:bg-[#3730c4] rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm text-[#4640DE] border border-[#CCCCF5] hover:bg-[#f0f0ff] rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={tempAboutText}
          onChange={(e) => setTempAboutText(e.target.value)}
          className="w-full text-base text-[#515B6F] border border-[#D6DDEB] p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#4640DE] min-h-[200px]"
        />
      ) : (
        <p className="text-base text-[#515B6F] whitespace-pre-line">
          {about || "No About section added yet."}
        </p>
      )}
    </div>
  );
};

export default AboutSection;
