"use client";
import { useEffect, useState, useRef } from "react";
import { getProfile, updateProfile } from "@/lib/api/Auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

export default function ProfileForm() {
  const [profile, setProfile] = useState({
    full_name: "",
    contact_number: "",
    resume_url: "",
    profile_picture: "",
    skills: [],
    experience: "",
    education: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
  async function fetchProfile() {
    try {
      const response = await getProfile();
      const { user, profile } = response.data; // ✅ correctly extract

      setProfile(profile || {}); // safely set profile data
      setSkillsInput(profile?.skills?.join(", ") || "");
      setPreviewImage(`${process.env.NEXT_PUBLIC_BASE_URL}${profile?.profile_picture}`|| "");

      setError("");
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(
        err.message || "Failed to load profile. You may need to create one."
      );
    } finally {
      setLoading(false);
    }
  }
  fetchProfile();
}, []);

  const startEditing = () => {
    setSkillsInput(profile.skills?.join(", ") || "");
    setIsEditing(true);
    setSuccess("");
    setError("");
  };

  const cancelEditing = () => {
    setSkillsInput(profile.skills?.join(", ") || "");
    setPreviewImage( `${process.env.NEXT_PUBLIC_BASE_URL}${profile?.profile_picture}` || "");
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        setError("Please select an image file (JPEG, PNG, etc.)");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      setProfile((prev) => ({
        ...prev,
        profile_picture: file,
      }));
      setError("");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const hasNewImage = profile.profile_picture instanceof File;

      if (hasNewImage) {
        const formData = new FormData();
        formData.append("full_name", profile.full_name);
        formData.append("contact_number", profile.contact_number);
        formData.append("resume_url", profile.resume_url);
        formData.append("experience", profile.experience);
        formData.append("education", profile.education);

        skillsInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((skill) => formData.append("skills[]", skill));

        formData.append("profile_picture", profile.profile_picture);

        // Log FormData contents
        console.log("Submitting FormData:");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        await updateProfile(formData);
      } else {
        const profileData = {
          full_name: profile.full_name,
          contact_number: profile.contact_number,
          resume_url: profile.resume_url,
          experience: profile.experience,
          education: profile.education,
          skills: skillsInput
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        };

        // Log JSON data
        console.log("Submitting JSON profile data:", profileData);

        await updateProfile(profileData);
      }

      // Refresh profile data after update
      const updatedData = await getProfile();
    const { profile: updatedProfile } = updatedData.data;

    setProfile(updatedProfile);
    setSkillsInput(updatedProfile.skills?.join(", ") || "");
    setPreviewImage(updatedProfile.profile_picture || "");

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
      console.error("Profile update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="container bg-white shadow-lg rounded-xl overflow-hidden mt-6">
      <div className="md:flex">
        <div className="md:w-1/3 bg-gray-50 p-6 flex flex-col items-center">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
              {previewImage ? (
                <img
                  src={`${previewImage}`}
         alt="Profile"
            width={160}
        height={160}
              className="object-cover w-full h-full rounded-full"
/>


              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
            {isEditing && (
              <>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Change profile photo"
                  disabled={isSubmitting}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting && profile.profile_picture instanceof File
                    ? "Uploading..."
                    : "Change Photo"}
                </button>
              </>
            )}
          </div>
          <div className="mt-6 w-full">
            <h3 className="font-medium text-gray-700 mb-2">Quick Stats</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Skills</p>
                <p className="text-sm font-medium">
                  {profile.skills?.length || 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Experience</p>
                <p className="text-sm font-medium">
                  {profile.experience ? "Added" : "Not added"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-2/3 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {profile.full_name ? "Your Profile" : "Create Profile"}
          </h2>

          {error && (
            <div className="p-3 mb-4 bg-red-50 text-red-600 rounded-md flex items-start">
              <svg
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="p-3 mb-4 bg-green-50 text-green-600 rounded-md flex items-start">
              <svg
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{success}</span>
            </div>
          )}

          {!isEditing ? (
            // Read-only profile display with Edit button
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <p className="p-2.5 border border-gray-300 rounded-md bg-gray-50">
                  {profile.full_name || "-"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <p className="p-2.5 border border-gray-300 rounded-md bg-gray-50">
                  {profile.contact_number || "-"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume URL
                </label>
                {profile.resume_url ? (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profile.resume_url}
                  </a>
                ) : (
                  <p className="p-2.5 border border-gray-300 rounded-md bg-gray-50">
                    -
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.length ? (
                    profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="p-2.5 border border-gray-300 rounded-md bg-gray-50">
                      -
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <p className="p-2.5 border border-gray-300 rounded-md bg-gray-50 whitespace-pre-wrap">
                  {profile.experience || "-"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <p className="p-2.5 border border-gray-300 rounded-md bg-gray-50 whitespace-pre-wrap">
                  {profile.education || "-"}
                </p>
              </div>

              <button
                onClick={startEditing}
                className="mt-6 bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            // Edit form
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={profile.full_name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contact_number"
                    value={profile.contact_number}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter your contact number"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume URL
                </label>
                <input
                  type="url"
                  name="resume_url"
                  value={profile.resume_url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Paste your resume link here"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="e.g. React, Node.js, CSS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <textarea
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your work experience"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <textarea
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Your education details"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={cancelEditing}
                  disabled={isSubmitting}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
