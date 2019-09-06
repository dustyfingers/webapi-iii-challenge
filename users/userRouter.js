const express = require("express");
const db = require("./userDb.js");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    db.insert(req.body);
    let users = await db.get();
    res.status(200).json( users );
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/:id/posts", (req, res) => {});

router.get("/", async (req, res) => {
  const users = await db.get();
  res.status(200).json({ api: users });
});

router.get("/:id", validateUserId, async (req, res) => {
  const user = await db.getById(req.params.id);
  res.status(200).json({ api: user });
});

router.get("/:id/posts", async (req, res) => {
  const posts = await db.getUserPosts(req.params.id);
  res.status(200).json({ api: posts });
});

router.delete("/:id", async (req, res) => {
  const deleteSuccessful = await db.remove(req.params.id);
  res.status(200).json({ api: deleteSuccessful });
});

router.put("/:id", (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  const userId = req.params.id;
  console.log(userId);
  try {
    const user = await db.getById(userId);
    console.log(user);
    if (user) next(); 
  } catch (err) {
    console.log(err.message);
  }
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
