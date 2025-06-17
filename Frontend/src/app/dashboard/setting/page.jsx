"use client";

import { useState } from "react";
import SettingsTabs from "./components/SettingsTabs";
import ProfileTab from "./components/ProfileTab";
import LoginDetailsTab from "./components/LoginDetailsTab";
import NotificationsTab from "./components/NotificationsTab";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("My Profile");

  return (
    <div className="container mx-auto">
      <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "My Profile" && <ProfileTab />}
      {activeTab === "Login Details" && <LoginDetailsTab />}
      {activeTab === "Notifications" && <NotificationsTab />}
    </div>
  );
}
