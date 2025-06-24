"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState({ full_name: "", contact_number: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    const res = await axios.get("/api/profiles");
    setProfiles(res.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      await axios.put(`/api/profiles/${editing}`, form);
      setEditing(null);
    } else {
      await axios.post("/api/profiles", form);
    }
    setForm({ full_name: "", contact_number: "" });
    fetchProfiles();
  }

  async function handleDelete(id) {
    await axios.delete(`/api/profiles/${id}`);
    fetchProfiles();
  }

  function handleEdit(profile) {
    setForm(profile);
    setEditing(profile._id);
  }

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4 font-bold">Admin - Profiles</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-2">
        <input className="border p-1 mr-2" placeholder="Full Name" value={form.full_name} onChange={e=>setForm({...form, full_name: e.target.value})} />
        <input className="border p-1 mr-2" placeholder="Contact Number" value={form.contact_number} onChange={e=>setForm({...form, contact_number: e.target.value})} />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" type="submit">{editing ? "Update" : "Add"}</button>
      </form>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th>Full Name</th>
            <th>Contact</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile._id} className="border-t">
              <td>{profile.full_name}</td>
              <td>{profile.contact_number}</td>
              <td>
                <button className="bg-yellow-400 px-2 py-1 mr-1" onClick={()=>handleEdit(profile)}>Edit</button>
              </td>
              <td>
                <button className="bg-red-500 text-white px-2 py-1" onClick={()=>handleDelete(profile._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
