const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const verifyToken = require("../../middlewares/verifyToken");

router.post("/createToken", async (req, res) => {
  try {
    const query = { email: req.body?.email };
    const user = await User.findOne(query);

    if ((user && user?.email) !== req.body?.email) {
      return res.status(401).send({ message: "unauthorized access" });
    }

    const token = jwt.sign(req.body, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .send({ message: "token created!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/isAdmin", verifyToken, async (req, res) => {
  try {
    const query = { email: req?.decoded?.email };
    const userData = await User.findOne(query);
    res.send(userData?.role === "admin");
  } catch (error) {
    res.status(500).send("Server Side error");
  }
});

router.delete("/deleteToken", async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/isActive", verifyToken, async (req, res) => {
  try {
    const userData = await User.findOne({ email: req?.decoded?.email });
    res.send(userData.status === "active");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
