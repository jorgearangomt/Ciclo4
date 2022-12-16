const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDAO = require("../database/userDAO");

const getAllUsers = async () => {
  try {
    const allUsers = await userDAO.getAllUsers();
    return allUsers;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await userDAO.getUserById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await userDAO.getUserByEmail(email);
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (user) => {
  try {
    const { password } = user;
    const isExist = await userDAO.getUserByEmail(user.email);
    if (isExist) {
      throw Object.assign(new Error("User with that email already exists"),
        { name: "EmailExistError" });
    }
    const encryptedPassword = await encryptPassword(password);
    user.password = encryptedPassword;
    const savedUser = await userDAO.createUser(user);
    return savedUser;
  } catch (error) {
    throw error;
  }
};


const updateUser = async (id, user) => {
  try {
    const updatedUser = await userDAO.updateUser(id, user);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    return await userDAO.deleteUser(id);
  } catch (error) {
    throw error;
  }
};

const encryptPassword = async (password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (registeredUser, password) => {
  try {
    const { _id } = registeredUser;
    const registeredPassword = await userDAO.getUserPassword(_id);
    const isMatch = bcrypt.compare(password, registeredPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  comparePassword,
};