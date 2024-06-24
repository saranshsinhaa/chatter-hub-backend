const Group = require("../models/Group");

const createGroup = async (req, res) => {
  const { name } = req.body;
  try {
    const group = new Group({ name, members: [req.user.id] });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const joinGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId);
    if (!group.members.includes(req.user.id)) {
      group.members.push(req.user.id);
      await group.save();
    }
    res.json(group);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const leaveGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId);
    group.members = group.members.filter(
      (member) => member.toString() !== req.user.id
    );
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { createGroup, joinGroup, leaveGroup };
