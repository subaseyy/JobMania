const API_BASE = "http://localhost:5050/api";
import Cookies from "js-cookie";

export async function login({ email, password, userType }) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role: userType,
      }),
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Login failed");

    return data;
  } catch (error) {
    throw error;
  }
}

export async function register({ full_name, email, password, role }) {
  try {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: full_name,
        email,
        password,
        role: role,
      }),
    });

    const data = await response.json();
if (!response.ok) {
  const errorMessage = data.message || data.error || data.detail || "Login failed";
  throw new Error(errorMessage);
}
    return data;
  } catch (error) {
    throw error;
  }
}

export async function sendOtp({ email }) {
  try {
    const response = await fetch(`${API_BASE}/auth/otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "OTP send failed");

    return data;
  } catch (error) {
    throw error;
  }
}

export async function verifyOtp({ email, otp }) {
  try {
    const response = await fetch(`${API_BASE}/auth/verify-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.detail || "OTP verification failed");



    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProfile() {
  try {

     const token = Cookies.get("token"); 

    if (!token) throw new Error("Token is missing");



    const response = await fetch(`${API_BASE}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
    });



    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Failed to fetch profile");

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(profileData) {
  try {
    const isFormData = profileData instanceof FormData;

    const headers = {
      "X-CSRFToken": Cookies.get("token"),
    };

    // Only set Content-Type for JSON, not for FormData
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_BASE}/users/profile`, {
      method: "PUT",
      headers,
      credentials: "include",
      body: isFormData ? profileData : JSON.stringify(profileData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "Failed to update profile");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// api/auth.js

export async function submitJobApplication(jobId, coverLetter) {
  const response = await fetch(`${API_BASE}/institutions/job-applications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
    credentials: "include",
    body: JSON.stringify({
      job_id: jobId,
      cover_letter: coverLetter || "",
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Submission failed");
  }

  return result;
}

