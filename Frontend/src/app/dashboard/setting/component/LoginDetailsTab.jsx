"use client";
import { useState } from "react";
import { CheckCircle, CircleAlert, CircleCheck } from "lucide-react";

export default function LoginDetailsTab() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const clearEmailMessages = () => {
    setTimeout(() => {
      setEmailError("");
      setEmailSuccess(false);
    }, 3000);
  };

  const clearPasswordMessages = () => {
    setTimeout(() => {
      setPasswordError("");
      setPasswordSuccess(false);
    }, 3000);
  };

  const handleEmailUpdate = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      setEmailSuccess(false);
      clearEmailMessages();
      return;
    }
    setEmailError("");
    setEmailSuccess(true);
    setEmail("");
    console.log("Updated Email:", email);
    clearEmailMessages();
  };

  const handlePasswordChange = () => {
    if (oldPassword.length < 8 || newPassword.length < 8) {
      setPasswordError("Passwords must be at least 8 characters long.");
      setPasswordSuccess(false);
      clearPasswordMessages();
      return;
    }
    setPasswordError("");
    setPasswordSuccess(true);
    console.log("Password Change:");
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    setOldPassword("");
    setNewPassword("");
    clearPasswordMessages();
  };

  return (
    <div className="px-6 py-8 text-sm text-gray-700">
      <div className="mb-6 border-b pb-6">
        <h2 className="font-epilogue font-semibold text-lg text-[#202430] mb-1">
          Basic Information
        </h2>
        <p className="font-epilogue text-base text-[#515B6F]">
          Update your login details to keep your account secure.
        </p>
      </div>

      {/* Email Update */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-8">
        <div>
          <p className="font-epilogue font-semibold text-base text-[#25324B] mb-1">
            Update Email
          </p>
          <p className="text-[#515B6F] max-w-[250px]">
            Ensure your email is up to date and secure.
          </p>
        </div>

        <div>
          <div className="font-epilogue text-base text-[#25324B] mb-2">
            <span className="font-medium">subaskandel@email.com</span>{" "}
            <CircleCheck className="inline w-5 h-5 text-[#56CDAD]" />
            <p className="text-sm text-[#7C8493]">Your email is verified.</p>
          </div>
          <label className="block font-epilogue font-semibold mb-1 text-[#515B6F]">
            New Email
          </label>
          <input
            type="email"
            placeholder="Enter your new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#D6DDEB] px-3 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-[#2E60F3] text-[#25324B]"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          {emailSuccess && (
            <p className="text-green-600 text-sm flex items-center gap-1">
              <CheckCircle size={16} /> Email updated successfully!
            </p>
          )}
          <button
            onClick={handleEmailUpdate}
            className="bg-[#4640DE] text-white font-epilogue font-medium text-base px-6 py-3 mt-2 hover:scale-[1.03] transition-all duration-300 ease-in-out"
          >
            Update Email
          </button>
        </div>
      </div>

      <hr className="my-6 border-[#E2E7F5]" />

      {/* Password Update */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-10">
        <div>
          <p className="font-epilogue font-semibold text-base text-[#25324B] mb-1">
            Change Password
          </p>
          <p className="text-[#515B6F] max-w-[250px]">
            Set a strong password to protect your account.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-epilogue font-semibold mb-1 text-[#515B6F]">
              Old Password
            </label>
            <input
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-[#D6DDEB] px-3 py-3 text-[#25324B]"
            />
          </div>

          <div>
            <label className="block font-epilogue font-semibold mb-1 text-[#515B6F]">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-[#D6DDEB] px-3 py-3 text-[#25324B]"
            />
            <p className="text-sm text-[#7C8493] mt-1">Minimum 8 characters</p>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          {passwordSuccess && (
            <p className="text-green-600 text-sm flex items-center gap-1">
              <CheckCircle size={16} /> Password updated successfully!
            </p>
          )}

          <button
            onClick={handlePasswordChange}
            className="bg-[#4640DE] text-white font-epilogue font-medium text-base px-6 py-3 hover:scale-[1.03] transition-all duration-300 ease-in-out"
          >
            Change Password
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="font-epilogue font-semibold text-base text-[#FF6550] flex items-center gap-1 justify-center hover:scale-[1.03] transition-all duration-300 ease-in-out">
          Close Account <CircleAlert color="#FF6550" size={20} />
        </button>
      </div>
    </div>
  );
}
