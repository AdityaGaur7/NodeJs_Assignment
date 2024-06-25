const User = require('../models/userModel');

const getAllUsers = async () => {
  return await User.find({ isDeleted: false });
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const softDeleteUser = async (userId) => {
  return await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  softDeleteUser,
};
