"use client";
import React, { useRef, useState, useEffect } from "react";
import { Plus, SquarePen, Trash2, X } from "lucide-react";
import Image from "next/image";
import { getProfile, updateProfile } from "@/lib/api/Auth";
import axios from "axios";

const PortfolioSection = () => {
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  const [portfolioItems, setPortfolioItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    image: "",
    imageFile: null,
  });

  // Fetch initial data
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await getProfile();
        const profile = res.data.profile;
        setPortfolioItems(profile.portfolios || []);
      } catch (err) {
        console.error("Failed to load portfolios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  // Scroll progress
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
      setScrollProgress(progress);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [portfolioItems]);

  // File input trigger
  const triggerFileInput = () => fileInputRef.current.click();

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
    }
  };

  const startAdd = () => {
    setFormData({ id: null, title: "", image: "", imageFile: null });
    setEditingId("new");
    setShowAddForm(true);
  };

  const startEdit = (item) => {
    setFormData({ id: item.id, title: item.title, image: item.image, imageFile: null });
    setEditingId(item.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
  };

  const uploadImage = async (file) => {
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post("/api/uploads", form);
    return res.data.path; // Ensure your backend returns { path: '/uploads/image.jpg' }
  };

  const savePortfolio = async () => {
    if (!formData.title) return;

    let imagePath = formData.image;

    if (formData.imageFile) {
      try {
        imagePath = await uploadImage(formData.imageFile);
      } catch (err) {
        console.error("Image upload failed", err);
        return alert("Image upload failed");
      }
    }

    const portfolioToSave = {
      id: formData.id || Date.now(),
      title: formData.title,
      image: imagePath,
    };

    let updatedItems;
    if (editingId === "new") {
      updatedItems = [...portfolioItems, portfolioToSave];
    } else {
      updatedItems = portfolioItems.map((item) =>
        item.id === editingId ? portfolioToSave : item
      );
    }

    try {
      await updateProfile({ portfolios: updatedItems });
      setPortfolioItems(updatedItems);
      cancelEdit();
    } catch (err) {
      console.error("Failed to save portfolio", err);
      alert("Failed to save portfolio");
    }
  };

  const deletePortfolio = async (id) => {
    const updated = portfolioItems.filter((item) => item.id !== id);
    try {
      await updateProfile({ portfolios: updated });
      setPortfolioItems(updated);
      cancelEdit();
    } catch (err) {
      console.error("Failed to delete", err);
      alert("Failed to delete portfolio");
    }
  };

  if (loading) return <div className="p-6">Loading portfolios...</div>;

  return (
    <div className="bg-white shadow-sm p-6 border border-[#D6DDEB] rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#25324B]">Portfolios</h2>
        <button
          onClick={startAdd}
          className="p-2 border border-[#D6DDEB] hover:bg-[#4640DE] text-[#4640DE] hover:text-white hover:border-[#4640DE] rounded"
        >
          <Plus size={20} />
        </button>
      </div>

      {(editingId === "new" || editingId !== null) && (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 gap-3">
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Project title"
              className="w-full p-2 border rounded"
            />

            {/* Image upload */}
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="p-2 border rounded bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Upload Image
              </button>
              {(formData.image || formData.imageFile) && (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 relative">
                    <Image
                      src={
                        formData.imageFile
                          ? URL.createObjectURL(formData.imageFile)
                          : formData.image
                      }
                      alt="Preview"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {formData.imageFile?.name || "Current image"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={savePortfolio}
                className="px-4 py-2 bg-[#4640DE] text-white rounded hover:bg-[#3730a3]"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              {editingId !== "new" && (
                <button
                  onClick={() => deletePortfolio(formData.id)}
                  className="flex items-center gap-1 px-4 py-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div ref={scrollRef} className="overflow-x-auto">
        <div className="flex space-x-4 min-w-max pb-2">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="relative min-w-[200px] max-w-[220px] border border-gray-200 bg-white p-2 shadow-sm hover:shadow-md transition-shadow rounded-lg"
            >
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={() => startEdit(item)}
                  className="p-1 bg-white border border-gray-300 rounded-full text-blue-500 hover:bg-blue-50"
                >
                  <SquarePen size={16} />
                </button>
                <button
                  onClick={() => deletePortfolio(item.id)}
                  className="p-1 bg-white border border-gray-300 rounded-full text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="mb-2 h-40 relative">
                <Image
                  src={item.image}
                  fill
                  alt={item.title}
                  className="object-cover rounded"
                />
              </div>
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 w-full h-[3px] bg-gray-200 rounded">
        <div
          className="h-full bg-[#4640DE] rounded transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PortfolioSection;
