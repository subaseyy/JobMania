import React from "react";
import ProfileHeader from "./component/ProfileHeader";
import AboutSection from "./component/AboutSection";
import ExperienceSection from "./component/ExperienceSection";
import EducationSection from "./component/EducationSection";
import SkillsSection from "./component/SkillsSection";
import PortfolioSection from "./component/PortfolioSection";
import ContactInfo from "./component/ContactInfo";
import SocialLinks from "./component/SocialLinks";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileHeader />
            <AboutSection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <PortfolioSection />
          </div>

          <div className="space-y-6">
            <ContactInfo />
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
