/*const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { deleteSession, uploadSession, checkSession } = require("../middlewares/sessionHandler");

const register = async (req, res) => {
  const users = await User.findOne(req.body.username)
  if (users.length != 0) { res.send("Username already exists!")}
  else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    const user = new User(req.body.username, hashedPassword, req.body.email);
  
    try {
      const savedUser = await user.save();
  
      res.status(200).send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

const login = async (req, res) => {
  if(await checkSession(req, res)) { 
    const users = await User.findOne(req.body.username);
    const user = users[0]

    const jti = await uuidv4();
    const token = jwt.sign(
    {
      jti: jti,
      sub: user.username,
      iss: process.env.ISSUER,
      typ: "Bearer",
      preferred_username: user.username,
      sid: req.sessionID,
    },
    process.env.TOKEN_SECRET || "",
    {
      expiresIn: "3h",
    });

    res.header("Authorization", "Bearer " + token)
    res.header("Refresh-Token", await generateRefreshToken(jti, user, req.sessionID)).send({
      "message" : "Logged in based on not expired session"
    })
  } else {
    const users = await User.findOne(req.body.username);
    const user = users[0]

    if (user.length == 0) return res.status(400).send("Username or password is wrong");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");

    const jti = await uuidv4();
    const token = jwt.sign(
    {
      jti: jti,
      sub: user.username,
      iss: process.env.ISSUER,
      typ: "Bearer",
      preferred_username: user.username,
      sid: req.sessionID,
    },
    process.env.TOKEN_SECRET || "",
    {
      expiresIn: "3h",
    }
    );

    await uploadSession(req, user.username);

    res.header("Authorization", "Bearer " + token)
    res.header("Refresh-Token", await generateRefreshToken(jti, user, req.sessionID)).send({
      "message" : "Logged in after creating new session"
    })
  }
};

const generateRefreshToken = async (jti, user, sid) => {
  return jwt.sign(
    {
      iss: process.env.ISSUER,
      jti: jti,
      typ: "Refresh",
      sub: user.username,
      sid: sid,
    },
    process.env.TOKEN_SECRET || "",
    { expiresIn: "1h" }
  );
};

const logout = async (req, res) => {
  console.log(await deleteSession(req.sessionID));

  req.session.destroy((err) => {
    if (err) {
      res.status(400).send("Failed to logout");
    }
    res.status(200).send("Logged out");
  });
};

module.exports = {
  logout,
  login,
  register,
  generateRefreshToken
}*/