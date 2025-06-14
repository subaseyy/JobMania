"use client";
import React, { useState, useRef } from "react";
import { Plus, SquarePen, Trash2, X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: "Twitter",
      logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/Twitter_bird_logo_2012.svg",
      role: "Product Designer",
      type: "Full-Time",
      location: "Manchester, UK",
      duration: "Jun 2019 – Present",
      period: "1y 1m",
      description:
        "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
    },
    {
      id: 2,
      company: "GoDaddy",
      logo: "https://cdn.worldvectorlogo.com/logos/godaddy-2.svg",
      role: "Growth Marketing Designer",
      type: "Full-Time",
      location: "Manchester, UK",
      duration: "Jun 2011 – May 2019",
      period: "8y",
      description:
        "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives.",
    },
  ]);

  const [showAll, setShowAll] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    id: null,
    company: "",
    logo: "",
    logoFile: null,
    role: "",
    type: "",
    location: "",
    duration: "",
    period: "",
    description: "",
  });
  
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          logo: reader.result,
          logoFile: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const startAdd = () => {
    setForm({
      id: null,
      company: "",
      logo: "",
      logoFile: null,
      role: "",
      type: "",
      location: "",
      duration: "",
      period: "",
      description: "",
    });
    setEditingId("new");
  };

  const startEdit = (exp) => {
    setForm({
      ...exp,
      logoFile: null // Reset file when starting edit
    });
    setEditingId(exp.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      id: null,
      company: "",
      logo: "",
      logoFile: null,
      role: "",
      type: "",
      location: "",
      duration: "",
      period: "",
      description: "",
    });
  };

  const saveExperience = () => {
    const experienceToSave = { ...form };
    // Remove the logoFile from the saved experience as we don't need to store the File object
    delete experienceToSave.logoFile;
    
    if (editingId === "new") {
      setExperiences([...experiences, { ...experienceToSave, id: Date.now() }]);
    } else {
      setExperiences(
        experiences.map((exp) => (exp.id === editingId ? experienceToSave : exp))
      );
    }
    cancelEdit();
  };

  const deleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
    cancelEdit();
  };

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 2);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-epilogue font-semibold text-xl text-[#25324B]">
          Experiences
        </h2>
        <button
          onClick={startAdd}
          className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE] rounded"
        >
          <Plus size={20} />
        </button>
      </div>

      {visibleExperiences.map((exp, index) => (
        <div
          key={exp.id}
          className={`flex items-start gap-4 ${
            index !== visibleExperiences.length - 1
              ? "pb-6 mb-6 border-b border-gray-200"
              : ""
          }`}
        >
          <img
            src={exp.logo}
            alt={exp.company}
            className="w-12 h-12 rounded-full object-cover bg-gray-100"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-epilogue font-semibold text-lg text-[#25324B] mb-1">
                  {exp.role}
                </h3>
                <p className="text-base text-[#515B6F] mb-1">
                  <span className="font-medium text-[#25324B]">
                    {exp.company}
                  </span>{" "}
                  <span className="text-[#A8ADB7] text-sm">●</span> {exp.type}{" "}
                  <span className="text-[#A8ADB7] text-sm">●</span>{" "}
                  {exp.duration} ({exp.period})
                </p>
                <p className="text-[#7C8493]">{exp.location}</p>
              </div>
              <div>
                <button
                  onClick={() => startEdit(exp)}
                  className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE] rounded"
                >
                  <SquarePen size={16} />
                </button>
              </div>
            </div>
            <p className="text-[#25324B] mt-2">{exp.description}</p>
          </div>
        </div>
      ))}

      {experiences.length > 2 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#4640DE] font-medium hover:underline"
          >
            {showAll
              ? "Show less experiences"
              : `Show ${experiences.length - 2} more experiences`}
          </button>
        </div>
      )}

      {/* Modal for Add/Edit Experience */}
      <Modal
        isOpen={
          editingId === "new" || (editingId !== null && editingId !== undefined)
        }
        onClose={cancelEdit}
      >
        <h3 className="text-lg font-semibold mb-4">
          {editingId === "new" ? "Add Experience" : "Edit Experience"}
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <input
            name="company"
            value={form.company}
            onChange={handleInputChange}
            placeholder="Company"
            className="border p-2 rounded"
          />
          <input
            name="role"
            value={form.role}
            onChange={handleInputChange}
            placeholder="Role"
            className="border p-2 rounded"
          />
          <input
            name="type"
            value={form.type}
            onChange={handleInputChange}
            placeholder="Type"
            className="border p-2 rounded"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="border p-2 rounded"
          />
          <input
            name="duration"
            value={form.duration}
            onChange={handleInputChange}
            placeholder="Duration"
            className="border p-2 rounded"
          />
          <input
            name="period"
            value={form.period}
            onChange={handleInputChange}
            placeholder="Period"
            className="border p-2 rounded"
          />
          
          {/* Logo upload section */}
          <div className="col-span-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={triggerFileInput}
                className="border p-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                Upload Logo
              </button>
              {form.logo && (
                <div className="flex items-center gap-2">
                  <img 
                    src={form.logo} 
                    alt="Logo preview" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-500">
                    {form.logoFile ? form.logoFile.name : "Current logo"}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="col-span-2 border p-2 rounded"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={saveExperience}
            className="bg-[#4640DE] text-white px-4 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={cancelEdit}
            className="border border-gray-400 px-4 py-1 rounded"
          >
            Cancel
          </button>
          {editingId !== "new" && (
            <button
              onClick={() => deleteExperience(form.id)}
              className="flex items-center gap-1 text-red-500 hover:underline"
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ExperienceSection;