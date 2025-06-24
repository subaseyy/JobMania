"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Building2,
  Users,
  ArrowRight,
  Plus,
  Activity,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import StatCard from "./component/StatCard";
import DashboardCard from "./component/DashboardCard";
import EmptyState from "./component/EmptyState";
import ListItem from "./component/ListItem";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5050/api";

export default function AdminDashboard() {
  const router = useRouter();

  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchDashboardData() {
      const token = Cookies.get("token");

      try {
        const [userRes, jobRes] = await Promise.all([
          fetch(`${API_URL}/users/admin/profiles`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/jobs/admin/jobs`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/users/admin/profiles`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          
        ]);

        const userData = await userRes.json();
        const jobData = await jobRes.json();


        const filteredCompanies = (userData.data || []).filter(
          (u) => u.user?.role === "company"
        );
        const filteredUser = (userData.data || []).filter(
          (u) => u.user?.role === "jobseeker"
        );


        setCompanies(filteredCompanies);
        setJobs(jobData.data || []);
        setUsers(filteredUser);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    }

    fetchDashboardData();
  }, []);

  const getAnalytics = () => {
    const totalUsers = users.length;
    const totalCompanies = companies.length;
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((j) => j.isActive).length;

    return {
      totalUsers,
      totalCompanies,
      totalJobs,
      activeJobs,
    };
  };

  const analytics = getAnalytics();
  const recentCompanies = companies.slice(0, 3);
  const recentJobs = jobs.slice(0, 3);
  const recentUsers = users.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <LayoutDashboard className="mr-2 h-6 w-6 text-[#4640DE]" />
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, Subas! 👋 Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/allcompany/add")}
            className="flex items-center gap-2 px-4 py-2 bg-[#4640DE] hover:bg-[#3a35c7] text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Company
          </button>
          <button
            onClick={() => router.push("/admin/alljobs/add")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#4640DE] text-[#4640DE] hover:bg-[#f0f0ff] rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Building2 className="h-6 w-6 text-[#4640DE]" />}
          title="Total Companies"
          value={analytics.totalCompanies}
          change={0}
          onClick={() => router.push("/admin/allcompany")}
        />
        <StatCard
          icon={<Briefcase className="h-6 w-6 text-[#00C853]" />}
          title="Total Jobs"
          value={analytics.totalJobs}
          change={0}
          onClick={() => router.push("/admin/alljobs")}
        />
        <StatCard
          icon={<Users className="h-6 w-6 text-[#FF6D00]" />}
          title="Total Users"
          value={analytics.totalUsers}
          change={0}
          onClick={() => router.push("/admin/allusers")}
        />
        <StatCard
          icon={<Activity className="h-6 w-6 text-[#6200EA]" />}
          title="Active Listings"
          value={analytics.activeJobs}
          change={0}
          onClick={() => router.push("/admin/alljobs?status=active")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Recent Companies"
          viewAll={() => router.push("/admin/allcompany")}
        >
          <div className="space-y-4">
            {recentCompanies.map((company) => (
              <ListItem
                key={company._id}
                title={company.user?.full_name}
                subtitle={company.user?.email}
                meta={company.user?.role}
                onClick={() => router.push(`/admin/allcompany/${company._id}`)}
              />
            ))}
            {recentCompanies.length === 0 && (
              <EmptyState message="No companies yet" />
            )}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Recent Jobs"
          viewAll={() => router.push("/admin/alljobs")}
        >
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <ListItem
                key={job._id}
                title={job.title}
                subtitle={job.company}
                meta={`${job.type} • ${job.location}`}
                status={job.isActive ? "Active" : "Inactive"}
                onClick={() => router.push(`/admin/alljobs/${job._id}`)}
              />
            ))}
            {recentJobs.length === 0 && (
              <EmptyState message="No jobs posted yet" />
            )}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Recent Users"
          viewAll={() => router.push("/admin/allusers")}
        >
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <ListItem
                key={user._id}
                title={user.full_name || user.name}
                subtitle={user.role}
                meta={user.email}
                onClick={() => router.push(`/admin/allusers/${user._id}`)}
              />
            ))}
            {recentUsers.length === 0 && (
              <EmptyState message="No users registered yet" />
            )}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard
        title="Recent Activity"
        viewAll={() => router.push("/admin/activity")}
        className="mb-8"
      >
        <div className="space-y-4">
          {[...jobs.slice(0, 3)].map((job) => (
            <div
              key={job._id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-[#4640DE]"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Job updated: <span className="text-[#4640DE]">{job.title}</span>
                </p>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}
