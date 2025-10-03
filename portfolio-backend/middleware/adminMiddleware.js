import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id); // get from authMiddleware
    if (!user || !user.isAdmin) return res.status(403).json({ error: "Access denied. Admins only." });
    next();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export default adminMiddleware;
