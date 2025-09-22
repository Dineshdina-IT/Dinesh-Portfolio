import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Extract token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // attach only user id
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token is not valid" });
  }
};

export default authMiddleware;
