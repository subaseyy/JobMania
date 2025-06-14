"use client";

import { useState } from "react";
import SettingsTabs from "./component/SettingsTabs";
import ProfileTab from "./component/ProfileTab";
import LoginDetailsTab from "./component/LoginDetailsTab";
import NotificationsTab from "./component/NotificationsTab";

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
