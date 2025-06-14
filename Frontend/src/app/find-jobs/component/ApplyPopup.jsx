"use client";
import { useState, useEffect, useRef } from "react";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import Cookies from "js-cookie";
import { submitJobApplication } from "@/lib/api/Auth";

export default function ApplyPopup({ job, company, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentTitle: "",
    linkedin: "",
    portfolio: "",
    additionalInfo: "",
    resume: "",
  });
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // console.log("Application data when closed by outside click:", {
        //   jobId: job.id,
        //   jobTitle: job.title,
        //   ...formData,
        //   resume: resume ? resume.name : null,
        // });
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formData, resume, job.id, job.title, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Submitting application with job ID:", job.id);
      console.log("Cover letter:", formData);
      console.log("Access token:", Cookies.get("access_token"));

      const result = await submitJobApplication(job.id, formData);

      console.log("Application submitted:", result);
      alert("Application submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6 overflow-y-auto"
      onTouchMove={(e) => e.preventDefault()}
    >
      <div
        ref={popupRef}
        className="bg-white p-6 w-full max-w-md relative py-12 max-h-[90vh] overflow-y-auto "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div>
              <Image
                src={company.icon || "/jobs/default-company.png"}
                alt={company.name}
                width={48}
                height={48}
                className="rounded object-contain"
              />
            </div>
            <div className="flex flex-col ml-6">
              <h3 className="font-clash font-[600] text-2xl leading-[120%] text-[#25324B]">
                {job.title}
              </h3>
              <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F]">
                {company.name} • {company.location} • {job.type}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              console.log("Application closed manually for job:", job.title);
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="h-[1px] w-full bg-[#D6DDEB] my-8" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h4 className="font-clash font-[600] text-2xl leading-[120%] text-[#25324B]">
              Submit your application
            </h4>
            <p className="font-epilogue font-[400] text-sm leading-[160%] text-[#7C8493] pt-2">
              The following is required and will only be shared with Nomad
            </p>
          </div>

          <div>
            <label className="font-clash font-[600] text-base leading-[160%] text-[#515B6F]">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              className="w-full mt-1 p-2 border rounded font-epilogue font-[400] text-sm leading-[160%] text-[#A8ADB7]"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-clash font-[600] text-base leading-[160%] text-[#515B6F]">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 p-2 border rounded font-epilogue font-[400] text-sm leading-[160%] text-[#A8ADB7]"
              placeholder="Enter your email address"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-clash font-[600] text-base leading-[160%] text-[#515B6F]">
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full mt-1 p-2 border rounded font-epilogue font-[400] text-sm leading-[160%] text-[#A8ADB7]"
              placeholder="Enter your phone number"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-clash font-[600] text-base leading-[160%] text-[#515B6F]">
              Current or previous job title
            </label>
            <input
              type="text"
              name="currentTitle"
              className="w-full mt-1 p-2 border rounded font-epilogue font-[400] text-sm leading-[160%] text-[#A8ADB7]"
              placeholder="What is your current or previous job title?"
              onChange={handleChange}
            />
          </div>
          <div className="h-[1px] w-full bg-[#D6DDEB]" />

          {/* Links */}
          <h4 className="font-clash font-[700] text-lg leading-[160%] text-[#515B6F] pt-2">
            LINKS
          </h4>

          <div>
            <label className="font-clash font-[600] text-base leading-[160%] text-[#515B6F]">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin"
              className="w-full mt-1 p-2 border rounded font-epilogue font-[400] text-sm leading-[160%] text-[#A8ADB7]"
              placeholder="Link to your LinkedIn URL"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-clash font-[600] text-base leading-[160%] text-[#515B6F]">
              Portfolio URL
            </label>
            <input
              type="url"
              name="portfolio"
              className="w-full mt-1 p-2 border rounded font-epilogue font-[400] text-sm leading-[160%] text-[#A8ADB7]"
              placeholder="Link to your portfolio"
              onChange={handleChange}
            />
          </div>

          {/* Additional Info */}
          <div>
            <label className="font-clash font-[600] text-base leading-[160%] text-[#515B6F]">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              rows={4}
              className="w-full mt-1 p-2 border rounded font-epilogue font-[400] text-sm leading-[160%] text-[#A8ADB7]"
              placeholder="Add a cover letter or anything else you want to share"
              onChange={handleChange}
            ></textarea>
            <p className="text-xs text-gray-400 text-right mt-1">
              Maximum 500 characters
            </p>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="font-clash font-[600] text-base leading-[160%] text-[#515B6F]">
              Attach your resume
            </label>
            <label
              htmlFor="resume-upload"
              className="mt-1 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-50"
            >
              <Paperclip className="h-4 w-4 text-gray-500" />
              {resume ? resume.name : "Attach Resume (.pdf, .docx, .doc)"}
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-[#4640DE] text-white py-2 rounded hover:bg-[#3932b8] text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>

        <p className="text-[11px] text-center text-gray-400 mt-4">
          By sending the request you confirm that you accept our{" "}
          <span className="text-[#4640DE] underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-[#4640DE] underline cursor-pointer">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}
