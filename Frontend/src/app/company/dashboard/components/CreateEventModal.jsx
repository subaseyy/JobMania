import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const CATEGORY_COLORS = {
  "Interview Schedule": "bg-blue-500",
  "Internal Meeting": "bg-green-500",
  "Team Schedule": "bg-gray-400",
  "My Task": "bg-purple-500",
  Reminders: "bg-yellow-400",
};

export default function CreateEventModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    category: "Interview Schedule",
    startDay: 1,
    startHour: 2,
    endHour: 3,
    time: "",
    users: "",
  });

  const ref = useRef();

  // Reset form and focus on open
  useEffect(() => {
    if (open && ref.current) {
      setForm({
        title: "",
        category: "Interview Schedule",
        startDay: 1,
        startHour: 2,
        endHour: 3,
        time: "",
        users: "",
      });
      ref.current.focus();
    }
  }, [open]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const color = CATEGORY_COLORS[form.category] || "bg-blue-500";
    onSubmit({
      id: Date.now(),
      title: form.title,
      category: form.category,
      start: { day: Number(form.startDay), hour: Number(form.startHour) },
      end: { day: Number(form.startDay), hour: Number(form.endHour) },
      color,
      time:
        form.time ||
        `${String(form.startHour).padStart(2, "0")}.00 - ${String(
          form.endHour
        ).padStart(2, "0")}.00 AM`,
      users: form.users
        ? form.users
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    });
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            ref={ref}
            name="title"
            type="text"
            required
            placeholder="Event Title"
            className="border rounded-lg px-3 py-2"
            value={form.title}
            onChange={handleChange}
            autoFocus
          />
          <select
            name="category"
            className="border rounded-lg px-3 py-2"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Interview Schedule">Interview Schedule</option>
            <option value="Internal Meeting">Internal Meeting</option>
            <option value="Team Schedule">Team Schedule</option>
            <option value="My Task">My Task</option>
            <option value="Reminders">Reminders</option>
          </select>
          <div className="flex gap-2">
            <select
              name="startDay"
              className="border rounded-lg px-3 py-2 w-1/3"
              value={form.startDay}
              onChange={handleChange}
            >
              <option value={0}>Sunday</option>
              <option value={1}>Monday</option>
              <option value={2}>Tuesday</option>
              <option value={3}>Wednesday</option>
              <option value={4}>Thursday</option>
              <option value={5}>Friday</option>
              <option value={6}>Saturday</option>
            </select>
            <input
              name="startHour"
              type="number"
              min={1}
              max={12}
              required
              placeholder="Start"
              className="border rounded-lg px-3 py-2 w-1/3"
              value={form.startHour}
              onChange={handleChange}
            />
            <input
              name="endHour"
              type="number"
              min={1}
              max={12}
              required
              placeholder="End"
              className="border rounded-lg px-3 py-2 w-1/3"
              value={form.endHour}
              onChange={handleChange}
            />
          </div>
          <input
            name="users"
            type="text"
            placeholder="User avatars (comma separated, e.g. /avatar1.png)"
            className="border rounded-lg px-3 py-2"
            value={form.users}
            onChange={handleChange}
          />
          <input
            name="time"
            type="text"
            placeholder="Time range (optional)"
            className="border rounded-lg px-3 py-2"
            value={form.time}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#4640DE] text-white font-semibold hover:bg-[#342bb3]"
            >
              Create
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          <X />
        </button>
      </div>
    </div>
  );
}
