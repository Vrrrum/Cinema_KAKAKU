const bcrypt = require("bcrypt");
const User = require("./models/Users");

const compareText = (text, comparedText) => {
  return new Promise((res) => {
    res(text === comparedText);
  });
};

// Checks if user exist
const doesUserExist = async (email, login = null) => {
  try {
    const user = await User.find({ $or: [{ email: email }, { login: login }] });

    if (user[0] !== undefined) {
      return true;
    }

    return false;
  } catch (e) {
    console.log(e);
  }
};

const signIn = async (email, password) => {
  if (email === "") {
    throw new Error("Email cannot be blank");
  } else if (password === "") {
    throw new Error("Password cannot be blank");
  }
  if (!(await doesUserExist(email))) {
    throw new Error("User doesn't exist");
  }
  console.log(password);

  const user = await User.findOne({ email: email });
  const hashPassword = await user.password;
  const loginResult = await bcrypt.compare(password, hashPassword);

  if (!loginResult) {
    throw new Error("Wrong password");
  }

  return user;
};

const signUp = async (login, email, password, rePassword) => {
  if (email === "") {
    throw new Error("Email cannot be blank");
  } else if (password === "") {
    throw new Error("Password cannot be blank");
  } else if (login === "") {
    throw new Error("Login cannot be blank");
  }

  if (doesUserExist(email, login)) {
    throw new Error("User with this email or passowrd alredy exists");
  }
  // await compareText(password, rePassword)
  if (password !== rePassword) {
    throw new Error("Passwords doesn't match");
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      login: login,
      email: email,
      password: hash,
      createdAt: Date.now(),
    });

    await user.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signIn, signUp };
