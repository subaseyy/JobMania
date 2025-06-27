"use client";
import { useContext, useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/Auth";
import { AuthContext } from "@/context/AuthContext";
import Cookies from "js-cookie";

export default function Login() {
  const [activeTab, setActiveTab] = useState("job_seeker");
  const { setAuth } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = await login({
        email,
        password,
        role: activeTab,
      });
      // console.log("data", data);
      setAuth({
        role: data.role,
        user_id: data.user_id,
        username: data.username,
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      router.push("/");
      router.refresh();    
    } catch (error) {
      // console.error("Login failed:", error.message);
      setError(error.message || "Login failed. Please try again.");
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/google-oauth2/`;
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center bg-white py-16 px-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="flex justify-center gap-4">
            <button
              className={`px-4 py-2 font-epilogue font-[600] text-base leading-[160%] ${
                activeTab === "jobseeker" ? "bg-[#E9EBFD] text-[#4640DE]" : ""
              }`}
              onClick={() => setActiveTab("jobseeker")}
            >
              Job Seeker
            </button>
            <button
              className={`px-4 py-2 font-epilogue font-[600] text-base leading-[160%] ${
                activeTab === "company" ? "bg-[#E9EBFD] text-[#4640DE]" : ""
              }`}
              onClick={() => setActiveTab("company")}
            >
              Company
            </button>
          </div>

          <h2 className="font-clash font-[600] text-[32px] leading-[120%] text-center text-[#202430]">
            Welcome Back, {activeTab === "jobseeker" ? "Hero" : "Boss"}
          </h2>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              className="font-epilogue font-[700] text-base leading-[160%] text-[#4640DE] w-full border border-gray-300 py-3 rounded flex items-center justify-center space-x-2 hover:bg-gray-100"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Login with Google</span>
            </button>

            <div className="flex items-center justify-center gap-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="font-epilogue font-[400] text-base leading-[160%] text-[#202430]">
                Or login with email
              </span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="font-epilogue font-[600] text-base leading-[160%] text-[#515B6F]">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-epilogue font-[400] text-base leading-[160%] text-[#202430]"
                />
              </div>

              <div className="space-y-2">
                <label className="font-epilogue font-[600] text-base leading-[160%] text-[#515B6F]">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-epilogue font-[400] text-base leading-[160%] text-[#202430]"
                />
              </div>

              <div className="flex items-center justify-between font-epilogue font-[400] text-base leading-[160%] text-[#515B6F]">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-blue-600"
                  />
                  <span>Remember me</span>
                </label>
                <a href="/forgot-password" className="text-[#4640DE]">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-epilogue font-[700] text-base leading-[160%]"
              >
                Login
              </button>
            </form>

            <p className="pt-2 font-epilogue font-[400] text-base leading-[160%] text-[#202430]">
              Don't have an account?{" "}
              <a href="/signup" className="text-[#4640DE] font-[600]">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
