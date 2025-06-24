"use client";

import { useState, useEffect } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import PostJobModal from "../components/PostJobModal ";
import CreateEventModal from "../components/CreateEventModal";


const initialEvents = [
  {
    id: 1,
    title: "Interview session with Kathryn Murphy",
    start: { day: 1, hour: 2 },
    end: { day: 1, hour: 5 },
    color: "bg-blue-500",
    category: "Interview Schedule",
    time: "02.00 - 05.00 AM",
    users: ["/avatar1.png", "/avatar2.png"],
  },
  {
    id: 2,
    title: "Interview session",
    start: { day: 1, hour: 8 },
    end: { day: 1, hour: 9 },
    color: "bg-blue-500",
    category: "Interview Schedule",
    time: "08.00 - 09.00 AM",
    users: [],
  },
  {
    id: 3,
    title: "Meeting with staff",
    start: { day: 2, hour: 9 },
    end: { day: 2, hour: 10 },
    color: "bg-green-500",
    category: "Internal Meeting",
    time: "09.00 - 10.00 AM",
    users: [],
  },
];

const initialCategories = [
  { name: "Interview Schedule", color: "bg-blue-500", checked: true },
  { name: "Internal Meeting", color: "bg-green-500", checked: true },
  { name: "Team Schedule", color: "bg-gray-400", checked: false },
  { name: "My Task", color: "bg-purple-500", checked: false },
  { name: "Reminders", color: "bg-yellow-400", checked: false },
];

export default function MySchedule() {
  const [showJobModal, setShowJobModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const [categories, setCategories] = useState(initialCategories);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("week");

  // Get the current week days
  const getWeekDays = (date) => {
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay()); // Start from Sunday

    return Array.from({ length: 7 }).map((_, i) => {
      const dayDate = new Date(startDate);
      dayDate.setDate(startDate.getDate() + i);

      return {
        label: dayDate
          .toLocaleDateString("en-US", { weekday: "short" })
          .toUpperCase(),
        date: dayDate.getDate(),
        day: dayDate.getDay(),
        fullDate: new Date(dayDate),
        holiday: i === 4, // Thursday is marked as holiday in this example
      };
    });
  };

  const [weekDays, setWeekDays] = useState(getWeekDays(currentDate));

  // Handle date navigation
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else if (view === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  // Update week days when date changes
  useEffect(() => {
    setWeekDays(getWeekDays(currentDate));
  }, [currentDate]);

  // Handle today button click
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Handle category toggle
  const toggleCategory = (name) => {
    setCategories(
      categories.map((cat) =>
        cat.name === name ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  // Handle job posting
  const handlePostJob = (data) => {
    console.log("Posting job:", data);
    setShowJobModal(false);
  };

  // Handle event creation
  const handleCreateEvent = (event) => {
    const newEvent = {
      ...event,
      id: Math.max(...events.map((e) => e.id), 0) + 1,
      time: `${event.start.hour
        .toString()
        .padStart(2, "0")}.00 - ${event.end.hour
        .toString()
        .padStart(2, "0")}.00 ${event.start.hour < 12 ? "AM" : "PM"}`,
      users: [],
    };
    setEvents([...events, newEvent]);
    setShowEventModal(false);
  };

  // Get active categories
  const activeCats = categories.filter((c) => c.checked).map((c) => c.name);

  // Generate calendar days for the month view
  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    // Add days from previous month
    const prevMonthDays = firstDay.getDay();
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date: date.getDate(),
        currentMonth: false,
        isToday: false,
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date: i,
        currentMonth: true,
        isToday: date.toDateString() === new Date().toDateString(),
      });
    }

    // Add days from next month
    const nextMonthDays = 6 - lastDay.getDay();
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        date: i,
        currentMonth: false,
        isToday: false,
      });
    }

    return days;
  };

  // Format month and year for display
  const monthYearFormat = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <h2 className="text-xl font-bold mr-4">My Schedule</h2>
          <button
            className="text-[#4640DE] font-semibold border border-[#eceafe] px-3 py-1 rounded-lg text-sm bg-[#eceafe]"
            onClick={goToToday}
          >
            Today
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold text-[#4640DE] border border-[#eceafe] bg-[#eceafe]"
            onClick={() => setShowEventModal(true)}
          >
            <Plus className="inline-block w-4 h-4 mr-1" />
            Create Event
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#4640DE] hover:bg-[#342bb3]"
            onClick={() => setShowJobModal(true)}
          >
            + Post a job
          </button>
        </div>
      </div>

      {/* Week & View Switcher */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => navigateDate("prev")}
          >
            <ChevronLeft />
          </button>
          <span className="font-semibold text-gray-800">{monthYearFormat}</span>
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => navigateDate("next")}
          >
            <ChevronRight />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className={`font-medium px-3 py-1 rounded text-sm ${
              view === "week"
                ? "text-[#4640DE] border-b-2 border-[#4640DE]"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={`font-medium px-3 py-1 rounded text-sm ${
              view === "day"
                ? "text-[#4640DE] border-b-2 border-[#4640DE]"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => setView("day")}
          >
            Day
          </button>
          <button
            className={`font-medium px-3 py-1 rounded text-sm ${
              view === "month"
                ? "text-[#4640DE] border-b-2 border-[#4640DE]"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => setView("month")}
          >
            Month
          </button>
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        {/* Left Sidebar: Calendar & Categories */}
        <div className="w-60 flex-shrink-0">
          {/* Mini Calendar */}
          <div className="mb-6">
            <div className="font-semibold mb-1 text-sm">{monthYearFormat}</div>
            <div className="grid grid-cols-7 text-xs gap-1 mb-1 text-gray-500">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {getMonthDays().map((day, i) => (
                <div
                  key={i}
                  className={`py-1 px-0.5 rounded-full text-xs ${
                    day.isToday
                      ? "bg-[#4640DE] text-white font-semibold"
                      : day.currentMonth
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  {day.date}
                </div>
              ))}
            </div>
          </div>
          {/* Categories */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">Categories</span>
              <button className="text-[#4640DE] text-xs font-medium hover:underline">
                + Add Category
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <label
                  key={cat.name}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleCategory(cat.name)}
                >
                  <input
                    type="checkbox"
                    checked={cat.checked}
                    onChange={() => {}}
                    className="accent-[#4640DE]"
                  />
                  <span className={`w-3 h-3 rounded-full ${cat.color} block`} />
                  <span className="text-xs text-gray-700">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-x-auto">
          {view === "week" && (
            <>
              <div className="grid grid-cols-7 border-b text-xs font-medium text-gray-600">
                {weekDays.map((d, i) => (
                  <div
                    key={i}
                    className={`py-2 px-2 text-center border-r last:border-r-0 ${
                      d.holiday ? "text-[#E8594A]" : ""
                    }`}
                  >
                    <div>{d.label}</div>
                    <div
                      className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs ${
                        d.holiday
                          ? "bg-[#FFE5E2] text-[#E8594A] font-bold"
                          : d.fullDate.toDateString() ===
                            new Date().toDateString()
                          ? "bg-[#4640DE] text-white"
                          : ""
                      }`}
                    >
                      {d.date}
                      {d.holiday ? " Holiday" : ""}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative">
                <div className="absolute left-0 w-10 flex flex-col h-full z-10">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className="h-14 text-xs text-gray-400 text-right pr-2"
                    >
                      {i === 0
                        ? "12 AM"
                        : i < 12
                        ? `${i} AM`
                        : i === 12
                        ? "12 PM"
                        : `${i - 12} PM`}
                    </div>
                  ))}
                </div>
                <div className="ml-10 grid grid-cols-7 h-[24*56px] relative">
                  {Array.from({ length: 24 }, (_, hour) => (
                    <div key={hour} className="border-t border-gray-100 h-14" />
                  ))}
                  {events
                    .filter((ev) => activeCats.includes(ev.category))
                    .map((ev) => {
                      const dayIdx = ev.start.day;
                      const top = ev.start.hour * 56;
                      const height = (ev.end.hour - ev.start.hour) * 56;
                      return (
                        <div
                          key={ev.id}
                          className={`absolute z-20 left-[calc((${dayIdx}*100%)/7)] w-[calc(100%/7)] px-1`}
                          style={{ top, height }}
                        >
                          <div
                            className={`rounded-lg ${ev.color} text-white p-2 shadow-md flex flex-col justify-between h-full`}
                          >
                            <div className="text-xs font-semibold truncate">
                              {ev.title}
                            </div>
                            <div className="text-[10px]">{ev.time}</div>
                            <div className="flex mt-1">
                              {ev.users &&
                                ev.users.map((u, i) => (
                                  <img
                                    src={u}
                                    key={i}
                                    className="w-5 h-5 rounded-full border-2 border-white -ml-1 first:ml-0"
                                  />
                                ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {weekDays[4].holiday && (
                    <div className="absolute top-0 left-[calc((4*100%)/7)] w-[calc(100%/7)] h-full bg-[#FFE5E2] opacity-60 pointer-events-none"></div>
                  )}
                </div>
              </div>
            </>
          )}

          {view === "day" && (
            <div className="relative">
              <div className="absolute left-0 w-10 flex flex-col h-full z-10">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="h-14 text-xs text-gray-400 text-right pr-2"
                  >
                    {i === 0
                      ? "12 AM"
                      : i < 12
                      ? `${i} AM`
                      : i === 12
                      ? "12 PM"
                      : `${i - 12} PM`}
                  </div>
                ))}
              </div>
              <div className="ml-10 h-[24*56px] relative">
                {Array.from({ length: 24 }, (_, hour) => (
                  <div key={hour} className="border-t border-gray-100 h-14" />
                ))}
                {events
                  .filter((ev) => activeCats.includes(ev.category))
                  .filter((ev) => {
                    const eventDate = new Date(currentDate);
                    eventDate.setDate(
                      eventDate.getDate() - eventDate.getDay() + ev.start.day
                    );
                    return (
                      eventDate.toDateString() === currentDate.toDateString()
                    );
                  })
                  .map((ev) => {
                    const top = ev.start.hour * 56;
                    const height = (ev.end.hour - ev.start.hour) * 56;
                    return (
                      <div
                        key={ev.id}
                        className="absolute z-20 left-0 w-full px-1"
                        style={{ top, height }}
                      >
                        <div
                          className={`rounded-lg ${ev.color} text-white p-2 shadow-md flex flex-col justify-between h-full`}
                        >
                          <div className="text-xs font-semibold truncate">
                            {ev.title}
                          </div>
                          <div className="text-[10px]">{ev.time}</div>
                          <div className="flex mt-1">
                            {ev.users &&
                              ev.users.map((u, i) => (
                                <img
                                  src={u}
                                  key={i}
                                  className="w-5 h-5 rounded-full border-2 border-white -ml-1 first:ml-0"
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {view === "month" && (
            <div className="border rounded-lg">
              <div className="grid grid-cols-7 border-b">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="py-2 text-center text-xs font-medium text-gray-600"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-7">
                {getMonthDays().map((day, i) => {
                  const dayEvents = events.filter((ev) => {
                    const eventDate = new Date(currentDate);
                    eventDate.setMonth(eventDate.getMonth(), day.date);
                    return (
                      day.currentMonth &&
                      activeCats.includes(ev.category) &&
                      ev.start.day === eventDate.getDay()
                    );
                  });

                  return (
                    <div
                      key={i}
                      className={`min-h-24 border p-1 ${
                        !day.currentMonth ? "bg-gray-50" : ""
                      }`}
                    >
                      <div
                        className={`text-right text-xs p-1 ${
                          day.isToday
                            ? "bg-[#4640DE] text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                            : ""
                        }`}
                      >
                        {day.date}
                      </div>
                      <div className="space-y-1 mt-1">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <div
                            key={ev.id}
                            className={`text-xs p-1 rounded truncate ${ev.color} text-white`}
                          >
                            {ev.time} {ev.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job Modal */}
      <PostJobModal
        open={showJobModal}
        onClose={() => setShowJobModal(false)}
        onSubmit={handlePostJob}
      />
      {/* Create Event Modal */}
      <CreateEventModal
        open={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSubmit={handleCreateEvent}
        weekDays={weekDays}
      />
    </div>
  );
}
