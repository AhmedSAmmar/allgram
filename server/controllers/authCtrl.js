import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";

const createAccessToken = (userId) => {
  return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (userId) => {
  return jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ message: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        email,
        password: passwordHash,
      });

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: "/refreshToken",
      });

      await newUser.save();

      res.json({
        message: "Register Success!",
        accessToken,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user)
        return res.status(400).json({ message: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Password is incorrect." });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        path: "/api/refreshToken",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Login Success!",
        accessToken,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/api/refreshToken" });
      return res.json({ message: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return res.status(400).json({ message: "Please login now." });

      const verified = jwt.verify(
        refreshToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      if (!verified)
        return res.status(400).json({ message: "Invalid Authentication." });

      const user = await Users.findOne({ _id: verified.id });

      if (!user)
        return res.status(400).json({ message: "This does not exist." });

      const accessToken = createAccessToken({ id: user._id });

      res.json({
        accessToken,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default authCtrl;
