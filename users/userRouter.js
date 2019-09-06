const express = require("express");
const db = require("./userDb.js");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    db.insert(req.body);
    let users = await db.get();
    res.status(200).json( users );
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/:id/posts", validateUserId, (req, res) => {});

router.get("/", async (req, res) => {
  const users = await db.get();
  res.status(200).json({ api: users });
});

router.get("/:id", validateUserId, async (req, res) => {
  const user = await db.getById(req.params.id);
  res.status(200).json({ api: user });
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  const posts = await db.getUserPosts(req.params.id);
  res.status(200).json({ api: posts });
});

router.delete("/:id", validateUserId, async (req, res) => {
  await db.remove(req.params.id);
  res.status(200).json({ api: 'user deleted' });
});

router.put("/:id", validateUserId, (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const user = await db.getById(req.params.id);
    if (user) {
      next();
    } else {
      res.status(500).json({ error: 'user does not exist'});
    }
  } catch (err) {
    console.log(err.message);
  }
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
