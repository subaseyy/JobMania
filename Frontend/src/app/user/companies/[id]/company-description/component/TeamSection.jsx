"use client";
import { Star } from "lucide-react";

export const TeamSection = ({ teamMembers }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
              {member.avatar}
            </div>
            <h3 className="font-medium text-gray-900 text-sm">{member.name}</h3>
            <p className="text-gray-500 text-xs">{member.role}</p>
            <div className="flex items-center justify-center mt-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600 ml-1">{member.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};