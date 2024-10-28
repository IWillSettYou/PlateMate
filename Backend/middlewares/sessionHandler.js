const { response } = require("express");
const connect = require("../config/db");
const User = require("../models/user");

const checkSessionMiddleware = async (req, res, next) => {
    if (
        req.path === "/login" ||
        req.path === "/register" ||
        req.path === "/logout"
    ) {
        return next();
    }

    const sessionValidty = await checkSession(req, res)

    if (req.session.id && sessionValidty.response) {
        return next();
    } else {
        try {
            await deleteSession(req.sessionID)
        
            req.session.destroy((err) => {
              if (err) {
                res.status(400).send({ message : "Hiba kijelentkeztetéskor: ", error : err});
              }
              res.status(200).send({ message: "Engedélytelen kérés, kijelentkeztetve" });
            });
          }
          catch(error) {
            res.status(500).send({ message : "Hiba kijelentkeztetéskor", error : error })
          };
    }
};

const checkSession = async (req, res) => {
    try {
        const dbSession = await findSession(req.sessionID, req).catch(error => res.status(500).send({ message : "Hiba a munkamenet lekérdezésekor.", error : error }));
        const dbSessionData = dbSession.response;

        if (dbSessionData.length === 0) {
            return { message : "Nem található ilyen munkamenet.", response :false }; 
        }

        if (
            dbSessionData[0].expires < Date.now() ||
            dbSessionData[0].ip !== req.ip
        ) {
            return { message: "A munkamenet lejárt.", response : false };
        }
        return { message : "A munkamenet érvényes.", response : true };
    } catch (err) {
        return { message : "Hiba a munkamenet ellenőrzésekor.", error : err}; 
    }
};

const findSession = async (id, req) => {
    const users = await User.findOne(req.body.email);
    const user = users.data[0]

    return new Promise((resolve, reject) => {
        const session = connect.query(
            "SELECT * FROM `sessions` WHERE id = ? AND userId = ?", [id, user.id], (err, result) => {
                if (err) {
                    return reject({ message : "Hiba a munkamenet lekérdezésekor.", error : err });
                }
                resolve({ message : "A munkamenet sikeresen lekérdezve.", response : result });
            }
        );
    });
};

const deleteSession = async (id) => {
    return new Promise((resolve, reject) => {
        connect.query(
            "DELETE FROM `sessions` WHERE `id` = ?", [id], (err, result) => {
                if (err) {
                    return reject({ message : "Hiba a munkamenet törlésekor.", error : err });
                }
                resolve({ message : "A munkamenet sikeresen törölve.", response : result });
            }
        );
    });
};

const uploadSession = async (req, userId) => {
    return new Promise((resolve, reject) => {
        connect.query(
            "INSERT INTO `sessions` (`id`, `userId`, `ip`, `expires`) VALUES (?, ?, ?, ?);",
            [
                req.sessionID,
                userId,
                req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                req.session.cookie.expires
            ],
            (err, result) => {
                if (err) {
                    reject({ message : "Hiba a munkamenet feltöltésekor.", error : err });
                    return;
                }
                resolve({ message : "A munkamenet sikeresen feltöltve.", response : result });
            }
        );
    });
};

module.exports = {
    checkSessionMiddleware,
    uploadSession,
    findSession,
    checkSession, 
    deleteSession
}
