const bcrypt = require("bcrypt");
const User = require("./models/Users");

const compareText = (text, comparedText) => {
  return new Promise((res) => {
    res(text === comparedText);
  });
};

const doesElementExist = async (element) => {
  try {
    const user = await User.find({ email: element });

    if (user[0].email !== undefined) {
      return true;
    }

    return false;
  } catch (e) {
    console.log(e);
  }
};

const signIn = async (email, password) => {
  try {
    if (typeof email != "string") {
      throw new Error("Wrong type of 'emial' string");
    } else if (typeof password != "string") {
      throw new Error("Wrong type of 'password' string");
    }

    const user = await User.find({ email: email });
    console.log(user);
    const hashPassword = await user[0].password;
    const loginResult = await bcrypt.compare(password, hashPassword);

    return { result: loginResult, user: user };
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (login, email, password, rePassword) => {
  try {
    if (email === "") {
      throw new Error("Email cannot be blank");
    } else if (password === "") {
      throw new Error("Password cannot be blank");
    } else if (login === "") {
      throw new Error("Login cannot be blank");
    }

    if (await compareText(password, rePassword)) {
      const hash = await bcrypt.hash(password, 10);

      const user = new User({
        login: login,
        email: email,
        password: hash,
        createdAt: Date.now(),
      });

      await user.save();
    } else throw new Error("Passwords doesn't match");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signIn, signUp };