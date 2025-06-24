"use client";
import React, { useEffect, useState } from "react";
import { Mail, Smartphone, Languages, SquarePen } from "lucide-react";
import { getProfile, updateProfile } from "@/lib/api/Auth";

const ContactInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    languages: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile();
        const { profile } = res.data;

        const details = profile.additional_details || {};
        setContact({
          email: details.email || "",
          phone: details.phone || "",
          languages: details.languages || "",
        });
      } catch (err) {
        console.error("Failed to fetch additional details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleSave = async () => {
    try {
      await updateProfile({
        additional_details: {
          email: contact.email,
          phone: contact.phone,
          languages: contact.languages,
        },
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update contact info:", err);
      alert("Failed to update. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading contact info...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-epilogue font-[600] text-xl lead-[120%] text-[#25324B]">
          Additional Details
        </h3>
        {!isEditing && (
          <button
            onClick={toggleEdit}
            className="p-2.5 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE] transition"
          >
            <SquarePen size={16} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Email */}
        <div className="flex space-x-2">
          <Mail size={20} className="text-[#7C8493] mt-1" />
          <div className="flex flex-col w-full">
            <label className="text-base text-[#7C8493] font-epilogue">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={contact.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border border-[#D6DDEB] px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
              />
            ) : (
              <span className="text-[#25324B] font-epilogue text-base">{contact.email}</span>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex space-x-2">
          <Smartphone size={20} className="text-[#7C8493] mt-1" />
          <div className="flex flex-col w-full">
            <label className="text-base text-[#7C8493] font-epilogue">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={contact.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="border border-[#D6DDEB] px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
              />
            ) : (
              <span className="text-[#25324B] font-epilogue text-base">{contact.phone}</span>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="flex space-x-2">
          <Languages size={20} className="text-[#7C8493] mt-1" />
          <div className="flex flex-col w-full">
            <label className="text-base text-[#7C8493] font-epilogue">Languages</label>
            {isEditing ? (
              <input
                type="text"
                value={contact.languages}
                onChange={(e) => handleChange("languages", e.target.value)}
                className="border border-[#D6DDEB] px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
              />
            ) : (
              <span className="text-[#25324B] font-epilogue text-base">{contact.languages}</span>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleSave}
            className="bg-[#4640DE] text-white px-4 py-2 rounded-md hover:bg-[#3730a3] transition"
          >
            Save
          </button>
          <button
            onClick={toggleEdit}
            className="border border-[#CCCCF5] text-[#4640DE] px-4 py-2 rounded-md hover:bg-[#f0f0ff] transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
