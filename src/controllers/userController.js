const User = require("../database/model/user");
const mongoose = require("mongoose");

const userService = require("../services/userService");

//Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Obtener un usuario por su ID
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error?.message || error);
  }
};

//Crear un usuario
const createUser = async (req, res) => {
  try {

    const { body } = req;
    const { email, password,name } = body;
    if(!password){
      res.status(400).send("Password is required");
      return;
    }
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password
    });
    await User.validate(user);
    const createdUser = await userService.createUser(user);
    res.status(201).send(createdUser);
  } catch (error) {
    if(error.name === "ValidationError"){
      res.status(400).send("Invalid email");
    }
    else{
      res.status(500).send(error?.message || error);
    }
  }
};

//Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { body } = req;
    await User.validate(body);
    const updatedUser = await userService.updateUser(userId, body);
    if(updatedUser === null){
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send(error.message);
    }
    else if(error.name === "ValidationError"){
      res.status(400).send("Invalid email");
    }
    else{
      res.status(500).send(error?.message || error);
    }
  }
};

//Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser =await userService.deleteUser(userId);
    if(deletedUser === null){
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send("User deleted");
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send(error.message);
      return;
    }
    res.status(500).send(error?.message || error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
