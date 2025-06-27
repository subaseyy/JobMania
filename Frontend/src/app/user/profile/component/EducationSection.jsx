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

const EducationSection = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    university: "",
    logo: "",
    logoFile: null,
    degree: "",
    duration: "",
    description: "",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const res = await getProfile();
        const { profile } = res.data;
        setEducations(profile.educations || []);
      } catch (err) {
        console.error("Failed to fetch educations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEducations();
  }, []);

  // Input field change handler
  const handleInputChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Logo/image file handler
  const handleFileChange = e => {
    const file = e.target.files[0];
     const maxSize = 60 * 1024; // 60 KB in bytes
  if (file.size > maxSize) {
    alert("File too large. Please upload an image under 60KB.");
    return;
  }
  
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        logo: reader.result,
        logoFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  // File input trigger
  const triggerFileInput = () => fileInputRef.current?.click();

  // Start add modal
  const startAdd = () => {
    setForm({
      university: "",
      logo: "",
      logoFile: null,
      degree: "",
      duration: "",
      description: "",
    });
    setEditingId("new");
  };

  // Start edit modal
  const startEdit = (edu, index) => {
    setForm({ ...edu, logoFile: null });
    setEditingId(index);
  };

  // Cancel editing/adding
  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      university: "",
      logo: "",
      logoFile: null,
      degree: "",
      duration: "",
      description: "",
    });
  };

  // Save to backend
  const saveEducation = async () => {
    try {
      const updated = [...educations];
      const entry = { ...form };
      delete entry.logoFile;

      if (editingId === "new") {
        updated.push(entry);
      } else {
        updated[editingId] = entry;
      }

      const res = await updateProfile({ educations: updated });
      setEducations(res.data.profile.educations);
      cancelEdit();
    } catch (err) {
      console.error("Failed to save education", err);
      alert("Failed to save education. Please try again.");
    }
  };

  // Delete from backend
  const deleteEducation = async index => {
    try {
      const updated = educations.filter((_, i) => i !== index);
      const res = await updateProfile({ educations: updated });
      setEducations(res.data.profile.educations);
      cancelEdit();
    } catch (err) {
      console.error("Failed to delete education", err);
      alert("Failed to delete education. Please try again.");
    }
  };

  // Display two by default, or all
  const visibleEducations = showAll ? educations : educations.slice(0, 2);

  if (loading) return <div className="p-6">Loading education...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-epilogue font-semibold text-xl text-[#25324B]">Education</h2>
        <button
          onClick={startAdd}
          className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white rounded"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Display education cards */}
      {visibleEducations.map((edu, index) => (
        <div key={index} className={`flex gap-4 ${index !== visibleEducations.length - 1 ? "pb-6 mb-6 border-b" : ""}`}>
          <img src={edu.logo || "/jobs/sample.png"} alt={edu.university} className="w-12 h-12 rounded-full object-cover bg-gray-100" />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-epilogue font-semibold text-lg text-[#25324B] mb-1">{edu.university}</h3>
                <p className="text-base text-[#515B6F] mb-1">{edu.degree}</p>
                <p className="text-[#7C8493]">{edu.duration}</p>
              </div>
              <button
                onClick={() => startEdit(edu, index)}
                className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white rounded"
              >
                <SquarePen size={16} />
              </button>
            </div>
            <p className="text-[#25324B] mt-2">{edu.description}</p>
          </div>
        </div>
      ))}

      {/* Show more/less button */}
      {educations.length > 2 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#4640DE] font-medium hover:underline"
          >
            {showAll ? "Show less education" : `Show ${educations.length - 2} more`}
          </button>
        </div>
      )}

      {/* Modal for add/edit */}
      <Modal isOpen={editingId !== null} onClose={cancelEdit}>
        <h3 className="text-lg font-semibold mb-4">{editingId === "new" ? "Add Education" : "Edit Education"}</h3>
        <div className="grid grid-cols-2 gap-3 mb-2">
          {["university", "degree", "duration"].map(field => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleInputChange}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="col-span-2 border p-2 rounded"
            />
          ))}
          <div className="col-span-2 flex items-center gap-3">
            <button onClick={triggerFileInput} className="border p-2 rounded bg-gray-100 hover:bg-gray-200">
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
                <img src={form.logo} alt="Logo preview" className="w-10 h-10 rounded-full object-cover" />
                <span className="text-sm text-gray-500">{form.logoFile?.name || "Current logo"}</span>
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
          <button onClick={saveEducation} className="bg-[#4640DE] text-white px-4 py-2 rounded">Save</button>
          <button onClick={cancelEdit} className="border border-gray-300 px-4 py-2 rounded">Cancel</button>
          {editingId !== "new" && (
            <button
              onClick={() => deleteEducation(editingId)}
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

export default EducationSection;
