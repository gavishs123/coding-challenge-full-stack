const express = require("express");
const { fetchFeeds } = require("../controller/main.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ data: { message: "Backend started!" } });
});

// Method to fetch and
router.get("/api/list", fetchFeeds);

module.exports = router;
