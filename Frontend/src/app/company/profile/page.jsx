"use client";
import React, { useEffect, useState, useCallback } from "react";
import ProfileHeader from "./component/ProfileHeader";
import AboutSection from "./component/AboutSection";
import ExperienceSection from "./component/ExperienceSection";
import EducationSection from "./component/EducationSection";
import SkillsSection from "./component/SkillsSection";
import PortfolioSection from "./component/PortfolioSection";
import ContactInfo from "./component/ContactInfo";
import SocialLinks from "./component/SocialLinks";
import { getProfile, updateProfile } from "@/lib/api/Auth";

const ProfilePage = () => {
  // Store full profile and user objects
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch profile on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const { data } = await getProfile();
        setUser(data.user || {});
        setProfile(data.profile || {});
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Update profile in backend and locally
  const handleProfileUpdate = useCallback(async (updateObj) => {
    try {
      setLoading(true);
      const updated = await updateProfile(updateObj);
      // updateProfile API should return updated profile (and maybe user)
      setProfile((prev) => ({ ...prev, ...updated.data.profile }));
      if (updated.data.user) setUser(updated.data.user);
    } catch (err) {
      setError("Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="p-8 text-lg">Loading profile...</div>;
  if (error)
    return (
      <div className="p-8 text-red-600 text-lg bg-red-50 rounded">{error}</div>
    );

  // Provide user and profile (and update handler) to all sections
  return (
    <div className="min-h-screen bg-white">
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileHeader
              user={user}
              profile={profile}
              onUpdate={handleProfileUpdate}
            />
            <AboutSection about={profile.about || ""} onUpdate={handleProfileUpdate} />
            <ExperienceSection
              experiences={profile?.experiences || []}
              onUpdate={handleProfileUpdate}
            />
            <EducationSection
              educations={profile?.educations || []}
              onUpdate={handleProfileUpdate}
            />
            <SkillsSection
              skills={profile?.skills || []}
              onUpdate={handleProfileUpdate}
            />
            <PortfolioSection
              portfolios={profile?.portfolios || []}
              onUpdate={handleProfileUpdate}
            />
          </div>
          <div className="space-y-6">
            <ContactInfo
              additional_details={profile?.additional_details || {}}
              onUpdate={handleProfileUpdate}
            />
            <SocialLinks
              social_links={profile?.social_links || {}}
              onUpdate={handleProfileUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
