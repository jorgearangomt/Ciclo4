const User = require("../database/model/user");
const mongoose = require("mongoose");
const userService = require("../services/userService");
const authService = require("../services/authService");

const signup = async (req, res) => {
  const { body } = req;
  const { email, password, name } = body;
  if (!password) {
    return res.status(400).send("Password is required");
  }

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password
  });

  try {
    await User.validate(user);
    const createdUser = await userService.createUser(user);
    
    console.log(createdUser);
    return res.status(201).send(createdUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send("Invalid email");
    }
    else if (error.name === "EmailExistError") {
      return res.status(400).send({ message: error?.message } || error)
    }
    else {
      return res.status(500).send({ message: error?.message } || error);
    }
  }
};

const login = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    const registeredUser = await userService.getUserByEmail(email);
    if (!registeredUser) {
      return res.status(404).send({ message: "email not found"});
    }
    const isPasswordValid = await userService.comparePassword(registeredUser, password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "invalid password"});
    }
    const token = authService.generateToken(registeredUser);
    const cookie = authService.getJWTInCookie(token);
    res.setHeader('Set-Cookie', cookie);
    return res.status(200).send({ user: registeredUser,message: "login success"});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error?.message } || error);
  }
};

const logout = async (req, res) => {
  const revokedToken = authService.revokeToken();
  const cookie = authService.getJWTInCookie(revokedToken);
  res.setHeader('Set-Cookie', cookie);
  return res.status(200).send({message: "logout success"});
};

const isLogged = async (req, res) => {
  return res.status(200).send({message: "logged"});
};

module.exports = {
  signup,
  login,
  logout,
  isLogged,
};