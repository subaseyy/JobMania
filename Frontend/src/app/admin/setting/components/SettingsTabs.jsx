export default function SettingsTabs({ activeTab, setActiveTab }) {
  const tabs = ["My Profile", "Login Details", "Notifications"];

  return (
    <div className="border-b px-6 pt-6">
      <nav className="flex space-x-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-epilogue font-[600] text-base leading-[160%] ${
              activeTab === tab
                ? "text-[#25324B] border-b-2 border-[#2E60F3]"
                : "text-[#7C8493] hover:text-[#25324B]"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}