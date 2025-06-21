"use client";

import {
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  ExternalLink,
  Users,
  Briefcase,
} from "lucide-react";

// --- MOCK DATA (replace with your real data later) ---
const techStack = [
  { name: "React", icon: "/icons/react.png" },
  { name: "Node.js", icon: "/icons/node.png" },
  { name: "JS", icon: "/icons/js.png" },
  { name: "Tailwind", icon: "/icons/tailwind.png" },
  { name: "Figma", icon: "/icons/figma.png" },
];
const officeLocations = [
  { city: "Nepal", address: "Kathmandu", status: "Head Office" },
  { city: "France", address: "Paris", status: "Remote" },
];
const team = [
  {
    name: "Gideon Gardner",
    role: "CEO & Founder",
    avatar: "/avatar1.png",
  },
  {
    name: "Raymond Colbert",
    role: "HR Manager",
    avatar: "/avatar2.png",
  },
  {
    name: "Arlene Lyon",
    role: "Recruiter",
    avatar: "/avatar3.png",
  },
];
const benefits = [
  { icon: <Users className="w-5 h-5" />, label: "Professional Growth" },
  { icon: <Briefcase className="w-5 h-5" />, label: "Unlimited Vacation" },
  { icon: <ExternalLink className="w-5 h-5" />, label: "Remote Working" },
  { icon: <MapPin className="w-5 h-5" />, label: "International Environment" },
  // ...add more
];
const openPositions = [
  {
    title: "Social Media Assistant",
    location: "Nomad, Paris, France",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
  },
  {
    title: "Brand Designer",
    location: "Nomad, Paris, France",
    type: "Full-Time",
    tags: ["Business", "Design"],
  },
  {
    title: "Interactive Developer",
    location: "Terraform, Berlin, Germany",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
  },
  {
    title: "HR Manager",
    location: "Nomad, San Francisco",
    type: "Full-Time",
    tags: ["HR"],
  },
];
const gallery = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
];
// ----------------------------------------------------

export default function CompanyProfileContent() {
  return (
    <div className=" bg-white rounded-2xl p-6 md:p-10 my-6 shadow">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/company-logo.png"
            alt="Company Logo"
            className="h-16 w-16 rounded-xl border object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-[#202430]">Nomad</h1>
            <div className="text-gray-500 text-sm">
              Technology · Paris, France · 51-200 employees
            </div>
            <div className="flex gap-2 mt-2">
              <a
                href="#"
                className="text-xs px-3 py-1 rounded-full bg-[#eafaf3] text-green-600 font-medium"
              >
                Hiring
              </a>
              <a
                href="#"
                className="text-xs px-3 py-1 rounded-full bg-[#eceafe] text-[#4640DE] font-medium"
              >
                Verified
              </a>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg text-sm font-semibold text-[#4640DE] border border-[#eceafe] bg-[#eceafe]">
            Follow
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#4640DE]">
            View Jobs
          </button>
          <button className="px-2 py-2 rounded-full bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tabs and quick nav (optional) */}
      <div className="flex gap-4 mt-8 mb-4 border-b border-gray-100">
        <button className="px-2 py-3 text-[#4640DE] font-medium border-b-2 border-[#4640DE]">
          Overview
        </button>
        <button className="px-2 py-3 text-gray-500 hover:text-[#4640DE]">
          Jobs
        </button>
        <button className="px-2 py-3 text-gray-500 hover:text-[#4640DE]">
          People
        </button>
        <button className="px-2 py-3 text-gray-500 hover:text-[#4640DE]">
          Profile Settings
        </button>
      </div>

      {/* Main content */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {/* About + Contacts */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Profile/Description */}
          <div>
            <div className="font-semibold mb-2 text-lg">Company Profile</div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Nomad is a tech-driven startup aiming to solve remote teamwork and
              communication challenges for creative companies. Our diverse team,
              cutting-edge tech stack, and culture of innovation make Nomad the
              perfect place for passionate people who want to make an impact.
            </p>
          </div>
          {/* Contact */}
          <div>
            <div className="font-semibold mb-2">Contact</div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#4640DE]" />
                <span className="text-sm text-gray-600">info@nomad.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#4640DE]" />
                <span className="text-sm text-gray-600">+33 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#4640DE]" />
                <span className="text-sm text-gray-600">Paris, France</span>
              </div>
            </div>
          </div>
          {/* Working at Nomad Gallery */}
          <div>
            <div className="font-semibold mb-2">Working at Nomad</div>
            <div className="grid grid-cols-3 gap-2">
              {gallery.map((img, idx) => (
                <img
                  src={img}
                  key={idx}
                  alt="Nomad office"
                  className="rounded-lg h-24 object-cover w-full"
                />
              ))}
            </div>
          </div>
        </div>
        {/* Tech Stack + Locations */}
        <div className="flex flex-col gap-8">
          {/* Tech Stack */}
          <div>
            <div className="font-semibold mb-2">Tech Stack</div>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-10 h-10 rounded-lg object-contain bg-gray-50 border"
                  />
                  <span className="text-xs text-gray-500">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Locations */}
          <div>
            <div className="font-semibold mb-2">Office Locations</div>
            <div>
              {officeLocations.map((loc, idx) => (
                <div key={idx} className="mb-2 flex gap-2 items-center">
                  <MapPin className="w-4 h-4 text-[#4640DE]" />
                  <div className="text-sm text-gray-700">
                    {loc.city} —{" "}
                    <span className="text-xs text-gray-500">{loc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-lg">Team</div>
          <a href="#" className="text-[#4640DE] text-sm font-medium">
            View More
          </a>
        </div>
        <div className="flex gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center gap-1 p-4 rounded-xl bg-gray-50 w-32"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full mb-1 object-cover"
              />
              <div className="font-medium text-sm">{member.name}</div>
              <div className="text-xs text-gray-500 text-center">
                {member.role}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-lg">Benefits</div>
          <button className="text-gray-400 hover:text-[#4640DE]">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 py-5 px-3 bg-[#f8fafd] rounded-lg"
            >
              <div className="bg-white rounded-full p-2 shadow">{b.icon}</div>
              <div className="text-xs text-gray-700 text-center">{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-lg">Open Positions</div>
          <a href="#" className="text-[#4640DE] text-sm font-medium">
            View all
          </a>
        </div>
        <div className="flex flex-col gap-3">
          {openPositions.map((job, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-[#f8fafd] rounded-xl hover:bg-[#eceafe] transition"
            >
              <div>
                <div className="font-medium text-gray-900">{job.title}</div>
                <div className="text-xs text-gray-500">
                  {job.location} · {job.type}
                </div>
                <div className="flex gap-2 mt-1">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white text-[11px] rounded-full border text-gray-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a href="#" className="text-[#4640DE] text-xs font-medium">
                Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
