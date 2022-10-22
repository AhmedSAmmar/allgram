import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!verified)
      return res.status(400).json({ msg: "Invalid Authentication." });

    const user = await Users.findOne({ _id: verified.id });

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default auth;
