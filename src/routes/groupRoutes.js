const express = require("express");
const {
  createGroup,
  joinGroup,
  leaveGroup,
  fetchGroups,
} = require("../controllers/groupController");
const router = express.Router();

router.get("/", fetchGroups);
router.post("/", createGroup);
router.post("/:groupId/join", joinGroup);
router.post("/:groupId/leave", leaveGroup);

module.exports = router;
