"use client";
import React, { useEffect, useState } from "react";
import { Plus, SquarePen, Trash2, X, Save } from "lucide-react";
import { getProfile, updateProfile } from "@/lib/api/Auth";

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editSkillValue, setEditSkillValue] = useState("");

  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getProfile();
        const { profile } = res.data;
        setSkills(profile.skills || []);
      } catch (err) {
        console.error("Failed to fetch skills", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Save to backend
  const saveSkillsToBackend = async (updatedSkills) => {
    try {
      await updateProfile({ skills: updatedSkills });
    } catch (err) {
      console.error("Failed to update skills", err);
      alert("Could not save skills.");
    }
  };

  // Add new skill
  const handleAddSkill = async () => {
    const trimmed = newSkill.trim();
    if (!trimmed || skills.includes(trimmed)) return;

    const updatedSkills = [...skills, trimmed];
    setSkills(updatedSkills);
    setNewSkill("");
    setShowAddForm(false);
    await saveSkillsToBackend(updatedSkills);
  };

  // Delete skill
  const handleDeleteSkill = async (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditSkillValue("");
    }
    await saveSkillsToBackend(updatedSkills);
  };

  // Edit existing skill
  const startEditSkill = (index) => {
    setEditingIndex(index);
    setEditSkillValue(skills[index]);
  };

  const saveEditSkill = async () => {
    const trimmed = editSkillValue.trim();
    if (!trimmed) return;

    const updatedSkills = [...skills];
    updatedSkills[editingIndex] = trimmed;
    setSkills(updatedSkills);
    setEditingIndex(null);
    setEditSkillValue("");
    await saveSkillsToBackend(updatedSkills);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditSkillValue("");
  };

  if (loading) return <div className="p-6">Loading skills...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-[#D6DDEB]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-epilogue font-semibold text-xl text-[#25324B] leading-[160%]">Skills</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingIndex(null);
            }}
            className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white"
          >
            {showAddForm ? <X size={20} /> : <Plus size={20} />}
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white"
          >
            {isEditing ? <Save size={16} /> : <SquarePen size={16} />}
          </button>
        </div>
      </div>

      {/* Add Skill Form */}
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

      {/* Skills List */}
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
                <button onClick={saveEditSkill} className="text-green-500">
                  <Save size={16} />
                </button>
                <button onClick={cancelEdit} className="text-gray-500">
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
