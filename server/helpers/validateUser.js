const validateUser = (email, password) => {
  const validEmail = typeof email === "string" && email.trim() !== "";
  const validPassword = typeof password === "string" && password.trim() !== "";

  return validEmail && validPassword;
};

module.exports = validateUser;
