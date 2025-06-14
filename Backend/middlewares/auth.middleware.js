const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
  let token = null;

  // Try Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Try custom header (used in your frontend)
  if (!token && req.headers["x-csrftoken"]) {
    token = req.headers["x-csrftoken"];
  }

  // Try cookie directly
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token || typeof token !== "string") {
    return res.status(401).json({ message: "Not authorized: Token missing or malformed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    console.error("JWT auth error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
