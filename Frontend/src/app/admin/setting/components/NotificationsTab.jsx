// components/NotificationPreferences.js
import { useState } from "react";

export default function NotificationsTab() {
  const [preferences, setPreferences] = useState({
    applications: true,
    jobs: false,
    recommendations: false,
  });

  const handleChange = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleUpdate = () => {
    console.log("Notification Preferences:", preferences);
  };

  return (
    <div className="p-6 rounded-md">
      <div className="mb-6 border-b pb-6">
        <h2 className="font-epilogue font-[600] text-lg leading-[160%] text-[#202430] mb-1">
          Basic Information
        </h2>
        <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F]">
          This is your personal information that you can update anytime.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-10">
        <div className="sm:w-1/3 pb-6 sm:pb-0">
          <p className="font-epilogue font-[600] text-base leading-[160%] text-[#25324B] mb-1">
            Notifications
          </p>
          <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] sm:max-w-[250px]">
            Customize your preferred notification settings
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              key: "applications",
              label: "Applications",
              desc: "These are notifications for jobs that you have applied to",
            },
            {
              key: "jobs",
              label: "Jobs",
              desc: "These are notifications for jobs that you have applied to",
            },
            {
              key: "recommendations",
              label: "Recommendations",
              desc: "These are notifications for jobs that you have applied to",
            },
          ].map(({ key, label, desc }) => (
            <label
              key={key}
              className="flex items-start space-x-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={preferences[key]}
                onChange={() => handleChange(key)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <p className="font-epilogue font-[500] text-base leading-[160%] text-[#25324B]">
                  {label}
                </p>
                <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] max-w-[330px]">
                  {desc}
                </p>
              </div>
            </label>
          ))}

          <div className="pt-2">
            <button
              onClick={handleUpdate}
              className="bg-[#4640DE] text-white font-epilogue font-medium text-base px-6 py-3 hover:scale-[1.03] transition-all duration-300 ease-in-out"
            >
              Update Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
