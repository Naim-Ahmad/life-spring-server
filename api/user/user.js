const express = require("express");

const router = express.Router();

const User = require("../../models/User");
const verifyToken = require("../../middlewares/verifyToken");
const verifyAdmin = require("../../middlewares/verifyAdmin");

router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/users/:email", verifyToken, async (req, res) => {
  try {
    const query = { email: req.params.email };

    if (req.query.search) {
      // console.log('populate');
      const query = { email: { $regex: req.query.search, $options: "i" } };
      const users = await User.findOne(query);
      return res.send(users);
    }
    const users = await User.findOne(query);
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/users", verifyToken, async (req, res) => {
  try {
    // console.log(req.body);
    let user = new User(req.body);
    user = await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.put("/users/:id", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/users/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndUpdate(id, req.body, { upsert: true });
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
