const userService = require('../services/userService');
const { validateUser, validateId } = require('../utils/validators');

const listUsers = async (req, res) => {
  const users = await userService.listUsers();
  res.json(users);
};

const getUser = async (req, res) => {
  const userId = req.params.userId;
  await validateId(userId);
  const user = await userService.getUser(userId);
  res.json(user);
};

const createUser = async (req, res) => {
  const userData = req.body;
  await validateUser(userData);
  const user = await userService.createUser(userData);
  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const userData = req.body;
  await validateId(userId);
  await validateUser(userData, true);
  const user = await userService.updateUser(userId, userData);
  res.json(user);
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  await validateId(userId);
  await userService.deleteUser(userId);
  res.status(204).end();
};

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
