const connect = require("../config/db");

const getAllUsers = async (req, res) => {
    try {
        const users = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `user`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!users.length) {
            return res.status(404).json({ message: "Nincsenek elérhető felhasználók." });
        }

        return res.status(200).json({ message: "Felhasználók sikeresen lekérve.", data: users });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a felhasználók lekérése során.", error });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Az ID megadása kötelező." });
    }

    try {
        const user = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `user` WHERE `id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!user.length) {
            return res.status(404).json({ message: "A megadott felhasználó nem található." });
        }

        return res.status(200).json({ message: "Felhasználó sikeresen lekérve.", data: user });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a felhasználó lekérése során.", error });
    }
};

module.exports = {
    getAllUsers,
    getUserById
};
