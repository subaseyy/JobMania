"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [form, setForm] = useState({ user: "", job: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  async function fetchSavedJobs() {
    const res = await axios.get("/api/savedjobs");
    setSavedJobs(res.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      await axios.put(`/api/savedjobs/${editing}`, form);
      setEditing(null);
    } else {
      await axios.post("/api/savedjobs", form);
    }
    setForm({ user: "", job: "" });
    fetchSavedJobs();
  }

  async function handleDelete(id) {
    await axios.delete(`/api/savedjobs/${id}`);
    fetchSavedJobs();
  }

  function handleEdit(saved) {
    setForm(saved);
    setEditing(saved._id);
  }

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4 font-bold">Admin - Saved Jobs</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-2">
        <input className="border p-1 mr-2" placeholder="User ID" value={form.user} onChange={e=>setForm({...form, user: e.target.value})} />
        <input className="border p-1 mr-2" placeholder="Job ID" value={form.job} onChange={e=>setForm({...form, job: e.target.value})} />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" type="submit">{editing ? "Update" : "Add"}</button>
      </form>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th>User</th>
            <th>Job</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {savedJobs.map((saved) => (
            <tr key={saved._id} className="border-t">
              <td>{saved.user}</td>
              <td>{saved.job}</td>
              <td>
                <button className="bg-yellow-400 px-2 py-1 mr-1" onClick={()=>handleEdit(saved)}>Edit</button>
              </td>
              <td>
                <button className="bg-red-500 text-white px-2 py-1" onClick={()=>handleDelete(saved._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
