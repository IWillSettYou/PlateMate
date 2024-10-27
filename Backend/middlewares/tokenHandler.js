/*const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");

const checkTokenMiddleware = async (req, res, next) => {
    if (
        req.path === "/login" ||
        req.path === "/register" ||
        req.path === "/logout"
    ) {
        return next();
    }

    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access Denied");
    try {
        await verifyToken(req, res);
        await refreshToken(req, res);
        next();
    } catch (err) {
        res.status(400).send("Invalid Token-4");
    }
};

const verifyToken = async (req, res) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) return res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET || "");
        if (req.sessionID !== verified.sid)
            return res.status(400).send("Invalid Token");
    } catch (err) {
        res.status(400).send(err);
    }
};

const refreshToken = async (req, res) => {
    const token = req.header("Authorization");
    const refreshToken = req.body.refresh_token;
    if (!token) return res.status(401).send("Access Denied");
    if (!refreshToken) return res.status(400).send("Bad Request");

    try {
        const verified = jwt.verify(
            token.split(" ")[1],
            process.env.TOKEN_SECRET || ""
        );
        const verifiedRefresh = jwt.verify(
            refreshToken,
            process.env.TOKEN_SECRET || ""
        );

        if (verifiedRefresh.exp < Math.floor(Date.now() / 1000))
            return res.status(400).send("Expired RToken");
        if (verifiedRefresh.typ !== "Refresh")
            return res.status(400).send("Invalid RToken type");
        if (verified.iss !== verifiedRefresh.iss)
            return res.status(400).send("Invalid Issuer");
        if (verified.sub !== verifiedRefresh.sub)
            return res.status(400).send("Invalid Subject");
        if (
            verified.sid !== verifiedRefresh.sid ||
            verifiedRefresh.sid !== req.sessionID ||
            verified.sid !== req.sessionID
        )
            return res.status(400).send("Invalid Session ID");

        const jti = await uuidv4();
        const users = await User.findOne(verified.sub);
        const user =users[0]
        const newToken = jwt.sign(
            {
                jti: jti,
                sub: user.id,
                iss: process.env.ISSUER,
                sid: req.sessionID,
                typ: "Bearer",
                preferred_username: user.username,
            },
            process.env.TOKEN_SECRET || "",
            {
                expiresIn: "3m",
            }
        );

        res.header("Authorization", "Bearer " + newToken)
        res.header("Refresh-Token", refreshToken)
    } catch (err) {
        console.log(err);
        res.status(400).send("Invalid Token-3");
    }
};

module.exports = checkTokenMiddleware;*/
