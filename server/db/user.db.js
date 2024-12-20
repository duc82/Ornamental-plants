const pool = require("../config");
const { hashPassword } = require("../helpers/hashPassword");

const getAllUsersDb = async ({ limit, offset }) => {
  const { rows: users } = await pool.query(
    "select * from users limit $1 offset $2",
    [limit, offset]
  );

  const { rows } = await pool.query("select count(*) from users");

  return {
    users,
    total: parseInt(rows[0].count),
  };
};

const createUserDb = async ({
  username,
  password,
  email,
  fullname,
  address,
  city,
  state,
  country,
  roles = ["customer"],
}) => {
  const { rows: user } = await pool.query(
    `INSERT INTO users(username, password, email, fullname, roles, address, city, state, country) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    returning user_id, username, email, fullname, roles, address, city, state, country, created_at`,
    [username, password, email, fullname, roles, address, city, state, country]
  );
  return user[0];
};

const getUserByIdDb = async (id) => {
  const { rows: user } = await pool.query(
    "select users.*, cart.id as cart_id from users left join cart on cart.user_id = users.user_id where users.user_id = $1",
    [id]
  );
  return user[0];
};
const getUserByUsernameDb = async (username) => {
  const { rows: user } = await pool.query(
    "select users.*, cart.id as cart_id from users left join cart on cart.user_id = users.user_id where lower(users.username) = lower($1)",
    [username]
  );
  return user[0];
};

const getUserByEmailDb = async (email) => {
  const { rows: user } = await pool.query(
    "select users.*, cart.id as cart_id from users left join cart on cart.user_id = users.user_id where lower(email) = lower($1)",
    [email]
  );
  return user[0];
};

const updateUserDb = async ({
  username,
  email,
  fullname,
  id,
  address,
  city,
  state,
  country,
  roles,
  password,
}) => {
  if (password) {
    const hashedPassword = hashPassword(password);
    await pool.query("update users set password = $1 where user_id = $2", [
      hashedPassword,
      id,
    ]);
  }

  const { rows: user } = await pool.query(
    `UPDATE users set username = $1, email = $2, fullname = $3, address = $4, city = $5, state = $6, country = $7, roles = $8
      where user_id = $9 returning username, email, fullname, user_id, address, city, country, state, roles, created_at`,
    [username, email, fullname, address, city, state, country, roles, id]
  );
  return user[0];
};

const deleteUserDb = async (id) => {
  const { rows: user } = await pool.query(
    "DELETE FROM users where user_id = $1 returning *",
    [id]
  );
  return user[0];
};

const createUserGoogleDb = async ({ sub, defaultUsername, email, name }) => {
  const { rows } = await pool.query(
    `INSERT INTO users(google_id,username, email, fullname) 
      VALUES($1, $2, $3, $4) ON CONFLICT (email) 
      DO UPDATE SET google_id = $1, fullname = $4 returning *`,
    [sub, defaultUsername, email, name]
  );
  return rows[0];
};

const changeUserPasswordDb = async (hashedPassword, email) => {
  return await pool.query("update users set password = $1 where email = $2", [
    hashedPassword,
    email,
  ]);
};

module.exports = {
  getAllUsersDb,
  getUserByIdDb,
  getUserByEmailDb,
  updateUserDb,
  createUserDb,
  createUserGoogleDb,
  deleteUserDb,
  getUserByUsernameDb,
  changeUserPasswordDb,
};
