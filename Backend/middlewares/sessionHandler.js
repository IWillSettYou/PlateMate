/*const connect = require("../config/db");
const logout = require("../controllers/authController.js");

const checkSessionMiddleware = async (req, res, next) => {
    if (
        req.path === "/login" ||
        req.path === "/register" ||
        req.path === "/logout"
    ) {
        return next();
    }

    const sessionValidty = await checkSession(req, res)

    if (req.session.id && sessionValidty) {
        console.log("Session is valid");
        return next();
    } else {
        await deleteSession(req.sessionID);
        await logout(req, res);
        req.session.destroy((err) => {
          if (err) {
            res.status(400).send("Failed to logout: " + err);
          }
          res.status(401).send({ message: "Unauthorized: Invalid session, Logged out" });
        });
    }
};

const checkSession = async (req, res) => {
    try {
        const dbSession = await findSession(req.sessionID);
        if (dbSession.length == 0) {
            console.log("No session found");
            return false;
        }
        if (
            dbSession[0].expires < Date.now() ||
            dbSession[0].ip !== req.ip
        ) {
            console.log("Session expired");
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const findSession = async (id) => {
    try {
        return new Promise((resolve, reject) => {
            const session = connect.query(
                "SELECT * FROM `sessions` WHERE id = ?", [id], (err, result) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    } catch (err) {
        return err
    }
};

const deleteSession = async (id) => {
    try {
        return new Promise((resolve, reject) => {
            connect.query(
                "DELETE FROM `sessions` WHERE `id` = ?", [id], (err, result) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve("Session deleted!");
                }
            );
        });
    } catch (err) {
        return err;
    }
};

const uploadSession = async (req, userName) => {
    try {
        return new Promise((resolve, reject) => {
            connect.query(
                "INSERT INTO `sessions` (`id`, `userName`, `ip`, `expires`) VALUES (?, ?, ?, ?);",
                [
                    req.sessionID,
                    userName,
                    req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                    req.session.cookie.expires
                ],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    } catch (err) {
        return err
    }
};

module.exports = {
    checkSessionMiddleware,
    uploadSession,
    findSession,
    checkSession, 
    deleteSession
}*/
