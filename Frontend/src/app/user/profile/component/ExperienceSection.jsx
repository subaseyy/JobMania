"use client";
import React, { useEffect, useRef, useState } from "react";
import { Plus, SquarePen, Trash2, X } from "lucide-react";
import { getProfile, updateProfile } from "@/lib/api/Auth";

// Modal dialog for add/edit
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg relative"
        onClick={e => e.stopPropagation()}
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
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
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

  // Load from backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await getProfile();
        const { profile } = res.data;
        setExperiences(profile.experiences || []);
      } catch (err) {
        console.error("Failed to load experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Handle logo file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((f) => ({ ...f, logo: reader.result, logoFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for new experience
  const openAddModal = () => {
    setForm({
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
    setEditingIndex("new");
  };

  // Open modal for edit
  const openEditModal = (exp, index) => {
    setForm({ ...exp, logoFile: null });
    setEditingIndex(index);
  };

  // Cancel modal
  const cancelEdit = () => {
    setForm({
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
    setEditingIndex(null);
  };

  // Save experience (add or update)
  const saveExperience = async () => {
    try {
      const updated = [...experiences];
      const entry = { ...form };
      delete entry.logoFile;

      if (editingIndex === "new") {
        updated.push(entry);
      } else {
        updated[editingIndex] = entry;
      }

      const res = await updateProfile({ experiences: updated });
      setExperiences(res.data.profile.experiences || []);
      cancelEdit();
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save experience.");
    }
  };

  // Delete an experience
  const deleteExperience = async (index) => {
    try {
      const updated = experiences.filter((_, i) => i !== index);
      const res = await updateProfile({ experiences: updated });
      setExperiences(res.data.profile.experiences || []);
      cancelEdit();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete experience.");
    }
  };

  // For show less/more UX
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 2);

  if (loading) return <div className="p-6">Loading experiences...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-epilogue font-semibold text-xl text-[#25324B]">
          Experiences
        </h2>
        <button
          onClick={openAddModal}
          className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white rounded"
        >
          <Plus size={20} />
        </button>
      </div>

      {visibleExperiences.map((exp, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 ${
            index !== visibleExperiences.length - 1 ? "pb-6 mb-6 border-b" : ""
          }`}
        >
          <img
            src={exp.logo || "/default-avatar.png"}
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
                  <span className="font-medium text-[#25324B]">{exp.company}</span>{" "}
                  <span className="text-[#A8ADB7] text-sm">●</span> {exp.type}{" "}
                  <span className="text-[#A8ADB7] text-sm">●</span> {exp.duration} ({exp.period})
                </p>
                <p className="text-[#7C8493]">{exp.location}</p>
              </div>
              <button
                onClick={() => openEditModal(exp, index)}
                className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white rounded"
              >
                <SquarePen size={16} />
              </button>
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
            {showAll ? "Show less" : `Show ${experiences.length - 2} more`}
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={editingIndex !== null} onClose={cancelEdit}>
        <h3 className="text-lg font-semibold mb-4">
          {editingIndex === "new" ? "Add Experience" : "Edit Experience"}
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {["company", "role", "type", "location", "duration", "period"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleInputChange}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="border p-2 rounded"
            />
          ))}

          {/* Logo Upload */}
          <div className="col-span-2 flex gap-3 items-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border p-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              Upload Logo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            {form.logo && (
              <div className="flex items-center gap-2">
                <img src={form.logo} alt="Logo" className="w-10 h-10 rounded-full" />
                <span className="text-sm text-gray-500">
                  {form.logoFile?.name || "Logo preview"}
                </span>
              </div>
            )}
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="col-span-2 border p-2 rounded"
          />
        </div>

        <div className="flex gap-3">
          <button onClick={saveExperience} className="bg-[#4640DE] text-white px-4 py-2 rounded">
            Save
          </button>
          <button onClick={cancelEdit} className="border border-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          {editingIndex !== "new" && (
            <button
              onClick={() => deleteExperience(editingIndex)}
              className="flex items-center gap-1 text-red-500 hover:underline"
            >
              <Trash2 size={16} /> Delete
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ExperienceSection;
