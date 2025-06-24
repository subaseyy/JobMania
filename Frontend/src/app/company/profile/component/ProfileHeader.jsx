"use client";
import React, { useState, useRef, useEffect } from "react";
import { MapPin, Flag, SquarePen } from "lucide-react";
import { getProfile, updateProfile } from "@/lib/api/Auth";
import Cookies from "js-cookie";

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState(null);
  const [bgImage, setBgImage] = useState("/profile/bg.png");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile();
        const { profile: p, user } = res.data;

        const formattedProfile = {
          name: p.full_name || user.name || "",
          title: p.title || "",
          company: p.company || "",
          location: p.location || "",
          profile_picture: p.profile_picture || "",
          bg_image: p.bg_image || "",
        };

        setProfile(formattedProfile);
        setTempProfile(formattedProfile);
        setBgImage(
          formattedProfile.bg_image
            ? `${process.env.NEXT_PUBLIC_BASE_URL}${formattedProfile.bg_image}`
            : "/profile/bg.png"
        );
      } catch (err) {
        console.error("Failed to load profile header", err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const updatePayload = {
        full_name: tempProfile.name,
        title: tempProfile.title,
        company: tempProfile.company,
        location: tempProfile.location,
        // Don't need to pass bg_image here if it's already updated separately
      };

      const updated = await updateProfile(updatePayload);
      const { profile: updatedProfile, user } = updated.data;

      const formatted = {
        name: updatedProfile.full_name || user.name || "",
        title: updatedProfile.title || "",
        company: updatedProfile.company || "",
        location: updatedProfile.location || "",
        profile_picture: updatedProfile.profile_picture || "",
        bg_image: updatedProfile.bg_image || "",
      };

      setProfile(formatted);
      setTempProfile(formatted);
      setBgImage(
        formatted.bg_image
          ? `${process.env.NEXT_PUBLIC_BASE_URL}${formatted.bg_image}`
          : "/profile/bg.png"
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to save changes.");
    }
  };

  const handleBgChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBgImage(reader.result); // for preview
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("bg_image", file);

    try {
      const updated = await updateProfile(formData);
      const { bg_image } = updated.data.profile;

      setBgImage(
        bg_image
          ? `${process.env.NEXT_PUBLIC_BASE_URL}${bg_image}`
          : "/profile/bg.png"
      );
    } catch (err) {
      console.error("Failed to update background image", err);
      alert("Failed to update background image.");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!profile) {
    return <div className="p-6">Loading profile header...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-[#D6DDEB]">
      {/* Background Image Section */}
      <div
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute top-5 right-5 flex space-x-2">
          <input
            type="file"
            accept="image/*"
            id="bgUpload"
            className="hidden"
            onChange={handleBgChange}
            ref={fileInputRef}
          />
          <button
            onClick={triggerFileInput}
            className="p-2 border border-[#A8ADB7]/50 hover:bg-white text-[#F8F8FD] hover:text-black"
            title="Change Background Image"
          >
            <SquarePen size={24} />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 mt-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-4">
          {/* Profile Picture */}
          <div className="md:absolute -top-20 left-6">
            <img
              src={
                profile.profile_picture
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}${profile.profile_picture}`
                  : "/default-avatar.png"
              }
              alt="Profile"
              className="w-36 h-36 rounded-full border-[8px] border-white object-cover"
            />
          </div>

          {/* Editable Fields */}
          <div className="flex flex-col justify-between flex-1">
            <div className="grid md:grid-cols-[20%_40%_40%] gap-4">
              <div className="hidden md:block"></div>
              <div className="mb-4">
                {isEditing ? (
                  <>
                    <input
                      name="name"
                      value={tempProfile.name}
                      onChange={handleInputChange}
                      className="font-clash font-[600] text-xl text-[#25324B] mb-2 border p-2 w-full"
                    />
                    <input
                      name="title"
                      value={tempProfile.title}
                      onChange={handleInputChange}
                      className="font-epilogue font-[400] text-lg text-[#7C8493] mb-2 border p-2 w-full"
                      placeholder="Job Title"
                    />
                    <input
                      name="company"
                      value={tempProfile.company}
                      onChange={handleInputChange}
                      className="font-epilogue font-[400] text-lg text-[#7C8493] mb-2 border p-2 w-full"
                      placeholder="Company"
                    />
                    <input
                      name="location"
                      value={tempProfile.location}
                      onChange={handleInputChange}
                      className="font-epilogue font-[400] text-lg text-[#7C8493] mb-3 border p-2 w-full"
                      placeholder="Location"
                    />
                  </>
                ) : (
                  <>
                    <h1 className="font-clash font-[600] text-2xl text-[#25324B] mb-1">
                      {profile.name}
                    </h1>
                    <p className="font-epilogue font-[400] text-lg text-[#7C8493] mb-2">
                      {profile.title} at{" "}
                      <span className="font-[500] text-[#25324B]">
                        {profile.company}
                      </span>
                    </p>
                    <p className="font-epilogue font-[400] text-lg text-[#7C8493] mb-3 flex gap-2 items-center">
                      <MapPin strokeWidth={2} />
                      <span>{profile.location}</span>
                    </p>
                  </>
                )}

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center font-epilogue font-[600] text-sm md:text-base text-[#56CDAD] bg-[#56CDAD1A] px-6 py-3">
                    <Flag size={16} className="mr-2" />
                    OPEN FOR OPPORTUNITIES
                  </div>
                </div>
              </div>

              {/* Edit/Save Buttons */}
              <div className="flex items-start justify-start md:justify-end mr-6 space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveChanges}
                      className="px-6 py-3 font-epilogue font-[700] text-base text-white bg-[#4640DE] hover:bg-[#3730c4] transition-all rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setTempProfile(profile);
                      }}
                      className="px-6 py-3 font-epilogue font-[700] text-base text-[#4640DE] border border-[#CCCCF5] hover:bg-[#f0f0ff] rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 font-epilogue font-[700] text-base text-[#4640DE] border border-[#CCCCF5] hover:scale-[1.03] transition-all duration-300 ease-in-out"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
