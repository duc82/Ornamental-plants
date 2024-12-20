const {
  createUserDb,
  getUserByEmailDb,
  createUserGoogleDb,
  changeUserPasswordDb,
  getUserByIdDb,
  updateUserDb,
  deleteUserDb,
  getAllUsersDb,
  getUserByUsernameDb,
} = require("../db/user.db");
const { ErrorHandler } = require("../helpers/error");

class UserService {
  createUser = async (user) => {
    return createUserDb(user);
  };
  getUserByEmail = async (email) => {
    return getUserByEmailDb(email);
  };
  getUserByUsername = async (username) => {
    return getUserByUsernameDb(username);
  };
  getUserById = async (id) => {
    const user = await getUserByIdDb(id);
    user.password = undefined;
    user.google_id = undefined;
    user.cart_id = undefined;
    return user;
  };
  createGoogleAccount = async (user) => {
    return createUserGoogleDb(user);
  };
  changeUserPassword = async (password, email) => {
    return changeUserPasswordDb(password, email);
  };
  updateUser = async (user) => {
    const { email, username, id } = user;
    const errors = {};
    const getUser = await getUserByIdDb(id);
    const findUserByEmail = await getUserByEmailDb(email);
    const findUserByUsername = await getUserByUsernameDb(username);
    const emailChanged =
      email && getUser.email.toLowerCase() !== email.toLowerCase();
    const usernameChanged =
      username && getUser.username.toLowerCase() !== username.toLowerCase();

    if (emailChanged && typeof findUserByEmail === "object") {
      errors["email"] = "Email is already taken";
    }
    if (usernameChanged && typeof findUserByUsername === "object") {
      errors["username"] = "Username is already taken";
    }

    if (Object.keys(errors).length > 0) {
      throw new ErrorHandler(403, errors);
    }

    if (!user.roles) {
      user.roles = getUser.roles;
    }

    return updateUserDb(user);
  };

  deleteUser = async (id) => {
    return deleteUserDb(id);
  };

  getAllUsers = async (page) => {
    const limit = 12;
    const offset = (page - 1) * limit;
    return getAllUsersDb({ limit, offset });
  };
}

module.exports = new UserService();
