"use client";
import React, { useState, useRef } from "react";
import { Plus, SquarePen, Trash2, Save, X } from "lucide-react";

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

const EducationSection = () => {
  const [educations, setEducations] = useState([
    {
      id: 1,
      university: "Harvard University",
      logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg",
      degree: "Bachelor of Arts - BA, Economics",
      duration: "2016 - 2020",
      description:
        "Acquired deep knowledge in theoretical and empirical economics, gaining a strong foundation in macro and microeconomic analysis.",
    },
    {
      id: 2,
      university: "Yale University",
      logo: "https://upload.wikimedia.org/wikipedia/en/3/3b/Yale_University_Shield_1.svg",
      degree: "Master of Business Administration - MBA",
      duration: "2020 - 2022",
      description:
        "Focused on strategic management, entrepreneurship, and data-driven decision-making in a global business context.",
    },
  ]);

  const [showAll, setShowAll] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    id: null,
    university: "",
    logo: "",
    logoFile: null,
    degree: "",
    duration: "",
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
      university: "",
      logo: "",
      logoFile: null,
      degree: "",
      duration: "",
      description: "",
    });
    setEditingId("new");
  };

  const startEdit = (edu) => {
    setForm({
      ...edu,
      logoFile: null
    });
    setEditingId(edu.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      id: null,
      university: "",
      logo: "",
      logoFile: null,
      degree: "",
      duration: "",
      description: "",
    });
  };

  const saveEducation = () => {
    const educationToSave = { ...form };
    delete educationToSave.logoFile;
    
    if (editingId === "new") {
      setEducations([...educations, { ...educationToSave, id: Date.now() }]);
    } else {
      setEducations(
        educations.map((edu) => (edu.id === editingId ? educationToSave : edu))
      );
    }
    cancelEdit();
  };

  const deleteEducation = (id) => {
    setEducations(educations.filter((edu) => edu.id !== id));
    cancelEdit();
  };

  const visibleEducations = showAll ? educations : educations.slice(0, 2);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-epilogue font-semibold text-xl text-[#25324B]">
          Education
        </h2>
        <button
          onClick={startAdd}
          className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE] rounded"
        >
          <Plus size={20} />
        </button>
      </div>

      {visibleEducations.map((edu, index) => (
        <div
          key={edu.id}
          className={`flex items-start gap-4 ${
            index !== visibleEducations.length - 1
              ? "pb-6 mb-6 border-b border-gray-200"
              : ""
          }`}
        >
          <img
            src={edu.logo}
            alt={edu.university}
            className="w-12 h-12 rounded-full object-cover bg-gray-100"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-epilogue font-semibold text-lg text-[#25324B] mb-1">
                  {edu.university}
                </h3>
                <p className="text-base text-[#515B6F] mb-1">{edu.degree}</p>
                <p className="text-[#7C8493]">{edu.duration}</p>
              </div>
              <div>
                <button
                  onClick={() => startEdit(edu)}
                  className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE] rounded"
                >
                  <SquarePen size={16} />
                </button>
              </div>
            </div>
            {edu.description && (
              <p className="text-[#25324B] mt-2">{edu.description}</p>
            )}
          </div>
        </div>
      ))}

      {educations.length > 2 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#4640DE] font-medium hover:underline"
          >
            {showAll
              ? "Show less education"
              : `Show ${educations.length - 2} more education`}
          </button>
        </div>
      )}

      {/* Modal for Add/Edit Education */}
      <Modal
        isOpen={
          editingId === "new" || (editingId !== null && editingId !== undefined)
        }
        onClose={cancelEdit}
      >
        <h3 className="text-lg font-semibold mb-4">
          {editingId === "new" ? "Add Education" : "Edit Education"}
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <input
            name="university"
            value={form.university}
            onChange={handleInputChange}
            placeholder="University"
            className="col-span-2 border p-2 rounded"
          />
          <input
            name="degree"
            value={form.degree}
            onChange={handleInputChange}
            placeholder="Degree"
            className="col-span-2 border p-2 rounded"
          />
          <input
            name="duration"
            value={form.duration}
            onChange={handleInputChange}
            placeholder="Duration"
            className="col-span-2 border p-2 rounded"
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
            onClick={saveEducation}
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
              onClick={() => deleteEducation(form.id)}
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

export default EducationSection;