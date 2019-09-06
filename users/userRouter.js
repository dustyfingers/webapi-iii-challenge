const express = require("express");
const db = require("./userDb.js");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", async (req, res) => {
  const users = await db.get();
  res.status(200).json({ api: users });
});

router.get("/:id", async (req, res) => {
  const user = await db.getById(req.params.id);
  res.status(200).json({ api: user });
});

router.get("/:id/posts", async (req, res) => {
    const posts = await db.getUserPosts(req.params.id);
    res.status(200).json({ api: posts });
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
