"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

const EMPLOYMENT_TYPES = [
  { label: "Full-Time", value: "full-time" },
  { label: "Part-Time", value: "part-time" },
  { label: "Remote", value: "remote" },
  { label: "Internship", value: "internship" },
  { label: "Contract", value: "contract" },
];

const CATEGORY_OPTIONS = [
  "Design",
  "Engineering",
  "HR",
  "Marketing",
  "Sales",
  "Finance",
  "Product",
  "Operations",
  "Customer Support",
];

const SKILL_SUGGESTIONS = [
  "Graphic Design",
  "Communication",
  "Illustrator",
  "ReactJS",
  "NodeJS",
  "Python",
  "JavaScript",
  "TypeScript",
  "UI/UX Design",
  "Project Management",
  "Data Analysis",
  "Machine Learning",
  "SQL",
  "Adobe Creative Suite",
  "Figma",
  "Leadership",
  "Problem Solving",
];

const BENEFIT_ICONS = {
  "Full Healthcare": (
    <svg width={32} height={32} fill="none" viewBox="0 0 32 32">
      <path stroke="#4640DE" strokeWidth="2" d="M16 5v22M5 16h22" />
    </svg>
  ),
  "Unlimited Vacation": (
    <svg width={32} height={32} fill="none" viewBox="0 0 32 32">
      <rect
        x={6}
        y={6}
        width={20}
        height={20}
        rx={5}
        stroke="#4640DE"
        strokeWidth="2"
      />
    </svg>
  ),
  "Skill Development": (
    <svg width={32} height={32} fill="none" viewBox="0 0 32 32">
      <circle cx={16} cy={16} r={10} stroke="#4640DE" strokeWidth="2" />
    </svg>
  ),
};

const DEFAULT_BENEFITS = [
  {
    icon: BENEFIT_ICONS["Full Healthcare"],
    title: "Full Healthcare",
    desc: "We believe in thriving communities and that starts with our team being happy and healthy.",
  },
  {
    icon: BENEFIT_ICONS["Unlimited Vacation"],
    title: "Unlimited Vacation",
    desc: "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
  },
  {
    icon: BENEFIT_ICONS["Skill Development"],
    title: "Skill Development",
    desc: "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
  },
];

function formatSalary(val) {
  if (!val) return "";
  return "$ " + Number(val).toLocaleString();
}

export default function PostJobFlow({ onSubmit }) {
  const [step, setStep] = useState(1);

  // FORM STATE
  const [info, setInfo] = useState({
    title: "",
    employment: [],
    salaryMin: 5000,
    salaryMax: 22000,
    categories: [],
    skills: ["Graphic Design", "Communication", "Illustrator"],
  });

  const [desc, setDesc] = useState({
    description: "",
    responsibilities: "",
    qualifications: "",
    niceToHaves: "",
  });

  const [benefits, setBenefits] = useState([...DEFAULT_BENEFITS]);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showAddBenefit, setShowAddBenefit] = useState(false);
  const [newBenefit, setNewBenefit] = useState({ title: "", desc: "" });

  // --- HANDLERS FOR STEP 1 ---
  function toggleEmployment(val) {
    setInfo((f) => ({
      ...f,
      employment: f.employment.includes(val)
        ? f.employment.filter((e) => e !== val)
        : [...f.employment, val],
    }));
  }

  function updateSalaryMin(val) {
    const numVal = Number(val);
    setInfo((f) => ({
      ...f,
      salaryMin: Math.min(numVal, f.salaryMax - 1000),
    }));
  }

  function updateSalaryMax(val) {
    const numVal = Number(val);
    setInfo((f) => ({
      ...f,
      salaryMax: Math.max(numVal, f.salaryMin + 1000),
    }));
  }

  function addCategory(val) {
    if (!val) return;
    setInfo((f) => ({
      ...f,
      categories: f.categories.includes(val)
        ? f.categories
        : [...f.categories, val],
    }));
  }

  function removeCategory(val) {
    setInfo((f) => ({
      ...f,
      categories: f.categories.filter((c) => c !== val),
    }));
  }

  function addSkill(val) {
    if (!val || val.trim() === "") return;
    const trimmedVal = val.trim();
    setInfo((f) => ({
      ...f,
      skills: f.skills.includes(trimmedVal)
        ? f.skills
        : [...f.skills, trimmedVal],
    }));
    setShowAddSkill(false);
    setNewSkill("");
  }

  function removeSkill(val) {
    setInfo((f) => ({
      ...f,
      skills: f.skills.filter((s) => s !== val),
    }));
  }

  // --- HANDLERS FOR STEP 2 ---
  function handleDescChange(e) {
    const { name, value } = e.target;
    setDesc((d) => ({ ...d, [name]: value.slice(0, 500) }));
  }

  // --- HANDLERS FOR STEP 3 ---
  function removeBenefit(idx) {
    setBenefits((b) => b.filter((_, i) => i !== idx));
  }

  function addBenefit() {
    if (!newBenefit.title.trim() || !newBenefit.desc.trim()) return;
    setBenefits((b) => [
      ...b,
      {
        icon: (
          <svg width={32} height={32} viewBox="0 0 32 32">
            <circle
              cx={16}
              cy={16}
              r={10}
              fill="#eceafe"
              stroke="#4640DE"
              strokeWidth="2"
            />
            <text
              x={16}
              y={20}
              textAnchor="middle"
              fontSize="12"
              fill="#4640DE"
            >
              ★
            </text>
          </svg>
        ),
        title: newBenefit.title.trim(),
        desc: newBenefit.desc.trim(),
      },
    ]);
    setShowAddBenefit(false);
    setNewBenefit({ title: "", desc: "" });
  }

  function handleFinalSubmit() {
    const finalData = { ...info, ...desc, benefits };
    if (onSubmit) {
      onSubmit(finalData);
    } else {
      // Show a nicer success message
      const message = `Job posted successfully!\n\nTitle: ${
        finalData.title
      }\nEmployment: ${finalData.employment.join(", ")}\nSalary: ${formatSalary(
        finalData.salaryMin
      )} - ${formatSalary(
        finalData.salaryMax
      )}\nCategories: ${finalData.categories.join(
        ", "
      )}\nSkills: ${finalData.skills.join(", ")}\nBenefits: ${
        finalData.benefits.length
      } benefit(s)`;
      alert(message);
    }
  }

  // Validation functions
  const isStep1Valid = () => {
    return (
      info.title &&
      info.title.length >= 4 &&
      info.employment.length > 0 &&
      info.categories.length > 0 &&
      info.skills.length > 0
    );
  };
  const isStep2Valid = () => {
    return desc.description.trim().length > 0;
  };

  // Handle keyboard events
  function handleKeyDown(e, action) {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg px-8 py-8 mt-8 mb-12">
      <h1 className="font-bold text-2xl mb-2 text-gray-900">Post a Job</h1>

      {/* Step Indicators */}
      <div className="flex items-center mb-8 w-full">
        {[1, 2, 3].map((s, index) => (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center w-1/3">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  step === s
                    ? "border-[#4640DE] bg-[#4640DE] text-white"
                    : step > s
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-200 bg-white text-[#4640DE]"
                } font-bold text-lg`}
              >
                {step > s ? "✓" : s}
              </div>
            </div>
            {index < 2 && (
              <div
                className="flex-1 h-0.5 mx-2 bg-gray-200 transition-colors"
                style={{
                  backgroundColor: step > s ? "#22c55e" : "#e5e7eb", // green-500 or gray-200
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex mb-6 text-sm w-full">
        <div className="flex-1 flex flex-col items-center">
          <span
            className={`font-semibold transition-colors ${
              step === 1
                ? "text-[#4640DE]"
                : step > 1
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            Step 1/3 <span className="ml-1">Job Information</span>
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <span
            className={`font-semibold transition-colors ${
              step === 2
                ? "text-[#4640DE]"
                : step > 2
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            Step 2/3 <span className="ml-1">Job Description</span>
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <span
            className={`font-semibold transition-colors ${
              step === 3 ? "text-[#4640DE]" : "text-gray-500"
            }`}
          >
            Step 3/3 <span className="ml-1">Perks & Benefits</span>
          </span>
        </div>
      </div>

      {/* STEP 1: JOB INFO */}
      {step === 1 && (
        <div>
          <h2 className="font-semibold mb-6 text-lg">Basic Information</h2>

          {/* Job Title */}
          <div className="mb-6">
            <label className="font-medium text-sm text-gray-700 block mb-2">
              Job Title *
            </label>
            <input
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors"
              placeholder="e.g. Software Engineer"
              value={info.title}
              onChange={(e) =>
                setInfo((f) => ({ ...f, title: e.target.value }))
              }
              minLength={8}
              required
            />
            <div
              className={`text-xs mt-1 ${
                info.title.length >= 8 ? "text-green-600" : "text-gray-400"
              }`}
            >
              At least 8 characters {info.title.length >= 8 && "✓"}
            </div>
          </div>

          {/* Employment Types */}
          <div className="mb-6">
            <label className="font-medium text-sm text-gray-700 mb-3 block">
              Type of Employment *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {EMPLOYMENT_TYPES.map((type) => (
                <label
                  key={type.value}
                  className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={info.employment.includes(type.value)}
                    onChange={() => toggleEmployment(type.value)}
                    className="accent-[#4640DE] w-4 h-4"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div className="mb-6">
            <label className="font-medium text-sm text-gray-700 block mb-2">
              Salary Range
            </label>
            <div className="flex gap-3 items-center">
              <div className="flex-1">
                <input
                  type="number"
                  value={info.salaryMin}
                  min={0}
                  max={info.salaryMax - 1000}
                  step={500}
                  onChange={(e) => updateSalaryMin(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formatSalary(info.salaryMin)}
                </div>
              </div>
              <span className="text-gray-600 font-medium">to</span>
              <div className="flex-1">
                <input
                  type="number"
                  value={info.salaryMax}
                  min={info.salaryMin + 1000}
                  step={500}
                  onChange={(e) => updateSalaryMax(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formatSalary(info.salaryMax)}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Specify the estimated salary range for the role (optional)
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <label className="font-medium text-sm text-gray-700 block mb-2">
              Categories * (select multiple)
            </label>
            <div className="mb-3">
              <select
                onChange={(e) => {
                  addCategory(e.target.value);
                  e.target.value = "";
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors"
                value=""
              >
                <option value="">Select Job Categories</option>
                {CATEGORY_OPTIONS.filter(
                  (cat) => !info.categories.includes(cat)
                ).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 flex-wrap">
              {info.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-[#eceafe] text-[#4640DE] text-sm rounded-lg flex items-center gap-2 transition-colors"
                >
                  {cat}
                  <button
                    onClick={() => removeCategory(cat)}
                    type="button"
                    className="hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label className="font-medium text-sm text-gray-700 block mb-2">
              Required Skills *
            </label>
            <div className="mb-3">
              <button
                className="px-4 py-2 border border-[#4640DE] rounded-lg bg-[#eceafe] text-[#4640DE] text-sm hover:bg-[#4640DE] hover:text-white transition-colors"
                type="button"
                onClick={() => setShowAddSkill(true)}
              >
                + Add Skills
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {info.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-[#eceafe] text-[#4640DE] text-sm rounded-lg flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    type="button"
                    className="hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>

            {/* Add skill modal */}
            {showAddSkill && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                  <h3 className="font-semibold mb-4">Add Skills</h3>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors"
                    placeholder="Type a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => addSkill(newSkill))
                    }
                    autoFocus
                  />
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">
                      Suggestions:
                    </div>
                    <div className="flex gap-2 flex-wrap max-h-32 overflow-y-auto">
                      {SKILL_SUGGESTIONS.filter(
                        (s) =>
                          s.toLowerCase().includes(newSkill.toLowerCase()) &&
                          !info.skills.includes(s)
                      ).map((s) => (
                        <button
                          key={s}
                          className="px-2 py-1 bg-[#eceafe] text-[#4640DE] text-xs rounded-lg hover:bg-[#4640DE] hover:text-white transition-colors"
                          type="button"
                          onClick={() => addSkill(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      className="px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
                      type="button"
                      onClick={() => {
                        setShowAddSkill(false);
                        setNewSkill("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg text-sm bg-[#4640DE] text-white hover:bg-[#3730a3] transition-colors disabled:opacity-50"
                      type="button"
                      onClick={() => addSkill(newSkill)}
                      disabled={!newSkill.trim()}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: DESCRIPTION */}
      {step === 2 && (
        <div>
          <h2 className="font-semibold mb-6 text-lg">Job Details</h2>

          {/* Description */}
          <div className="mb-6">
            <label className="font-medium text-sm text-gray-700 block mb-2">
              Job Description *
            </label>
            <textarea
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors resize-none"
              rows={4}
              name="description"
              placeholder="Describe the role, company, and what makes this opportunity exciting..."
              value={desc.description}
              onChange={handleDescChange}
              maxLength={500}
            />
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-400">Maximum 500 characters</span>
              <span
                className={
                  desc.description.length > 450
                    ? "text-orange-500"
                    : "text-gray-400"
                }
              >
                {desc.description.length} / 500
              </span>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mb-6">
            <label className="font-medium text-sm text-gray-700 block mb-2">
              Responsibilities
            </label>
            <textarea
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors resize-none"
              rows={4}
              name="responsibilities"
              placeholder="What will this person be responsible for day-to-day..."
              value={desc.responsibilities}
              onChange={handleDescChange}
              maxLength={500}
            />
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-400">Maximum 500 characters</span>
              <span
                className={
                  desc.responsibilities.length > 450
                    ? "text-orange-500"
                    : "text-gray-400"
                }
              >
                {desc.responsibilities.length} / 500
              </span>
            </div>
          </div>

          {/* Qualifications */}
          <div className="mb-6">
            <label className="font-medium text-sm text-gray-700 block mb-2">
              Who You Are
            </label>
            <textarea
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors resize-none"
              rows={4}
              name="qualifications"
              placeholder="Required qualifications, experience, and characteristics..."
              value={desc.qualifications}
              onChange={handleDescChange}
              maxLength={500}
            />
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-400">Maximum 500 characters</span>
              <span
                className={
                  desc.qualifications.length > 450
                    ? "text-orange-500"
                    : "text-gray-400"
                }
              >
                {desc.qualifications.length} / 500
              </span>
            </div>
          </div>

          {/* Nice-to-haves */}
          <div className="mb-6">
            <label className="font-medium text-sm text-gray-700 block mb-2">
              Nice-To-Haves
            </label>
            <textarea
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors resize-none"
              rows={4}
              name="niceToHaves"
              placeholder="Bonus qualifications or experiences that would be great to have..."
              value={desc.niceToHaves}
              onChange={handleDescChange}
              maxLength={500}
            />
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-400">Maximum 500 characters</span>
              <span
                className={
                  desc.niceToHaves.length > 450
                    ? "text-orange-500"
                    : "text-gray-400"
                }
              >
                {desc.niceToHaves.length} / 500
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: PERKS & BENEFITS */}
      {step === 3 && (
        <div>
          <h2 className="font-semibold mb-6 text-lg">Perks & Benefits</h2>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="font-medium text-sm text-gray-700">
                Perks and Benefits
                <span className="ml-2 text-xs font-normal text-gray-400">
                  (Add up to 5)
                </span>
              </label>
              <button
                className="px-4 py-2 rounded-lg bg-[#eceafe] text-[#4640DE] text-sm hover:bg-[#4640DE] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                onClick={() => setShowAddBenefit(true)}
                disabled={benefits.length >= 5}
              >
                + Add Benefit
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-[#f8fafd] rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-shadow"
                >
                  <div className="flex-shrink-0">{b.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">
                      {b.title}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {b.desc}
                    </div>
                  </div>
                  <button
                    onClick={() => removeBenefit(i)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add benefit modal */}
            {showAddBenefit && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                  <h3 className="font-semibold mb-4">Add New Benefit</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Benefit Title
                      </label>
                      <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors"
                        placeholder="e.g. Flexible Hours"
                        value={newBenefit.title}
                        onChange={(e) =>
                          setNewBenefit((b) => ({
                            ...b,
                            title: e.target.value,
                          }))
                        }
                        maxLength={50}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#4640DE] focus:border-[#4640DE] transition-colors resize-none"
                        placeholder="Describe this benefit and why it's valuable..."
                        value={newBenefit.desc}
                        onChange={(e) =>
                          setNewBenefit((b) => ({
                            ...b,
                            desc: e.target.value,
                          }))
                        }
                        rows={3}
                        maxLength={150}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end mt-6">
                    <button
                      className="px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
                      type="button"
                      onClick={() => {
                        setShowAddBenefit(false);
                        setNewBenefit({ title: "", desc: "" });
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg text-sm bg-[#4640DE] text-white hover:bg-[#3730a3] transition-colors disabled:opacity-50"
                      type="button"
                      onClick={addBenefit}
                      disabled={
                        !newBenefit.title.trim() || !newBenefit.desc.trim()
                      }
                    >
                      Add Benefit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP CONTROLS */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          Back
        </button>
        {step < 3 ? (
          <button
            className="px-6 py-2 rounded-lg bg-[#4640DE] text-white font-semibold hover:bg-[#3730a3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setStep((s) => Math.min(3, s + 1))}
            disabled={
              (step === 1 && !isStep1Valid()) || (step === 2 && !isStep2Valid())
            }
          >
            Next
          </button>
        ) : (
          <button
            className="px-6 py-2 rounded-lg bg-[#4640DE] text-white font-semibold hover:bg-[#3730a3] transition-colors"
            onClick={handleFinalSubmit}
          >
            Post Job
          </button>
        )}
      </div>
    </div>
  );
}
