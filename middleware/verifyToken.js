import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log(token)

  if(!token) res.status(401).json({message: "Access denied"});
  try {
    const isVerified = jwt.verify(token, process.env.SECRET);
    req.user = isVerified;
    next();
  } catch (error) {
    res.status(400).json({message: "Invalid token"})
  }
}

export const isAdmin = (req, res, next) => {
  if(req.user.role !== "admin") res.status(400).json({message: "Access denied admin"});
  next();
}