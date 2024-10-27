const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const { checkSessionMiddleware } = require("./middlewares/sessionHandler");
const { checkTokenMiddleware } = require("./middlewares/tokenHandler");
const { login, register, logout } = require("./controllers/authController") 

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const tableRoutes = require("./routes/tableRoutes");
const permissionsettingRoutes = require("./routes/permissionSettingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paidRoutes = require("./routes/paidRoutes");
const reservedTableRoutes = require("./routes/reservedTableRoutes");

dotenv.config();
const app = express();

//session
//app.use(checkSessionMiddleware)
//app.use(checkTokenMiddleware)
//app.post("/register", register);
//app.post("/login", login);
//app.post("/logout", logout)

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/category', categoryRoutes);
app.use('/paymentmethod', paymentMethodRoutes);
app.use('/table', tableRoutes);
app.use('/permissionsetting', permissionsettingRoutes);
app.use('/order', orderRoutes);
app.use('/paid', paidRoutes);
app.use('/reservation', reservedTableRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running at http://localhost:${PORT}`);
});