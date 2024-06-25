const userDao = require('../dao/userDao');

const listUsers = async () => {
  return await userDao.getAllUsers();
};

const getUser = async (userId) => {
  return await userDao.getUserById(userId);
};

const createUser = async (userData) => {
  return await userDao.createUser(userData);
};

const updateUser = async (userId, userData) => {
  return await userDao.updateUser(userId, userData);
};

const deleteUser = async (userId) => {
  return await userDao.softDeleteUser(userId);
};

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
