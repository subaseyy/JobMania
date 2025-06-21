// util/constant.js

// Company Data
export const DUMMY_COMPANIES = [
  { id: 1, name: "NestNepal", industry: "IT", email: "info@nestnepal.com" },
  { id: 2, name: "TechCorp", industry: "Software", email: "hr@techcorp.com" },
  {
    id: 3,
    name: "DesignHub",
    industry: "Creative",
    email: "contact@designhub.com",
  },
];

// Job Data
export const DUMMY_JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "NestNepal",
    location: "Kathmandu",
    type: "Full-time",
    status: "Active",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Part-time",
    status: "Active",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Pokhara",
    type: "Contract",
    status: "Inactive",
  },
];

// User Data
export const DUMMY_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "user",
    status: "pending",
  },
];

// Analytics Data
export const ANALYTICS = {
  companiesGrowth: 15,
  jobsGrowth: 28,
  usersGrowth: 42,
  recentActivity: [
    {
      id: 1,
      action: "New company added",
      entity: "NestNepal",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Job listing updated",
      entity: "Frontend Developer",
      time: "5 hours ago",
    },
    {
      id: 3,
      action: "User registered",
      entity: "alex@example.com",
      time: "1 day ago",
    },
  ],
};
