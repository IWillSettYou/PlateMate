const { response } = require("express");
const { checkSession, deleteSession } = require("./sessionHandler");
const { verifyToken, refreshToken } = require("./tokenHandler");

const checkLogin = async (req, res) => {
    const sessionValidty = await checkSession(req, res)
    const token = req.cookies.token;

    if (!req.session.id || sessionValidty.response != true || !token || await verifyToken(req, res) != true || await refreshToken(req, res) != true) { 
        await deleteSession(req.sessionID)
        req.session.destroy();
        
        if(!res.headersSent) res.send({ isAuthorized: false })
    } else res.send({ isAuthorized: true })
};

module.exports = {
    checkLogin,
}
