"use client";
import React, { useState } from "react";
import { Plus, SquarePen, Trash2, X, Save } from "lucide-react";

const SkillsSection = () => {
  const [skills, setSkills] = useState([
    "Communication",
    "Analytics",
    "Facebook Ads",
    "Content Strategy",
    "Community Manager",
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editSkillValue, setEditSkillValue] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setShowAddForm(false);
    }
  };

  const handleDeleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditSkillValue("");
    }
  };

  const startEditSkill = (index) => {
    setEditingIndex(index);
    setEditSkillValue(skills[index]);
  };

  const saveEditSkill = () => {
    if (editSkillValue.trim()) {
      const updatedSkills = [...skills];
      updatedSkills[editingIndex] = editSkillValue.trim();
      setSkills(updatedSkills);
      setEditingIndex(null);
      setEditSkillValue("");
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditSkillValue("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-epilogue font-semibold text-xl text-[#25324B] leading-[160%]">
          Skills
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingIndex(null);
            }}
            className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE]"
          >
            {showAddForm ? <X size={20} /> : <Plus size={20} />}
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE]"
          >
            {isEditing ? <Save size={16} /> : <SquarePen size={16} />}
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add new skill"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-[#4640DE] text-white rounded hover:bg-[#3730a3]"
          >
            Add
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="relative group">
            {editingIndex === index ? (
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  value={editSkillValue}
                  onChange={(e) => setEditSkillValue(e.target.value)}
                  className="px-4 py-2 border border-[#4640DE] rounded"
                />
                <button
                  onClick={saveEditSkill}
                  className="p-1 text-green-500 hover:text-green-700"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={cancelEdit}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <span className="px-6 py-2.5 bg-[#F8F8FD] text-[#4640DE] font-epilogue font-[400] text-base leading-[160%]">
                  {skill}
                </span>
                {isEditing && (
                  <div className="absolute -top-2 -right-2 flex gap-1">
                    <button
                      onClick={() => startEditSkill(index)}
                      className="p-1 bg-white border border-gray-300 rounded-full text-blue-500 hover:bg-blue-50"
                    >
                      <SquarePen size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(index)}
                      className="p-1 bg-white border border-gray-300 rounded-full text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;