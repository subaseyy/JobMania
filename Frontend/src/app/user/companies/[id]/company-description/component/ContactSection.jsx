"use client";
import { Mail, Phone, Globe } from "lucide-react";

export const ContactSection = ({ company }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Contact</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="text-sm">
            contact@{company.name.toLowerCase().replace(/\s/g, "")}.com
          </span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span className="text-sm">+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Globe className="w-4 h-4" />
          <span className="text-sm">
            www.{company.name.toLowerCase().replace(/\s/g, "")}.com
          </span>
        </div>
      </div>
    </div>
  );
};