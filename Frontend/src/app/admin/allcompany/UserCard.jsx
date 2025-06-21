// app/admin/allusers/UserCard.js
"use client";
import { Edit, Trash2 } from "lucide-react";

export default function UserCard({
  user,
  onEdit,
  onDelete,
  getRoleColor,
  getStatusColor,
}) {
  return (
    <div className="block sm:hidden bg-white rounded-lg shadow p-4 mb-4 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-lg text-gray-800">{user.name}</div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(user)}
            className="text-[#4640DE] hover:text-[#3a35c7] flex items-center"
            aria-label="Edit user"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="text-red-600 hover:text-red-800 flex items-center"
            aria-label="Delete user"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-1">
        <span className="font-semibold">Email:</span> {user.email}
      </div>
      <div className="text-sm mb-1">
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getRoleColor(
            user.role
          )}`}
        >
          {user.role}
        </span>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            user.status
          )}`}
        >
          {user.status}
        </span>
      </div>
    </div>
  );
}
