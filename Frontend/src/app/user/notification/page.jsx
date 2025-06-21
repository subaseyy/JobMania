"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, BellDot, Calendar, Clock, User, X } from "lucide-react";

const NotificationSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const bodyRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "interview",
      title: "Jan Mayer invited you to interview with Nomad",
      role: "Social Media Manager",
      date: "Mon, 20 July 2023",
      time: "12 PM - 12:30 PM",
      email: "jakegyll@email.com",
      timeAgo: "12 mins ago",
      isNew: true,
      avatar: "/placeholder-avatar1.jpg",
      sender: "Jan Mayer",
    },
    {
      id: 2,
      type: "application",
      title: "Jana Alicia from Udacity updated your job application status",
      message:
        "Your application for Frontend Developer position has been shortlisted",
      status: "Shortlisted",
      timeAgo: "3 days ago",
      isNew: true,
      avatar: "/placeholder-avatar2.jpg",
      sender: "Jana Alicia",
    },
    {
      id: 3,
      type: "interview",
      title: "Ally Wales from Digital Ocean sent you an interview invitation",
      role: "Social Media Manager",
      date: "14 July 2023",
      time: "3:26 PM - 4 PM",
      email: "jakegyll@email.com",
      timeAgo: "5 days ago",
      isNew: false,
      avatar: "/placeholder-avatar3.jpg",
      sender: "Ally Wales",
    },
    {
      id: 4,
      type: "message",
      title: "New message from HR at TechCorp",
      message:
        "We'd like to schedule a follow-up discussion about your application",
      timeAgo: "1 week ago",
      isNew: false,
      avatar: "/placeholder-avatar4.jpg",
      sender: "Michael Brown",
    },
    {
      id: 5,
      type: "application",
      title: "Your application to DesignHub was reviewed",
      message: "Unfortunately, we've decided to proceed with other candidates",
      status: "Rejected",
      timeAgo: "2 weeks ago",
      isNew: false,
      avatar: "/placeholder-avatar5.jpg",
      sender: "Sarah Johnson",
    },
  ]);

  // Toggle body scroll
  useEffect(() => {
    bodyRef.current = document.body;
    return () => {
      if (bodyRef.current) {
        bodyRef.current.style.overflow = "";
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      bodyRef.current.style.overflow = "hidden";
    } else {
      bodyRef.current.style.overflow = "";
    }
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => n.isNew).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isNew: false })));
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isNew: false } : n))
    );
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getStatusBadge = (status) => {
    if (!status) return null;
    const colors = {
      Shortlisted: "bg-blue-100 text-blue-800",
      Rejected: "bg-red-100 text-red-800",
      New: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          colors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  // Close dropdown on outside click or Esc key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#25324B] hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Toggle notifications"
        aria-expanded={isOpen}
      >
        {unreadCount > 0 ? (
          <div className="relative">
            <BellDot size={20} className="text-[#4640DE]" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {unreadCount}
            </span>
          </div>
        ) : (
          <Bell size={20} />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:absolute sm:right-0 sm:top-full sm:mt-2 w-full sm:w-[600px] bg-white rounded-lg sm:shadow-xl sm:border sm:border-gray-200 z-50 max-h-screen sm:max-h-[600px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[#4640DE] text-sm font-medium hover:underline"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="sm:hidden p-1 text-gray-400 hover:text-gray-600 rounded"
                aria-label="Close notifications"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notification list */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    notification.isNew
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={notification.avatar}
                        alt={notification.sender}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c5e7c0c1a%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c5e7c0c1a%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20fill%3D%22%23e9ecef%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2214.3984375%22%20y%3D%2221.7%22%3E40x40%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                            {notification.title}
                          </p>
                          {notification.type === "interview" ? (
                            <div className="bg-white border border-gray-200 rounded-lg p-3 mb-2">
                              <p className="text-sm text-gray-600 mb-1">
                                {notification.role}
                              </p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {notification.date}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {notification.time}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="text-sm text-gray-600 truncate">
                                  {notification.email}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                          )}
                          {notification.status &&
                            getStatusBadge(notification.status)}
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {notification.timeAgo}
                            </span>
                            {notification.isNew && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-[#4640DE] hover:underline"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded flex-shrink-0"
                          aria-label="Remove notification"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 text-center sticky bottom-0 bg-white">
            <button className="text-[#4640DE] text-sm font-medium hover:underline">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
