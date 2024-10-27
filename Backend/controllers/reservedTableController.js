const connect = require("../config/db");

const getAllReservations = async (req, res) => {
    try {
        const users = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `reservedtable`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!users.length) {
            return res.status(404).json({ message: "Nincsenek elérhető foglalások." });
        }

        return res.status(200).json({ message: "Foglalások sikeresen lekérve.", data: users });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a foglalások lekérése során.", error });
    }
};

const getReservationById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Az ID megadása kötelező." });
    }

    try {
        const user = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `reservedtable` WHERE `id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!user.length) {
            return res.status(404).json({ message: "A megadott foglalás nem található." });
        }

        return res.status(200).json({ message: "Foglalás sikeresen lekérve.", data: user });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a foglalás lekérése során.", error });
    }
};

const createReservation = async (req, res) => {
    const { tableId, name, numberOfCustomers, reservedAt, reservedUntil } = req.body;

    if (!tableId || !name || !numberOfCustomers || !reservedAt || !reservedUntil) {
        return res.status(400).json({ message: "Minden mező megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("INSERT INTO `reservedTable` (`id`, `tableId`, `name`, `numberOfCustomers`, `reservedAt`, `reservedUntil`) VALUES (NULL, ?, ?, ?, ?, ?);", [tableId, name, numberOfCustomers, reservedAt, reservedUntil], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.status(200).json({ message: "Foglalás sikeresen létrehozva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a foglalás létrehozása során.", error });
    }
};

const deleteReservation = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Az ID megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `reservedtable` WHERE `reservedtable`.`id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó foglalás nem található." });
        }

        return res.status(200).json({ message: "Foglalás sikeresen törölve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a foglalás törlése során.", error });
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    deleteReservation
};
