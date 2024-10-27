const connect = require("../config/db");

const getAllOrders = async (req, res) => {
    try {
        const users = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `orders`", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!users.length) {
            return res.status(404).json({ message: "Nincsenek elérhető rendelések." });
        }

        return res.status(200).json({ message: "Rendelések sikeresen lekérve.", data: users });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a rendelések lekérése során.", error });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Az ID megadása kötelező." });
    }

    try {
        const user = await new Promise((resolve, reject) => {
            connect.query("SELECT * FROM `orders` WHERE `id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!user.length) {
            return res.status(404).json({ message: "A megadott rendelés nem található." });
        }

        return res.status(200).json({ message: "Rendelés sikeresen lekérve.", data: user });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a rendelés lekérése során.", error });
    }
};

const createOrder = async (req, res) => {
    const { tableId, items } = req.body;

    if (!tableId || !items) {
        return res.status(400).json({ message: "Minden mező megadása kötelező." });
    }

    try {
        const response = await Promise.all(
            items.map(async (itemId) => {
                return new Promise((resolve, reject) => {
                    connect.query("INSERT INTO `orders` (`id`, `tableId`, `itemId`) VALUES (NULL, ?, ?);", [tableId, itemId], (err, result) => {
                            if (err) reject(err);
                            else resolve(result);
                        }
                    );
                });
            })
        );

        return res.status(200).json({ message: "Rendelés sikeresen létrehozva.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a rendelés létrehozása során.", error });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Az ID megadása kötelező." });
    }

    try {
        const response = await new Promise((resolve, reject) => {
            connect.query("DELETE FROM `orders` WHERE `orders`.`id` = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (response.affectedRows === 0) {
            return res.status(404).json({ message: "A megadott ID-hoz tartozó rendelés nem található." });
        }

        return res.status(200).json({ message: "Rendelés sikeresen törölve.", data: response });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a rendelés törlése során.", error });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder
};
