const userService = require("../services/user.service");
const { ErrorHandler } = require("../helpers/error");
const { hashPassword } = require("../helpers/hashPassword");

const getAllUsers = async (req, res) => {
  const { page = 1 } = req.query;

  const results = await userService.getAllUsers(page);
  res.status(200).json(results);
};

const createUser = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);

  const user = await userService.createUser({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    user,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  if (+id === req.user.id || req.user.roles.includes("admin")) {
    try {
      const user = await userService.getUserById(id);
      return res.status(200).json(user);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, "User not found");
    }
  }
  throw new ErrorHandler(401, "Unauthorized");
};

const getUserProfile = async (req, res) => {
  const { id } = req.user;

  const user = await userService.getUserById(id);

  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const {
    username,
    email,
    fullname,
    address,
    city,
    state,
    country,
    roles,
    password,
  } = req.body;
  const results = await userService.updateUser({
    username,
    email,
    fullname,
    address,
    city,
    state,
    country,
    id: req.params.id,
    roles,
    password,
  });
  return res.status(200).json(results);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await userService.deleteUser(id);
  res.status(200).json(result);
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
};
