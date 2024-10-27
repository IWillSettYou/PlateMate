/*const connect = require("../config/db");

class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email
    }

    async save() {
        try {
            return new Promise((resolve, reject) => {
                connect.query("INSERT INTO `users` ( `username`, `password`, `email`) VALUES (?, ?, ?);", [this.username, this.password, this.email], (err, result, fields) => {
                    if (err) throw err; 
                    resolve("User added")
                });
            })
        } catch (err) {
            return err;
        }
    }

    static async findOne(username) {
        try {    
            return new Promise((resolve, reject) => {
                connect.query("SELECT * FROM `users` WHERE `username` = ?", [username], (err, result) => {
                    if (err) return reject(err); 
                    resolve(result);  
                });
            });
        } catch (err) {
            return err
        }
    }

    static async delete(username) {
        try {
            return new Promise((resolve, reject) => {
                connect.query("DELETE FROM `users` WHERE `username` = ?", [username], (err,result, fields) =>{
                    if (err) return reject(err); 
                    resolve("User deleted!")
                });
            })
        } catch (err) {
            return err;
        }
    }

    static async update(username, password, email) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        try {
            return new Promise((resolve, reject) => {
                connect.query("UPDATE `users` SET `username` = ?, `password` = ?, `email` = ? WHERE `username` = ?", [username, hashedPassword, email, username], (err, result, fields) => {
                    if (err) return reject(err); 
                    resolve("User updated!")
                });
            })
        } catch (err) {
            return err;
        }
    }
}

module.exports = User;*/
