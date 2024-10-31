const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const { checkSessionMiddleware } = require("./middlewares/sessionHandler");
const { checkTokenMiddleware } = require("./middlewares/tokenHandler");
const { login, register, logout } = require("./controllers/authController") 
const { redirectHandler } = require("./middlewares/redirectHandler") 
const { roleCheck } = require("./middlewares/roleHandler") 

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
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, 
};

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 86_400_000
        },
    })
);
//TODO - Store sessionId to allow deletion after sessionId is changed
app.use(checkSessionMiddleware);
app.use(checkTokenMiddleware);

app.post("/login", login);
app.post("/logout", logout);
app.get("/redirect", redirectHandler);
app.post("/register", roleCheck(['admin']), register);

app.use('/user', roleCheck(['admin', 'chef']), userRoutes);
app.use('/item', roleCheck(['admin']), itemRoutes);
app.use('/category', roleCheck(['admin']), categoryRoutes);
app.use('/payment-method', roleCheck(['admin']), paymentMethodRoutes);
app.use('/table', roleCheck(['admin']), tableRoutes);
app.use('/permission-setting', roleCheck(['admin']), permissionsettingRoutes);
app.use('/order', roleCheck(['admin']), orderRoutes);
app.use('/paid', roleCheck(['admin']), paidRoutes);
app.use('/reservation', roleCheck(['admin']), reservedTableRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running at http://localhost:${PORT}`);
});