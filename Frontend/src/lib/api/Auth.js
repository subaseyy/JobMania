
import Cookies from "js-cookie";

export async function login({ email, password, userType }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`, {
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
      const errorMessage =
        data.message || data.error || data.detail || "Login failed";
      throw new Error(errorMessage);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function sendOtp({ email }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/otp/`, {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-otp/`, {
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

export async function verifyEmailOtp({ email, otp }) {
  try {
    const token = Cookies.get("token");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-email-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token,
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
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

export async function submitJobApplication(jobId, formData) {
  const data = new FormData();
  data.append("jobId", jobId);
  data.append("coverLetter", formData.additionalInfo);
  if (formData.resume) {
    data.append("resume", formData.resume);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobApplications/apply`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: data,
  });

  if (!response.ok) throw new Error("Application failed");
  return await response.json();
}

export async function updateEmailWithOtp(email) {
  try {
    const token = Cookies.get("token");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/change-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP for email change");
    }

    return data;
  } catch (error) {
    throw error;
  }
}


export async function changePassword(oldPassword, newPassword) {
  try {
    const token = Cookies.get("token");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to change password");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
