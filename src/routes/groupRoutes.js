const express = require("express");
const {
  createGroup,
  joinGroup,
  leaveGroup,
} = require("../controllers/groupController");
const router = express.Router();

router.post("/", createGroup);
router.post("/:groupId/join", joinGroup);
router.post("/:groupId/leave", leaveGroup);

module.exports = router;
