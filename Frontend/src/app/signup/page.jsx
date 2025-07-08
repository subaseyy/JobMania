"use client";
import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/navigation";
import { register, sendOtp, verifyOtp } from "@/lib/api/Auth";
import OTPModal from "./components/OTPModal";

export default function Signup() {
  const [activeTab, setActiveTab] = useState("jobseeker");
  const [error, setError] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState(null);
  const [pendingUserData, setPendingUserData] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target);
    const full_name = formData.get("full_name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = await register({
        full_name,
        email,
        password,
        role: activeTab,
        ...(activeTab === "company" && { companyName: full_name }),
      });

      // await sendOtp({ email });
      setEmailForOtp(email);
      setPendingUserData({ token: data.token, user: data.user });
      setShowOtpModal(true);
    } catch (error) {
      console.error("Signup failed:", error.message);
      setError(error.message || "Signup failed. Please try again.");
    }
  };

  const handleOtpVerified = async () => {
    if (pendingUserData) {
 
      router.push("/");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/google-oauth2/?signup=true`;
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center bg-white py-16 px-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="flex justify-center gap-4">
            <button
              className={`px-4 py-2 font-[600] ${
                activeTab === "jobseeker" ? "bg-[#E9EBFD] text-[#4640DE]" : ""
              }`}
              onClick={() => setActiveTab("jobseeker")}
            >
              Job Seeker
            </button>
            <button
              className={`px-4 py-2 font-[600] ${
                activeTab === "company" ? "bg-[#E9EBFD] text-[#4640DE]" : ""
              }`}
              onClick={() => setActiveTab("company")}
            >
              Company
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          <button
            onClick={handleGoogleSignup}
            className="w-full border py-3 rounded flex items-center justify-center space-x-2 hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Sign up with Google</span>
          </button>

          <div className="flex items-center justify-center gap-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-[#202430]">Or sign up with email</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label>
                {activeTab === "jobseeker" ? "Full name" : "Company name"}
              </label>
              <input
                name="full_name"
                type="text"
                placeholder={
                  activeTab === "jobseeker"
                    ? "Enter your full name"
                    : "Enter company name"
                }
                required
                className="w-full px-4 py-3 border rounded"
              />
            </div>

            <div>
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder={
                  activeTab === "jobseeker"
                    ? "Enter your Email"
                    : "Enter company Email"
                }
                required
                className="w-full px-4 py-3 border rounded"
              />
            </div>

            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder={
                  activeTab === "jobseeker"
                    ? "Enter your Password"
                    : "Enter Password"
                }
                required
                className="w-full px-4 py-3 border rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4640DE] text-white py-3 rounded hover:bg-[#3730c0]"
            >
              Continue
            </button>
          </form>

          <p className="pt-2 text-[#202430]">
            Already have an account?{" "}
            <a href="/login" className="text-[#4640DE] font-[600]">
              Login
            </a>
          </p>
        </div>
      </div>

      {showOtpModal && emailForOtp && (
        <OTPModal
          email={emailForOtp}
          onVerify={handleOtpVerified}
          onClose={() => setShowOtpModal(true)}
        />
      )}
    </AuthLayout>
  );
}