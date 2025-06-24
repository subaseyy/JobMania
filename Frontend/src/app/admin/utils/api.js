// utils/api.js
const API_BASE = "http://localhost:5000"; // Change to your backend URL

// You may need to pass token in headers if protected
const getToken = () => localStorage.getItem('token');

export const fetchUsers = async () => {
  const res = await fetch(`${API_BASE}/Admin-allProfileGet`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
};

export const fetchUser = async (id) => {
  const res = await fetch(`${API_BASE}/Admin-OneProfileGet/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
};

export const createUser = async (user) => {
  const res = await fetch(`${API_BASE}/register admin add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`${API_BASE}/Admin-OneProfileupdate/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_BASE}/Admin-OneProfileDelete/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
};
