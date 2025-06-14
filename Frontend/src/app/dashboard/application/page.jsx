"use client";
import { useState, useEffect } from "react";
import {
  FileText,
  X,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  ListFilter,
} from "lucide-react";
import { fetchApplications } from "@/app/dashboard/utils/constants";
import { subDays } from "date-fns";
import DateFilter from "../dashboard-overview/component/DateFilter";

const PAGE_SIZE = 6;

export default function Application() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(new Date(), 6),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      const data = fetchApplications();
      setApplications(data);
    }
    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filters or tab changes
  }, [searchQuery, statusFilter, activeTab]);

  const filterApplications = () => {
    return applications.filter((app) => {
      const matchesTab = activeTab === "All" || app.status === activeTab;
      const matchesSearch =
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatusFilter =
        statusFilter === "All" || app.status === statusFilter;
      return matchesTab && matchesSearch && matchesStatusFilter;
    });
  };

  const filteredApps = filterApplications();
  const totalPages = Math.ceil(filteredApps.length / PAGE_SIZE);
  const currentData = filteredApps.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const statusList = [...new Set(applications.map((a) => a.status))];
  const tabs = [
    { label: "All", count: applications.length },
    ...statusList.map((status) => ({
      label: status,
      count: applications.filter((a) => a.status === status).length,
    })),
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "In Review":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "Shortlisted":
        return "bg-cyan-50 text-cyan-600 border border-cyan-200";
      case "Offered":
        return "bg-indigo-50 text-indigo-600 border border-indigo-200";
      case "Interviewing":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "Unsuitable":
      case "Declined":
        return "bg-red-50 text-red-500 border border-red-200";
      case "Accepted":
        return "bg-green-50 text-green-600 border border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto container mx-auto py-6">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h2 className="font-clash font-[600] text-2xl text-[#25324B] mb-1">
              Keep it up, Jake
            </h2>
            <p className="font-epilogue font-[500] text-base text-[#7C8493]">
              Here is your job application status summary.
            </p>
          </div>
          <DateFilter
            dateRange={dateRange}
            setDateRange={setDateRange}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
          />
        </div>

        {/* Feature Alert */}
        <div className="bg-[#F6F6FD] rounded-lg p-3 sm:p-4 mb-6 relative flex items-start sm:items-center">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
            <FileText size={16} className="text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-epilogue font-[600] text-lg text-[#4640DE] mb-1">
              New Feature
            </h3>
            <p className="font-epilogue font-[400] text-sm sm:text-base text-[#7C8493]">
              You can request a follow-up 7 days after applying for a job if the
              application status is in review. Only one follow-up is allowed per
              job.
            </p>
          </div>
          <button className="absolute right-2 top-2 sm:right-4 sm:top-4 text-[#25324B] hover:text-gray-600">
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Tabs */}
        <div
          className="border-b mb-6 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex items-center min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                className={`px-3 py-1 sm:px-4 sm:py-2 font-epilogue font-[600] text-base relative ${
                  activeTab === tab.label
                    ? "text-[#25324B] border-b-2 border-indigo-600"
                    : "text-[#7C8493] hover:text-gray-800"
                }`}
                onClick={() => setActiveTab(tab.label)}
              >
                {tab.label}{" "}
                <span
                  className={`${
                    activeTab === tab.label
                      ? "text-[#4640DE]"
                      : "text-[#7C8493]"
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Header and Filters */}
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <div>
            <p className="font-epilogue font-[600] text-xl leading-[120%] text-[#25324B] sm:ml-6">
              Applications History
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="w-full sm:w-48 flex items-center border rounded px-3 py-2">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#25324B] mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none w-full font-epilogue font-[500] text-sm sm:text-base leading-[160%] text-[#25324B]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full sm:w-40 flex items-center border rounded px-3 py-2">
              <ListFilter className="w-5 h-5 sm:w-6 sm:h-6 text-[#25324B] mr-2" />
              <select
                className="outline-none font-epilogue font-[500] text-sm sm:text-base leading-[160%] text-[#25324B] bg-transparent w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">Filter</option>
                {statusList.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-4 sm:px-6 py-3 bg-gray-50 border-b text-sm font-medium text-gray-600">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Company</div>
              <div className="col-span-3">Role</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1"></div>
            </div>

            {currentData.length > 0 ? (
              currentData.map((app, index) => (
                <div
                  key={app.id}
                  className="grid grid-cols-12 px-4 sm:px-6 py-3 sm:py-4 border-b items-center text-sm"
                >
                  <div className="col-span-1 text-gray-600">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </div>
                  <div className="col-span-3 flex items-center">
                    <div
                      className={`h-6 w-6 sm:h-8 sm:w-8 rounded-lg ${app.logoColor} text-white flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0`}
                    >
                      {app.company.charAt(0)}
                    </div>
                    <span className="font-medium truncate">{app.company}</span>
                  </div>
                  <div className="col-span-3 text-gray-800 truncate">
                    {app.role}
                  </div>
                  <div className="col-span-2 text-gray-600">{app.date}</div>
                  <div className="col-span-2">
                    <span
                      className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs ${getStatusBadgeColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No applications found
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex justify-center mt-4 sm:mt-6">
            <div className="flex items-center space-x-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1 sm:p-2 border rounded text-gray-600 hover:bg-gray-50"
              >
                <ChevronLeft size={14} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="p-1 sm:p-2 border rounded text-gray-600 hover:bg-gray-50"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
